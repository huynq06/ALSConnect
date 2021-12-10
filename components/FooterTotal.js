import React, {useState, useEffect} from 'react';
import {Platform, View} from 'react-native';
import {dummyData, COLORS, SIZES, FONTS, icons, Text} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import TextButton from './TextButton';

const FooterTotal = ({total, onPress}) => {
  return (
    <View
        style={{
            position:'absolute',
            bottom:0,
            left:0,
            right:0,
            //backgroundColor:COLORS.red
        }}
    >
      {/* Shadow */}
      <LinearGradient
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 0,
          y: 1,
        }}
        colors={[COLORS.transparent, COLORS.lightGray1]}
        style={{
          position: 'absolute',
          top: -15,
          left: 0,
          right: 0,
          height: Platform.OS === 'ios' ? 200 : 50,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
      <View
        style={{
          padding: SIZES.padding,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: COLORS.white,
        }}>
        <View
          style={{
            flexDirection: 'row',
            //marginTop: SIZES.padding,
          }}>
          <Text
            style={{
              flex: 1,
            }}
            body2>
            Total
          </Text>
          <Text h2>{total}</Text>
        </View>
        {/* Order */}
        <TextButton
          buttonContainerStyle={{
            height: 60,
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primaryALS,
          }}
          label="Order Now"
          onPress={onPress}
        />
      </View>
    </View>
  );
};
export default FooterTotal