import React, { Children } from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { GRADIENT_I, GRADIENT_II, MAIN_TEXT, WHITE } from '../assets/colors';
import { Text } from './Text';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { POPPINS_MEDIUM } from '../assets/fonts';
import { ActivityIndicator } from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
  text?: string;
  icon?: SVGSVGElement;
  btnStyle?: ViewStyle;
  textStyle?: TextStyle;
  style?: ViewStyle;
  isLoading?: boolean
}

interface GradientButtonProps extends TouchableOpacityProps {
  colors?: string[];
  text?: string;
  btnStyle?: ViewStyle;
  textStyle?: TextStyle;
  style?: ViewStyle;
  isLoading?: boolean
}

export const GradientButton = ({ colors = [GRADIENT_I, GRADIENT_II], text = '', isLoading, style = {}, btnStyle = {}, textStyle = {}, ...props }: GradientButtonProps) => {
  return (
    <TouchableOpacity disabled={isLoading} style={btnStyle} {...props}>
      <LinearGradient style={[styles.btnGradient, style]} colors={colors}>
        {
          isLoading ? <ActivityIndicator animating={true} color={'#fff'} size="small" /> :
            <Text style={{ ...styles.btnGradientTxt, ...textStyle }}>{text}</Text>
        }
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const Button = ({ text, icon, onPress = () => { }, style = {}, textStyle = {},isLoading , children, ...props }: CustomButtonProps) => {

  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnDefault, style]} {...props}>
      {isLoading ? 
      <ActivityIndicator animating={true} size="large" /> 
      : <>
        {text && <Text style={{ ...styles.btnTxt, ...textStyle }}>{text}</Text>}
        {icon}
      </>
      }
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    height: 50,
    width: wp('90%')
  },
  btnDefault: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    height: 50,
    width: wp('90%'),
    backgroundColor: WHITE,
  },
  btnTxt: {
    fontSize: 16,
    color: MAIN_TEXT,
    fontFamily: POPPINS_MEDIUM
  },
  btnGradientTxt: {
    fontSize: 16,
    color: WHITE,
    fontFamily: POPPINS_MEDIUM
  },
});