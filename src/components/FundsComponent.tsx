import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ActivityIndicator } from "react-native"
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useGetTransactionQuery } from '../store/services/api';
import { BODY_TEXT, MAIN_TEXT, WHITE } from '../assets/colors';
import { Text } from '../components';
import HorizontalLine from './HorizontalLine';
import { images } from '../assets/images';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export const FundsComponent = ({ title, isSearchBar }: { title?: string, isSearchBar: boolean }) => {
    const { data, isLoading } = useGetTransactionQuery()
    const navigation: StackNavigationProp<ParamListBase> = useNavigation()
    const transactionsData = data ?? []
    
    const paymentMethods = [
        {
            image: images.Ach,
            name: 'Deposit funds via ACH',
            detail: 'No fees. Funds available within 2-5 days.',
            onPress: () => { navigation.navigate('DepositACHMoney') }
        },
        {
            image: images.stripe,
            name: 'Deposit funds via Stripe',
            detail: 'Debit or credit. Instant deposit with fees.',
            onPress: () => { }
        },
        {
            image: images.coinbase,
            name: 'Deposit funds via Coinbase',
            detail: 'We accept Bitcoin, Ethereum, and Stellar.',
            onPress: () => { }
        },
    ]

    if (isLoading) {
        return (
            <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator animating={isLoading} size="large" />
            </View>
        )
    }

    return (
        <>
            <View style={styles.Transactions}>
                {
                    paymentMethods?.map((item: any, index: number) => {
                        return (
                            <TouchableOpacity key={index} onPress={item.onPress}>
                                <View style={styles.mainTransactionDiv}>
                                    <View style={styles.transactionSend}>
                                        <View style={{ backgroundColor: WHITE, justifyContent: 'center', alignItems: 'center', borderRadius: 12, height: 40, width: 40 }}>
                                            <Image source={item.image} style={{ width: 26, height: 26 }} resizeMode="cover" />
                                        </View>
                                        <View>
                                            <Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT, width: widthPercentageToDP('70%') }}>{item.name}</Text>
                                            <Text variant='subheading' style={{ fontSize: 12, color: BODY_TEXT, width: widthPercentageToDP('70%') }}>{item.detail}</Text>
                                        </View>
                                        <View>
                                        </View>
                                    </View>

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
    button: {
        width: 129,
    },
    mainTransactionDiv: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    Transactions: {
        width: widthPercentageToDP('82.5%'),
        marginTop: 40
    },
    transactionSend: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
})
