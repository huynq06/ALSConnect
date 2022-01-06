import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { dummyData, COLORS, SIZES, FONTS, icons } from "../constants";
import Text from "../constants/Text";
import IconLabel from "./IconLabel";
import TextButton from "./TextButton";
import Icon from 'react-native-vector-icons/FontAwesome';
//import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
const LagiItem = ({ containerStyle, item,isFavourite = false,onPress,onToggleFavourite,onPickUp }) => {
  const currentLagiIsFavorite = useSelector(state=>state.lagis.favoriteLagi.some(c=>c === item.id))
  const  toggleFavorite = () =>{
    onToggleFavourite(item.id)
  }
const onPressHandler = ()=>{
  onPress(item.id,item.mawb,item.hawb)
}
const onPickUpLagiHandler = () =>{
  onPickUp(item)
}
  return (
    <TouchableOpacity
      style={{
     //   height: 100,
        borderRadius: SIZES.radius,
        marginHorizontal: SIZES.padding,
        marginVertical: SIZES.base,
        padding: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyle,
      }}
      onPress={onPressHandler}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text h3 darkGray>
          {item.mawb + "/"}
        </Text>
        <Text h3 primary>
          {item.hawb}
        </Text>
        <View
          style={{
            flex:1,
            alignItems:'flex-end'
          }}
        >
          <TouchableOpacity
          style={{
            width:30,
            height:30,
            borderRadius:5,
            borderColor:COLORS.yellow,
            borderWidth:1,
            justifyContent:'center',
            alignItems:'center'
          }}
          onPress = {toggleFavorite}
          >
            <Icon name="bolt" size={20} color= {currentLagiIsFavorite ? COLORS.yellow : COLORS.white} />
         {/*  <Image source={icons.lighting}
            style={{
              width:20,
              height:20,
              tintColor: currentLagiIsFavorite ? COLORS.red : COLORS.white,
            }}
          /> */}
          </TouchableOpacity>
        </View>
      
      </View>
      {/* consignee */}
      <View
        style={{
            flexDirection:'row',
            marginTop:SIZES.base,
           // backgroundColor:COLORS.yellow,
            alignItems:'center'
        }}
      >
        <View
            style={{
                width:6,
                height:6,
                borderRadius: 3,
                backgroundColor: COLORS.green
            }}
        />
        <Text h4 green style={{marginLeft:SIZES.base}}>{item.consignee}</Text>
      </View>
      {/* pieces and weight */}
      <View
        style={{
          flexDirection: "row",
       //   marginTop: SIZES.base,
          justifyContent:'space-around'
        }}
      >
        <IconLabel
          containerStyle={{
              alignItems:'center',
           // backgroundColor: COLORS.primary,
            flex:1,

          }}
          icon={icons.quantity}
          iconStyle={{
              tintColor: COLORS.darkGray2
          }}
          label={item.piecesReceived}
          labelStyle={{
            color: COLORS.darkGray,
          }}
        />
        <IconLabel
          containerStyle={{
            alignItems:'center',
         //   backgroundColor: COLORS.primary,
            flex:1
          }}
          icon={icons.weight}
          label={item.weightReceived}
          labelStyle={{
            color: COLORS.gray2,
          }}
        />
        <View   style={{
            flex:1,
            alignItems:'flex-end',
            justifyContent:'center',
            //backgroundColor:COLORS.red
        }}>
        {/* <FontAwesome
      
          name="angle-right"
          size={SIZES.body3 * 1.75}
          color={COLORS.primaryALS}
        /> */}
        </View>
      
      </View>
      {/* Pick up */}
      <TextButton
        label="Pick Up"
        buttonContainerStyle={{
          height:40,
          marginTop:SIZES.padding,
          borderRadius:SIZES.radius,
          backgroundColor:COLORS.primaryALS
      }}
      onPress={onPickUpLagiHandler}
      />
    </TouchableOpacity>
  );
};
export default LagiItem;
