import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { CharactersModel } from '@/model/Characters';
import FastImage from 'react-native-fast-image';
import { Text } from './Text';
import { useDispatch } from 'react-redux';
import {
  addFavorite,
  removeFavorite,
  requestFavorite,
} from '@/store/reducers/favReducer';
import { useTypedSelector } from '@/store';
import { changeBottom } from '@/store/reducers/bottomReducer';
import { showNotify } from '@/module/Notify';

const RemoveFav = ({
  item,
  type = false,
}: {
  item: CharactersModel;
  type?: boolean;
}) => {
  const dispatch = useDispatch();
  const { fav } = useTypedSelector(state => state.fav);
  return (
    <View
      style={{
        height: 550,
        width: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 210,
          height: 210,
          borderWidth: 2,
          borderColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 100,
        }}>
        <FastImage
          source={{ uri: item.image }}
          resizeMode={FastImage.resizeMode.cover}
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          width: 270,
          marginLeft: 10,
        }}>
        <View style={{}}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text type="title">{item.name}</Text>
            <Text
              type="title"
              style={{ color: item.status == 'Alive' ? 'green' : 'red' }}>
              {item.status}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text type="title">{item.species}</Text>
            <Text type="title">{item.type.length > 0 ? item.type : '-'}</Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text type="title">{item.gender}</Text>
          </View>
        </View>
        <View style={{ marginTop: 25, alignItems: 'center' }}>
          <Text type="title">Favoriden kaldırılsın mı?</Text>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <TouchableOpacity
              onPress={async () => {
                dispatch(removeFavorite(item));
                dispatch(
                  changeBottom({ show: false, title: '', size: -1, type: -1 })
                );
                showNotify({
                  title: 'Favori İşlemleri',
                  body: 'Favıriden başarıyla kaldırıldı.',
                });
              }}
              style={{
                width: 120,
                height: 60,
                borderRadius: 10,
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text type="title" style={{ color: 'white' }}>
                Evet
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  changeBottom({ show: false, title: '', size: -1, type: -1 })
                );
              }}
              style={{
                width: 120,
                height: 60,
                borderRadius: 10,
                marginLeft: 15,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text type="title" style={{ color: 'white' }}>
                Hayır
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RemoveFav;
