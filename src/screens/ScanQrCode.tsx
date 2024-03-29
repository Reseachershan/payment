import React, { useEffect, useState, useRef } from "react"
import { Alert, Image, Linking, Platform, StyleSheet, View, ImageBackground } from "react-native"
import { Text, CustomView, Header, GradientButton, GradientText, Button } from '../components';
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { BODY_TEXT, GRADIENT_I, LIGHT_GREY, MAIN_TEXT, RED, WHITE } from "../assets/colors";
import { COnfitmation, Circle, LeftBottom, LeftTop, RightBottom } from "../assets/svgs";
import { RightTop } from "../assets/svgs/rightTop";
import QRCodeScanner from "react-native-qrcode-scanner";
import { images } from "../assets/images";
import CustomModal from "../components/CustomModal";
import { Pressable } from "react-native";
import { WINDOW_WIDTH } from "../assets/dimensions";
import moment from "moment";
import { PERMISSIONS, RESULTS, request } from "react-native-permissions";
import { captureRef } from "react-native-view-shot";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import { usePayaVendorMutation } from "../store/services/api";
import Snackbar from "react-native-snackbar";
import HorizontalLine from "../components/HorizontalLine";

export const SacnQrCode = () => {
    const [vendorName, setVendorName] = useState('')
    const [amount, setAmount] = useState('')
    const [sourceAccount, setSourceAccount] = useState('')
    const [isCamera, setIsCamera] = useState(false)
    const [image, setImage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const { user } = useSelector((state: any) => state.auth)
    const [transactionModal, setTransactionModal] = useState(false)
    const [vendorId, setVendorId] = useState<any>()
    const [error, setError] = useState(false)
    const [payAVendor, { isLoading: isPayAVenderLoading }] = usePayaVendorMutation();

    const refScreenShot: any = useRef()
    const exchangeRate = 1

    useEffect(() => {
        requestCameraPermission()
    }, [])

    const onSuccess = (data: any) => {
        captureRef(refScreenShot, {
            format: "jpg",
            quality: 0.8,
        }).then((uri) => {
            setImage(uri)
            setTransactionModal(true)
            const parsedData = data?.data ? JSON.parse(data?.data) : ''
            console.log('parsedData', parsedData);
            setVendorName(parsedData?.username)
            setAmount(parsedData?.amount)
            setSourceAccount(parsedData?.accountNumber)
            setVendorId(parsedData?.userid)
        })
    }

    const pay = () => {
        const a = Number(amount) * exchangeRate
        const data = (5 / 100) * Number(amount)
        const toSend = data + Number(a)
        payAVendor({ amount: String(toSend), receiver_id: vendorId, sender_id: user.id, original_amo: amount })
            .then((res: any) => {
                if (res?.error?.data?.error) {
                    Snackbar.show({
                        text: `❗️${res?.error?.data?.error}`,
                        duration: Snackbar.LENGTH_SHORT,
                        backgroundColor: 'red',
                        textColor: '#fff'
                    });
                } else {
                    Snackbar.show({
                        text: `✅ ${res?.data?.message}`,
                        duration: Snackbar.LENGTH_SHORT,
                        backgroundColor: '#D6CDFE',
                        textColor: '#fff'
                    });
                }
                setTransactionModal(!transactionModal);
                setImage('');
            })
            .catch((e) => {
                setError(true);
                Snackbar.show({
                    text: `❗️${e.error}`,
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'red',
                    textColor: '#fff'
                });
            });

    }

    const handleTransactionModal = () => {
        setTransactionModal(!transactionModal)
        setImage('')
        setError(false)
    }

    const requestCameraPermission = async () => {
        try {
            console.log('asking for permissions');
            const status = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
            console.log('Camera permission status:', status);
            if (status === RESULTS.BLOCKED) {
                Alert.alert(
                    'Camera Permission Required',
                    'Please enable camera access for the app in your device settings.',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                Linking.openSettings();
                                setIsCamera(true)
                            },
                        },
                    ]
                );
                setIsCamera(false)
            }

            if (status === RESULTS.GRANTED) {
                setIsCamera(true)
                // Permission granted, you can proceed with accessing the camera
            } else {
                // Permission denied or unavailable
                setIsCamera(false)
            }
        } catch (error) {
            console.log('Error requesting camera permission:', error);
        }
    };

    if (error) {
        return <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid={true}>
            <ScrollView>
                <Header notShowImage={false} hasBack={false} />
                <CustomView style={{ backgroundColor: LIGHT_GREY }}>
                    <View style={{ backgroundColor: WHITE, alignSelf: 'center', marginTop: 40, borderRadius: 12, paddingBottom: 100 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Image style={{ marginVertical: 20 }} source={images.error} resizeMode='cover' />
                            <Text variant='heading' style={{ textAlign: 'center', color: RED, fontSize: 18 }}>Failure</Text>
                            <Text variant='heading' style={{ textAlign: 'center', color: 'black', fontSize: 10, marginTop: 10 }}>Your payment has been declined</Text>
                        </View>
                        <HorizontalLine />
                        <View style={{ paddingHorizontal: 20 }}>
                            <Text variant='heading' style={{ fontSize: 10, color: MAIN_TEXT, textAlign: 'center', marginTop: 50 }}>Please use another bank account or return to the funding screen for other options</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 70 }}>
                            <GradientButton style={{ width: widthPercentageToDP('50%') }} text="Try again" onPress={() => handleTransactionModal()} />
                        </View>
                    </View>
                </CustomView>
            </ScrollView>
        </KeyboardAwareScrollView>
    }

    if (isPayAVenderLoading) {
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
        <View>
            <Header title={"Scan QR Code"} style={{ height: heightPercentageToDP("42%") }} notShowImage={true} hasBack={true} />
            <CustomView>
                <View style={{ ...styles.profileContainer, marginTop: heightPercentageToDP("-27%") }}>
                    <View style={{ ...styles.image, justifyContent: 'center', alignItems: 'center' }}>
                        {user?.profilePic ? <Image source={{ uri: user?.profilePic }} style={styles.image} resizeMode='cover' /> :
                            <Image source={images.profileImage} style={styles.image} resizeMode='cover' />}
                    </View>
                </View>
                {
                    isCamera ?
                        image ?
                            <ImageBackground source={{ uri: image }} style={{ width: 250, height: 250, borderRadius: 12 }} /> :
                            <View ref={refScreenShot} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ position: 'relative', width: 250, height: 250, borderRadius: 12, overflow: 'hidden' }}>
                                    <View style={{ position: 'absolute', top: 10, left: 10, zIndex: 11 }}><RightTop /></View>
                                    <View style={{ position: 'absolute', top: 10, right: 10, zIndex: 11 }}><LeftTop /></View>
                                    <View style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 11 }}><RightBottom /></View>
                                    <View style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 11 }}><LeftBottom /></View>
                                    <QRCodeScanner
                                        onRead={onSuccess}
                                    />
                                </View>
                                <View style={{ width: 210, alignSelf: 'center', paddingTop: 10 }}>
                                    <Text style={{ textAlign: 'center', color: BODY_TEXT }}>Place a barcode inside the view finder
                                        rectangle to scan it.</Text>
                                </View>
                            </View> :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Need camera access.<Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => requestCameraPermission()}><Text>Ask again</Text></Pressable></Text></View>
                }

            </CustomView>
            <Modal vendorName={vendorName} amount={amount} sourceAccount={sourceAccount} title={isSuccess ? 'Success' : 'Confirmation'} transactionModal={transactionModal} handleTransactionModal={handleTransactionModal} setIsSuccess={() => { setIsSuccess(true); setTransactionModal(true) }} pay={pay} exchangeRate={exchangeRate} />
        </View>
    )
}

