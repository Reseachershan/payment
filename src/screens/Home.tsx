import { StyleSheet, TouchableOpacity, View, Platform } from "react-native"
import { Text, CustomView, TextInput, GradientButton } from '../components';
import { HomeHeader } from '../components/HomeHeader';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { MAIN_TEXT, WHITE } from '../assets/colors';
import { Image } from 'react-native';
import { images } from '../assets/images';
import { SendMoney, Receive, Circle } from '../assets/svgs';
import { ScrollView } from 'react-native-gesture-handler';
import { TransactionComponent } from "../components/TransactionComponent";
import { WalletComponent } from "../components/WalletCompnent";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import QRCode from "react-native-qrcode-svg";
import { useState } from "react";
import Snackbar from "react-native-snackbar";

export const Home = () => {
  const [amount, setAmount] = useState<string>('')
  const [isQrCode, setIsQrCode] = useState<Boolean>(false)
  const navigation: StackNavigationProp<ParamListBase> = useNavigation()
  const { user } = useSelector((state: any) => state.auth)
  console.log('user', user);

  const arr = [
    { text: 'Send Money', icon: <SendMoney />, onPress: () => { } },
    { text: 'Currency Converter', icon: <Receive />, onPress: () => { navigation.navigate('ExchangeRate') } },
    { text: 'Deposit Money', icon: '', onPress: () => { navigation.navigate('Payment') } },
  ]

  let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
  const data = {
    userid: user?.id,
    username: user?.name,
    amount: amount,
    accountNumber: user?.sourceAccount,
  };

  const qrCodeValue = JSON.stringify(data);

  const handleGenerateQrCode = () => {
    if (!amount) {
      Snackbar.show({
        text: `❗️ Enter Amount to create QRCode`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: '#fff'
      });
    } else if (Number(amount) <= 0 || isNaN(Number(amount))) {
      Snackbar.show({
        text: `❗️ Enter Amount must be greater then zero`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: '#fff'
      });
    }
    else {
      setIsQrCode(true)
    }
  }

  return (
    <ScrollView bounces={false}>
      <HomeHeader title={""} onPressLeftIcon={() => navigation.navigate('Profile')} hasBack={false} showImage={true} />
      <CustomView>
        <WalletComponent />
        {
          user.userRole === 'BUSINESS' &&
          <View style={{ marginTop: Platform.OS == 'ios' ? heightPercentageToDP(15) : heightPercentageToDP(10), justifyContent: 'center', alignItems: 'center' }}>
            {!isQrCode ? <View style={{ width: widthPercentageToDP('65%'), alignSelf: 'center' }}>
              <Text variant='heading' style={{ fontSize: 18, color: MAIN_TEXT }}>Receive a Payment</Text>
              <TextInput keyboardType="number-pad" title="Enter Amount" onChangeText={(text) => setAmount(text)} value={amount} />
              <GradientButton onPress={() => handleGenerateQrCode()} text="Generate QR Code" style={{ width: widthPercentageToDP('50%'), alignSelf: 'center', marginTop: 20 }} />
            </View> :

              <View style={{ gap: 10, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                {user?.name && <QRCode
                  value={qrCodeValue}
                  logo={{ uri: base64Logo }}
                  logoSize={50}
                  logoBackgroundColor='transparent'
                />
                }
                <GradientButton onPress={() => { setIsQrCode(false); setAmount('') }} text="Re Generate QR Code" style={{ width: widthPercentageToDP('50%'), alignSelf: 'center', marginTop: 20 }} />
              </View>
            }
          </View>
        }

        {user.userRole !== 'BUSINESS' && <View style={styles.quickAction}>
          <Text variant='heading' style={{ fontSize: 14, color: MAIN_TEXT, marginTop: Platform.OS == 'ios' ? heightPercentageToDP(15) : heightPercentageToDP(10) }}>Quick Actions</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {arr.map((item: any, index: number) => {
              return (
                <TouchableOpacity key={index} style={styles.actions} onPress={item?.onPress}>
                  <View style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* @ts-ignore */}
                    <Circle />
                    <View style={{ position: 'absolute', alignSelf: 'center' }}>
                      {item.icon ? item.icon : <Image source={images.deposite} style={{ height: 22, width: 22, }} />
                      }
                    </View>
                  </View>
                  <Text variant='subheading' style={{ fontSize: 10, color: MAIN_TEXT, marginTop: 10 }}>{item.text}</Text>
                </TouchableOpacity>
              )
            })
            }
          </View>
        </View>}
        {user.userRole !== 'BUSINESS' &&
          <View style={styles.Transactions}>
            <TransactionComponent title={"Transactions"} isSearchBar={false} />
          </View>
        }
      </CustomView>
    </ScrollView>
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
    width: 129,
  },
  textStyle: {
    color: '#A933DF'
  },
  quickAction: {
    width: widthPercentageToDP('82.5%'),
    // marginTop: 85,
  },
  actions: {
    marginTop: 20,
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
  },
  transactionSend: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  btnDefault: {
  },
})
