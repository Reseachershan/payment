import React from 'react';
import { Image, StatusBar, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { TRANSPARENT, WHITE } from '../assets/colors';
import { images } from '../assets/images';
import { Location, Sun } from '../assets/svgs';
import { Text } from './Text';
import { GradientView } from './View';

interface HomeHeaderProps extends ViewProps {
  leftIcon?: SVGSVGElement;
  rightIcon?: SVGSVGElement;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  hasBack?: boolean;
  title?: string;
  style?: ViewStyle;
  showImage?: boolean
}

export const HomeHeader = ({ leftIcon, showImage, onPressLeftIcon = () => { }, rightIcon, onPressRightIcon = () => { }, title, style = {}, hasBack = true, ...props }: HomeHeaderProps) => {
  const { top: topInset } = useSafeAreaInsets();
  const { user, profile } = useSelector((state: any) => state.auth)
  
  return (
    <GradientView style={{ height: hp('30%'), width: wp('100%'), paddingTop: (StatusBar.currentHeight || 0) + topInset, ...style }} {...props}>
      <View style={styles.headerRow}>
        <View style={styles.viewRow}>
          <TouchableOpacity style={styles.imageView} onPress={onPressLeftIcon}>
            {user?.profilePic ? <Image source={{ uri: user?.profilePic }} style={styles.image} resizeMode='cover' /> :
              <Image source={images.profileImage} style={styles.image} resizeMode='cover' />
            }
          </TouchableOpacity>
          <View>
            <Text numberOfLines={1} variant='heading' style={{ fontSize: 20, color: WHITE, width: 130 }}>{user.name}</Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Location />
              <Text variant='subheading' style={{ fontSize: 10, color: WHITE }}> {user.country}</Text>
            </View>
          </View>
        </View>

        <View style={styles.viewRow}>
          <View>
            <Text variant='heading' style={{ fontSize: 20, color: WHITE }}>28°C</Text>
            <Text variant='subheading' style={{ fontSize: 10, color: WHITE, textAlign: 'right' }}>82.4°F</Text>
          </View>
          <View style={styles.sunView}>
            <Sun />
          </View>
        </View>
      </View>
    </GradientView>
  );
};

const styles = StyleSheet.create({
  headerLogo: {
    marginTop: hp('1%'),
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  headerRow: {
    height: 48,
    paddingHorizontal: wp('8.7%'),
    marginTop: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    backgroundColor: TRANSPARENT
  },
  viewRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  imageView: {
    width: 45,
    height: 45,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',

  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  sunView: {
    width: 45,
    height: 45,
    borderRadius: 45,
    overflow: 'hidden',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});