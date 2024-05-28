import { View } from 'react-native';
import React from 'react';
import { BaseLayout } from '@/components/Baselayout';

import { useTypedSelector } from '@/store';
import { Text } from '@/components';

const Home = () => {
  const { fav } = useTypedSelector(state => state.fav);

  return (
    <BaseLayout style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text type="h1" testID="HomeTitle">
        Rick and Morty
      </Text>
      <View style={{ marginTop: 50 }}>
        <Text type="h2">
          Rick and Morty ile ilgili solid prensiblerine uygun uygulama.
        </Text>
      </View>
      <View style={{ marginTop: 25 }}>
        <Text type="font400">Favori karakterlerin sayısı: {fav.length}</Text>
      </View>
    </BaseLayout>
  );
};

export default Home;
