import React from 'react';
import { Alert, StyleSheet, View } from "react-native"
import { MAIN_TEXT } from '../assets/colors';
import { Text, Button } from '.';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { useSocialAuthMutation } from '../store/services/api';
import { Apple, Google } from '../assets/svgs';
import { authenticateWithApple, authenticationWithGoogle } from '../modules';
import Snackbar from 'react-native-snackbar';

export const SocialAuth = ({onSuccess = (res: any) => {}}): JSX.Element => {

  const [socialAuth] = useSocialAuthMutation();

  const handleAppleAuth = async () => {
    const credentials = await authenticateWithApple();
    if (!credentials?.code && !credentials?.authorizationCode) return;
    handleSocialLogin('apple', credentials);
  };

  const handleGoogleAuth = async () => {
    const credentials = await authenticationWithGoogle();
    console.log('credentials',credentials);
    handleSocialLogin('google', credentials);
  };

  const handleSocialLogin = async (authProvider: string, credentials: any) => {
    try {
      const response = await socialAuth({credentials, authProvider});
      onSuccess(response);
    } catch (e) {
      console.log(e);
      
      Snackbar.show({
        text: `❗️ Something went wrong`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: '#fff'
      });
    }
  };

  return (
    <View style={styles.socialView}>
      <Text style={{ color: MAIN_TEXT }}>Or Continue with</Text>
      <View style={styles.socialButtons}>
        <Button onPress={handleGoogleAuth} icon={<Google />} style={styles.socialBtn} />
        <Button onPress={handleAppleAuth} icon={<Apple />} style={{ ...styles.socialBtn, marginLeft: 12 }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  socialBtn: {
    height: 40,
    width: 40,
  },
  socialView: {
    alignItems: 'center',
    marginTop: hp('2.3%'),
  },
  socialButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1.5%'),
  },
})