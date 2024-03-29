import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native';
import { CustomView, GradientButton, Header } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BORDER, GRADIENT_I, LIGHT_GREY, MAIN_TEXT, WHITE } from '../assets/colors';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { WINDOW_WIDTH } from '../assets/dimensions';
import { POPPINS_REGULAR } from '../assets/fonts';
import { SelectBankAccount } from '../components/SelectBankAccount';
import { PlaidLink } from '../components/PlaidLink';
import { useGetAccountsQuery, useTransferFundsMutation } from '../store/services/api';
import Snackbar from 'react-native-snackbar';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
interface Account {
  accessToken: string;
  accountId: string;
  id: number;
  mask: string;
  name: string;
  userId: number;
}
export const DepositACHMoney = () => {
  const navigation: StackNavigationProp<ParamListBase> = useNavigation()
  const [amount, setAmount] = useState('')
  const [bankAccountdetail, setBankAccountDetail] = useState<Account>()
  const { data: Banks, isLoading: isBankLoading } = useGetAccountsQuery()
  
  const deposit = () => {
    if (!bankAccountdetail || !bankAccountdetail?.id) return Snackbar.show({
      text: `❗️ Select a Bank`,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: 'red',
      textColor: '#fff'
    });
    if (!amount) return Snackbar.show({
      text: `❗️ Enter Amount`,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: 'red',
      textColor: '#fff'
    });
    navigation.navigate('DepositMoneyDetail', { bankAccountdetail: bankAccountdetail, amount: amount })
	}

  return (
    <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false} enableOnAndroid={true}>
      <ScrollView>
        <Header title="Deposit Money" notShowImage={false} hasBack={true} />
        <CustomView>

          {
            isBankLoading && <ActivityIndicator animating={true} color={'#000'} size="large" />
          }
          <SelectBankAccount setBankAccountDetail={(value: any) => setBankAccountDetail(value)} isSearchBar={true} amount={amount} setAmount={(value: string) => setAmount(value)}/>
          <View style={styles.buttonContainer}>
            <PlaidLink />
            {
              Boolean(Banks?.length) && <GradientButton style={styles.button} text="Continue" onPress={deposit}  />
            }
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
    marginTop: 47,
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
    flexDirection: 'column',
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
