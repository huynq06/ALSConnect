import React, {useState,useEffect} from 'react';
import {View, StyleSheet, ScrollView, Image,TouchableOpacity,SafeAreaView,LogBox, Platform} from 'react-native';
import Tabs from '../../../components/Tabs';
import {
  COLORS,
  SIZES,
  Text,
  icons,
} from '../../../constants';
import Header from '../../../components/Header';
import OrderDetailHistory from '../../../components/OrderDetailHistory';
import QRCode from 'react-native-qrcode-svg';
const OrderLagiDetailSreen = ({navigation,route}) =>{
   const {params} = route.params;
   const contentQr = '' + params.id;
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])
  const selectedItemHandler =  (item) =>{
    navigation.navigate('ImpAwbDetail',{
      lagiId:item.lId,
      mawb: item.mawb,
      hawb: item.hawb
  })
  }
  function renderQrCode(){
    return(
      <View
      style={{
          marginTop:SIZES.padding,
          marginHorizontal:SIZES.padding,
          padding:SIZES.padding,
          borderRadius:SIZES.radius,
          backgroundColor:COLORS.white,
          ...styles.shadow
      }}
  >
      <View
          style={{
              marginTop:SIZES.padding,
              marginBottom:SIZES.padding*1.5,
              alignItems:'center',
              justifyContent:'center',
          }}
      >
          
          <QRCode
  value={contentQr}
  size={200}
      />
      
      </View>
    <View
      style={{
        alignItems:'center',
        justifyContent:'center',
      }}
    >
    <Text h2>QR code ID: {contentQr}</Text>
    </View>
   <View>
   
   </View>
  </View>
    )

  }
  function renderHeader(){
    return(
        <Header
            containerStyle={{
                height:60,
                paddingHorizontal: SIZES.padding,
                marginTop: Platform.OS=='ios'?  SIZES.padding : 0,
                alignItems:'center',
                backgroundColor:COLORS.white,
             //   borderBottomRightRadius:SIZES.radius*2
            }}
            title="Order History Detail"
            leftComponent={
                <TouchableOpacity
                    style={{
                        width:35,
                        height:35,
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:SIZES.radius,
                        borderWidth:1,
                        borderColor:COLORS.gray2,
                        
                    }}
                    onPress={()=>navigation.goBack()}
                >
                   <Image 
                   source={icons.back}
                   style={{
                       width:25,
                       height:25
                   }}
                   resizeMode="contain" />
                </TouchableOpacity>
            }
            //  rightComponent={<CartQuantityButton quantity={cartLagiQuantity} onPress={()=>navigation.navigate("CartLagi")} />}
        />
        
    )
}
  function renderItems(){
    return(
      <OrderDetailHistory 
        customContainerStyle={{...styles.shadow}}
        history = {params.items}
        onPress = {selectedItemHandler}
      />
    )
  }
    return(
        <SafeAreaView
          style={{
            flex:1,
            backgroundColor:COLORS.white
          }}
        >
              {renderHeader()}
              <View
        style={{
          marginTop:Platform.OS=="ios"? 90 : 60
        }}
      ></View>
                <ScrollView>
                <View
                    style={{
                        flex:1,
                        paddingBottom:SIZES.padding
                    }}
                >
                    {renderQrCode()}
                    {renderItems()}

                </View>
                </ScrollView>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
  shadow: {
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,

      elevation: 8,
  }
})

export default OrderLagiDetailSreen