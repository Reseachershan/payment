import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StackNavigationProp } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleSheet, View } from "react-native";
import { Image } from 'react-native';
import { widthPercentageToDP } from "react-native-responsive-screen";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { useEmailVerificationMutation } from "../store/services/api";
import Snackbar from "react-native-snackbar";
import { useDispatch, useSelector } from "react-redux";

import { images } from "../assets/images";
import { CustomView, GradientButton, GradientText, Header, Text, TextInput } from "../components";
import { BODY_TEXT } from "../assets/colors";

const Email = () => {
    const { user } = useSelector((state: any) => state.auth)
    const [email, setEmail] = useState('')
    const [emailVerificationMutation, {isLoading: isEmailLoading}] = useEmailVerificationMutation()
    const navigation: StackNavigationProp<ParamListBase> = useNavigation()

    useEffect(() => {
        if (user?.email) {
            setEmail(user?.email)
        }
    }, [])

    const handleVerifyEmail = async () => {
        const regex = /\S+@\S+\.\S+/;

        if (!email) {
            return Snackbar.show({
                text: `❗️ Enter email`,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: '#fff'
            });
        } 

        if (regex.test(email)) {
            try {
                const resp: any = await emailVerificationMutation({ email: email });
                if (!resp?.error) {
                    navigation.navigate('EmailOTP', { email: email })
                } else {
                    return Snackbar.show({
                        text: `❗️ ${resp.error.data.error}`,
                        duration: Snackbar.LENGTH_SHORT,
                        backgroundColor: 'red',
                        textColor: '#fff'
                    });
                }
            } catch (e) {
                return Snackbar.show({
                    text: `❗️ Enter a valid email`,
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'red',
                    textColor: '#fff'
                });
            }
        } else {
            return Snackbar.show({
                text: `❗️ Enter a valid email`,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: '#fff'
            });
        }
    };

    return (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid={true}>
            <ScrollView>
                <Header logOut={true} title="" hasBack={true} />
                <CustomView>
                    <View style={styles.container}>
                        <GradientText variant='heading' style={{ fontSize: 20, }}>Verification</GradientText>
                        <Image source={images.verification_image} />
                        <Text variant="subheading" style={styles.text}>We will send you One Time Code on your email address</Text>
                        <TextInput value={email} onChangeText={(text: string) => setEmail(text)} style={{ width: widthPercentageToDP('70.5%'), }} placeholder="Enter Your Email Address" />
                        {/* <GradientButton isLoading={isEmailLoading} onPress={() => handleLogout()} style={styles.button} text="Verify" /> */}
                        <GradientButton isLoading={isEmailLoading} onPress={() => handleVerifyEmail()} style={styles.button} text="Verify" />
                    </View>
                </CustomView>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 148,
        marginTop: 34
    },

    text: {
        color: BODY_TEXT,
        fontSize: 12,
        paddingRight: 60,
        paddingLeft: 60,
        textAlign: 'center',
    }

})

export default Email