import React from 'react'
import { ScrollView, Image, View } from 'react-native';
import { CustomView, GradientText, Header } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images } from '../assets/images';

export const Processing = () => {

    return (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid={true}>
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
    )
}