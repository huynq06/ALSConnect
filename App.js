import React, { useState,useEffect } from "react";
import {AppState,StatusBar } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import AppNavigator from "./navigation/AppNavigator";
import ReduxThunk from "redux-thunk";
import authReducer from "./stores/reducers/auth";
import lagiReducer from './stores/reducers/lagis'
import {StyleProvider} from 'native-base';
import {fcmService} from './src/FCMService'
import {localNotificationService} from './src/LocalNotificationService'
import { COLORS } from "./constants";
import tokenReducer from './stores/reducers/token'
import lagiDetailReducer from './stores/reducers/lagiDetail'
import cartLagiReducer from './stores/reducers/cartLagi'
import orderLagiReducer from './stores/reducers/orderLagi'
import flightReducer from './stores/reducers/flights'
import flightExpReducer from './stores/reducers/flightsExp'
import {ToastProvider} from 'react-native-toast-notifications'
import codePush from "react-native-code-push";
import createSagaMiddleware from 'redux-saga';
import { activeTheme } from './src/theme/variables';
import sagaRoot from './stores/sagas'
import counterReducer from './stores/reducers/counter'
import apiTesterReducer from './stores/reducers/apiTester'
import loadingReducer from './stores/reducers/LoadingReducer'
import labsReducer from './stores/reducers/labs'
import expTrackStatusReducer from './stores/reducers/expTrackStatus'
import expTrackCustomStatusReducer from "./stores/reducers/expTrackCustomStatus";
const rootReducer = combineReducers({
  auth: authReducer,
  lagis: lagiReducer,
  token: tokenReducer,
  lagiDetail: lagiDetailReducer,
  cartLagi: cartLagiReducer,
  oderLagi : orderLagiReducer,
  flights : flightReducer,
  flightsExp : flightReducer,
  counter: counterReducer,
  apiTester: apiTesterReducer,
  loading: loadingReducer,
  labs: labsReducer,
  expTrackStatus: expTrackStatusReducer,
  expTrackCustomStatus: expTrackCustomStatusReducer
});
let middlewares = [];
const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);
middlewares.push(ReduxThunk);
console.log('middlewares',middlewares)
const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(sagaRoot)
let App = () => {
  const [token,setToken] = useState('');
  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {  });
        
    return () => {
      subscription.remove();
    };
  }, []);
 /*  useEffect(() => {
    codePush.sync({
      updateDialog:{
        optionalInstallButtonLabel: 'Cài đặt',
        optionalIgnoreButtonLabel: 'Bỏ qua',
        title: 'Cập nhật',
        mandatoryUpdateMessage:"Đã có bản cập nhật, bạn có muốn cài đặt nó?",
        optionalUpdateMessage: 'Đã có bản cập nhật, bạn có muốn cài đặt nó?',
    },
      installMode:codePush.InstallMode.IMMEDIATE,
      checkFrequency : codePush.CheckFrequency.ON_APP_START
    })
  }, []); */
  useEffect(()=>{
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister,onNotification,onOpenNotification)
    fcmService.subcribeTopic('ALS');
   localNotificationService.configure(onOpenNotification,onToken);
   
    function onRegister(token){
   //   console.log('[APP] onRegister',token)
    }
    localNotificationService.createDefaultChannels();
    function onNotification(notify){
     // console.log('[App] onNotification:',notify)
      const options = {
        soundName:'default',
        playSound:'true'
      }
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
        1
      )
    }
    function onOpenNotification(notify){
     // console.log('[App] onOpenNotification:',notify)
      alert('Open notification:' + notify.body)
    }
    function onToken(token){
      setToken(token.token)
    }
  //  console.log('tokeSave: ',tokeSave)
    return ()=>{
     // console.log('App unregister')
      fcmService.unRegister()
      localNotificationService.unregister()
    }
  },[])
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(TRANSITIONS[0]);
  const changeStatusBarVisibility = () => setHidden(!hidden);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    if (transition === TRANSITIONS.length) {
      setStatusBarTransition(TRANSITIONS[0]);
    } else {
      setStatusBarTransition(TRANSITIONS[transition]);
    }
  };
  return (
    <Provider store={store} >
  
      <ToastProvider>
     <StatusBar
        animated={true}
        backgroundColor= {COLORS.white}

        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden} />
      <AppNavigator token={token}  />
      </ToastProvider>
 
    </Provider>
  );
};


export default App;