interface ModalProps {
    vendorName?: string
    amount?: string
    sourceAccount?: string
    transactionModal?: any
    handleTransactionModal?: any
    title?: string
    setIsSuccess?: any
    pay?: any
    exchangeRate?: any
}

const Modal = ({ vendorName, amount, sourceAccount, transactionModal, handleTransactionModal, title, setIsSuccess, pay, exchangeRate }: ModalProps) => {

    const handleTransactionFee = () => {
        if (amount) {
            const data = (5 / 100) * Number(amount)
            return data
        }
    }

    return (
        <CustomModal visible={transactionModal}>
            <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, }} onPress={handleTransactionModal}>
                <View>
                    <View style={styles.modal}>
                        <View style={{ backgroundColor: LIGHT_GREY, height: 130, position: 'absolute', top: 0, left: 0, right: 0, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
                            <View style={{ width: 200, alignSelf: 'center' }}>
                                <Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT, marginBottom: 20, textAlign: 'center', marginTop: 20, lineHeight: 24 }}>Here’s The Transaction
                                    Summary</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 130, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
                            <View style={{ marginTop: -50, alignSelf: 'center', justifyContent: 'center' }}>
                                <Circle width="66" height="66" />
                                <View style={{ position: 'absolute', alignSelf: 'center' }}>
                                    <COnfitmation />
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text variant='heading' style={{ fontSize: 18, color: GRADIENT_I, marginBottom: 20, textAlign: 'center' }}>{title}</Text>
                            </View>
                            <View style={styles.history}>
                                <Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>Vendor:</Text>
                                <Text variant='subheading' style={{ fontSize: 12, color: BODY_TEXT }}>{vendorName}</Text>
                            </View>
                            <View style={styles.history}>
                                <Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>Transaction Id:</Text>
                                <Text variant='subheading' style={{ fontSize: 12, color: BODY_TEXT }}>ID#3294809</Text>
                            </View>
                            <View style={styles.history}>
                                <Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>Date & Time:</Text>
                                <Text variant='subheading' style={{ fontSize: 12, color: BODY_TEXT }}>{moment().format('h:mm A - MMM D, YYYY')}</Text>
                            </View>
                            <View style={styles.history}>
                                <Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>Local Currency:</Text>
                                <Text variant='subheading' style={{ fontSize: 16, color: BODY_TEXT }}>${amount}</Text>
                            </View>
                            <View style={styles.history}>
                                <Text variant='subheading' style={{ fontSize: 10, color: MAIN_TEXT }}>Exchange Rate:</Text>
                                <Text variant='subheading' style={{ fontSize: 10, color: BODY_TEXT }}>{exchangeRate}x</Text>
                            </View>
                            <View style={styles.history}>
                                <Text variant='subheading' style={{ fontSize: 10, color: MAIN_TEXT }}>5% Transaction Fee:</Text>
                                <Text variant='subheading' style={{ fontSize: 10, color: BODY_TEXT }}>${handleTransactionFee()}</Text>
                            </View>

                            <View style={{ ...styles.history, marginTop: 20 }}>
                                <GradientText variant='heading' style={{ fontSize: 14, color: MAIN_TEXT }}>What You Will  Paid:</GradientText>
                                {/* @ts-ignore */}
                                <Text variant='heading' style={{ fontSize: 16, color: BODY_TEXT }}>${Number(amount) * exchangeRate + handleTransactionFee()}</Text>
                            </View>


                            <View style={{ flexDirection: 'row', marginVertical: 40, justifyContent: 'center' }}>
                                <Button textStyle={{ color: GRADIENT_I }} style={{ ...styles.submitButton, width: 100, marginRight: 20 }} onPress={() => handleTransactionModal()} text='Dismiss' />
                                <GradientButton onPress={() => pay()} style={{ width: 100 }} text="Pay" />
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
        </CustomModal>
    )
}


const styles = StyleSheet.create({
    submitButton: {
        width: widthPercentageToDP('65%'),
        borderColor: GRADIENT_I,
        borderWidth: 1,
    },
    image: {
        width: heightPercentageToDP("16%"),
        height: heightPercentageToDP("16%"),
        borderColor: WHITE,
        borderWidth: 5,
        borderRadius: 100
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
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
    history: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: WINDOW_WIDTH - 130,
        marginHorizontal: 35
    },
})
