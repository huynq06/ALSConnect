import React, {useEffect, useState,useCallback} from 'react';
import {View, StyleSheet, ScrollView, Image,TouchableOpacity,ActivityIndicator,RefreshControl, Platform} from 'react-native';
import Tabs from '../../../components/Tabs';
import {
  COLORS,
  SIZES,
  Text,
  images,
  icons,
  constants,
} from '../../../constants';
import { useSelector, useDispatch } from "react-redux";
import Header from '../../../components/Header';
import {dateFormat} from '../../../utils/dateHelpers'
import * as labsAction from '../../../stores/actions/labs'
import LineDivider from '../../../components/LineDivider';
const ImagePickerScreen = ({navigation,route}) =>{
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
 
    function renderHeader(){
        return (
            <Header
              containerStyle={{
                height: 60,
                paddingHorizontal: SIZES.padding,
                alignItems: 'center',
                backgroundColor: COLORS.white,
                marginTop: Platform.OS == 'ios'? 30: 0
              }}
              title="Image Picker"
              leftComponent={
                <TouchableOpacity
                  style={{
                    width: 35,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.radius,
                    borderWidth: 1,
                    borderColor: COLORS.gray2,
                  }}
                  onPress={() => navigation.goBack()}>
                  <Image
                    source={icons.back}
                    style={{
                      width: 25,
                      height: 25,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              }
      
          
            />
          );
    }
    return(
        <View
            style={{
                backgroundColor: COLORS.white,
                flex:1
            }}
        >
             {renderHeader()}
         <View
        style={{
          height: Platform.OS=='ios'? 90 : 60,
          backgroundColor: COLORS.white,
        }}></View>
        
        
        </View>
    )
}

export default ImagePickerScreen;