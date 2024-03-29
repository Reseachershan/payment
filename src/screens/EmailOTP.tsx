import React, { useState, useRef, useEffect } from "react";
import { Image, Keyboard, StyleSheet, View, Pressable } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { images } from "../assets/images";
import { Circle, Confirm } from "../assets/svgs";
import CustomModal from "../components/CustomModal";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Snackbar from "react-native-snackbar";

import { BODY_TEXT, BORDER, LIGHT_GREY, MAIN_TEXT, PURPLE, WHITE } from "../assets/colors";
import { CustomView, GradientButton, GradientText, Header, Text, } from "../components";
import { useVerifyOTPMutation, useEmailVerificationMutation } from "../store/services/api";
import { loggedIn } from "../store/slices/auth";

interface Route {
    key: string
    name: string
    params: {
        email: string
    }
}

const EmailOTP = () => {
    const route: Route = useRoute()
    const dispatch = useDispatch()
    const email = route?.params.email

    const [success, setSuccess] = useState<boolean>(false)
    const [otp1, setOtp1] = useState<string>()
    const [otp2, setOtp2] = useState<string>()
    const [otp3, setOtp3] = useState<string>()
    const [otp4, setOtp4] = useState<string>()
    const [timeRemaining, setTimeRemaining] = useState<any>(120);
    const opt1Ref = useRef(null)
    const opt2Ref = useRef(null)
    const opt3Ref = useRef(null)
    const opt4Ref = useRef(null)
    const [otpVerificationMutation, { isLoading: isOTPLoaing }] = useVerifyOTPMutation()
    const [resendOTP] = useEmailVerificationMutation()
    
    useEffect(() => {
        const timer = setInterval(() => {
          setTimeRemaining(prevTime => {
            const newTime = prevTime - 1;
            if (newTime <= 0) {
              clearInterval(timer);
            }
            return newTime;
          });
        }, 1000);
      
        return () => clearInterval(timer);
      }, []);

    const toggleModal = () => {
        setSuccess(!success)
    }

    const handleVerifyEmail = async () => {
        if (!otp1 || !otp2 || !otp3 || !otp4) {
            return Snackbar.show({
                text: `❗️ OTP is not valid`,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: '#fff'
            });
        }
        const OTP = `${otp1}${otp2}${otp3}${otp4}`
        if (!email) {
            return Snackbar.show({
                text: `❗️ Enter email`,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: '#fff'
            });
        }
        try {
            const res: any = await otpVerificationMutation({ email: email, otp: Number(OTP) });
            setSuccess(true)
            console.log('res', res.data)
            dispatch(loggedIn({ token: res.data?.accessToken, user: res.data?.user }))
        } catch (e) {
            return Snackbar.show({
                text: `❗️Something went wrong`,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: '#fff'
            });
        }
    };

    const handleResendOTP = async () => {
        try {
            const resp = await resendOTP({ email: email });
            if (!resp?.error) {
                return Snackbar.show({
                    text: `✅ OTP send successfully`,
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: '#D6CDFE',
                    textColor: '#fff'
                });
            }
        } catch (e) {
            return Snackbar.show({
                text: `❗️ Something went wrong`,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: '#fff'
            })
        }
    };

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    console.log('timeRemaining', timeRemaining)
    return (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid={true}>
            <ScrollView>
                <Header title="" hasBack={true} />
                <CustomView>
                    <View style={styles.container}>
                        <GradientText variant='heading' style={{ fontSize: 20, }}>Verification</GradientText>
                        <Image source={images.verification_image} />
                        <Text variant="subheading" style={styles.text}>Enter the code sent to your mail</Text>


                        <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 60, marginTop: 49, gap: 20 }]}>
                            <TextInput value={otp1} ref={opt1Ref} style={styles.OTPBox} onChangeText={(text) => {
                                if (text?.length) {
                                    opt2Ref.current?.focus()
                                }
                                setOtp1(text)
                            }} keyboardType={'number-pad'} maxLength={1} numberOfLines={1} />
                            <TextInput value={otp2} ref={opt2Ref} style={styles.OTPBox} onChangeText={(text) => {
                                if (text?.length) {
                                    opt3Ref.current?.focus()
                                }
                                else {
                                    opt1Ref.current?.focus()
                                }
                                setOtp2(text)
                            }}
                                keyboardType={'number-pad'} maxLength={1} numberOfLines={1} />
                            <TextInput value={otp3} ref={opt3Ref} style={styles.OTPBox} onChangeText={(text) => {
                                if (text?.length) {
                                    opt4Ref.current?.focus()
                                } else {
                                    opt2Ref.current?.focus()
                                }
                                setOtp3(text)
                            }} keyboardType={'number-pad'} maxLength={1} numberOfLines={1} />
                            <TextInput value={otp4} ref={opt4Ref} style={styles.OTPBox} onChangeText={(text) => {
                                if (text?.length) {
                                    opt2Ref.current?.blur()
                                    Keyboard.dismiss()
                                } else {
                                    opt3Ref.current?.focus()
                                }
                                setOtp4(text)
                            }} keyboardType={'number-pad'} maxLength={1} numberOfLines={1} />
                        </View>

                        <GradientButton style={styles.button} isLoading={isOTPLoaing} onPress={() => handleVerifyEmail()} text="Confirm" />
                        <View style={styles.resend}>
                            <Text variant="subheading" style={styles.receive}>Didn’t receive the verification OTP? </Text>
                            {Boolean(timeRemaining > 0) ? <TouchableOpacity><GradientText>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</GradientText></TouchableOpacity>
                                : <TouchableOpacity onPress={() => handleResendOTP()}><GradientText>Resend Again</GradientText></TouchableOpacity>
                            }
                        </View>

                    </View>
                </CustomView>
            </ScrollView>

            {/* modal */}
            <CustomModal visible={success}>
                <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, }} onPress={toggleModal}>
                    <View style={{ flex: 1, justifyContent: 'center' }} >
                        <View>
                            <View style={{ ...styles.modal, minHeight: 300, overflow: 'hidden', }}>
                                <View style={{ ...styles.modalTitle, position: 'absolute', top: 45 }}>
                                    <View style={{ position: 'absolute', top: -20, justifyContent: 'center' }}>
                                        <Circle width="66" height="66" />
                                        <View style={{ position: 'absolute', alignSelf: 'center' }}>
                                            <Confirm />
                                        </View>
                                    </View>
                                </View>
                                <Text style={{ color: PURPLE, fontSize: 20 }}>Successful</Text>
                                <Text style={{ fontSize: 14, position: 'absolute', bottom: 40, textAlign: 'center', paddingRight: 20, paddingLeft: 20 }}>Your email address has been successfully confirmed!</Text>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </CustomModal>
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
    },
    resend: {
        marginTop: heightPercentageToDP('4.3%'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    receive: {
        color: MAIN_TEXT,
        fontSize: 12,
        textAlign: 'center',
    },
    OTPBox: {
        width: 44,
        height: 44,
        backgroundColor: WHITE,
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 12,
        textAlign: 'center',
        color: BORDER,
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
    modalTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginTop: 10,
        backgroundColor: WHITE,
        width: widthPercentageToDP('82.5%'),
        height: 250,
        borderRadius: 12
    },
})
export default EmailOTP