import React, { useMemo, useState } from 'react';
import { StyleSheet, Text as BaseText, TextProps, TextStyle } from "react-native"
import { BODY_TEXT, GRADIENT_I, GRADIENT_II, MAIN_TEXT } from '../assets/colors';
import { POPPINS_BOLD, POPPINS_LIGHT, POPPINS_MEDIUM, POPPINS_REGULAR, POPPINS_SEMIBOLD } from '../assets/fonts';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const getFontFamilyFromWeight = (fontWeight: string | undefined , variant: string | undefined) => {
  if (fontWeight === '300') {
    return POPPINS_LIGHT;
  } else if (fontWeight === '500') {
    return POPPINS_MEDIUM;
  } else if (fontWeight === 'bold' || fontWeight === '700' || fontWeight === '800' || fontWeight === '900') {
    return POPPINS_BOLD;
  } else if (fontWeight === '600' || variant === 'heading') {
    return POPPINS_SEMIBOLD;
  } else if (fontWeight === 'normal' || fontWeight === '400' || variant === 'default') {
    return POPPINS_REGULAR;
  } else  {
    return POPPINS_REGULAR;
  }
}

interface GradientTextProps extends TextProps {
  colors?: string[];
  style?: TextStyle;
  variant?: 'default' | 'heading' | 'subheading';
  [x: string]: any;
}

interface CustomTextProps extends TextProps {
  colors?: string[];
  style?: TextStyle;
  variant?: 'default' | 'heading' | 'subheading';
  [x: string]: any;
}

export const Text = ({style={}, variant = 'default', ...props}: CustomTextProps) : JSX.Element => {
  const textDefaultStyles = useMemo(() => variant === 'default' ? styles.defaultText : styles.headingText, [variant]);
  const fontFamily = useMemo(() => getFontFamilyFromWeight(style?.fontWeight, variant), [style]);
  
  return (
    <BaseText style={[textDefaultStyles, style, {fontFamily }]} {...props} />
  )
}

export const GradientText = ({ colors = [GRADIENT_I, GRADIENT_II], style={}, variant='default', ...props }: GradientTextProps) : JSX.Element => {
  const textDefaultStyles = useMemo(() => variant === 'default' ? styles.gradientDefaultText : styles.gradientHeadingText, [variant])
  const fontFamily = useMemo(() => getFontFamilyFromWeight(style?.fontWeight, variant), [style]);

  return (
    <MaskedView maskElement={<BaseText {...props} style={[textDefaultStyles, style]} />}>
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <BaseText style={[textDefaultStyles, style, { fontFamily, opacity: 0 }]} {...props} />
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: POPPINS_REGULAR,
    fontSize: 12,
    color: BODY_TEXT,
  },
  headingText: {
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: 16,
    color: MAIN_TEXT,
    fontWeight: '600',
  },
  gradientDefaultText: {
    fontFamily: POPPINS_REGULAR,
    fontSize: 12,
  },
  gradientHeadingText: {
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: 20,
    fontWeight: '600',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },
})