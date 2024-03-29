import React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { BLUE, DARK_BLUE, LIGHT_GREEN, LIGHT_GREY_III, MAIN_TEXT } from '../assets/colors';
import { Text, Header, GradientButton, CustomView, Button } from '../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { ParamListBase, useNavigation } from '@react-navigation/core';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackNavigationProp } from '@react-navigation/stack';
import { Bank, Coinbase, PayPal } from '../assets/svgs';

export const ConnectAccounts = (): JSX.Element => {
  const navigation: StackNavigationProp<ParamListBase> = useNavigation()

  const accountOptions = [
    { icon: <Bank />, color: LIGHT_GREEN, title: 'Deposit funds via ACH', description: 'No fees.  Funds available within 2-5 days.', },
    { icon: <PayPal />, color: DARK_BLUE, title: 'Deposit funds via PayPal', description: 'Debit or credit.  Instant deposit with fees.', },
    { icon: <Coinbase />, color: BLUE, title: 'Deposit funds via Coinbase', description: 'We accept Bitcoin, Ethereum, and Stellar.', },
  ]

  return (
    <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false} enableOnAndroid={true}>
      <Header title='Deposit Money' />
      <CustomView title='Let’s get your funding sources set up'>
        <View style={{ marginTop: hp('2.6%') }}>
          {accountOptions.map((option, i) => (
            <TouchableOpacity key={i} style={styles.accountRow}>
              <Button activeOpacity={1} icon={option?.icon} style={{...styles.socialBtn, backgroundColor: option.color,}} />
              <View style={{ marginLeft: wp('5.1%'), }}>
                <Text style={{ fontSize: 16, color: MAIN_TEXT, textAlign: 'justify' }}>{option?.title}</Text>
                <Text style={{ textAlign: 'justify' }}>{option?.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.noteText}>
          You can also do this later and simply click continue
        </Text>
        <GradientButton onPress={() => navigation.navigate('SignUp')} style={styles.submitButton} text='Continue' />
      </CustomView>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  submitButton: {
    marginTop: hp('2.1%'),
    width: wp('65%'),
    alignSelf: 'center',
  },
  noteText: {
    color: MAIN_TEXT,
    textAlign: 'center',
    marginTop: hp('4%'),
    width: wp('60%'),
    alignSelf: 'center',
  },
  socialBtn: {
    height: 40,
    width: 40,
  },
  accountRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical: hp('2.37%'), 
    borderBottomColor: LIGHT_GREY_III,
    borderBottomWidth: 1
  }
})