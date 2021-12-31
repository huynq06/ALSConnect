import React from 'react';
import {
    TouchableOpacity,Text,View,Image
} from 'react-native';
import {dummyData,COLORS,SIZES,FONTS,icons} from '../constants'
const ProfileValue = ({icon,label,value,onPress})=>{
    return(
        <TouchableOpacity
            style={{
                flexDirection:'row',
                height:80,
                alignItems:'center'
            }}
            onPress={onPress}
        >
            {/* icon */}
            <View
                style={{
                    width:40,
                    height:40,
                    justifyContent:'center',
                    borderRadius:20,
                    backgroundColor: COLORS.white
                }}
            >
                <Image
                    source={icon}
                    resizeMode='contain'
                    style={{
                        width:25,
                        height:25,
                        tintColor: COLORS.secondaryALS
                    }}
                />
            </View>
            {/* Label and value */}
            <View
                style={{
                    flex:1,
                    marginLeft: SIZES.radius
                }}
            >
                {label && <Text
                    style={{
                        color: COLORS.gray30,
                        ...FONTS.body3
                    }}
                >{label}</Text>}
                <Text
                    style={{
                        color: COLORS.primaryALS,
                        ...FONTS.h3
                    }}
                >{value}</Text>
            </View>
            {/* icon */}
            <Image
                source={icons.right_arrow}
                style={{
                    width:15,
                    height:15,
                    tintColor: COLORS.primaryALS
                }}
            />
        </TouchableOpacity>
    )
}
export default ProfileValue
