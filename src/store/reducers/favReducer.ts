import { CharactersModel } from '@/model/Characters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';

const initialState: { fav: CharactersModel[]; removeFav: CharactersModel } = {
  fav: [],
  removeFav: {
    created: '',
    episode: [],
    gender: '',
    id: 0,
    image: '',
    location: { name: '', url: '' },
    name: '',
    origin: { name: '', url: '' },
    species: '',
    status: '',
    type: '',
    url: '',
  },
};

const saveFav = async (fav: any) => {
  const jsonValue = JSON.stringify(fav);
  await AsyncStorage.setItem('FavItem', jsonValue);
};

export const BottomSlice = createSlice({
  name: 'bottom',
  initialState,
  reducers: {
    addFavorite: (
      state,
      action: {
        payload: CharactersModel;
      }
    ) => {
      state.fav.push(action.payload);
      saveFav(state.fav);
    },
    setFavorite: (
      state,
      action: {
        payload: CharactersModel[];
      }
    ) => {
      state.fav = action.payload;
    },
    removeFavorite: (
      state,
      action: {
        payload: CharactersModel;
      }
    ) => {
      state.fav = state.fav.filter(x => x.id !== action.payload.id);
      saveFav(state.fav);
    },
    requestFavorite: (
      state,
      action: {
        payload: CharactersModel;
      }
    ) => {
      state.removeFav = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, requestFavorite, setFavorite } =
  BottomSlice.actions;

export default BottomSlice.reducer;
