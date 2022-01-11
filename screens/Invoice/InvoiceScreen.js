import React from 'react';
// eslint-disable-next-line no-unused-vars
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
  } from 'react-native';
import {WebView} from 'react-native-webview';
import {SIZES, COLORS, icons, FONTS} from '../../constants';
import Header from '../../components/Header';
const InvoiceScreen = ({navigation,route}) => {
    function renderHeader() {
        return (
          <Header
            // eslint-disable-next-line react-native/no-inline-styles
            containerStyle={{
              height: 60,
              paddingHorizontal: SIZES.padding,
              alignItems: 'center',
              backgroundColor: COLORS.white,
              marginTop: Platform.OS == 'ios' ? 30 : 0,
            }}
            title="AWB Import"
            leftComponent={
              <TouchableOpacity
                // eslint-disable-next-line react-native/no-inline-styles
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
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    width: 25,
                    height: 25,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            }
            
            /*  rightComponent={<CartQuantityButton quantity={cartLagiQuantity} onPress={()=>navigation.navigate("CartLagi")} />} */
          />
        );
      }
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: Platform.OS === 'ios' ? 90 : 60,
          backgroundColor: COLORS.white,
        }}
      />
      <WebView
        source={{uri: 'https://als.com.vn'}}
        javaScriptEnabled={true}
        scrollEnabled={true}
        startInLoadingState={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

export default InvoiceScreen;
