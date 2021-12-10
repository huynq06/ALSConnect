import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { dummyData, COLORS, SIZES, FONTS, icons } from "../constants";
import Text from "../constants/Text";
import IconLabel from "./IconLabel";
import TextButton from "./TextButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import RoundIcon from "./RoundIcon";
import { useSelector, useDispatch } from "react-redux";
const FlightItem = ({customContainerStyle,isFavourite = false,onPress,onToggleFavourite,entity}) =>{
  const currentLagiIsFavorite = useSelector(state=>state.flights.favourtiteFlights.some(c=>c === entity.id))
    const  toggleFavorite = () =>{
        onToggleFavourite(entity.id)
      }
    return(
        <View
            style={{
                width:'45%',
                padding: SIZES.base,
                alignItems:'center',
                marginBottom:SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                ...customContainerStyle
            }}
        >
              <TouchableOpacity
          style={{
            width:30,
            height:30,
            borderRadius:5,
            alignSelf:'flex-end',
            borderColor:COLORS.primary,
            borderWidth:1,
            justifyContent:'center',
            alignItems:'center'
          }}
          onPress = {toggleFavorite}
          >
            
          <Image source={icons.love}
            style={{
              width:20,
              height:20,
              tintColor: currentLagiIsFavorite ? COLORS.red : COLORS.white,
            }}
          /> 
          </TouchableOpacity>
 
            <RoundIcon
                type={entity.code +entity.flightNo}
                border = {SIZES.radius}
                backgroundColor = {entity.flightType == 'P' ? COLORS.secondaryALS : COLORS.primaryALS}
                tintColor = {COLORS.darkGray}
            />
            <View
                style={{
                    marginTop:SIZES.base

                }}
            >
             <Text h3  darkGray>STD: <Text body3 gray>{entity.ScheTime}</Text>  </Text>
              <Text h3 darkGray>ATD: <Text  body3 gray>{entity.landTime}</Text> </Text>
            </View>
        </View>
    )
}

export default FlightItem