import { FlatList, ListRenderItemInfo, TextInput, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text } from '@/components';
import { useTypedSelector } from '@/store';
import api from '@/api';
import { CharactersModel } from '@/model/Characters';
import CharacterItem from '@/components/CharacterItem';

const Characters = () => {
  const { episodeId } = useTypedSelector(state => state.bottom);

  const [filter, setFilter] = useState('');

  const [characters, setCharacters] = useState<CharactersModel[]>([]);

  const getEpisodeId = async (episodeId: number) => {
    let str: number[] = [];
    const result: { characters: string[] } = await api.episode.get(episodeId);
    if (result.characters.length > 0) {
      result.characters.map(x => {
        str.push(Number(x.split('character/')[1]));
      });
    }
    await api.character.get(str.join(',')).then(r => {
      setCharacters(r);
    });
  };

  useEffect(() => {
    getEpisodeId(episodeId);
  }, []);

  return (
    <View style={{ marginHorizontal: 8, height: 'auto' }}>
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
          onChangeText={e => {
            setFilter(e);
          }}
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
      <FlatList
        renderItem={({ item }: ListRenderItemInfo<CharactersModel>) => (
          <CharacterItem item={item} />
        )}
        data={characters.filter(x =>
          x.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        )}
        numColumns={1}
        style={{ marginTop: 35 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingBottom: 50 }}
        key={1}
      />
    </View>
  );
};

export default Characters;
