import React, {useEffect, useState,useCallback} from 'react';
import {View, StyleSheet, ScrollView, Image,TouchableOpacity,ActivityIndicator,RefreshControl} from 'react-native';
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
const AwbTrackingScreen = ({navigation,route}) =>{
  const dispatch = useDispatch();
  const {cargoStatus,labId,awb} = route.params
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const currentStep = useSelector(state=>{
      let statusCheck =  state.expTrackStatus.status
      if(cargoStatus.length ==2){
        statusCheck=3
      }
      return statusCheck;
  })
/*   const awbTrackStatus = useSelector(state=>state.expTrackStatus.trackStatus) */
const awbTrackStatus = useSelector(state=>{

  let tracking = state.expTrackStatus.trackStatus

  if(cargoStatus.length ==2 && tracking.length > 0){
    tracking[3].SubTitle = dateFormat(cargoStatus[1].EventTime)
  }
  return tracking;
}) 
  const loadTrackStatus = useCallback( async (id)=>{
    setError(null);
    setIsRefreshing(true);
    try {
      dispatch(labsAction.trackStatus(id))
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  },[dispatch])
  useEffect(()=>{
    setIsLoading(true);
    loadTrackStatus(labId).then(()=>{
      setIsLoading(false);
    })
  },[labId,loadTrackStatus,dispatch])
    function renderHeader(){
        return (
            <Header
              containerStyle={{
                height: 60,
                paddingHorizontal: SIZES.padding,
                alignItems: 'center',
                backgroundColor: COLORS.white,
              }}
              title="AWB Export Tracking"
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
          height: 60,
          backgroundColor: COLORS.white,
        }}></View>
        <View
        style={{
          marginTop: SIZES.padding,
          paddingVertical: SIZES.padding,
          borderRadius: SIZES.radius,
          borderWidth: 2,
          borderColor: COLORS.lightGray2,
          marginHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
        }}>
        {/* Track Order */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            paddingHorizontal: SIZES.padding,
          }}>
          <Text h3>Tracking</Text>
          <Text gray body3>
            {awb}
          </Text>
        </View>
        <LineDivider />
        {/* Status */}
        <View
          style={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}>
          {awbTrackStatus.map((item, index) => {
            return (
              <View key={`StatusList-${index}`}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: -5,
                  }}>
                  <Image
                    source={icons.check_circle}
                    style={{
                      width: 40,
                      height: 40,
                      tintColor:
                        index <= currentStep
                          ? COLORS.primary
                          : COLORS.lightGray1,
                    }}
                  />
                  <View
                    style={{
                      marginLeft: SIZES.radius,
                    }}>
                    <Text h3>{item.Title}</Text>
                    <Text gray body4>
                      {item.SubTitle}
                    </Text>
                  </View>
                </View>
                {index < awbTrackStatus.length - 1 && (
                  <View>
                    {index < currentStep && (
                      <View
                        style={{
                          height: 50,
                          width: 3,
                          marginLeft: 18,
                          backgroundColor: COLORS.primary,
                          zIndex: -1,
                        }}></View>
                    )}
                    {index >= currentStep && (
                      <Image
                        source={icons.dotted_line}
                        resizeMode="cover"
                        style={{
                          width: 4,
                          height: 50,
                          marginLeft: 17,
                        }}
                      />
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
        
        </View>
    )
}

export default AwbTrackingScreen;