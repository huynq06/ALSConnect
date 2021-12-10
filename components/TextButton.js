import React,{useState,useEffect} from 'react';
import {
    TouchableOpacity,ActivityIndicator
} from 'react-native';
import {dummyData,COLORS,SIZES,FONTS,icons} from '../constants'
import Text from '../constants/Text'

const TextButton = ({label,buttonContainerStyle,onPress,disabled,labelStyle,isLoading})=>{
    return(
        <TouchableOpacity
           onPress={onPress}
           disabled={disabled}
           style={{
               justifyContent:'center',
               alignItems:'center',
               backgroundColor:COLORS.primaryALS,
               ...buttonContainerStyle
           }} 
        >
            {isLoading?  <ActivityIndicator size="small" color={COLORS.primaryALS} /> : <Text secondaryALS  h3  style={{...labelStyle}} >{label}</Text>}
        </TouchableOpacity>
    )
}
export default TextButton;