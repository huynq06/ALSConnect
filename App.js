import React, {useState, useEffect} from 'react';
import {Alert, AppState, StatusBar} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import {fcmService} from './src/FCMService';
import ReduxThunk from 'redux-thunk';
import authReducer from './stores/reducers/auth';
import lagiReducer from './stores/reducers/lagis';
import {StyleProvider} from 'native-base';
import messaging from '@react-native-firebase/messaging';
import {localNotificationService} from './src/LocalNotificationService';
import {COLORS} from './constants';
import tokenReducer from './stores/reducers/token';
import lagiDetailReducer from './stores/reducers/lagiDetail';
import cartLagiReducer from './stores/reducers/cartLagi';
import orderLagiReducer from './stores/reducers/orderLagi';
import flightReducer from './stores/reducers/flights';
import {Platform, PermissionsAndroid} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import codePush from 'react-native-code-push';
import createSagaMiddleware from 'redux-saga';
import {activeTheme} from './src/theme/variables';
import sagaRoot from './stores/sagas';
import counterReducer from './stores/reducers/counter';
import apiTesterReducer from './stores/reducers/apiTester';
import loadingReducer from './stores/reducers/LoadingReducer';
import labsReducer from './stores/reducers/labs';
import expTrackStatusReducer from './stores/reducers/expTrackStatus';
import expTrackCustomStatusReducer from './stores/reducers/expTrackCustomStatus';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import ForegroundHandler from './src/ForegroundHandler';
import {useToast} from 'react-native-toast-notifications';
const rootReducer = combineReducers({
  auth: authReducer,
  lagis: lagiReducer,
  token: tokenReducer,
  lagiDetail: lagiDetailReducer,
  cartLagi: cartLagiReducer,
  oderLagi: orderLagiReducer,
  flights: flightReducer,
  flightsExp: flightReducer,
  counter: counterReducer,
  apiTester: apiTesterReducer,
  loading: loadingReducer,
  labs: labsReducer,
  expTrackStatus: expTrackStatusReducer,
  expTrackCustomStatus: expTrackCustomStatusReducer,
});
let middlewares = [];
const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);
middlewares.push(ReduxThunk);
console.log('middlewares', middlewares);
const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(sagaRoot);
let App = () => {
  const [token, setToken] = useState('');
  const Toast = useToast();
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      nextAppState => {},
    );

    return () => {
      subscription.remove();
    };
  }, []);
  const requestCameraPermission = async () => {
    if (Platform.OS === 'ios') {
      requestMultiple([
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.MEDIA_LIBRARY,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      ]).then(statuses => {
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
          title: 'App Camera Permission',
          message:
            'This App needs access to your camera so you can take awesome pictures.',
          buttonNeutral: 'Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('PermissionsAndroid.RESULTS.GRANTED');
      } else {
        Toast.show({
          text: 'Camera permissions not granted',
          buttonText: 'x',
          duration: 10000,
          type: 'danger',
          textStyle: {textAlign: 'center'},
          swipeDisabled: false,
        });
      }
    } catch (err) {
      Toast.show({
        text: err,
        buttonText: 'x',
        duration: 10000,
        type: 'danger',
        textStyle: {textAlign: 'center'},
        swipeDisabled: false,
      });
    }
  };
  useEffect(() => {
    requestCameraPermission();
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    fcmService.subcribeTopic('ALS');
    localNotificationService.configure(onOpenNotification, onToken);
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          Alert.alert(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
        }
      });
    function onRegister(_token) {
      //   console.log('[APP] onRegister',token)
    }
    localNotificationService.createDefaultChannels();
    function onNotification(notify) {
      // console.log('[App] onNotification:',notify)
      const options = {
        soundName: 'default',
        playSound: 'true',
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
        1,
      );
    }
    function onOpenNotification(notify) {
      // console.log('[App] onOpenNotification:',notify)
      Alert.alert('Open notification:' + notify.body);
    }
    function onToken(token) {
      setToken(token.token);
    }

    //  console.log('tokeSave: ',tokeSave)
    return () => {
      // console.log('App unregister')
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );
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
    <Provider store={store}>
      <ToastProvider>
        <ForegroundHandler />
        <StatusBar
          animated={true}
          backgroundColor={COLORS.white}
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <AppNavigator token={token} />
      </ToastProvider>
    </Provider>
  );
};

export default App;
