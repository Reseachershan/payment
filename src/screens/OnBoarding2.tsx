import React from 'react';
import { StyleSheet, View } from "react-native"
import { GRADIENT_I, LIGHT_GREY } from '../assets/colors';
import { LogoDetailed } from '../assets/svgs';
import { Button, GradientButton, Text } from '../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { ParamListBase, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { setIsNew } from '../store/slices/auth';

export const OnBoarding2 = () => {
  const navigation: StackNavigationProp<ParamListBase> = useNavigation()
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <LogoDetailed />
      <Text style={{ width: wp('60%'), textAlign: 'center', marginTop: hp('18.6%') }}>If you’re a returning user, click “Login” {'\n'} If you’re a new user, click “Sign Up”</Text>
      <View style={{ flexDirection: 'row', marginTop: hp('23.5%'), }}>
        <Button onPress={() => {dispatch(setIsNew(false)); navigation.navigate('SignUpStatus')}} style={styles.signupButton} textStyle={{ color: GRADIENT_I }} text='SignUp' />
        <GradientButton onPress={() => { dispatch(setIsNew(false)); navigation.replace('Login')}} style={{ width: wp('33%'), marginLeft: wp('6%'), }} text='Login' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_GREY
  }, 
  signupButton: {
    width: wp('33%'),
    borderColor: GRADIENT_I,
    borderWidth: 1,
  },
})