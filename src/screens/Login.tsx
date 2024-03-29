import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { useDispatch } from 'react-redux';
import { ParamListBase, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Snackbar from 'react-native-snackbar';

import { SocialAuth } from '../components/SocialAuth';
import { useLogInMutation } from '../store/services/api';
import { loggedIn } from '../store/slices/auth';
import { GRADIENT_II, MAIN_TEXT } from '../assets/colors';
import { Text, Header, TextInput, GradientButton, Checkbox, CustomView } from '../components';

export const Login = (): JSX.Element => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()
  const navigation: StackNavigationProp<ParamListBase> = useNavigation()
  const [loginUser, {isLoading: isLoginLoading, isError}] = useLogInMutation();

  const validateErrors = (email: string, password: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email && !password) return `Can't be empty`
    else if (!email) return `Email Can't be empty`
    else if (!emailRegex.test(email)) return `Enter a vaild email`
    else if (!password) return `Password Can't be empty`
  };

  const handleLogin = () => {
    const validate = validateErrors(email.trim().toLowerCase(), password)
    if (validate) {
      return Snackbar.show({
        text: `❗️ ${validate}`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: '#fff'
      });
    }
    loginUser({ email: email.trim().toLowerCase(), password }).then((res: any) => {
      onSuccessfullLogin(res);
    }).catch((err: any) => {
      console.log('err', err);
      checkIfError(err?.error || err?.data || err)
    })
  }

  const checkIfError = (error: any) => {
    if (typeof error.error === 'string' || typeof error === 'string') {
      return Snackbar.show({
        text: `❗️ ${error?.error || error}`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: '#fff'
      });
    } else if (typeof error?.errors[0].msg === 'string') {
      return Snackbar.show({
        text: `❗️ ${error.errors[0].msg}`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: '#fff'
      });
    } else {
      return Snackbar.show({
        text: `❗️ ${JSON.stringify(error)}`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: '#fff'
      });
    }
  }

  const onSuccessfullLogin = (res: any) => {
    if (res && res.data) {
      dispatch(loggedIn({ token: res.data?.accessToken, user: res.data?.user }))
      Snackbar.show({
        text: `✅ You are logged in successfuly`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#D6CDFE',
        textColor: '#fff'
      });
    } else if (res && res?.error) {
      checkIfError(res?.error?.error || res?.error?.data )
    }
  }

  return (
    <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false} enableOnAndroid={true}>
      <Header hasBack={false} />
      <CustomView title='Login'>
        <TextInput title='Email' value={email} onChangeText={(text) => setEmail(text)} />
        <TextInput title='Password' value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
        <View style={styles.midRow}>
          <Checkbox title='Remember Me' value={rememberMe} onValueChange={(value: boolean | ((prevState: boolean) => boolean)) => setRememberMe(value)} />
          <TouchableOpacity>
            <Text style={{ color: MAIN_TEXT }}>Forget Password?</Text>
          </TouchableOpacity>
        </View>
        <GradientButton isLoading={isLoginLoading} onPress={handleLogin} style={styles.submitButton} text='Login' />
        <SocialAuth onSuccess={onSuccessfullLogin} />
        <Text style={styles.footerText}>
          Don’t Have An Account?
          <Text onPress={() => navigation.navigate('SignUpStatus')} style={{ color: GRADIENT_II, }}> Sign Up</Text>
        </Text>
      </CustomView>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  midRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('3%')
  },
  submitButton: {
    marginTop: hp('3.8%'),
    width: wp('65%'),
    alignSelf: 'center',
  },
  footerText: {
    color: MAIN_TEXT,
    textAlign: 'center',
    marginTop: hp('7.3%'),
  }
})