import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  size: 0,
  type: 0,
  title: '',
  episodeId: 0,
};
export const BottomSlice = createSlice({
  name: 'bottom',
  initialState,
  reducers: {
    changeBottom: (
      state,
      action: {
        payload: {
          show: boolean;
          title: string;
          size: number;
          type: number;
          episodeId?: number;
        };
      }
    ) => {
      const { show, title, size, type, episodeId } = action.payload;
      state.show = show;
      state.title = title;
      state.size = size;
      state.type = type;
      state.episodeId = episodeId ?? 0;
    },
  },
});

export const { changeBottom } = BottomSlice.actions;

export default BottomSlice.reducer;
