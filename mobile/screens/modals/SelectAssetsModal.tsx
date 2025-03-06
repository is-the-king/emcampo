import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { View } from '../../components/Themed';
import { RootStackScreenProps } from '../../types';
import { useTranslation } from 'react-i18next';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../store';
import { AssetMiniDTO } from '../../models/asset';
import { getAssetsMini } from '../../slices/asset';
import { Checkbox, Divider, Searchbar, Text, useTheme } from 'react-native-paper';

export default function SelectAssetsModal({
                                            navigation,
                                            route
                                          }: RootStackScreenProps<'SelectAssets'>) {
  const { onChange, selected, multiple, locationId } = route.params;
  const theme = useTheme();
  const { t }: { t: any } = useTranslation();
  const dispatch = useDispatch();
  const { assetsMini, loadingGet } = useSelector((state) => state.assets);
  const [selectedAssets, setSelectedAssets] = useState<AssetMiniDTO[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (assetsMini.length) {
      const newSelectedAssets = selectedIds
        .map((id) => {
          return assetsMini.find((asset) => asset.id == id);
        })
        .filter((asset) => !!asset);
      setSelectedAssets(newSelectedAssets);
    }
  }, [selectedIds, assetsMini]);

  useEffect(() => {
    if (!selectedIds.length) setSelectedIds(selected);
  }, [selected]);

  useEffect(() => {
    if (multiple)
      navigation.setOptions({
        headerRight: () => (
          <Pressable
            disabled={!selectedAssets.length}
            onPress={() => {
              onChange(selectedAssets);
              navigation.goBack();
            }}
          >
            <Text variant='titleMedium'>{t('add')}</Text>
          </Pressable>
        )
      });
  }, [selectedAssets]);

  useEffect(() => {
    dispatch(getAssetsMini(locationId));
  }, [locationId]);

  const onSelect = (ids: number[]) => {
    setSelectedIds(Array.from(new Set([...selectedIds, ...ids])));
    if (!multiple) {
      onChange([assetsMini.find((asset) => asset.id === ids[0])]);
      navigation.goBack();
    }
  };
  const onUnSelect = (ids: number[]) => {
    const newSelectedIds = selectedIds.filter((id) => !ids.includes(id));
    setSelectedIds(newSelectedIds);
  };
  const toggle = (id: number) => {
    if (selectedIds.includes(id)) {
      onUnSelect([id]);
    } else {
      onSelect([id]);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Searchbar
        placeholder={t('search')}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ backgroundColor: theme.colors.background }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loadingGet}
            onRefresh={() => dispatch(getAssetsMini())}
          />
        }
        style={{
          flex: 1,
          backgroundColor: theme.colors.background
        }}
      >
        {assetsMini.filter(mini => mini.name.toLowerCase().includes(searchQuery.toLowerCase().trim())).map((asset) => (
          <TouchableOpacity
            onPress={() => {
              toggle(asset.id);
            }}
            key={asset.id}
            style={{
              borderRadius: 5,
              padding: 15,
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'row',
              elevation: 2,
              alignItems: 'center'
            }}
          >
            {multiple && (
              <Checkbox
                status={
                  selectedIds.includes(asset.id) ? 'checked' : 'unchecked'
                }
                onPress={() => {
                  toggle(asset.id);
                }}
              />
            )}
            <Text style={{ flexShrink: 1 }} variant={'titleMedium'}>{asset.name}</Text>
            <Divider />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
