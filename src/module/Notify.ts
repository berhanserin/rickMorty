import notifee from '@notifee/react-native';
import uuid from 'react-native-uuid';

export const showNotify = async ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => {
  await notifee.requestPermission();
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  await notifee.displayNotification({
    id: uuid.v4().toString(),
    title,
    body,
    android: {
      channelId,
      smallIcon: 'name-of-a-small-icon',
      pressAction: {
        id: 'default',
      },
    },
  });
};
