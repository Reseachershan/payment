import React, { useRef, useEffect } from 'react'
import { ScrollView, Image, View, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { CustomView, GradientText, Header, Text } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images } from '../assets/images';
import { LIGHT_GREY, WHITE, BODY_TEXT, MAIN_TEXT, GRADIENT_I, PURPLE } from '../assets/colors';
import HorizontalLine from '../components/HorizontalLine';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Cross } from '../assets/svgs';
import ViewShot from 'react-native-view-shot';
import { captureRef } from 'react-native-view-shot';
// import RNFS from 'react-native-fs';
// import RNFetchBlob from 'rn-fetch-blob';

export const DepositSuccess = () => {
  const route: any = useRoute()
  const navigation = useNavigation()
  const data = route.params;
  const viewShotRef = useRef();  

  const handleBackNavigation = () => {
    navigation.navigate('HomeTabs')
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackNavigation);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackNavigation);
    };
  }, []);

  const captureImage = async () => {
    try {
      //@ts-ignore
      const uri = await captureRef(viewShotRef);
    } catch (error) {
      console.log(error);
    }
  };

  // const REMOTE_IMAGE_PATH ='https://raw.githubusercontent.com/AboutReact/sampleresource/master/gift.png'
  // const downloadImage = async () => {
  //   let image_URL = REMOTE_IMAGE_PATH;
  //   let ext = getExtention(image_URL);
  //   ext = '.' + ext[0];
  //   const { config, fs } = RNFetchBlob;
  //   let PictureDir = fs.dirs.PictureDir;
  //   let options = {
  //     fileCache: true,
  //     addAndroidDownloads: {
  //       useDownloadManager: true,
  //       notification: true,
  //       path:
  //         PictureDir +
  //         '/image_' +
  //         Math.floor(Date.now() / 1000) +
  //         ext,
  //       description: 'Image',
  //     },
  //   };
  //   config(options)
  //     .fetch('GET', 'file://' + image_URL) 
  //     .then(res => {
  //       console.log('res -> ', JSON.stringify(res));
  //       alert('Image Downloaded Successfully.');
  //     });
  // };
  
  // const getExtention = filename => {
  //   // To get the file extension
  //   return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  // };

  return (
    <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false} enableOnAndroid={true}>
      <ScrollView>
        <Header rightIcon={<Cross />} onPressRightIcon={() => navigation.navigate('HomeTabs')} notShowImage={false} hasBack={false} />
        <CustomView style={{ backgroundColor: LIGHT_GREY }}>
          <Text variant='heading' style={{ textAlign: 'center', color: PURPLE, fontSize: 18 }}>My Receipt</Text>
          {/* @ts-ignore */}
          <ViewShot ref={viewShotRef} options={{
            fileName: 'file',
            format: 'jpg',
            quality: 0.9
          }} style={{ width: '100%', backgroundColor: WHITE, alignSelf: 'center', marginTop: 40, borderRadius: 12, paddingBottom: 20 }}>
            <View style={{ width: 44, height: 44, backgroundColor: LIGHT_GREY, position: 'absolute', top: 50, borderRadius: 100, left: -20 }}></View>
            <View style={{ width: 44, height: 44, backgroundColor: LIGHT_GREY, position: 'absolute', top: 50, borderRadius: 100, right: -20 }}></View>
            <View style={{ alignItems: 'center' }}>
              <Image style={{ marginVertical: 20 }} source={images.success} resizeMode='cover' />
              <Text variant='heading' style={{ textAlign: 'center', color: PURPLE, fontSize: 18 }}>Successful</Text>
              <Text variant='heading' style={{ textAlign: 'center', color: 'black', fontSize: 10, marginTop: 10 }}>Your funds will be available
                in 2 to 5 business days.</Text>
            </View>
            <HorizontalLine />
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <Text variant='heading' style={{ color: MAIN_TEXT, fontSize: 16 }}>Funding Source:</Text>
              <Text variant='heading' style={{ fontSize: 10, color: BODY_TEXT }}>{data.res.funding_source}</Text>
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <Text variant='heading' style={{ color: MAIN_TEXT, fontSize: 16 }}>Transaction Id:</Text>
              <Text variant='heading' style={{ fontSize: 10, color: BODY_TEXT }}>ID#{data.res.transection_id}</Text>
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <Text variant='heading' style={{ color: MAIN_TEXT, fontSize: 16 }}>Account Details:</Text>
              <Text variant='heading' style={{ fontSize: 10, color: BODY_TEXT }}>**** **** **** {data.res.mask}</Text>
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <Text variant='heading' style={{ color: MAIN_TEXT, fontSize: 16 }}>Sent By:</Text>
              <Text variant='heading' style={{ fontSize: 10, color: BODY_TEXT }}>{data.res.send_by}</Text>
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <Text variant='heading' style={{ color: MAIN_TEXT, fontSize: 16 }}>Amount:</Text>
              <Text variant='heading' style={{ fontSize: 10, color: BODY_TEXT }}>${data.res.amount}</Text>
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <Text variant='heading' style={{ color: MAIN_TEXT, fontSize: 16 }}>Transfer Fee:</Text>
              <Text variant='heading' style={{ fontSize: 10, color: BODY_TEXT }}>${data.res.transfer_fee}</Text>
            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <GradientText variant='heading' style={{ color: MAIN_TEXT, fontSize: 16 }}>Total Amount:</GradientText>
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text variant='heading' style={{ color: BODY_TEXT, fontSize: 16 }}>${data.res.amount}</Text>
              <TouchableOpacity onPress={captureImage} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Image source={images.documentdownload} resizeMode='cover' /><Text variant='heading' style={{ fontSize: 10, color: BODY_TEXT }}>Save as Pdf</Text>
              </TouchableOpacity>
            </View>
          </ViewShot>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ color: MAIN_TEXT }}>An email confirmation will be sent to you.</Text>
          </View>
        </CustomView>
      </ScrollView>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  addButton: {
    width: widthPercentageToDP('33%'),
    borderColor: GRADIENT_I,
    borderWidth: 1,
  },
  depositButton: {
    width: widthPercentageToDP('33%'),
  },
})