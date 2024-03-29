import React, { useEffect } from 'react';
import { Image, StyleSheet } from "react-native"
import { GradientView } from '../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { ParamListBase, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { images } from '../assets/images';

export const Splash = () => {
  const navigation: StackNavigationProp<ParamListBase> = useNavigation()
  useEffect(() => {
    setTimeout(() => navigation.replace('OnBoarding1'), 2000)
  }, [])
  return (
    <GradientView style={styles.container} >
      <Image source={images.Logo} style={styles.headerLogo} />
    </GradientView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogo: {
    height: hp('20%'),
    width: wp('30%'),
    resizeMode: 'contain',
  },
})