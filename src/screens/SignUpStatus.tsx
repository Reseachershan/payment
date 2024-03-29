import React from 'react';
import { StyleSheet, View } from "react-native"
import { MAIN_TEXT } from '../assets/colors';
import { Text, Header, GradientButton, CustomView } from '../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { ParamListBase, useNavigation } from '@react-navigation/core';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RightArrowMini } from '../assets/svgs';
import { StackNavigationProp } from '@react-navigation/stack';

export const SignUpStatus = (): JSX.Element => {
  const navigation: StackNavigationProp<ParamListBase> = useNavigation()

  const characteristics = [
    'JetSet is a groundbreaking app built for international travelers.',
    'Our goal is to help you save on all of your international purchases.',
    'To get started, we’ll need some information about you.'
  ]

  return (
    <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false} enableOnAndroid={true}>
      <Header />
      <CustomView title='SignUp'>
        <View style={{ marginTop: hp('2.6%') }}>
          {characteristics.map((characteristic, i) => (
            <View key={i} style={{ flexDirection: 'row', marginTop: hp('2.25%') }}>
              <View style={{ marginTop: 5 }}>
                <RightArrowMini />
              </View>
              <Text style={{ marginLeft: 8, fontSize: 16, textAlign: 'justify' }}>{characteristic}</Text>
            </View>
          ))}
        </View>
        <GradientButton onPress={() => navigation.navigate('SignUp', {type: 'traveler'})} style={styles.submitButton} text='I am a traveler' />
        <GradientButton onPress={() => navigation.navigate('SignUp', {type: 'business'})} style={styles.submitButton} text='I am a business' />
        <Text style={styles.footerText}>
          Don’t worry - all of your information is securely stored and never sold.
        </Text>
      </CustomView>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  submitButton: {
    marginTop: hp('3.8%'),
    width: wp('65%'),
    alignSelf: 'center',
  },
  footerText: {
    color: MAIN_TEXT,
    textAlign: 'center',
    marginTop: hp('7.3%'),
    width: wp('60%'),
    alignSelf: 'center',
  }
})