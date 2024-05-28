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

const CharacterItem = ({
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
        height: 120,
        width: 'auto',
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: 110,
          height: 110,
          borderWidth: 2,
          borderColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FastImage
          source={{ uri: item.image }}
          resizeMode={FastImage.resizeMode.cover}
          style={{
            width: 100,
            height: 100,
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
            <Text type="h2"> {item.name}</Text>
            <Text
              type="h2"
              style={{ color: item.status == 'Alive' ? 'green' : 'red' }}>
              {item.status}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text type="h2">{item.species}</Text>
            <Text type="h2">
              Türü: {item.type.length > 0 ? item.type : '-'}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text type="h2">{item.gender}</Text>
          </View>
        </View>
        <View style={{ marginTop: 25, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={async () => {
              if (fav.find(x => x.id === item.id)) {
                if (!type) {
                  dispatch(removeFavorite(item));
                } else {
                  dispatch(requestFavorite(item));
                  dispatch(
                    changeBottom({
                      show: true,
                      title: 'Favoriden Kaldır',
                      size: 3,
                      type: 1,
                    })
                  );
                }
              } else {
                if (fav.length === 10) {
                  showNotify({
                    title: 'Favori Sınırı',
                    body: 'En fazla 10 karakter eklenebilir.',
                  });
                } else {
                  dispatch(addFavorite(item));
                }
              }
            }}
            style={{
              width: 120,
              height: 20,
              borderRadius: 10,
              backgroundColor: fav.find(x => x.id === item.id) ? 'red' : 'blue',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text type="h3" style={{ color: 'white' }}>
              {fav.find(x => x.id === item.id)
                ? 'Favoriden Kaldır'
                : 'Favoriye Ekle'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CharacterItem;
