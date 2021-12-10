import React, { useEffect, useState } from 'react';
import {
    View,
    BackHandler,
    Image
} from 'react-native';
import {
    images,
    constants,
    Text,
    FONTS,
    SIZES,
    COLORS,
    dummyData,
    icons,
  } from "../../constants";
  import TextButton from '../../components/TextButton';
const SignupSuccess = ({ navigation }) => {
    useEffect(()=>{
        const backHandler = BackHandler.addEventListener('hardwareBackPress',()=>{return true})
        return ()=> backHandler.remove()
    },[])
    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal:SIZES.padding,
                backgroundColor:COLORS.white
            }}
        >
            <View
                style={{
                    flex:1,
                    alignItems:'center',
                    justifyContent:'center'
                }}
            >
                <Image
                    source={images.success}
                    style={{
                        width:150,
                        height:150
                    }}
                    resizeMode="contain"
                />
                <Text h1 style={{marginTop:SIZES.padding}}>Register successfully!</Text>
                {/* <Text style={{textAlign:'center',marginTop:SIZES.base}} darkGray body3>Payment was successfully made!</Text> */}
            </View>
            <TextButton
                label="Login"
                buttonContainerStyle={{
                    height:55,
                    marginBottom: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor:COLORS.primary
                }}
                onPress={()=>navigation.navigate('Login')}
            />
        </View>
    )
}

export default SignupSuccess