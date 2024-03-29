import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View, Image, BackHandler } from "react-native"
import { Button, CustomView, GradientButton, GradientText, Header, Text } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BORDER, GRADIENT_I, LIGHT_GREY, MAIN_TEXT, WHITE } from '../assets/colors';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { WINDOW_WIDTH } from '../assets/dimensions';
import { POPPINS_REGULAR } from '../assets/fonts';
import { images } from '../assets/images'
import HorizontalLine from '../components/HorizontalLine';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { useTransferFundsMutation } from '../store/services/api';
import { StackNavigationProp } from '@react-navigation/stack';

interface Account {
    accessToken: string;
    accountId: string;
    id: number;
    mask: string;
    name: string;
    userId: number;
}
interface Route {
    key: string
    name: string
    params: {
        amount: string
        bankAccountdetail: Account
    }

}

export const DepositMoneyDetail = () => {
    const navigation: StackNavigationProp<ParamListBase> = useNavigation()
    const route: Route = useRoute()
    const data = route.params;
    const [transferFunds, { isLoading: isFundsLoading }] = useTransferFundsMutation()

    const handleBackButton = () => {
        return true;
    };

    useEffect(() => {
        const back = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => back.remove()
    }, []);

    console.log('data', data.bankAccountdetail);
    if (!data) {
        return <Text>No data found</Text>
    }

    const Deposit = () => {
        transferFunds({ bankAccountId: data?.bankAccountdetail?.id, amount: Number(data.amount).toFixed(2) }).unwrap().then((res) => {
            navigation.navigate('DepositSuccess', { res: res })
        }).catch((error) => {
            navigation.navigate('DepositError')
        })
    }

    if (isFundsLoading) {
        return <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false} enableOnAndroid={true}>
            <ScrollView>
                <Header notShowImage={false} hasBack={false} />
                <CustomView>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <GradientText style={{ fontSize: 18 }}>Processing</GradientText>
                        <Image style={{ marginVertical: 20 }} source={images.processing} resizeMode='cover' />
                        <GradientText style={{ fontSize: 12 }}>It May Take a Few Seconds</GradientText>
                    </View>
                </CustomView>
            </ScrollView>
        </KeyboardAwareScrollView>
    }

    return (
        <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false} enableOnAndroid={true}>
            <ScrollView>
                <Header title="Deposit Money" notShowImage={false} hasBack={true} />
                <CustomView>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <GradientText style={{ fontSize: 18, }}>Details</GradientText>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <Image source={images.deposit} resizeMode="cover" />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                        <Text style={{ fontSize: 14, color: '#151515' }}>
                            Your Funds are available in 2-5 working days
                        </Text>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={{ fontSize: 14, color: '#151515' }}>Enter Amount:</Text>
                            <Text>${data?.amount}</Text>
                        </View>
                        <HorizontalLine />
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={{ fontSize: 14, color: '#151515' }}>Account Details:</Text>
                            <Text>{`**** **** **** ${data.bankAccountdetail.mask}`}</Text>
                        </View>
                        <HorizontalLine />
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={{ fontSize: 14, color: '#151515' }}>Transfer Fee:</Text>
                            <Text>$0</Text>
                        </View>
                        <HorizontalLine />
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={{ fontSize: 14, color: '#151515' }}>Funding Source:</Text>
                            <Text>{data.bankAccountdetail.name}</Text>
                        </View>
                        <HorizontalLine />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 40 }}>
                        <Button style={styles.addButton} textStyle={{ color: GRADIENT_I }} onPress={() => navigation.goBack()} text='Dismiss' />
                        <GradientButton style={styles.depositButton} text="Deposit" onPress={() => Deposit()} />
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
    depositButton: {
        width: widthPercentageToDP('33%'),
    },
})
