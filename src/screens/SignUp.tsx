import React, { useState } from 'react';
import { StyleSheet, Image, View } from "react-native"
import { BORDER, GRADIENT_II, MAIN_TEXT, WHITE } from '../assets/colors';
import { Text, Header, TextInput, GradientButton, CustomView, SocialAuth } from '../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { useSignUpMutation } from '../store/services/api';
import { ParamListBase, useNavigation } from '@react-navigation/core';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackNavigationProp } from '@react-navigation/stack';
import { loggedIn } from '../store/slices/auth';
import Snackbar from 'react-native-snackbar';
import { useDispatch } from 'react-redux';
import { useRoute } from "@react-navigation/native";
import CountryPicker from 'react-native-country-picker-modal'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { POPPINS_REGULAR, POPPINS_SEMIBOLD } from '../assets/fonts';
import { images } from '../assets/images';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
interface Route {
  key: string
  name: string
  params: {
    type: string
  }
}

export const SignUp = (): JSX.Element => {
  const route: Route = useRoute()
  const type = route?.params.type

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()
  const navigation: StackNavigationProp<ParamListBase> = useNavigation()
  const [signUp, { isLoading: isSignUpLoading }] = useSignUpMutation();
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [isCountry, SetIsCountry] = useState(false)
  const [latitude, setLatitude] = useState<any>()
  const [longitude, setLongitude] = useState<any>()

  console.log('latitude', latitude);
  console.log('longitude', latitude);
  
  const validateErrors = (name: string, email: string, password: string, phone: string, country: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!name) return `Name Can't be empty`
    if (name.trim().split(" ").length < 2) return `Legal name must contain first name and last name`
    else if (!email) return `Email Can't be empty`
    else if (!emailRegex.test(email)) return `Enter a vaild email`
    else if (!phone) return `Phone Can't be empty`
    else if (!country) return `Country Can't be empty`
    else if (!password) return `Password Can't be empty`
    else if (password.length < 6) return `Password should have atleast 6 letters`
    else if (!latitude && !longitude) return `Select Your location`
  };

  const checkIfError = (error: any) => {
    if (typeof error.error === 'string' || typeof error === 'string' ) {
      return Snackbar.show({
        text: `❗️ ${error.error || error}`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: '#fff'
      });
    } else if (typeof error.errors[0].msg === 'string') {
      return Snackbar.show({
        text: `❗️ ${error.errors[0].msg}`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: '#fff'
      });
    } else {
      return Snackbar.show({
        text: `❗️ ${JSON.stringify(error)}`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: '#fff'
      });
    }
  }

  const handleSignUp = () => {
    const validate = validateErrors(name, email.trim().toLowerCase(), password, phone, selectedCountry?.name)
    if (validate) {
      return Snackbar.show({
        text: `❗️ ${validate}`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: '#fff'
      });
    }
    signUp({ name, email: email?.trim().toLowerCase(), phone, country: selectedCountry?.name, password, userRole: type.toUpperCase(), latitude: latitude, longitude:longitude }).then((res: any) => {
      onSuccessfullSignup(res);
    }).catch((err: any) => {
      console.log('err...', err);
      checkIfError(err?.error || err?.data || err)
    })
  }


  const onSuccessfullSignup = (res: any) => {
    console.log('res...', res);
    
    if (res && res.data) {
      dispatch(loggedIn({ token: res.data?.accessToken, user: res.data?.user }))
      Snackbar.show({
        text: `✅ Your Account has been created successfuly`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#D6CDFE',
        textColor: '#fff'
      });
    } else if (res && res?.error) {
      checkIfError(res?.error?.data ?? res?.error?.error)
    }
  }

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" bounces={false} showsVerticalScrollIndicator={false} enableOnAndroid={true}>
      <Header />
      <CustomView title='SignUp'>
        <TextInput title='Name' value={name} onChangeText={(text) => setName(text)} />
        <TextInput title='Email' value={email} onChangeText={(text) => setEmail(text)} />
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
            <View>
              {selectedCountry &&
                <Text variant='subheading' style={styles.textStyle}>{selectedCountry?.name}</Text>
              }
            </View>
            <Image source={images.arrow2} style={{ marginLeft: 8, marginRight: 5, height: 10, width: 10 }} resizeMode='contain' />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
        <Text variant='heading' style={{ fontWeight: '600', fontFamily: POPPINS_SEMIBOLD }}>Location</Text>
        <GooglePlacesAutocomplete
          placeholder=""
          minLength={2}
          autoFocus={true}
          returnKeyType={'search'}
          listViewDisplayed="auto"
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            if (details) {
              setLatitude(details.geometry.location.lat)
              setLongitude(details.geometry.location.lng)
            }
          }}
          textInputProps={{
            placeholderTextColor: MAIN_TEXT,
            onChangeText: (text) => { console.log(text) }
          }}

          getDefaultValue={() => {
            return '';
          }}
          query={{
            key: 'AIzaSyCp6-42kDGJ0YH3Bph0qArLZ9xe52wldFE',
            language: 'en',
          }}
          styles={{
            description: {
              fontFamily: POPPINS_REGULAR,
              color: MAIN_TEXT
            },
            listView: {},
            textInputContainer: {},
            textInput: {
              height: 48,
              borderRadius: 12,
              backgroundColor: WHITE,
              borderColor: BORDER,
              borderWidth: 1,
              fontFamily: POPPINS_REGULAR,
              fontSize: 14,
              color: MAIN_TEXT,
              paddingStart: 15,
              paddingEnd: 15
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
          }}
          GooglePlacesSearchQuery={{
            rankby: 'distance',
            //@ts-ignore
            types: ['food', 'gym', 'city_hall', 'car_wash', 'airport', 'car_rental', 'car_dealer'],
          }}
          GooglePlacesDetailsQuery={{
            //@ts-ignore
            fields: ['formated_address', 'geometry']
          }}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
          ]}
          enablePoweredByContainer={false}
          debounce={200}
        />
        </View>
        {/* <TextInput title='Country' value={country} onChangeText={(text) => setCountry(text)} /> */}
        <TextInput title='Password' value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
        <GradientButton onPress={handleSignUp} isLoading={isSignUpLoading} style={styles.submitButton} text='Continue' />
        <SocialAuth onSuccess={onSuccessfullSignup} />
        <Text style={styles.footerText}>
          Already Have An Account?
          <Text onPress={() => navigation.navigate('Login')} style={{ color: GRADIENT_II, }}> Login</Text>
        </Text>
      </CustomView>
      <CountryPicker
        onSelect={(country) => setSelectedCountry(country)}
        withFlag={true}
        visible={isCountry}
        countryCode={selectedCountry?.cca2}
        //@ts-ignore
        placeholder=''
        withFilter={true}
        onClose={() => SetIsCountry(false)}
      />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  submitButton: {
    marginTop: hp('3.8%'),
    width: wp('65%'),
    alignSelf: 'center',
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