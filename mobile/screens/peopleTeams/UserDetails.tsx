import { ScrollView } from 'react-native';
import LoadingDialog from '../../components/LoadingDialog';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../store';
import { RootStackScreenProps } from '../../types';
import { Avatar, Divider, Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { View } from '../../components/Themed';
import { getUserDetails } from '../../slices/user';
import { getUserInitials } from '../../utils/displayers';
import BasicField from '../../components/BasicField';

export default function UserDetails({
                                      navigation,
                                      route
                                    }: RootStackScreenProps<'UserDetails'>) {
  const { id, userProp } = route.params;
  const { loadingGet, userInfos } = useSelector((state) => state.users);
  const user = userInfos[id]?.user ?? userProp;
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fieldsToRender = [
    {
      label: t('id'),
      value: user?.id
    },
    {
      label: t('first_name'),
      value: user?.firstName
    },
    {
      label: t('last_name'),
      value: user?.lastName
    },
    {
      label: t('email'),
      value: user?.email
    },
    {
      label: t('phone'),
      value: user?.phone
    },
    {
      label: t('job_title'),
      value: user?.jobTitle
    },
    {
      label: t('role'),
      value: user?.role.name
    },
    {
      label: t('hourly_rate'),
      value: user?.rate
    }
  ];

  useEffect(() => {
    const { id, userProp } = route.params;
    if (!userProp)
      dispatch(getUserDetails(id));
  }, [route]);

  useEffect(() => {
    navigation.setOptions({
      title: user ? `${user?.firstName} ${user.lastName}` : t('loading')
    });
  }, [user]);


  if (user)
    return (
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{ alignItems: 'center', paddingTop: 20 }}>
          {user.image ? (
            <Avatar.Image source={{ uri: user.image.url }} />
          ) : (
            <Avatar.Text size={50} label={getUserInitials(user)} />
          )}
        </View>
        {fieldsToRender.map((field) => (
          <BasicField
            key={field.label}
            label={field.label}
            value={field.value}
          />
        ))}
      </ScrollView>
    );
  else return <LoadingDialog visible={true} />;
}
