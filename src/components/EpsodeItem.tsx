import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { EpisodeResult } from '@/model/Episode';
import { useDispatch } from 'react-redux';
import { changeBottom } from '@/store/reducers/bottomReducer';

const EpsodeItem = ({
  item,
  itemSize,
}: {
  item: EpisodeResult;
  itemSize: number;
}) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        dispatch(
          changeBottom({
            show: true,
            title: 'Bölümün karakterleri',
            size: 4,
            type: 0,
            episodeId: item.id,
          })
        );
      }}
      style={{
        height: 100,
        width: itemSize - 10,
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {/* <Text>{item.id}</Text> */}
      {/* <Text style={{ marginLeft: 10 }}>-</Text> */}
      <Text style={{ marginLeft: 10 }}>{item.name}</Text>
      <Text style={{ marginLeft: 10 }}>-</Text>
      <Text style={{ marginLeft: 10 }}>{item.episode}</Text>
    </TouchableOpacity>
  );
};

export default EpsodeItem;
