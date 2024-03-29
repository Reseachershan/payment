import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput, Image } from "react-native"
import { GREEN, MAIN_TEXT, PURPLE, WHITE } from '../assets/colors';
import { Text, Header, GradientButton, CustomView, Button } from '../components';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { images } from '../assets/images';
import CountryPicker, { FlagButton } from 'react-native-country-picker-modal'
import Snackbar from 'react-native-snackbar';
import { useCurrencyConverterMutation } from '../store/services/api';
import { Exchange } from '../assets/svgs/exchange';

export const ExchangeRate = () => {
    const [text, setText] = useState("");
    const [from, setFrom] = useState(false)
    const [to, setTo] = useState(false)
    const [selectedCountryFrom, setSelectedCountryFrom] = useState<any>(null);
    const [selectedCountryTo, setSelectedCountryTo] = useState<any>(null);
    const [currencyConverter, { isLoading: isCurrencyConverterLoading }] = useCurrencyConverterMutation()
    const [convertedValue, setConvertedValue] = useState()
    const [convertedTo, setConvertedTo] = useState()
    const [exchangeShifter, setExchangeShifter] = useState(false)

    const converter = () => {
        if (!text) return Snackbar.show({
            text: `❗️ Enter Amount`,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'red',
            textColor: '#fff'
        });
        if (!selectedCountryFrom) return Snackbar.show({
            text: `❗️ Select From currency`,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'red',
            textColor: '#fff'
        });

        if (!selectedCountryTo) return Snackbar.show({
            text: `❗️ Select To currency`,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'red',
            textColor: '#fff'
        });

        currencyConverter({ amount: Number(text), from: !exchangeShifter ? selectedCountryFrom.currency[0] : selectedCountryTo.currency[0], to: !exchangeShifter ? selectedCountryTo.currency[0] : selectedCountryFrom.currency[0] }).unwrap().then((res) => {
            setConvertedValue(res.amount)
            setConvertedTo(res.to)
        }).catch((error) => {
            console.log('error', error);
            Snackbar.show({
                text: `❗️ ${JSON.stringify(error.data.message)}`,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: '#fff'
            });
        })

    }

    return (
        <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false} enableOnAndroid={true}>
            <Header title='Currency Converter' />
            <CustomView>
                <View style={{ width: '100%', flex: 1, flexGrow: 1, backgroundColor: WHITE, borderRadius: 12, paddingVertical: 20 }}>
                    <Text variant='heading' style={{ textAlign: 'center', color: PURPLE, fontSize: 18, marginTop: 10 }}>Exchange Rate</Text>
                    {/* {convertedValue && convertedTo && <Text variant='heading' style={{ textAlign: 'center', color: PURPLE, fontSize: 18, marginTop: 10 }}>{convertedValue} {convertedTo}</Text>} */}
                    {convertedValue && convertedTo && <Text variant='heading' style={{ textAlign: 'center', color: GREEN, fontSize: 32, marginTop: 20 }}>{convertedValue} {convertedTo}</Text>}
                    <View style={{ width: '80%', marginTop: 40, alignSelf: 'center' }}>
                        <Text variant='subheading' style={{ color: MAIN_TEXT }}>Amount</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setText}
                            value={text}
                            placeholder="$2500"
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={{ width: '80%', alignSelf: 'center', justifyContent: 'space-between', marginTop: 50, flexDirection: 'row', alignItems:'center' }}>
                        <View>
                            <Text variant='subheading' style={{ color: MAIN_TEXT }}>{!exchangeShifter ? 'From' : 'To'}</Text>
                            <TouchableOpacity onPress={() => setFrom(true)} style={styles.countryRow}>
                                <CountryPicker
                                    onSelect={(country) => setSelectedCountryFrom(country)}
                                    withFlag
                                    visible={from}
                                    withCurrency
                                    countryCode={selectedCountryFrom?.cca2}
                                    withFilter
                                    onClose={() => setFrom(false)}
                                    //@ts-ignore
                                    placeholder=''
                                />
                                <Text style={{ fontSize: 16, }}>{selectedCountryFrom ? selectedCountryFrom.currency[0] : 'Select'}</Text>
                                <Image source={images.arrow2} style={{ marginLeft: 8, marginRight: 5, width: 10, height: 10 }} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setExchangeShifter(!exchangeShifter)} style={{ marginTop: 35, marginHorizontal: 10 }}>
                            <Exchange />
                        </TouchableOpacity>
                        <View>
                            <Text variant='subheading' style={{ color: MAIN_TEXT }}>{!exchangeShifter ? 'To' : 'From'}</Text>
                            <TouchableOpacity onPress={() => setTo(true)} style={styles.countryRow}>
                                <CountryPicker
                                    onSelect={(country) => setSelectedCountryTo(country)}
                                    withFlag
                                    visible={to}
                                    withCurrency
                                    countryCode={selectedCountryTo?.cca2}
                                    withFilter
                                    onClose={() => setTo(false)}
                                    //@ts-ignore
                                    placeholder=''
                                />
                                <Text style={{ fontSize: 16, }}>{selectedCountryTo ? selectedCountryTo.currency[0] : 'Select'}</Text>
                                <Image source={images.arrow2} style={{ marginLeft: 8, width: 10, height: 10 }} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <GradientButton isLoading={isCurrencyConverterLoading} style={styles.submitButton} onPress={() => converter()} text='Convert' />
                </View>
            </CustomView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        paddingHorizontal: 10,
        width: "80%",
        alignSelf: 'center',
        marginTop: 5
    },
    input: {
        fontSize: 16,
        height: 50,
    },
    countryRow: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        width: 108,
        height: 50,
        flexDirection: 'row',
        marginTop: 5
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    submitButton: {
        marginTop: hp('8.1%'),
        width: wp('65%'),
        alignSelf: 'center',
    },
});