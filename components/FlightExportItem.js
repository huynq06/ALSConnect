import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { dummyData, COLORS, SIZES, FONTS, icons } from "../constants";
import Text from "../constants/Text";
import IconLabel from "./IconLabel";
import TextButton from "./TextButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import RoundIcon from "./RoundIcon";
import { useSelector, useDispatch } from "react-redux";
const FlightExportItem = ({customContainerStyle,isFavourite = false,onPress,onToggleFavourite,entity}) =>{
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
            <RoundIcon
                type={entity?.FlightNo}
                border = {SIZES.radius}
                backgroundColor = {entity?.flightType == 'P' ? COLORS.secondaryALS : COLORS.primaryALS}
                tintColor = {COLORS.darkGray}
            />
            <View
                style={{
                    marginTop:SIZES.base

                }}
            >
             <Text h3  darkGray>STD: <Text body3 gray>{entity?.EstimateDate}  {entity?.EstimateTime}</Text>  </Text>
              <Text h3 darkGray>ATD: <Text  body3 gray>{entity?.ATADate} + {entity?.ATATime}</Text> </Text>
            </View>
        </View>
    )
}

export default FlightExportItem