import React from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, View } from "react-native"
import { LIGHT_GREY } from '../assets/colors';
import { OnBoardingBanner_I } from '../assets/svgs';
import { GradientButton, GradientText, Text } from '../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { ParamListBase, useNavigation } from '@react-navigation/core';
import { images } from '../assets/images';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const OnBoarding1 = () => {
  const navigation: StackNavigationProp<ParamListBase> = useNavigation()
  const { top: topInset, bottom: bottomInset } = useSafeAreaInsets();

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        ...styles.container,
        minHeight: (StatusBar?.currentHeight || 0) + hp('100%'),
        paddingTop: (StatusBar?.currentHeight || topInset) + hp('5.3%'),
        paddingBottom: bottomInset + hp('5%'),
      }}
    >
      <Image source={images.LogoGradient} style={{ height: hp('6%'), width: wp('21.8%'), resizeMode: 'contain' }} />
      <View style={{ marginTop: hp('9%') }}>
        <OnBoardingBanner_I />
      </View>
      <GradientText variant='heading' style={{ fontSize: 32, width: wp('62%'), textAlign: 'center', marginTop: hp('8.9%') }}>Blockchain for Travelers</GradientText>
      <Text style={{ width: wp('62%'), textAlign: 'center', marginTop: hp('5.7%') }}>JetSet is a next generation travel payment app that helps you save money when paying for things while traveling internationally.</Text>
      <GradientButton onPress={() => navigation.replace('OnBoarding2')} style={{ marginTop: hp('8.8%'), width: wp('65%') }} text='Get Started' />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: LIGHT_GREY,
  }
})