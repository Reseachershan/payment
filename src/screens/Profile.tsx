import React, { useRef, useState } from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { StyleSheet, Image, View, TouchableOpacity, ActivityIndicator, Platform } from "react-native"

import { ScrollView } from 'react-native-gesture-handler';
import { Button, CustomView, GradientButton, GradientText, Header, Text, TextInput } from '../components';
import { BLUE, BODY_TEXT, BROWN, DARK_BLUE, GREEN, MAIN_TEXT, PURPLE, WHITE } from '../assets/colors';
import { useDispatch, useSelector } from 'react-redux';
import { loggedIn, logout } from '../store/slices/auth';
import { images } from '../assets/images';
import HorizontalLine from '../components/HorizontalLine';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAskQuestionMutation, useUploadProfileImgMutation } from '../store/services/api';
import Snackbar from 'react-native-snackbar';
import { Edit } from '../assets/svgs/edit';
import { emptySplitApi } from '../store/services/emptySplitApi';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const Profile = () => {
  const [isView, setIsView] = useState(false)
  const [question, setQuestion] = useState('')
  const [askQuestion, { isLoading: isAskQuestionLoading }] = useAskQuestionMutation();
  const [uploadProfileImg, { isLoading: isProfileImgLoading }] = useUploadProfileImgMutation();

  const dispatch = useDispatch()

  const { user, token } = useSelector((state: any) => state.auth)
  const refRBSheet: any = useRef();
  const submitQuestionSheet: any = useRef();

  const handleLogout = () => {
    dispatch(emptySplitApi.util.resetApiState())
    dispatch(logout())
  }

  const accounts = [
    { name: 'Phone Number', number: '+1 23 45679 1112', status: 'Verified', Image: images.phone, color: BROWN },
    { name: 'Identity', number: 'Not Verified', status: 'Verify Now', Image: images.personalcard, color: PURPLE },
    { name: 'Phone Number', number: '+1 23 45679 1112', status: 'Verified', Image: images.bank, color: GREEN },
    { name: 'Phone Number', number: '+1 23 45679 1112', status: 'Verified', Image: images.paypal, color: DARK_BLUE },
  ]

  const imagePickerFromGalley = async () => {
    const options = {
      storageOptions: {
        path: 'image'
      }
    }
    request(Platform.OS == 'ios' ? PERMISSIONS.IOS.MEDIA_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then(async() => {
      if (RESULTS.GRANTED) { 
        //@ts-ignore
        launchImageLibrary(options).then((resp) => {
          if (resp.didCancel) {
            console.log('User cancelled image picker');
          } else if (resp.errorMessage) {
            console.log('ImagePicker Error: ', resp.errorMessage);
          } else {
            //@ts-ignore
            handleProfileImg(resp?.assets[0])
          }
        });
      }
    })
  }

  const imagePickerCamera = async () => {
    const options = {
      storageOptions: {
        path: 'image'
      }
    }
    request(Platform.OS == 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then(async() => {
      if (RESULTS.GRANTED) {
        //@ts-ignore
        const result = await launchCamera(options);
        if (result.didCancel) {
          console.log('User cancelled image picker');
        } else if (result.errorMessage) {
          console.log(result.errorMessage);
        } else {
          //@ts-ignore
          handleProfileImg(result?.assets[0])
        }
      }
    })
  }

  const handleAskQuestion = () => {
    if (!question) return Snackbar.show({
      text: `❗️Question can't be empty`,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: 'red',
      textColor: '#fff'
    });
    askQuestion({ question: question }).then((res: any) => {
      Snackbar.show({
        text: `✅ ${res.data.message}`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#D6CDFE',
        textColor: '#fff'
      });
      setQuestion('')
      submitQuestionSheet.current.close()
    }).catch((e) => {
      Snackbar.show({
        text: `❗️${e.error}`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: '#fff'
      });
    })
  }

  const handleProfileImg = (img: any) => {
    const formData = new FormData();
    formData.append('picture', {
      uri: img.uri,
      type: img.type,
      name: img.fileName,
    });
    uploadProfileImg(formData).then((res: any) => {
      dispatch(loggedIn({ token: token, user: res.data?.user }))
      refRBSheet.current.close()
      Snackbar.show({
        text: `✅ ${res?.data?.message}`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#D6CDFE',
        textColor: '#fff'
      });
    }).catch((e) => {
      Snackbar.show({
        text: `❗️${e.error}`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: '#fff'
      });
    })
  }

  console.log('profileImage', user?.profilePic);
  

  return (
    // isView ? 
    <CustomScrollView>
      <Header EditButton={true} style={{ height: !isView ? heightPercentageToDP("50%") : heightPercentageToDP("42%") }} title={!isView ? "Profile" : user?.name} notShowImage={true} hasBack={true} />
      <CustomView>
        <View style={{ ...styles.profileContainer, marginTop: !isView ? heightPercentageToDP("-35%") : heightPercentageToDP("-27%") }}>
          <View>
            {isProfileImgLoading ? <View style={{ ...styles.image, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator animating={true} color={'#fff'} size="large" /></View> : user?.profilePic ? <Image source={{ uri: user?.profilePic }} style={styles.image} resizeMode='cover' /> :
              <Image source={images.profileImage} style={styles.image} resizeMode='cover' />
            }
            <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{ position: 'absolute', bottom: heightPercentageToDP('0.8%'), right: widthPercentageToDP('0.8%'), backgroundColor: WHITE, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}>
              <Edit width={widthPercentageToDP('3%')} height={heightPercentageToDP('3%')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.headingContainer}>
            <Text variant='heading' style={styles.heading}>{user?.name}</Text>
          </View>
          <Text variant='subheading' style={styles.subheading}>{user?.email}</Text>
        </View>
        <View style={{ marginTop: !isView ? heightPercentageToDP("5%") : heightPercentageToDP("14%") }}>
          {accounts.map((item, i) => {
            return (
              <TouchableOpacity key={i}>
                <View style={styles.mainTransactionDiv}>
                  <View style={styles.transactionSend}>
                    <View style={{ backgroundColor: item.color, padding: 7, justifyContent: 'center', alignItems: 'center', borderRadius: 12, width: 40 }}>
                      <Image source={item.Image} style={{ width: 20, height: 20 }} resizeMode="cover" />
                    </View>
                    <View>
                      <Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>{item.name}</Text>
                      <Text variant='subheading' style={{ fontSize: 12, color: BODY_TEXT }}>{item.number}</Text>
                    </View>
                    <View>
                    </View>
                  </View>
                  <TouchableOpacity style={{ backgroundColor: item.status == 'Verified' ? GREEN : '', borderColor: item.status === 'Verify Now' ? BLUE : '', borderWidth: item.status === 'Verify Now' ? 1 : 0, width: 75, borderRadius: 12, paddingVertical: 3 }}>
                    <Text variant='subheading' style={{ fontSize: 10, color: item.status === 'Verify Now' ? BLUE : WHITE, textAlign: 'center' }}>{item.status}</Text>
                  </TouchableOpacity>
                </View>
                <HorizontalLine />
              </TouchableOpacity>
            )
          })
          }
        </View>
        {/* <TouchableOpacity onPress={() => setIsView(!isView)} style={{ position: 'absolute', top: 15, alignSelf: 'center' }}>
          <Image style={{ width: 15, height: 15 }} source={images.arrow} resizeMode="contain" />
        </TouchableOpacity> */}
        <GradientButton style={styles.button} onPress={() => submitQuestionSheet.current.open()} text="Submit A Question" />
        <GradientButton onPress={handleLogout} style={styles.button} text="Logout" />
      </CustomView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          },
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}
      >
        <GradientButton onPress={() => imagePickerCamera()} style={styles.submitButton} text='Camera' />
        <GradientButton onPress={() => imagePickerFromGalley()} style={styles.submitButton} text='Gallery' />
      </RBSheet>

      <RBSheet
        ref={submitQuestionSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        closeDuration={20}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          },
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: heightPercentageToDP("60%")
          },
        }}
      >
        <KeyboardAwareScrollView style={{ paddingHorizontal: 50 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <GradientText style={{ fontSize: 18, }}>Submit a question</GradientText>
          </View>
          {/* <TextInput title='Name' value={name} onChangeText={(text: string) => setName(text)} />
          <TextInput title='Email' value={email} onChangeText={(text: string) => setEmail(text)} /> */}
          <TextInput title='Question' placeholder='Ask a question' value={question} onChangeText={(text: string) => setQuestion(text)} numberOfLines={5} multiline={true} style={{ height: heightPercentageToDP("30%"), textAlignVertical: 'top' }} />
          <GradientButton style={styles.submitButton} text='Submit' isLoading={isAskQuestionLoading} onPress={() => handleAskQuestion()} />
        </KeyboardAwareScrollView>
      </RBSheet>
    </CustomScrollView>

    // :
    // <View>
    //   <Header EditButton={true} style={{ height: !isView ? heightPercentageToDP("50%") : heightPercentageToDP("42%") }} title={!isView ? "Profile" : "Hello, Amar"} notShowImage={true} hasBack={true} />
    //   <CustomView>
    //     <View style={{ ...styles.profileContainer, marginTop: !isView ? heightPercentageToDP("-35%") : heightPercentageToDP("-27%") }}>
    //       <Image source={images.profileImage} style={styles.image} resizeMode='cover' />
    //       <View style={styles.headingContainer}>
    //         <Text variant='heading' style={styles.heading}>{user?.name}</Text>
    //       </View>
    //       <Text variant='subheading' style={styles.subheading}>{user?.email}</Text>
    //     </View>
    //     <View style={{ marginTop: !isView ? heightPercentageToDP("5%") : heightPercentageToDP("8%") }}>
    //       {
    //         accounts.map((item) => {
    //           return (
    //             <TouchableOpacity>
    //               <View style={styles.mainTransactionDiv}>
    //                 <View style={styles.transactionSend}>
    //                   <View style={{ backgroundColor: item.color, padding: 7, justifyContent: 'center', alignItems: 'center', borderRadius: 12, width: 40 }}>
    //                     <Image source={item.Image} style={{ width: 20, height: 20 }} resizeMode="cover" />
    //                   </View>
    //                   <View>
    //                     <Text variant='heading' style={{ fontSize: 16, color: MAIN_TEXT }}>{item.name}</Text>
    //                     <Text variant='subheading' style={{ fontSize: 12, color: BODY_TEXT }}>{item.number}</Text>
    //                   </View>
    //                   <View>
    //                   </View>
    //                 </View>
    //                 <TouchableOpacity style={{ backgroundColor: item.status == 'Verified' ? GREEN : '', borderColor: item.status === 'Verify Now' ? BLUE : '', borderWidth: item.status === 'Verify Now' ? 1 : 0, width: 75, borderRadius: 12, paddingVertical: 3 }}>
    //                   <Text variant='subheading' style={{ fontSize: 10, color: item.status === 'Verify Now' ? BLUE : WHITE, textAlign: 'center' }}>{item.status}</Text>
    //                 </TouchableOpacity>
    //               </View>
    //               <HorizontalLine />
    //             </TouchableOpacity>
    //           )
    //         })
    //       }
    //     </View>
    //     <TouchableOpacity hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }} onPress={() => setIsView(!isView)} style={{ position: 'absolute', top: 15, alignSelf: 'center' }}>
    //       <Image style={{ width: 15, height: 15 }} source={images.arrow} resizeMode="contain" />
    //     </TouchableOpacity>
    //     <GradientButton style={styles.button} text="Submit A Question" />
    //   </CustomView>
    // </View>
  )
}

const CustomScrollView = ({ children }: any) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
      {children}
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  button: {
    width: 200,
    alignSelf: 'center',
    marginTop: 20
  },

  addButton: {
    width: widthPercentageToDP('23%'),
    position: 'absolute',
    backgroundColor: WHITE,
    top: 10
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
  heading: {
    fontSize: 32,
    lineHeight: 40,
    color: WHITE,
  },
  subheading: {
    fontSize: 14,
    lineHeight: 40,
    color: WHITE,
  },
  headingContainer: {
    marginTop: 16,
  },
  container: {
    marginTop: heightPercentageToDP("10%")
  },
  headerContainer: {
    height: heightPercentageToDP("50%")
  },
  mainTransactionDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  transactionSend: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  submitButton: {
    marginTop: heightPercentageToDP('3.8%'),
    width: widthPercentageToDP('65%'),
    alignSelf: 'center',
  }
})