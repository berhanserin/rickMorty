import { configureStore } from '@reduxjs/toolkit';
import bottomReducer from './reducers/bottomReducer';
import favReducer from './reducers/favReducer';

import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    bottom: bottomReducer,
    fav: favReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
