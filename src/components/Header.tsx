import { ParamListBase, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StatusBar, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { GRADIENT_I, TRANSPARENT, WHITE } from '../assets/colors';
import { images } from '../assets/images';
import { LeftArrow } from '../assets/svgs';
import { logout } from '../store/slices/auth';
import { Button } from './Button';
import { Text } from './Text';
import { GradientView } from './View';

interface HeaderProps extends ViewProps {
  leftIcon?: SVGSVGElement;
  rightIcon?: SVGSVGElement;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  hasBack?: boolean;
  title?: string;
  style?: ViewStyle;
  notShowImage?: boolean 
  logOut?: boolean,
  EditButton? : boolean
}

export const Header = ({ leftIcon, notShowImage, onPressLeftIcon = () => { }, rightIcon, onPressRightIcon = () => { }, logOut , title, style = {}, hasBack = true, EditButton, ...props }: HeaderProps) => {
  const { top: topInset } = useSafeAreaInsets();
  const navigation: StackNavigationProp<ParamListBase> = useNavigation()
  const dispatch = useDispatch()

  return (
    <GradientView style={{ height: hp('30%'), width: wp('100%'), paddingTop: (StatusBar.currentHeight || 0) + topInset, ...style }} {...props}>
      <View style={styles.headerRow}>
        <View>
          {leftIcon ?
            <Button style={styles.icon} onPress={onPressLeftIcon} icon={leftIcon} />
            : hasBack && <Button style={styles.icon} onPress={() => {logOut ? dispatch(logout()) : navigation.goBack() }} icon={<LeftArrow />} />
          }
        </View>
        <View>{title && <Text variant='heading' style={{fontSize: 20, color: WHITE}}>{title}</Text>}</View>
        <View>{rightIcon && <Button style={styles.icon} onPress={onPressRightIcon} icon={rightIcon} />}</View>
        {EditButton && <Button onPress={() => navigation.navigate("EditProfile", {profile: true})} style={styles.addButton} textStyle={{ color: GRADIENT_I }} text='Edit' />}
      </View>
       {!notShowImage && <Image source={images.Logo} style={{...styles.headerLogo, height: title ? hp('4.6%'): hp('5.8%'), width: title ? wp('21.8%') : wp('16.67%'),}} /> }

    </GradientView>
  );
};

const styles = StyleSheet.create({
  headerLogo: {
    marginTop: hp('1%'),
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  headerRow: {
    height: 48,
    paddingHorizontal: wp('8.7%'),
    marginTop: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    backgroundColor: TRANSPARENT
  },
  addButton: {
    width: 66,
    height: 44,
    position:'absolute',
    backgroundColor:WHITE,
    right: 30
  },
});