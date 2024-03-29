import React, { useState } from 'react';
import { ImageSourcePropType, StyleSheet, TouchableOpacity, TextInput as DefaultTextInput, TextInputProps, TextStyle, View } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen"

import { Text } from './Text';
import { Filter, Search } from '../assets/svgs';
import { BODY_TEXT, BORDER, MAIN_TEXT, WHITE } from '../assets/colors';
import { POPPINS_REGULAR, POPPINS_SEMIBOLD } from '../assets/fonts';
import { Platform } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
    title?: string;
    leftIconstyle?: {};
    rightIconstyle?: {};
    leftIcon?: ImageSourcePropType | boolean;
    rightIcon?: ImageSourcePropType | boolean;
    onPressRightIcon?: () => void;
    showError?: boolean;
    errorMessage?: string;
    errorMessageStyle?: TextStyle;
    setIsFilterModal: () => void
    top?: boolean
    isDepositMoney?: boolean
}

export const SearchInput = ({
    style = {},
    placeholderTextColor = BODY_TEXT,
    title = '',
    leftIcon,
    rightIcon,
    onPressRightIcon,
    showError,
    errorMessage,
    errorMessageStyle = {},
    leftIconstyle = {},
    rightIconstyle = {},
    secureTextEntry = false,
    setIsFilterModal,
    top,
    isDepositMoney,
    ...props
}: CustomTextInputProps): JSX.Element => {

    const [passwordShown, setPasswordShown] = useState(false)

    return (
        <View style={top ? null : styles.inputContainer}>
            <Text variant='heading' style={{ fontWeight: '600', fontFamily: POPPINS_SEMIBOLD }}>{title}</Text>
            <View style={{ marginTop: Platform.OS === 'ios' ? 20 : 0 }}>
            {!isDepositMoney && <TouchableOpacity style={[styles.icon, styles.leftIcon, leftIconstyle]} onPress={() => setPasswordShown(!passwordShown)}>
                    <Search />
                </TouchableOpacity>}
                <DefaultTextInput
                    style={[styles.textInput, { paddingLeft: isDepositMoney ?  wp('5.25%') : wp('10.25%'), paddingRight: wp('10.25%') }, style]}
                    secureTextEntry={secureTextEntry && !passwordShown}
                    placeholderTextColor={placeholderTextColor}
                    {...props}
                />
             
              {!isDepositMoney &&  <TouchableOpacity hitSlop={{top:25, bottom:25, right:25, left:25}} style={[styles.icon, styles.rightIcon, rightIconstyle]} onPress={() => setIsFilterModal()}>
                   {/* @ts-ignore */}
                    <Filter />
                </TouchableOpacity>}
                {showError && <Text style={{ ...styles.errorMessage, ...errorMessageStyle }}>{errorMessage}</Text>}
            </View>
        </View>
    );
};

export const styles = StyleSheet.create({
    inputContainer: {
        marginTop: hp('3%')
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