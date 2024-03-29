import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomView, GradientButton, Header, Text } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { WalletComponent } from '../components/WalletCompnent';
import { BODY_TEXT, BORDER, GRADIENT_I, GREEN, LIGHT_GREY, MAIN_TEXT, WHITE } from '../assets/colors';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { WINDOW_WIDTH } from '../assets/dimensions';
import { POPPINS_REGULAR } from '../assets/fonts';
import { FundsComponent } from '../components/FundsComponent';

export const Payment = () => {

  return (
    <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false} enableOnAndroid={true}>
      <ScrollView>
        <Header title="Funding" notShowImage={true} hasBack={true} />
        <CustomView>
          <WalletComponent manage={true} />
          <View style={{ marginTop: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: widthPercentageToDP('82.5%'), }}>
            <Text variant='heading' style={{ fontSize: 12, color: MAIN_TEXT }}>AML / KYC Verification</Text>
            <TouchableOpacity style={{ paddingVertical: 3, paddingHorizontal: 14, backgroundColor: GREEN, borderRadius: 12 }}>
              <Text variant='heading' style={{ fontSize: 9, color: WHITE }}>Verified</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: widthPercentageToDP('82.5%'), marginTop: 16 }}>
            <Text variant='heading' style={{ fontSize: 12, color: MAIN_TEXT }}>Daily Deposit Limit:</Text>
            <Text variant='heading' style={{ fontSize: 14, color: BODY_TEXT, paddingRight:12 }}>$1000</Text>
          </View>
          <FundsComponent isSearchBar={false} />
          <View style={styles.buttonContainer}>
            {/* <GradientButton style={styles.button} text="Continue" /> */}
          </View>
        </CustomView>
      </ScrollView>
    </KeyboardAwareScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    padding: 5,
    marginTop: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balance: {
    width: widthPercentageToDP('82.5%'),
    position: 'absolute',
    alignSelf: 'center',
    marginTop: -60,
    borderRadius: 12,
    padding: 15,
    height: 180
  },
  headerLogo: {
    resizeMode: 'contain',
  },
  yourBalance: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  MemberId: {
    marginTop: heightPercentageToDP("5%"),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 254
  },
  textStyle: {
    color: '#A933DF'
  },
  search: {
    width: widthPercentageToDP('82.5%'),
    marginTop: 40,
  },
  actions: {
    marginTop: 85,
    flex: 1,
    height: 110,
    padding: 5,
    backgroundColor: WHITE,
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTransactionDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  Transactions: {
    width: widthPercentageToDP('82.5%'),
    marginTop: 30,
  },
  transactionSend: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  btnDefault: {
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },
  modalTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginTop: 10
  },
  modal: {
    backgroundColor: LIGHT_GREY,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
    width: widthPercentageToDP('82.5%'),
    elevation: 3,
  },
  star: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15
  },
  history: {
    marginTop: 23,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WINDOW_WIDTH - 130,
    marginHorizontal: 35
  },
  textInput: {
    borderRadius: 12,
    backgroundColor: WHITE,
    borderColor: BORDER,
    borderWidth: 1,
    fontFamily: POPPINS_REGULAR,
    fontSize: 14,
    color: MAIN_TEXT,
    minHeight: 200,
    paddingLeft: 10,
    paddingRight: 10
  },
  typerFilter: {
    paddingLeft: 20,
    paddingRight: 20,
    width: widthPercentageToDP('82.5%'),
    marginTop: 0
  },
  addButton: {
    width: widthPercentageToDP('33%'),
    borderColor: GRADIENT_I,
    borderWidth: 1,
  },
})