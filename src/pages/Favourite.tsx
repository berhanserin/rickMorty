import React, { useCallback, useEffect, useState } from 'react';

import { BaseLayout } from '@/components/Baselayout';
import { Text } from '@/components';
import { FlatList, ListRenderItemInfo, TextInput, View } from 'react-native';
import CharacterItem from '@/components/CharacterItem';
import { CharactersModel } from '@/model/Characters';
import { useTypedSelector } from '@/store';
import { debounce } from 'lodash';

const Favourite = () => {
  const { fav } = useTypedSelector(state => state.fav);

  const [filter, setFilter] = useState('');

  return (
    <BaseLayout style={{ marginHorizontal: 10 }}>
      <View style={{ alignItems: 'center' }}>
        <Text type="h1">Favori Karakterler</Text>
      </View>
      <View
        style={{
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          value={filter}
          placeholderTextColor={'grey'}
          placeholder="Filtrele"
          onChangeText={e => setFilter(e)}
          style={{
            height: 50,
            width: 200,
            padding: 8,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 25,
          }}
        />
      </View>
      {fav.length > 0 ? (
        <FlatList
          renderItem={({ item }: ListRenderItemInfo<CharactersModel>) => (
            <CharacterItem item={item} type={true} />
          )}
          data={fav.filter(x =>
            x.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
          )}
          numColumns={1}
          style={{ marginTop: 35 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingBottom: 50 }}
          key={1}
        />
      ) : (
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text type="bottomTitle">Favoriye karakter eklemediniz.</Text>
        </View>
      )}
    </BaseLayout>
  );
};

export default Favourite;
