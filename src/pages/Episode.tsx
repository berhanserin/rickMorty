import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { BaseLayout } from '@/components/Baselayout';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@/components';
import api from '@/api';
import { EpisodeModel, EpisodeResult } from '@/model/Episode';
import { useDispatch } from 'react-redux';
import { changeBottom } from '@/store/reducers/bottomReducer';
import EpsodeItem from '@/components/EpsodeItem';
import { TextInput } from 'react-native-gesture-handler';

const Episode = () => {
  const [episodeCount, setEpisodeCount] = useState(0);
  const [episodePageArray, setEpisodePageArray] = useState<any>([]);
  const [episodePage, setEpisodePage] = useState(1);
  const [episode, setEpisode] = useState<EpisodeResult[]>([]);
  const dispatch = useDispatch();

  const screenWidth = Dimensions.get('window').width;
  const numColumns = 1;
  const gap = 5;

  const availableSpace = screenWidth - (numColumns - 1) * gap;
  const itemSize = availableSpace / numColumns;

  const getData = async () => {
    const episode: EpisodeModel = await api.episode.getPage(episodePage);
    const pagesArray = [];
    if (episode.results.length > 0) {
      setEpisodeCount(episode.info.count ?? 0);
      setEpisode(episode.results);
      for (let index = 0; index < episode.info.pages; index++) {
        pagesArray.push({ id: index + 1 });
      }
      setEpisodePageArray(pagesArray);
    }
  };

  useEffect(() => {
    getData();
  }, [episodePage]);

  return (
    <BaseLayout style={{ backgroundColor: '#f8f4f4' }}>
      <View style={{ alignItems: 'center' }}>
        <Text type="h1">Bölümler</Text>
        <Text type="default" style={{ marginTop: 10 }}>
          Toplam Bölüm Sayısı: {episodeCount}
        </Text>
        <Text style={{ marginTop: 10 }}>
          {episodePage}. sayfadaki kayıt sayısı: {episode.length}
        </Text>
      </View>

      <View
        style={{
          width: screenWidth,
        }}>
        <FlatList
          renderItem={({ item }: { item: { id: number } }) => {
            return (
              <TouchableOpacity
                onPress={() => setEpisodePage(item.id)}
                activeOpacity={0.5}
                key={item.id}
                style={{
                  borderColor: 'black',
                  borderWidth: 0.5,
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: episodePage == item.id ? 'blue' : '#f8f4f4',
                }}>
                <Text
                  style={{
                    color: episodePage == item.id ? 'white' : 'black',
                  }}>
                  {item.id}
                </Text>
              </TouchableOpacity>
            );
          }}
          data={episodePageArray}
          horizontal
          style={{ marginTop: 10 }}
          contentContainerStyle={{
            gap: 5,
            flexGrow: 1,
            justifyContent: 'center',
          }}
          key={numColumns}
        />
      </View>
      <FlatList
        testID="EpisodeList"
        renderItem={({ item }: ListRenderItemInfo<EpisodeResult>) => (
          <EpsodeItem item={item} itemSize={itemSize} />
        )}
        data={episode}
        numColumns={numColumns}
        style={{ marginTop: 35 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap }}
        key={numColumns}
      />
    </BaseLayout>
  );
};

export default Episode;
