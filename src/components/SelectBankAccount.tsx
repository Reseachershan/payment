import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ActivityIndicator, TextInput } from "react-native"
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useGetAccountsQuery, useGetTransactionQuery } from '../store/services/api';
import { BODY_TEXT, BORDER, GRADIENT_I, LIGHT_GREY, MAIN_TEXT, RED, WHITE } from '../assets/colors';
import { POPPINS_REGULAR } from '../assets/fonts';
import { Text, GradientText } from '../components';
import HorizontalLine from './HorizontalLine';
import { images } from '../assets/images';

interface SelectBankAccountProps {
    title?: string;
    isSearchBar: boolean;
    setAmount: (value: string) => void;
    amount: string;
    setBankAccountDetail: (value: any) => void;
  }

  export const SelectBankAccount = ({ setAmount, amount, setBankAccountDetail }: SelectBankAccountProps) => {
    const [isChecked, setIsChecked] = useState()
    const { data, isLoading } = useGetTransactionQuery()
    const { data: Banks, isLoading: isBankLoading } = useGetAccountsQuery()
    if (isLoading || isBankLoading) {
        return (
            <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color='black' animating={isLoading} size="large" />
            </View>
        )
    }

    return (
        <>
            <View style={styles.Transactions}>
                {Boolean(Banks?.length) ? <View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <GradientText style={{ fontSize: 18, }}>Select Bank Account</GradientText>
                    </View>
                    <Text variant='heading' style={{ marginTop: 20, marginBottom: -15 }}>Enter Amount</Text>
                    <View style={styles.search}>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            placeholder='$2500'
                            value={amount}
                            onChangeText={(newValue: string) => { setAmount(newValue) }}
                        />
                    </View>
                </View>
                    :
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <GradientText style={{ fontSize: 18, }}>No Bank found</GradientText>
                    </View>
                }

                {
                    Banks && Banks?.map((item: any, index: number) => {
                        return (
                            <TouchableOpacity onPress={() => { setIsChecked(item.id); setBankAccountDetail(item) }} key={index} >
                                <View style={styles.mainTransactionDiv}>
                                    <View style={styles.transactionSend}>
                                        <View style={{ backgroundColor: WHITE, padding: 7, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}>
                                            <Image source={images.Ach} style={{ width: 26, height: 26 }} resizeMode="cover" />
                                        </View>
                                        <View>
                                            <Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>{item?.name} {item?.mask}</Text>
                                            <Text variant='subheading' style={{ fontSize: 12, color: BODY_TEXT }}>{`**** **** ${item.mask}`}</Text>
                                        </View>
                                        <View>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => { setIsChecked(item.id); setBankAccountDetail(item) }} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} style={{ width: 15, height: 15, borderWidth: 1, borderColor: '#7A7A7A', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                        {item.id == isChecked && <View style={{ width: 8, height: 8, backgroundColor: 'linear-gradient(105.94deg, rgba(190, 0, 255, 0.54) 0%, rgba(63, 70, 255, 0.4266) 100.01%), #F9F9F9', borderRadius: 100 }}>
                                        </View>}
                                    </TouchableOpacity>
                                </View>
                                {index != data?.length - 1 && <HorizontalLine />}
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

        </>
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
    button: {
        width: 129,
    },
    textStyle: {
        color: '#A933DF'
    },
    search: {
        width: widthPercentageToDP('82.5%'),
        marginBottom: 30,
        marginTop: 30
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
    },
    transactionSend: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
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
    viewStyle: {
        flex: 1,
        marginTop: -heightPercentageToDP('4.5%'),
        borderTopLeftRadius: 34,
        borderTopRightRadius: 34,
        backgroundColor: LIGHT_GREY,
        paddingHorizontal: widthPercentageToDP('9%'),
        minHeight: heightPercentageToDP('80%')
    },
    signupButton: {
        width: widthPercentageToDP('33%'),
        borderColor: GRADIENT_I,
        borderWidth: 1,
    },
    addButton: {
        width: widthPercentageToDP('33%'),
        borderColor: GRADIENT_I,
        borderWidth: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 12,
        padding: 8,
        paddingHorizontal: 12
    },
})
