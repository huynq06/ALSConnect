import React,{useState,useEffect} from 'react';
import {
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import {dummyData,COLORS,SIZES,FONTS,icons} from '../constants'
import Text from '../constants/Text'

const IconTextButton = ({label,icon,customContainerStyle,iconStyle,onPress,labelStyle})=>{
    return(
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                ...customContainerStyle
            }}
        
        >
            <Image source={icon}
                style={{
                    width:20,
                    height:20,
                    ...iconStyle
                }}
            />
            <Text style={{
                ...labelStyle
            }}>{label}</Text>
        </TouchableOpacity>
    )
}
export default IconTextButton;