import React from "react";
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from "../../screens/Home/Home";
import ImpAwbScreen,{screenOptions as ImpAwbScreenScreenOption} from "../../screens/Import/ImpAwbScreen";
import MainNavigator from "../MainNavigator";
import ImportAwbDetailScreen from "../../screens/Import/ImportAwbDetail/ImportAwbDetailScreen";
import CartLagiScreen from "../../screens/Import/CartLagi/CartLagiScreen";
import { COLORS, SIZES } from "../../constants";
import OrderLagiScreen from "../../screens/Import/OrderLagi/OrderLagiScreen";
import OrderLagiDetailSreen from "../../screens/Import/OrderLagiDetailScreen/OrderLagiDetailScreen";
import OrderSuccess from "../../screens/Import/CartLagi/OrderSuccess";
import CallTruckScreen from "../../screens/CallTruck/CallTruckScreen";
import FlightScreen from "../../screens/Flight/FlightScreen";
import Setting from "../../screens/Setting/SettingScreen";
import ChangePasswordScreen from '../../screens/ChangePassword/ChangePasswordScreen'
import ExpAwbScreen from "../../screens/Export/ExpAwbScreen";
import AwbTrackingScreen from "../../screens/Export/AwbTracking/AwbTrackingScreen";
import AwbCustomTrackingScreen from "../../screens/Export/AwbCustomTracking/AwbCustomTrackingScreen";
import FlightExpScreen from "../../screens/FlightExp/FlightExpScreen";
import ScanScreen from "../../screens/Scan/ScanScreen";
import ScanDetailScreen from "../../screens/Scan/ScanDetail/ScanDetailScreen";
import ImagePickerScreen from "../../screens/Setting/ImagePicker/ImagePickerScreen";
import InvoiceScreen from "../../screens/Invoice/InvoiceScreen";
const Stack = createNativeStackNavigator();
const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? COLORS.primaryALS : ''
    },
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
      fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.primaryALS
  };
const HomeNavigator = ({navigation,token})=>{
    return(
        <Stack.Navigator
            screenOptions={{
              headerShown:false,
            }}
            initialRouteName="Home"
        >
            <Stack.Screen
                options={{
                    headerShown:false
                }}
            name="Home" component={MainNavigator} initialParams={{tokenId: token}} />
            <Stack.Screen
                //options={ImpAwbScreenScreenOption}
            name='ImpAwb' component={ImpAwbScreen} initialParams={{tokenId: token}} />
                <Stack.Screen
                //options={ImpAwbScreenScreenOption}
            name='ImpAwbDetail' component={ImportAwbDetailScreen} initialParams={{tokenId: token}}
             />
             <Stack.Screen name="CartLagi" component={CartLagiScreen} initialParams={{tokenId: token}} />
             <Stack.Screen name="OrderLagi" component={OrderLagiScreen}  />
             <Stack.Screen name="OrderLagiDetail" component={OrderLagiDetailSreen} />
             <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
             <Stack.Screen name="CallTruck" component={CallTruckScreen} />
             <Stack.Screen name="Flight" component={FlightScreen} initialParams={{tokenId: token}} />
             <Stack.Screen name="FlightExp" component={FlightExpScreen} initialParams={{tokenId: token}} />
             <Stack.Screen name="Setting" component={Setting} initialParams={{tokenId: token}} />
             <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} /> 
             <Stack.Screen name="ExpAwb" component={ExpAwbScreen} initialParams={{tokenId: token}} />
             <Stack.Screen name="AwbTracking" component={AwbTrackingScreen} initialParams={{tokenId: token}} />
             <Stack.Screen name="AwbCustomTracking" component={AwbCustomTrackingScreen} initialParams={{tokenId: token}} />
             <Stack.Screen name="Scan" component={ScanScreen} />
             <Stack.Screen name="ScanDetail" component={ScanDetailScreen} />
             <Stack.Screen name="ImagePicker" component={ImagePickerScreen} />
             <Stack.Screen name="Invoice" component={InvoiceScreen} />
           
        </Stack.Navigator>
    )
}
const styles = StyleSheet.create({
    flex: {
      flex: 0,
    },
    column: {
      flexDirection: 'column'
    },
    row: {
      flexDirection: 'row'
    },
    header: {
       backgroundColor: COLORS.primaryALS,
      paddingHorizontal: SIZES.padding,
      paddingTop: SIZES.padding,
      paddingBottom:SIZES.base,
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    back: {
      width: SIZES.base * 3,
      height: SIZES.base * 3,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    
  });
export default HomeNavigator;