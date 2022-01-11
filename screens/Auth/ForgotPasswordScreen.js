import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  Image,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard
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

const ForgotPasswordScreen = ({navigation}) => {
    const [email,setEmail]= useState('');
    const [emailError,setEmailError]= useState('')
    const dispatch = useDispatch()
     function isEnableSignUp(){
        return email != "" && emailError=="";
    }
    console.log('isEnableSignUp',isEnableSignUp())
    const handleSendEmail = async () =>{
        Keyboard.dismiss()
        try {
            await dispatch(authActions.resetPassword(email))
            navigation.navigate("ResetPasswordSuccess",{email:email})
          } catch (err) {
            Alert.alert(err.message);
            // setError(err.message);
            // setIsLoading(false);
          }
        
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
                inputValue={email}
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
                        <Image source={email=="" || (email!="" && emailError=="")? icons.correct : icons.close} style={{
                            height:20,
                            width:20,
                            tintColor: email== "" ? COLORS.gray : (email != "" && emailError=="")? COLORS.green: COLORS.red
                        }} />
                    </View>
                }
            />
              
          
        </View>
        {/* Footer */}
        <TextButton
                 label="Send Email"
                 disabled={!isEnableSignUp()}
                buttonContainerStyle={{
                    height:55,
                    marginBottom: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: isEnableSignUp()? COLORS.primaryALS : COLORS.transparentprimaryALS
                }}
                onPress={()=>handleSendEmail()}
            />
        
    </AuthLayout>
    )
}

export default ForgotPasswordScreen;