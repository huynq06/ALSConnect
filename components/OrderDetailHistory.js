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
import {dateWithTime} from '../utils/dateHelpers';
const OrderDetailHistory = ({customContainerStyle, history, onPress}) => {
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZES.base,
      }}
      onPress={() => onPress(item)}>
      {item.isFavourite ? <View></View>: <View style={{
              width:12,
              height:12
          }} /> }
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
        }}>
        <Text style={{...FONTS.h3}}>{item.mawb}</Text>
        <Text style={{...FONTS.body4, color: COLORS.gray}}>{item.hawb}</Text>
      </View>
      <View
        style={{flexDirection: 'row', height: '100%', alignItems: 'center'}}>
        
        <Image
          source={icons.right_arrow}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.gray,
          }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        padding: 20,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...customContainerStyle,
      }}>
      {/*  <Text style={{...FONTS.h2}}>Transaction History</Text> */}
      <FlatList
        contentContainerStyle={{
          marginTop: SIZES.radius,
        }}
        scrollEnabled={false}
        data={history}
        keyExtractor={item => `${item.lId}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: COLORS.lightGray2,
              }}></View>
          );
        }}
      />
    </View>
  );
};

export default OrderDetailHistory;
