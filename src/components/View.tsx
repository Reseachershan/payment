import React from 'react';
import { StyleSheet, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { GRADIENT_I, GRADIENT_II, LIGHT_GREY } from '../assets/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { GradientText } from './Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface GradientViewProps {
  colors?: string[];
  style?: {};
  children: any
}

interface CustomViewProps extends ViewProps {
  style?: {};
  title?: string;
  children: any
}

export const GradientView = ({ colors=[GRADIENT_I, GRADIENT_II], style = {}, children, ...props }: GradientViewProps) => {
  return (
    <LinearGradient
      style={[styles.viewGradient, style]}
      colors={colors}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};

export const CustomView = ({ style = {}, title='', children, ...props }: CustomViewProps) => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  return (
    <View style={[styles.customView, { paddingBottom: bottomInset + 100 }, style]} {...props} >
      <GradientText variant="heading" style={styles.customViewTitle}>{title}</GradientText>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  viewGradient: {
    height: hp('22%'),
    width: wp('100%'),
  },
  customView: {
    flex: 1,
    marginTop: -hp('4.5%'), 
    borderTopLeftRadius: 34, 
    borderTopRightRadius: 34, 
    backgroundColor: LIGHT_GREY, 
    paddingHorizontal: wp('9%'), 
    minHeight: hp('78%'),
  },
  customViewTitle: {
    fontSize: 20, 
    textAlign: 'center', 
    marginTop: hp('3.3%'),
    width: wp('60%'),
    alignSelf: 'center',
    flexGrow: 1,
  }
});