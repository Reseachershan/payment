import React, { useEffect, useState } from 'react';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, TextInput as DefaultTextInput, TextInputProps, TextStyle, TouchableWithoutFeedback, View } from 'react-native';
import { BODY_TEXT, BORDER, MAIN_TEXT, WHITE } from '../assets/colors';
import { POPPINS_REGULAR, POPPINS_SEMIBOLD } from '../assets/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { Text } from './Text';
import { EyeOff, EyeOn } from '../assets/svgs';

interface CustomTextInputProps extends TextInputProps {
  title?: string;
  leftIconstyle?: {};
  rightIconstyle?: {};
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  onPressRightIcon?: () => void;
  showError?: boolean;
  errorMessage?: string;
  errorMessageStyle?: TextStyle;
}

export const TextInput = ({
  style = {},
  placeholderTextColor = BODY_TEXT,
  title='',
  leftIcon,
  rightIcon,
  onPressRightIcon,
  showError,
  errorMessage,
  errorMessageStyle = {},
  leftIconstyle = {},
  rightIconstyle = {},
  secureTextEntry = false,
  ...props
}: CustomTextInputProps): JSX.Element => {

  const [passwordShown, setPasswordShown] = useState(false)

  return (
    <View style={styles.inputContainer}>
      <Text variant='heading' style={{fontWeight: '600', fontFamily: POPPINS_SEMIBOLD}}>{title}</Text>
      <View style={styles.inputView}>
        {leftIcon && (
          <TouchableOpacity style={[styles.icon, styles.leftIcon, leftIconstyle]} onPress={() => setPasswordShown(!passwordShown)}>
            {passwordShown ? <EyeOff /> : <EyeOn />}
          </TouchableOpacity>
        )}
        <DefaultTextInput
          style={[styles.textInput, { paddingLeft: leftIcon ? wp('10.25%') : wp('3.8%'), paddingRight: (rightIcon || secureTextEntry) ? wp('10.25%') : wp('3.8%') }, style]}
          secureTextEntry={secureTextEntry && !passwordShown}
          placeholderTextColor={placeholderTextColor}
          {...props}
        />
        {secureTextEntry &&
          <TouchableOpacity style={[styles.icon, styles.rightIcon, rightIconstyle]} onPress={() => setPasswordShown(!passwordShown)}>
            {passwordShown ? <EyeOff /> : <EyeOn />}
          </TouchableOpacity>
        }
        {rightIcon &&
          <TouchableOpacity style={[styles.icon, styles.rightIcon, rightIconstyle]} onPress={() => setPasswordShown(!passwordShown)}>
            {passwordShown ? <EyeOff /> : <EyeOn />}
          </TouchableOpacity>
        }
        {showError && <Text style={{ ...styles.errorMessage, ...errorMessageStyle }}>{errorMessage}</Text>}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  inputContainer: {
    marginTop: hp('3%')
  },
  inputView: {
    marginTop: 4,
  },
  textInput: {
    height: 45,
    borderRadius: 12,
    backgroundColor: WHITE,
    borderColor: BORDER,
    borderWidth: 1,
    fontFamily: POPPINS_REGULAR,
    fontSize: 14,
    color: MAIN_TEXT,
  },
  icon: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
    top: 10,
  },
  leftIcon: {
    left: 15,
  },
  rightIcon: {
    right: 15,
  },
  errorMessage: {
    color: 'red',
    marginTop: 5,
    marginLeft: 10,
  }
});