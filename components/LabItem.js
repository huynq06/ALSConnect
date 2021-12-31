import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { dummyData, COLORS, SIZES, FONTS, icons } from "../constants";
import Text from "../constants/Text";
import IconLabel from "./IconLabel";
import TextButton from "./TextButton";
import Icon from 'react-native-vector-icons/FontAwesome';
//import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

const LabItem = ({ containerStyle, item,isFavourite = false,onPress,onToggleFavourite }) =>{
    const onPressHandler = ()=>{
      }
    return(
        <TouchableOpacity
      style={{
     //   height: 100,
        borderRadius: SIZES.radius,
        marginHorizontal: SIZES.padding,
        marginVertical: SIZES.base,
        paddingTop: SIZES.radius,
        backgroundColor:COLORS.white,
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
          {item?.genralExp.Mawb}
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
          onPress = {()=>{}}
          >
     <Image source={icons.love}
            style={{
              width:20,
              height:20,
              tintColor: COLORS.red ,
            }}
          /> 
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
        <Text h4 green style={{marginLeft:SIZES.base}}>{item?.genralExp?.Commodity}</Text>
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
          label={item?.genralExp?.Pieces}
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
          label={item?.genralExp?.Weight}
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
     
        </View>
      
      </View>
    </TouchableOpacity>
    )
}

export default LabItem;