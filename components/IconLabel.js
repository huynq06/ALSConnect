import React from "react";
import {  View,Image } from "react-native";
import {  SIZES,Text } from "../constants";

const IconLabel = ({containerStyle,icon,iconStyle,label,labelStyle})=>{
    return(
        <View
            style={{
                flexDirection:"row",
                paddingVertical:SIZES.base,
                paddingHorizontal:SIZES.radius,
                borderRadius:SIZES.radius,
                ...containerStyle
            }}
        >
            <Image
                source={icon}
                style={{
                    width:23,
                    height:23,
                    ...iconStyle
                }}
            />
            <Text
                style={{
                    marginLeft: SIZES.base,
                    ...labelStyle
                }} body3
            >{label}</Text>
        </View>
    )
}

export default IconLabel;