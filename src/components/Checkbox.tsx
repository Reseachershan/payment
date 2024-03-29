import React from 'react';
import CheckBox, { CheckBoxProps } from '@react-native-community/checkbox';
import { Platform, TextStyle, View } from 'react-native';
import { BORDER, MAIN_TEXT, PURPLE, WHITE } from '../assets/colors';
import { Text } from './Text';

interface CustomCheckboxProps extends CheckBoxProps {
  title?: string;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const Checkbox = ({ title = '', textStyle = {}, disabled = false, ...props }: CustomCheckboxProps): JSX.Element => {

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <CheckBox
        style={{ height: 17, width: 25, marginRight: Platform.OS === 'ios' ? 0 : 6, }}
        onFillColor={WHITE}
        onCheckColor={PURPLE}
        onTintColor={PURPLE}
        tintColor={!disabled ? BORDER : '#4F54541A'}
        disabled={disabled}
        boxType={'square'}
        tintColors={{ true: PURPLE, false: !disabled ? BORDER : '#4F54541A' }} //For Android
        {...props}
      />
      <Text style={{ color: MAIN_TEXT, fontSize: 12, marginLeft: 8, ...textStyle }}>{title}</Text>
    </View>
  )
}

