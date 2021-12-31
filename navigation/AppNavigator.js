import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import Startup from '../screens/Startup';
import OnBoarding from '../screens/Onboarding/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authActions from  '../stores/actions/auth';
import HomeNavigator from './HomeNavigator/HomeNavigator';
import { useDispatch } from 'react-redux';
import Loading from '../components/Loading/Loading';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import { useToast } from "react-native-toast-notifications";
const AppNavigator = ({token}) =>{
    const dispatch = useDispatch();
    const [isAppFirstLaunched,setIsAppFirstLaunched] = useState(null);
    const dismiss = useSelector(state => state.auth.dissMiss);
    const Toast = useToast();
    const requestCameraPermission = async () => {
        if (Platform.OS === 'ios') {
          requestMultiple([
            PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MEDIA_LIBRARY, PERMISSIONS.IOS.PHOTO_LIBRARY
            ]).then((statuses) => {
            console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
            console.log('MEDIA_LIBRARY', statuses[PERMISSIONS.IOS.MEDIA_LIBRARY]);
            console.log('MEDIA_LIBRARY', statuses[PERMISSIONS.IOS.PHOTO_LIBRARY]);
          });
          return;
        }
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "App Camera Permission",
              message:
                "This App needs access to your camera so you can take awesome pictures.",
              buttonNeutral: "Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('PermissionsAndroid.RESULTS.GRANTED')
          } else {
            Toast.show({
              text: 'Camera permissions not granted',
              buttonText: 'x',
              duration: 10000,
              type: 'danger',
              textStyle: {textAlign: 'center'}, swipeDisabled: false
            });
          }
        } catch (err) {
          Toast.show({
            text: err,
            buttonText: 'x',
            duration: 10000,
            type: 'danger',
            textStyle: {textAlign: 'center'}, swipeDisabled: false
          });
        }
      };
      
   // let isAppFirstLaunched = useSelector(state =>state.auth.isAppFirstLauched)
    useEffect(()=>{
        const tryGetLogin = async () =>{
            const appData = await AsyncStorage.getItem('isAppFirstLaunched');
            if(appData== null){
                setIsAppFirstLaunched(true)
                AsyncStorage.setItem('isAppFirstLaunched','false')
               
            }else{
                setIsAppFirstLaunched(false)
            }
        }
      tryGetLogin();
    },[dismiss])
    const isAuth = useSelector(state => !!state.auth.token);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
    return(
        <>
        <NavigationContainer>
              {isAppFirstLaunched  && !dismiss && <OnBoarding />}
              {isAppFirstLaunched  && dismiss && <AuthNavigator />}
              {!isAppFirstLaunched && !isAuth && didTryAutoLogin && <AuthNavigator />}
              {!isAppFirstLaunched && isAuth && <HomeNavigator token={token} />}
              {!isAppFirstLaunched &&!isAuth && !didTryAutoLogin && <Startup />}
        </NavigationContainer>
         <Loading />
         </>  
    )
}

export default AppNavigator;