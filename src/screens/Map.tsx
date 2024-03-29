import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Header } from '../components';
import { Cross, Filter, Search, Marker } from '../assets/svgs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { BORDER, MAIN_TEXT, WHITE } from '../assets/colors';
import { POPPINS_REGULAR } from '../assets/fonts';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Geolocation from '@react-native-community/geolocation';

export const Map = () => {
  const [latitude, setLatitude] = useState<any>(37.78825)
  const [longitude, setLongitude] = useState<any>(-122.4324)
  const [details, setDetails] = useState<any>('')
  const [latitudeDelta, setLatitudeDelta] = useState(0.0922)
  const [longitudeDelta, setLongitudeDelta] = useState(0.0421)
  const navigation = useNavigation()

  useFocusEffect(() => {
    if (!latitude && !longitude) {
      Geolocation.getCurrentPosition(info => {
        setLatitude(info.coords.latitude)
        setLongitude(info.coords.longitude)
      });
    }
  })

  return (
    <View>
      <Header rightIcon={<Cross />} onPressRightIcon={() => navigation.goBack()} hasBack={true} title='Map' notShowImage={true} />
      <View style={{ marginTop: heightPercentageToDP('-10%'), width: widthPercentageToDP('80%'), zIndex: 111, alignSelf: 'center' }}>
        <View style={[styles.icon, styles.leftIcon]} >
          <Search />
        </View>
        <View hitSlop={{ top: 25, bottom: 25, right: 25, left: 25 }} style={[styles.icon, styles.rightIcon]}>
          <Filter />
        </View>
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2}
          autoFocus={true}
          returnKeyType={'search'}
          listViewDisplayed="auto"
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            console.log('details', details?.geometry?.location?.lat);

            if (details) {
              setLatitude(details.geometry.location.lat)
              setLongitude(details.geometry.location.lng)
              setDetails(details)
            }
          }}
          textInputProps={{
            // value: userDetails?.address,
            onChangeText: (text) => { console.log(text) }
          }}

          getDefaultValue={() => {
            return '';
          }}
          query={{
            key: 'AIzaSyA-WUX2anchOs4muH05gaYrJ60JcNAgYcY',
            language: 'en',
          }}
          styles={{
            description: {
              fontWeight: 'bold',
            },
            listView: {},

            textInputContainer: {},
            container: { position: 'absolute', width: '100%', zIndex: 1 },
            textInput: {
              height: 48,
              borderRadius: 12,
              backgroundColor: WHITE,
              borderColor: BORDER,
              borderWidth: 1,
              fontFamily: POPPINS_REGULAR,
              fontSize: 14,
              color: MAIN_TEXT,
              marginTop: -22,
              paddingStart: 40,
              paddingEnd: 50
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
          // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          // predefinedPlaces={[homePlace, workPlace]}
          enablePoweredByContainer={false}
          debounce={200}
        />
      </View>
      <ScrollView contentContainerStyle={{ flex: 1, height: heightPercentageToDP('40%') }} style={{ height: '100%' }}>
        <View style={{ borderTopLeftRadius: 34, borderTopRightRadius: 34, overflow: 'hidden', height: '100%', marginTop: heightPercentageToDP('6.5%') }}>
          <MapView
            style={{ paddingHorizontal: 0, height: heightPercentageToDP('72%') }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta,
            }}
            zoomTapEnabled={true}
            zoomControlEnabled={false}
            showsUserLocation={false}
            maxZoomLevel={18}
            showsCompass={false}
            scrollEnabled={true}
            onRegionChangeComplete={(location) => { }}
          >
          </MapView>
        </View>
        <View style={styles.markerFixed}>
          <Marker />
        </View>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    top: 10,
  },
  leftIcon: {
    position: 'absolute',
    width: 20,
    height: 20,
    marginLeft: 15,
    top: -10,
    zIndex: 11
  },
  rightIcon: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: -10,
    zIndex: 11,
    right: 15,

  },
  markerFixed: {
    left: '45%',
    top: '46%',
    position: 'absolute'
  },
})