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
const Signup = ({navigation}) =>{
    const [email, setEmail] = useState("");
  const [emaiError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saveMe, setSaveMe] = useState(false);
  const [userName,setUserName] = useState('')
  const [userNameError, setUserNameError] = useState("");
  const [timer,setTimer] = useState(60);
  const[loading,setLoading] = useState(false);
  const[message,setMessage] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  function isEnableSignUp(){
    return email != "" && password !="" && emaiError==""&&userName!= "" && userNameError==""
}
const signupHandle = async () =>{
  const action = authActions.signup(email,userName,password);
  setError(null);
  setIsLoading(true)
  try{
    await dispatch(action);
    setIsLoading(false);
    navigation.navigate('SignupSuccess')
  }catch(err){
    console.log(err);
   // Alert.alert(err);
    setError(err);
  //  Alert.alert(err);
    setIsLoading(false);
  }
}
    return(
        <AuthLayout
      title="Getting Started"
      subTitle="Create an account to continue!"
    >
      <View
        style={{
          flex: 1,
          margin: SIZES.padding,
        }}
      >
        {/* Email */}
        <FormInput
          label="Email"
          keyboardType="email-address"
          autoCompleteType="email"
          onChange={(text) => {
          //  utils.validateEmail(text, setEmailError);
            setEmail(text);
          }}
        //  errMsg={emaiError}
          appendComponent={
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.correct}
                style={{
                  width: 20,
                  height: 20,
                  tintColor:
                    email == ""
                      ? COLORS.gray
                      : email != "" && emaiError == ""
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />
        {/* User Name */}
        <FormInput
          label="Phone"
          onChange={(text) => {
          //  utils.validateEmail(text, setEmailError);
            setUserName(text);
          }}
          placeHolder="Phone number"
        //  errMsg={emaiError}
          appendComponent={
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.correct}
                style={{
                  width: 20,
                  height: 20,
                  tintColor:
                    userName == ""
                      ? COLORS.gray
                      : userName != "" && userNameError == ""
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />
        <FormInput
          label="Password"
          autoCompleteType="password"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          secureTextEntry={!showPassword}
          errMsg={passwordError}
          onChange={(text) => {
            utils.validatePassword(text, setPasswordError);
            setPassword(text);
          }}
          appendComponent={
            <TouchableOpacity
              style={{
                justifyContent: "center",
              }}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Image
                source={showPassword ? icons.eye_close : icons.eye}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
          }
        />
        {/* Sign In & Sign up */}
        {/* {
          isLoading ? (
            <ActivityIndicator size="small" color={COLORS.primaryALS} />
          ) : (
            <TextButton
          label="Sign In"
          disabled={!isEnableSignIn()}
          buttonContainerStyle={{
            marginTop:SIZES.radius,
            paddingVertical:SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignIn()? COLORS.primaryALS : COLORS.transparentprimaryALS
          }}
          onPress={handleLogin}
          
        />
          )
        } */}
          <TextButton
          label="Sign Up"
          disabled={!isEnableSignUp()}
          buttonContainerStyle={{
            marginTop:SIZES.radius,
            paddingVertical:SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignUp()? COLORS.primaryALS : COLORS.transparentprimaryALS
          }}
          onPress={signupHandle}
          
        />
        <View
          style={{
            flexDirection:'row',
            marginTop:SIZES.radius,
            justifyContent:"center"
          }}
        >
          <Text body3>Already have an acount?</Text>
          <TouchableOpacity
          onPress={()=>navigation.navigate('Login')}
          style={{
            marginLeft:3
          }}>
            <Text primary h3>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
    )
}

export default Signup;