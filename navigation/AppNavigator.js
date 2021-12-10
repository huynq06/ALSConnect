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
const AppNavigator = ({token}) =>{
    const dispatch = useDispatch();
    const [isAppFirstLaunched,setIsAppFirstLaunched] = useState(null);
    const dismiss = useSelector(state => state.auth.dissMiss);
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