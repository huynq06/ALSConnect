import React from "react";
import {createBottomTabNavigator,BottomTabBar} from '@react-navigation/bottom-tabs'
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";
import About from "../screens/About/About";
import Home from "../screens/Home/Home";
import Notification from "../screens/Notification/Notification";
import ScanScreen from "../screens/Scan/ScanScreen";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, icons,images } from "../constants"
import OrderLagiScreen from "../screens/Import/OrderLagi/OrderLagiScreen";
import Svg, {
    Path
} from 'react-native-svg'
import { isIphoneX } from 'react-native-iphone-x-helper'
//import HomeNavigator from "./HomeNavigator/HomeNavigator";
const Tab = createBottomTabNavigator()
const TabBarCustomButton = ({accessibilityLabel, accessibilityState, children, onPress})=>{
    var isSelected = accessibilityState.selected
    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        top: 0
                    }}
                >
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                    <Svg
                        width={75}
                        height={61}
                        viewBox="0 0 75 61"
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={COLORS.white}
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                </View>

                <TouchableOpacity
                    style={{
                        top: -30.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 60,
                        height: 60,
                        borderRadius: 25,
                        backgroundColor: COLORS.white,
                        ...styles.shadow
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    height: 50,
                    backgroundColor: COLORS.white
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}
const CustomTabBar = (props) => {
    if (isIphoneX()) {
        return (
            <View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 30,
                        backgroundColor: COLORS.white
                    }}
                ></View>
                <BottomTabBar {...props.props} />
            </View>
        )
    } else {
        return (
            <BottomTabBar {...props.props} />
        )
    }
}
const MainNavigator = ()=>{
    return(
        <Tab.Navigator
            screenOptions={{
              tabBarShowLabel:false,
              headerShown:false,
                tabBarStyle:{
                    position:'absolute',
                    bottom:0,
                    left:0,
                    right:0,
                   // top:1,
                    elevation:0,
                    backgroundColor:COLORS.white,
                    borderTopColor:COLORS.lightGray1,
                    height:80,
                    paddingVertical:5,
                    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
                }
            }}
        initialRouteName='HomeRoot' 
        tabBar={(props) => (
            <CustomTabBar
                props={props}
            />
        )}
        >
            <Tab.Screen 
                name='HomeRoot' 
                component= {Home}
                options={{
                    tabBarIcon:({focused})=>(
                        <View
                            style={{
                                alignItems:'center',
                                justifyContent: 'center',
                                //backgroundColor:COLORS.red
                            }}
                        >
                            <Image source={icons.home} resizeMode="contain" style={{
                                width:30,
                                height:40,
                                tintColor:focused?COLORS.primaryALS:COLORS.darkGray
                            }} />
                             <Text style={{
                                color:focused? COLORS.secondaryALS:COLORS.darkGray
                            }}>Home</Text>
                        </View>
                    ),
                    // tabBarButton:(props)=>(
                    //     <TabBarCustomButton {...props} />
                    // )
                }}
            />
             <Tab.Screen 
                name='Search' 
                component= {About}
                options={{
                    tabBarIcon:({focused})=>(
                        <View
                            style={{
                                alignItems:'center',
                                justifyContent: 'center',
                                
                            }}
                        >
                            <Image source={icons.search} resizeMode="contain" style={{
                                width:30,
                                height:40,
                              
                                tintColor:focused?COLORS.primaryALS:COLORS.darkGray
                            }} />
                             <Text style={{
                                color:focused? COLORS.secondaryALS:COLORS.darkGray
                            }}>Search</Text>
                        </View>
                    ),
                    // tabBarButton:(props)=>(
                    //     <TabBarCustomButton {...props} />
                    // )
                }}
            />
             <Tab.Screen name='Scan' component={ScanScreen} 
            options={{
                tabBarIcon:({focused})=>(
                    <View
                        style={{
                            alignItems:'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Image source={icons.scan} resizeMode="contain" style={{
                            width: 30,
                            height:40,
                            tintColor:focused?COLORS.primaryALS:COLORS.darkGray
                        }} />
                         <Text style={{
                            color:focused? COLORS.secondaryALS:COLORS.darkGray
                        }}>Scan</Text>
                    </View>
                ),
                // tabBarButton: (props) => (
                //     <TabBarCustomButton
                //         {...props}
                //     />
                // )
            }} />
             <Tab.Screen 
                name='History' 
                component= {OrderLagiScreen}
                options={{
                    tabBarIcon:({focused})=>(
                        <View
                            style={{
                                alignItems:'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Image source={icons.history} resizeMode="contain" style={{
                                width:30,
                                height:40,
                                tintColor:focused?COLORS.primaryALS:COLORS.darkGray
                            }} />
                             <Text style={{
                                color:focused? COLORS.secondaryALS:COLORS.darkGray
                            }}>History</Text>
                        </View>
                    ),
                    // tabBarButton:(props)=>(
                    //     <TabBarCustomButton {...props} />
                    // )
                }}
            />
             <Tab.Screen 
                name='Setting' 
                component= {About}
                options={{
                    tabBarIcon:({focused})=>(
                        <View
                            style={{
                                alignItems:'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Image source={icons.setting} resizeMode="contain" style={{
                                width:27,
                                height:40,
                                tintColor:focused?COLORS.primaryALS:COLORS.darkGray
                            }} />
                             <Text style={{
                                color:focused? COLORS.secondaryALS:COLORS.darkGray
                            }}>Setting</Text>
                        </View>
                    ),
                    // tabBarButton:(props)=>(
                    //     <TabBarCustomButton {...props} />
                    // )
                }}
            />
        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.primaryALS,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
})
export default MainNavigator;