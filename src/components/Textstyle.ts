import { TextStyle } from 'react-native';

export const FONT = (num: number) => {
  return {
    fontWeight: num.toString(),
  } as TextStyle;
};

export const FONT_SIZE = (num: number) => {
  return {
    fontSize: num,
  } as TextStyle;
};
