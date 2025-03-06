import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store';
import { useTranslation } from 'react-i18next';
import Part from '../../../models/part';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Divider, Text, useTheme } from 'react-native-paper';
import { View } from '../../../components/Themed';
import { getWorkOrdersByPart } from '../../../slices/workOrder';
import { getStatusColor } from '../../../utils/overall';
import Tag from '../../../components/Tag';

export default function PartWorkOrders({
                                         part,
                                         navigation
                                       }: {
  part: Part;
  navigation: any;
}) {
  const { t }: { t: any } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { workOrdersByPart, loadingGet } = useSelector(
    (state) => state.workOrders
  );
  const workOrders = workOrdersByPart[part.id] ?? [];

  useEffect(() => {
    if (part) dispatch(getWorkOrdersByPart(part.id));
  }, [part]);

  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
      refreshControl={
        <RefreshControl
          refreshing={loadingGet}
          colors={[theme.colors.primary]}
        />
      }
    >
      {workOrders.map((workOrder) => (
        <TouchableOpacity
          key={workOrder.id}
          onPress={() => navigation.push('WODetails', { id: workOrder.id })}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 20
            }}
          >
            <Text style={{ fontWeight: 'bold', marginRight: 5, flexShrink: 1 }}>
              {workOrder.title}
            </Text>
            <Tag
              text={t(workOrder.status)}
              color='white'
              backgroundColor={getStatusColor(workOrder.status, theme)}
            />
          </View>
          <Divider />
        </TouchableOpacity>
      ))}
      {!loadingGet && workOrders.length === 0 && (
        <View style={{ padding: 20 }}>
          <Text variant={'titleLarge'}>{t('no_wo_linked_part')}</Text>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
