import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {dummyData, COLORS, SIZES, FONTS, icons, images} from '../constants';
import LinearGradient from 'react-native-linear-gradient';

const NotificationItem = ({customContainerStyle,title,body,time}) =>{
    return(
        <View
        style = {{
          backgroundColor:COLORS.lightGray2,
          flexDirection:'row',
          borderRadius: SIZES.radius,
          padding:SIZES.radius,
          ...customContainerStyle
        }}
      >
        {/* image */}
        <View
          style={{
            backgroundColor:COLORS.primary,
            width:60,
            height:60,
            justifyContent:'center',
            alignItems:'center',
            borderRadius: 10
          }}
        >
          <Image
          source={icons.notification}
            style={{
              width:30,
              height:30
            }}
          />
        </View>
        {/* Description */}
        <View
          style={{
            flex:1,
            marginLeft: 10
          }}
        >
          {/* Title */}
          <Text style={{
            ...FONTS.h3,
            color:COLORS.black
          }}>{title}</Text>
          {/* Contnet */}
          <Text style={{
            ...FONTS.body3
          }}>{body}</Text>
        {/*   <Text>Util Nov 30,2021</Text> */}
          {/* Time */}
          <Text style={{
            ...FONTS.body4,
            color:COLORS.black
          }}>{time}</Text>
        </View>
      </View>
    )
}

export default NotificationItem;