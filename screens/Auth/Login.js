import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  ImageBackground,
  Image,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
} from 'react-native';
import {
  images,
  constants,
  Text,
  FONTS,
  SIZES,
  COLORS,
  icons,
} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextButton from '../../components/TextButton';
import {useDispatch} from 'react-redux';
import AuthLayout from './AuthLayout';
import FormInput from '../../components/FormInput';
import {utils} from '../../utils';
import CustomSwitch from '../../components/CustomSwitch';
import IconTextButton from '../../components/IconTextButton';
import * as authActions from '../../stores/actions/auth';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emaiError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saveMe, setSaveMe] = useState(false);
  const [timer, setTimer] = useState(60);
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  function isEnableSignIn() {
    return email != '' && password != '' && emaiError == '';
  }
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const handleLogin = async () => {
    let action;
    setIsLoading(true);
    await AsyncStorage.setItem('userLogin', email);
    if(saveMe){
      await AsyncStorage.setItem('passwordLogin', password);
    }
    else{
      await AsyncStorage.removeItem("passwordLogin");
    }
    action = authActions.login(email, password);
    setError(null);
    try {
      await dispatch(action);
    } catch (err) {
      //Alert.alert(err);
      setError(err.message);
      setIsLoading(false);
    }
  };
  const setSaveMeHandler = async (value) =>{
    if(value){
      await   AsyncStorage.setItem('saveMe', 'true');
    }
    else {
      await   AsyncStorage.setItem('saveMe', 'false');
    }
   setSaveMe(value);
  }
  const getData = useCallback(async ()=>{
    const saveMeStore = await AsyncStorage.getItem('saveMe');
    const userLogin = await AsyncStorage.getItem('userLogin');
    console.log('userLogin:',userLogin)
    if(userLogin){
      console.log('da chay vao getData')
      setEmail(userLogin)
    }
    const passwordLogin = await AsyncStorage.getItem('passwordLogin');
    if(passwordLogin){
      setPassword(passwordLogin)
    }
    if(saveMeStore=='true'){
      setSaveMe(true)
    }
  },[])
  useEffect(() => {
    getData()
  }, []);
  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);
  return (
    <AuthLayout
      title="Let's Sign You In"
      subTitle="Welcome back, you 've been missed">
      <View
        style={{
          flex: 1,
          margin: SIZES.padding,
        }}>
        {/* Email */}
        <FormInput
          label="User"
          keyboardType="email-address"
          autoCompleteType="email"
          inputValue={email}
          inputStyle={{
            color: COLORS.primaryALS,
          }}
          onChange={text => {
            //  utils.validateEmail(text, setEmailError);
            setEmail(text);
          }}
          
          //  errMsg={emaiError}
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Image
                source={icons.correct}
                style={{
                  width: 20,
                  height: 20,
                  tintColor:
                    email == ''
                      ? COLORS.gray
                      : email != '' && emaiError == ''
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
          inputValue={password}
          inputStyle={{
            color: COLORS.primaryALS,
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          secureTextEntry={!showPassword}
          errMsg={passwordError}
          onChange={text => {
            utils.validatePassword(text, setPasswordError);
            setPassword(text);
          }}
          appendComponent={
            <TouchableOpacity
              style={{
                justifyContent: 'center',
              }}
              onPress={() => setShowPassword(prev => !prev)}>
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
        {/* Save Me & Fogot Password */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'space-between',
          }}>
          <CustomSwitch
            value={saveMe}
            onChange={value => {
              setSaveMeHandler(value)
             
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text body4 gray>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        {/* Sign In & Sign up */}
        {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.primaryALS} />
        ) : (
          <TextButton
            label="Sign In"
            disabled={!isEnableSignIn()}
            buttonContainerStyle={{
              marginTop: SIZES.radius,
              paddingVertical: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: isEnableSignIn()
                ? COLORS.primaryALS
                : COLORS.transparentprimaryALS,
            }}
            onPress={handleLogin}
          />
        )}
        {/*  <TextButton
          label="Sign In"
          isLoading = {isLoading}
          disabled={!isEnableSignIn()}
          buttonContainerStyle={{
            marginTop:SIZES.radius,
            paddingVertical:SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignIn()? COLORS.primaryALS : COLORS.transparentprimaryALS
          }}
          onPress={handleLogin}
          
        /> */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text body3>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={{
              marginLeft: 3,
            }}>
            <Text primary h3>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        {/* Login with Google & Facebook */}
        <View>
          {/*  <IconTextButton
            label="Continue with Facebook"
            customContainerStyle={{
              height:50,
              backgroundColor:COLORS.blue,
              marginTop:SIZES.padding,
              borderRadius:SIZES.radius
            }}
            icon={icons.fb}
            iconStyle={{
              marginRight:SIZES.base
            }}
            labelStyle={{
              color:COLORS.white,
              fontSize: SIZES.body3
            }}
            onPress={()=>{console.log('log in with fb')}}
          /> */}
          {/*   <IconTextButton
            label="Continue with Google"
            customContainerStyle={{
              height:50,
              backgroundColor:COLORS.lightGray2,
              marginTop:SIZES.base,
              borderRadius:SIZES.radius
            }}
            icon={icons.google}
            iconStyle={{
              marginRight:SIZES.base
            }}
            labelStyle={{
              color:COLORS.gray,
              fontSize: SIZES.body3
            }}
            onPress={()=>{console.log('log in with fb')}}
          /> */}
        </View>
        {/* <View
          style={{
            flexDirection:'row',
            marginTop:SIZES.radius,
            justifyContent:"center"
          }}
        >
          <Text body3>Didn't Receive Code?</Text>
          <TouchableOpacity
          style={{
            marginLeft:3
          }}
          onPress={()=>setTimer(60)}>
            <Text primary h3>({timer}s)</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </AuthLayout>
  );
};

export default Login;
