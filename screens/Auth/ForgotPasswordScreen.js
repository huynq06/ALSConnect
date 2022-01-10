import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  Image,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import {
  images,
  constants,                                                                
  Text,
  FONTS,
  SIZES,
  COLORS,
  icons,
} from "../../constants";
import TextButton from "../../components/TextButton";
import { useDispatch } from 'react-redux';
import AuthLayout from "./AuthLayout";
import FormInput from "../../components/FormInput";
import { utils } from "../../utils";
import CustomSwitch from "../../components/CustomSwitch";
import IconTextButton from "../../components/IconTextButton";
import * as authActions from '../../stores/actions/auth'

const ForgotPasswordScreen = () => {
    const [email,setEmail]= useState('');
    const [emailError,setEmailError]= useState('')
     function isEnableSignUp(){
        return email != "" && emailError=="";
    }
    return (
        <AuthLayout
        title="Password Recovery"
        subtitle="Please enter your email to recover your password!"
        titleContainerStyle={{
            marginTop:SIZES.padding
        }}
    >
        <View
            style={{
                flex:1,
                marginTop:SIZES.padding*2
            }}
        
        >
            {/* Form Input */}
            <FormInput
                label='Email'
                keyboardType="email-address"
                autoCompleteType="email"
                onChange={(value)=>{
                    //valid email
                    utils.validateEmail(value,setEmailError)
                    setEmail(value)
                }}
                errorMsg={emailError}
                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image source={email=="" || (email!="" && emailError=="")? icons.correct : icons.cherry} style={{
                            height:20,
                            width:20,
                            tintColor: email== "" ? COLORS.gray : (email != "" && emailError=="")? COLORS.green: COLORS.red
                        }} />
                    </View>
                }
            />
            
            <TextButton
                label="Send Email"
               disabled = {isEnableSignUp()? false : true}
                customContainerStyle={{
                    height:55,
                    alignItems:'center',
                    marginTop:SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: isEnableSignUp()?  COLORS.primary : COLORS.transparentPrimary
                }}
                onPress={()=>{navigation.navigate.goBack()}}
            />
          
        </View>
        {/* Footer */}
        
    </AuthLayout>
    )
}

export default ForgotPasswordScreen;