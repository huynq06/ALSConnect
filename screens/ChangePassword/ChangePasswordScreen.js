import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
  } from 'react-native';
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    icons,
    images,
    theme,
  } from '../../constants';
import Header from "../../components/Header";
import FormInput from "../../components/FormInput";
import { useDispatch } from 'react-redux';
import TextButton from "../../components/TextButton";
import { utils } from "../../utils";
import * as authActions from '../../stores/actions/auth'
import LineDivider from "../../components/LineDivider";
const ChangePasswordScreen = ({navigation,route}) =>{
    const dispatch = useDispatch();
    const [password,setPassword]= useState('')
    const [passwordError,setPasswordError]= useState('')
    const [newPassword,setNewPassword]= useState('')
    const [newPasswordError,setNewPasswordError]= useState('')
    const [showPass,setShowPass]= useState(false)
    const [showNewPassword,setShowNewPassword]= useState(false)
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    function isEnableSendPass(){
        return password !="" && newPassword!="" && newPasswordError == "" && passwordError==""
    }
    const changePasswordHandle = async () =>{
        const action = authActions.changePassword(password,newPassword)
        setError(null);
        setIsLoading(true)
        try{
          await dispatch(action);
          setIsLoading(false);
          navigation.goBack()
        }catch(err){
          Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
          setError(err);
          setIsLoading(false);
        }
    }
    function renderHeader(){
        return(
            <Header
            containerStyle={{
              height: 80,
              paddingHorizontal: SIZES.padding,
              //  marginTop:SIZES.padding,
              alignItems: 'center',
              backgroundColor: COLORS.white,
              //   borderBottomRightRadius:SIZES.radius*2
            }}
            title="Change Password"
            leftComponent={
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: SIZES.radius,
                  borderWidth: 1,
                  borderColor: COLORS.gray2,
                }}
                onPress={() => navigation.goBack()}>
                <Image
                  source={icons.back}
                  style={{
                    width: 25,
                    height: 25,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            }
          />
        )
    }
    return(
        <View
            style={{
                flex:1,
                backgroundColor:COLORS.white
            }}
        >
             {renderHeader()}
             <View
        style={{
          height: 80,
          backgroundColor: COLORS.white,
        }}></View>
    <View
        style={{
            marginHorizontal:SIZES.padding,
            marginTop:SIZES.padding,
            backgroundColor:COLORS.lightGray2,
            paddingVertical:15,
            paddingHorizontal:15,
            borderRadius:SIZES.radius
        }}
    >
    <FormInput
                label='Current Password'
                autoCompleteType="password"
                secureTextEntry={!showPass}
                containerStyle={{
                }}
                inputContainerStyle={{
                    backgroundColor:COLORS.white,
                }}
                inputStyle={{
                    backgroundColor:COLORS.white,
                    borderRadius:SIZES.radius
                }}
                onChange={(text) => {
                    setPassword(text);
                  }}
                errMsg={passwordError}
                appendComponent={
                    <TouchableOpacity
                        style={{
                            width:40,
                            alignItems:'flex-end',
                            justifyContent:'center'
                        }}
                        onPress={()=>setShowPass(!showPass)}
                    >
                        <Image 
                        source={showPass? icons.eye_close: icons.eye} 
                        style={{
                            height:20,
                            width:20,
                            tintColor:COLORS.gray
                        }}
                        />
                    </TouchableOpacity>
                }
            />
            <FormInput
                label='New Password'
                autoCompleteType="password"
                secureTextEntry={!showNewPassword}
                containerStyle={{
                    //backgroundColor:COLORS.red,
                }}
                inputContainerStyle={{
                    backgroundColor:COLORS.white,
                }}
                inputStyle={{
                    backgroundColor:COLORS.white,
                    borderRadius:SIZES.radius
                }}
                onChange={(value)=>{
                    //valid email
                 utils.validatePassword(value,setNewPasswordError)
                    setNewPassword(value)
                }}
                errMsg={newPasswordError}
                appendComponent={
                    <TouchableOpacity
                        style={{
                            width:40,
                            alignItems:'flex-end',
                            justifyContent:'center'
                        }}
                        onPress={()=>setShowNewPassword(!showNewPassword)}
                    >
                        <Image 
                        source={showNewPassword? icons.eye_close: icons.eye} 
                        style={{
                            height:20,
                            width:20,
                            tintColor:COLORS.gray
                        }}
                        />
                    </TouchableOpacity>
                }
            />
    </View>
    <View
        style={{
            marginTop:SIZES.padding,
            marginHorizontal:SIZES.padding,
        }}
    >
        <Text style={{
            ...FONTS.h3
        }}>Password must contain the following</Text>
        <View
            style={{
                flexDirection:'row',
            
                justifyContent:'center',
                alignItems:'center'
            }}
        >
            <View
                style={{
                    width:3,
                    height:3,
                    borderRadius:1.5,
                    backgroundColor:COLORS.darkGray,
                  
                }}
            ></View>
            <Text
                style={{
                    flex:1,
                    marginLeft: SIZES.base,
                    ...FONTS.body3
                }}
            > At least one lowercase letter</Text>
        </View>
        <View
            style={{
                flexDirection:'row',
            
                justifyContent:'center',
                alignItems:'center'
            }}
        >
            <View
                style={{
                    width:3,
                    height:3,
                    borderRadius:1.5,
                    backgroundColor:COLORS.darkGray,
                  
                }}
            ></View>
            <Text
                style={{
                    flex:1,
                    marginLeft: SIZES.base,
                    ...FONTS.body3
                }}
            > At least one Uppercase letter</Text>
        </View>
        <View
            style={{
                flexDirection:'row',
            
                justifyContent:'center',
                alignItems:'center'
            }}
        >
            <View
                style={{
                    width:3,
                    height:3,
                    borderRadius:1.5,
                    backgroundColor:COLORS.darkGray,
                  
                }}
            ></View>
            <Text
                style={{
                    flex:1,
                    marginLeft: SIZES.base,
                    ...FONTS.body3
                }}
            > At least one Number</Text>
        </View>
        <View
            style={{
                flexDirection:'row',
            
                justifyContent:'center',
                alignItems:'center'
            }}
        >
            <View
                style={{
                    width:3,
                    height:3,
                    borderRadius:1.5,
                    backgroundColor:COLORS.darkGray,
                  
                }}
            ></View>
            <Text
                style={{
                    flex:1,
                    marginLeft: SIZES.base,
                    ...FONTS.body3
                }}
            > At least one symbol character</Text>
        </View>
        <View
            style={{
                flexDirection:'row',
            
                justifyContent:'center',
                alignItems:'center'
            }}
        >
            <View
                style={{
                    width:3,
                    height:3,
                    borderRadius:1.5,
                    backgroundColor:COLORS.darkGray,
                  
                }}
            ></View>
            <Text
                style={{
                    flex:1,
                    marginLeft: SIZES.base,
                    ...FONTS.body3
                }}
            > Minimum 6 characters</Text>
        </View>
    </View>
    <View
        style={{
            flex:1,
            backgroundColor:COLORS.white,
            justifyContent:'flex-end',
            paddingBottom:SIZES.padding,
            marginHorizontal:SIZES.padding

        }}
    >
    <TextButton
    
    label="Change Password"
   disabled = {isEnableSendPass()? false : true}
   buttonContainerStyle={{
        height:55,
        alignItems:'center',
        marginTop:SIZES.padding,
        borderRadius: SIZES.radius,
        backgroundColor: isEnableSendPass()?  COLORS.primaryALS : COLORS.transparentprimaryALS
    }}
    onPress={changePasswordHandle}
/>
    </View>
  
        </View>
    )
}

export default ChangePasswordScreen;