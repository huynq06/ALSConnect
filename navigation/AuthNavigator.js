import React from "react";
import {View,Text} from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
import SignupSuccess from "../screens/Auth/SignupSuccess";
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen'
import ResetPasswordSuccess from "../screens/Auth/ResetPasswordSuccess";
const Stack = createNativeStackNavigator();
const AuthNavigator = ()=>{
    return(
        <Stack.Navigator
            screenOptions={{
                 headerShown:false
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name='SignupSuccess' component={SignupSuccess} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="ResetPasswordSuccess" component={ResetPasswordSuccess} />
        </Stack.Navigator>
    )
}

export default AuthNavigator;