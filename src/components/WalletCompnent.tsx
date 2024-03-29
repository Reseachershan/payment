import React from 'react'
import { Image, StyleSheet, View } from "react-native"
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { WHITE } from '../assets/colors'
import { POPPINS_MEDIUM } from '../assets/fonts'
import { images } from '../assets/images'
import { useGetStellarTransactionQuery, useGetWalletQuery } from '../store/services/api'
import { Text } from './Text'
import { GradientView } from './View'

interface WalletProps {
    manage?: boolean
    showAddbtn?: boolean
  }

export const WalletComponent = ({ manage, showAddbtn  }: WalletProps) => {
    const { data } = useGetWalletQuery()
    const navigation: StackNavigationProp<ParamListBase> = useNavigation()
    const { data: walletAmount, isLoading, refetch } = useGetStellarTransactionQuery()

    const { user } = useSelector((state: any) => state.auth)

    const handleQuickAdd = () => {
        if (user.userRole !== 'BUSINESS') {
            navigation.navigate('Payment')
        } else {
            navigation.navigate('BusinessTransaction')
        }
    }

      const totalAmount = walletAmount?.transactions?.reduce((accumulator: any, transaction: any) => {
        return accumulator + transaction.amount;
      }, 0);      

      const handleRefetch = () => {
        refetch();
      };

    return (
        <GradientView colors={['#5F1584', '#B797FB']} style={styles.balance}>
            <View style={styles.yourBalance}>
                <View>
                    <View style={{flexDirection:'row', alignItems:"center"}}>
                    <Text variant='subheading' style={{ fontSize: 14, color: WHITE, marginBottom: 0 }}>Your balance</Text>
                    <TouchableOpacity onPress={() => handleRefetch()}><Image source={images.refresh} style={{ ...styles.headerLogo, height: heightPercentageToDP('3%'), width: widthPercentageToDP('6%'), tintColor:WHITE, marginLeft: 8 }} />
                    </TouchableOpacity>
                    </View>
                    <Text variant='heading' style={{ fontSize: 32, color: WHITE, marginTop: -5 }}>{ isLoading ? null : user.userRole !== 'BUSINESS' ? `$${data?.balance?.toFixed(2)}` : `$${totalAmount?.toFixed(2)}`}</Text>
                </View>
                <Image source={images.Logo} style={{ ...styles.headerLogo, height: heightPercentageToDP('4%'), width: widthPercentageToDP('8%'), }} />
            </View>
            <View>
                <View style={styles.MemberId}>
                    <View>
                        <Text variant='subheading' style={{ fontSize: 14, color: WHITE, marginBottom: 0 }}>Member ID:</Text>
                        <Text variant='subheading' style={{ fontSize: 14, color: WHITE }}>{data?.memberId}</Text>
                    </View>
                    {/* <Button style={styles.button} onPress={() => navigation.navigate('Payment')} textStyle={styles.textStyle} text={manage ? "Manage" : "Quick Add"} /> */}
                    {!showAddbtn && <TouchableOpacity style={{...styles.button, ...styles.btnDefault}} onPress={() => handleQuickAdd()} ><Text style={styles.btnTxt}>{manage ? "Manage" : user.userRole !== 'BUSINESS' ? "Quick Add" : "Transactions"}</Text></TouchableOpacity>}
                </View>
            </View>
        </GradientView>
    )
}

const styles = StyleSheet.create({
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
        marginTop: 85,
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
     btnDefault: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 12,
        height: 50,
        backgroundColor: WHITE,
      },
      btnTxt: {
        fontSize: 16,
        fontFamily: POPPINS_MEDIUM,
        color: '#A933DF'
      },
})