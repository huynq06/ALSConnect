import React from "react";
import { View,TouchableOpacity,Image,Text } from "react-native";
import { COLORS,SIZES,icons } from "../constants";

const CartQuantityButton = ({containerStyle,iconStyle,quantity,onPress})=>{
    return(
        <TouchableOpacity
            style={{
                width:40,
                height:40,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:SIZES.radius,
                backgroundColor:COLORS.lightOrange2,
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Image
                source={icons.cart}
                style={{
                    width:20,
                    height:20,
                    tintColor:COLORS.black,
                    ...iconStyle
                }}
            />
            <View
                style={{
                    position:'absolute',
                    top:5,
                    right:5,
                    height:16,
                    width:16,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:8,
                    backgroundColor:COLORS.primary
                }}
            >
                <Text style={{
                    color:COLORS.white,
                    fontSize: SIZES.body5
                }}>{quantity}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default CartQuantityButton;