import React from 'react'
import { ScrollView, Image, View, StyleSheet } from 'react-native';
import { Button, CustomView, GradientButton, Header, Text } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images } from '../assets/images';
import { LIGHT_GREY, RED, WHITE, MAIN_TEXT, GRADIENT_I } from '../assets/colors';
import HorizontalLine from '../components/HorizontalLine';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';

export const DepositError = () => {
    const navigation: StackNavigationProp<ParamListBase> = useNavigation()
    return (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid={true}>
            <ScrollView>
                <Header notShowImage={false} hasBack={false} />
                <CustomView style={{ backgroundColor: LIGHT_GREY }}>
                    <Text variant='heading' style={{ textAlign: 'center', color: RED, fontSize: 18 }}>Error</Text>
                    <View style={{ backgroundColor: WHITE, alignSelf: 'center', marginTop: 40, borderRadius: 12, paddingBottom: 100, width:'100%' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Image style={{ marginVertical: 20 }} source={images.error} resizeMode='cover' />
                            <Text variant='heading' style={{ textAlign: 'center', color: RED, fontSize: 18 }}>Failure</Text>
                            <Text variant='heading' style={{ textAlign: 'center', color: 'black', fontSize: 10, marginTop: 10 }}>Your payment has been declined</Text>
                        </View>
                        <HorizontalLine />
                        <View style={{ paddingHorizontal: 20 }}>
                            <Text variant='heading' style={{ fontSize: 10, color: MAIN_TEXT, textAlign: 'center', marginTop: 50 }}>Please use another bank account or return to
                                the funding screen for other options.</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 70 }}>
                            <Button onPress={() => navigation.navigate('DepositACHMoney')} style={styles.addButton} textStyle={{ color: GRADIENT_I, fontSize: 12 }} text='Other Account' />
                            <GradientButton style={styles.depositButton} textStyle={{ fontSize: 12 }} text="Funding Page" onPress={() => navigation.goBack()} />
                        </View>
                    </View>
                </CustomView>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    addButton: {
        width: widthPercentageToDP('30%'),
        borderColor: GRADIENT_I,
        borderWidth: 1,
    },
    depositButton: {
        width: widthPercentageToDP('30%'),
    },
})