import React from 'react';
import { View } from 'react-native';
import { LIGHT_GREY_III } from '../assets/colors';

const HorizontalLine = () => {
  return (
    <View
      style={{
        borderBottomColor: LIGHT_GREY_III,
        borderBottomWidth: 1,
        marginVertical: 10,
        marginTop: 20
      }}
    />
  );
};

export default HorizontalLine;
