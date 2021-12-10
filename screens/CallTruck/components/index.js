import React,{useState} from "react"
import {View,StyleSheet} from 'react-native'
import R from 'ramda'
import Swiper from 'react-native-swiper';
import { Text,COLORS } from "../../../constants";
import * as scalingUtils from '../../../constants/scalingUtils'
import * as dimensions from '../../../constants/dimensions'
import { dummyData } from "../../../constants";


const AccountSwiper = ({navigation,route,onAccountChange,locationId}) =>{
    // const {locId}  = route.params
    const initialId = R.findIndex(R.propEq('id', locationId))(dummyData.Location)
    const onIndexChanged = (index) =>{
        onAccountChange(dummyData.Location[index].id)
      }
    return (
        <View
            style={{
                height: scalingUtils.verticalScale(150),
            }}
        >
            <Swiper
        loop
        index={initialId}
        showsButtons
        buttonWrapperStyle={styles.swiperButtons}
        showsPagination={false}
        onIndexChanged={onIndexChanged}
        nextButton={<Text h3 white>›</Text>}
        prevButton={<Text h3 white>‹</Text>}
      >
        {dummyData.Location.map(
            loc =>
              <View
                key={loc.id}
                style={[styles.accountContainer, { backgroundColor: loc.color }]}
              >
                {/* <Text h2 white>${acc.balance}</Text> */}
                <View style={styles.accountNameContainer}>
                  <Text body3 white>{loc.name}</Text>
                </View>
              </View>
        )}
      </Swiper>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
      height: scalingUtils.verticalScale(150),
    },
    swiperButtons: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      position: 'absolute',
      top: 0,
      left: 0,
      flex: 1,
      paddingHorizontal: dimensions.indent * 1.5,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    // buttonText: {
    //   color: COLORS.white,
    //   opacity: 0.8,
    //   fontSize: fontSizes.xbig,
    // },
    accountContainer: {
      flex: 1,
      backgroundColor: COLORS.green,
      alignItems: 'center',
      justifyContent: 'center',
      margin: dimensions.indent,
      borderRadius: dimensions.borderRadius,
    },
/*     balanceText: {
      fontSize: fontSizes.big,
      color: COLORS.white,
      fontWeight: fontWeights.heavy,
    },
    accountNameText: {
      fontSize: fontSizes.verySmall,
      color: colors.white,
      fontWeight: fontWeights.bold,
    }, */
    accountNameContainer: {
      position: 'absolute',
      bottom: scalingUtils.verticalScale(10),
    },
  
  });
  export default AccountSwiper;