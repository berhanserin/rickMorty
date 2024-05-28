import React from 'react';

import {
  // eslint-disable-next-line no-restricted-imports
  Text as RNText,
  StyleProp,
  TextProps as TextProperties,
  TextStyle,
} from 'react-native';

import { FONT, FONT_SIZE } from '../Textstyle';
import { useTheme } from '@react-navigation/native';

const BASE_TEXT: TextStyle = {
  fontSize: 12,
};

export const presets = {
  default: BASE_TEXT,
  font400: {
    ...BASE_TEXT,
    ...FONT(400),
  } as TextStyle,
  h1: {
    ...FONT_SIZE(40),
    ...FONT(800),
  } as TextStyle,
  bottomTitle: {
    ...FONT_SIZE(24),
    ...FONT(800),
  } as TextStyle,
  title: {
    ...FONT_SIZE(20),
    ...FONT(800),
  } as TextStyle,
  h2: {
    ...FONT_SIZE(12),
    ...FONT(600),
  } as TextStyle,
  h3: {
    ...FONT_SIZE(10),
    ...FONT(600),
  } as TextStyle,
};

export type TextPresets = keyof typeof presets;

export interface TextProps extends TextProperties {
  style?: StyleProp<TextStyle>;
  type?: TextPresets;
  color?: string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Text = ({ children, ...props }: TextProps) => {
  const {
    color,
    type = 'default',
    style: styleOverride,
    textAlign = 'auto',
    ...rest
  } = props;

  const { colors } = useTheme();

  return (
    <RNText
      {...rest}
      style={[
        presets[type] as TextProps,
        { textAlign: textAlign, color: colors.text },
        styleOverride,
      ]}>
      {children}
    </RNText>
  );
};
