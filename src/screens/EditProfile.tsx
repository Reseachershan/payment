import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View } from "react-native"
import { BORDER, GRADIENT_I, MAIN_TEXT } from '../assets/colors';
import { Header, TextInput, CustomView, Button, Text } from '../components';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Snackbar from 'react-native-snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { loggedIn, logout } from '../store/slices/auth';
import { useUpdateProfileMutation } from '../store/services/api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal'
import { images } from '../assets/images';
import { POPPINS_REGULAR, POPPINS_SEMIBOLD } from '../assets/fonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const { token, user } = useSelector((state: any) => state.auth)
    const [updateProfile, { isLoading: isUpdateProfileLoading }] = useUpdateProfileMutation();
    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [isCountry, SetIsCountry] = useState(false)
    const dispatch = useDispatch()
    const route: any = useRoute();
    const navigation: StackNavigationProp<ParamListBase> = useNavigation()
    const navigateState = navigation.getState()
    const {bottom: bottomInset} = useSafeAreaInsets()
    console.log('navigateState', navigateState);
    
    useEffect(() => {
        if (user) {
            setName(user.name)
            setPhone(user.phone)
            setSelectedCountry({ name: user.country })
        }
    }, [user])

    const handleEditProfile = () => {
        if (!name || !phone || !selectedCountry?.name) return Snackbar.show({
            text: `❗️Can't be empty`,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'red',
            textColor: '#fff'
        });
        if (name.trim().split(" ").length < 2) return Snackbar.show({
            text: `❗️Legal name must contain first name and last name`,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'red',
            textColor: '#fff'
        });
        updateProfile({ name, phone, country: selectedCountry?.name }).then((res: any) => {
            Snackbar.show({
                text: `✅ Profile updated successfully`,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: '#D6CDFE',
                textColor: '#fff'
            });
            dispatch(loggedIn({ token: token, user: res.data?.user }))
            if (route?.params?.profile) {
                navigation.goBack()
            } else {
                navigation.navigate('HomeTabs')
            }
        }).catch((err: any) => {
            console.log('err', err);
        })
    }

    return (
        <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false} enableOnAndroid={true}>
            <Header hasBack={route?.params?.profile ? true : false} logOut={route?.params?.profile ? false : true}/>
            <CustomView title={route?.params?.profile ? 'Edit Profile' : 'Complete Profile'}>
                <TextInput title='Name' value={name} onChangeText={(text) => setName(text)} />
                <TextInput title='Phone' keyboardType='number-pad' value={phone} onChangeText={(text) => setPhone(text)} />
                <View style={styles.inputContainer}>
                    <Text variant='heading' style={{ fontWeight: '600', fontFamily: POPPINS_SEMIBOLD, marginBottom: 3 }}>Country</Text>
                    <TouchableOpacity onPress={() => SetIsCountry(true)} style={{
                        backgroundColor: '#fff',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 15,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: BORDER,
                        height: 50,
                        flexDirection: 'row'
                    }}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <CountryPicker
                                onSelect={(country) => setSelectedCountry(country)}
                                countryCode={selectedCountry?.cca2}
                                withFlag={true}
                                visible={isCountry}
                                //@ts-ignore
                                placeholder=''
                                withFilter={true}
                                onClose={() => SetIsCountry(false)}
                            />
                            {selectedCountry ?
                                <Text variant='subheading' style={styles.textStyle}>{selectedCountry?.name}</Text>
                                :
                                <Text variant='subheading' style={styles.textStyle}>{user?.country ? user?.country : 'Select Country'}</Text>
                            }
                        </View>
                        <Image source={images.arrow2} style={{ marginLeft: 8, marginRight: 5, height: 10, width: 10 }} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
                <Button style={{...styles.submitButton, bottom: (bottomInset ?? 0) + 30}} textStyle={{ color: GRADIENT_I }} text="Save" isLoading={isUpdateProfileLoading} onPress={handleEditProfile} />
            </CustomView>
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    submitButton: {
        width: wp('65%'),
        alignSelf: 'center',
        position: "absolute",
        borderColor: GRADIENT_I,
        borderWidth: 1,
    },
    footerText: {
        color: MAIN_TEXT,
        textAlign: 'center',
        marginTop: hp('7.3%'),
    },
    inputContainer: {
        marginTop: hp('3%')
    },
    textStyle: {
        fontFamily: POPPINS_REGULAR,
        fontSize: 14,
        color: MAIN_TEXT,
    }
})
export default EditProfile;