import React from "react";
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from "../../screens/Home/Home";
import ImpAwbScreen,{screenOptions as ImpAwbScreenScreenOption} from "../../screens/Import/ImpAwbScreen";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from "../../components/HeaderButton";
import Notification from "../../screens/Notification/Notification";
import MainNavigator from "../MainNavigator";
import ImportAwbDetailScreen from "../../screens/Import/ImportAwbDetail/ImportAwbDetailScreen";
import CartLagiScreen from "../../screens/Import/CartLagi/CartLagiScreen";
import { COLORS, SIZES } from "../../constants";
import OrderLagiScreen from "../../screens/Import/OrderLagi/OrderLagiScreen";
import OrderLagiDetailSreen from "../../screens/Import/OrderLagiDetailScreen/OrderLagiDetailScreen";
import OrderSuccess from "../../screens/Import/CartLagi/OrderSuccess";
import CallTruckScreen from "../../screens/CallTruck/CallTruckScreen";
import FlightScreen from "../../screens/Flight/FlightScreen";
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