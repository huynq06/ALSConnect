import React, {Component} from 'react';

import {View, Dimensions, Text, Alert, Image} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as Animatable from 'react-native-animatable';
import {COLORS, icons} from '../../constants';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

/* console.disableYellowBox = true; */

const ScanScreen = ({navigation}) => {
  const scanner = React.useRef();
  const onSuccess = e => {
    navigation.navigate('ScanDetail', {stk: e.data});
    scanner.current?.reactivate();
  };
  console.log('Scan Screen Start!!!');
  const makeSlideOutTranslation = (translationType, fromValue) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18,
      },
      to: {
        [translationType]: fromValue,
      },
    };
  };

  return (
    <QRCodeScanner
      showMarker
      ref={scanner}
      // onRead={this.onSuccess.bind(this)}
      onRead={onSuccess}
      cameraStyle={{height: SCREEN_HEIGHT}}
      customMarker={
        <View style={styles.rectangleContainer}>
          <View style={styles.topOverlay}>
            <Text style={{fontSize: 30, color: 'white'}}>QR CODE SCANNER</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={styles.leftAndRightOverlay} />

            <View style={styles.rectangle}>
              <Image
                source={icons.ios_scanner}
                //color ={iconScanColor}
                style={{
                  width: SCREEN_WIDTH * 0.73,
                  height: SCREEN_WIDTH * 0.73,
                  tintColor: COLORS.blue,
                }}
              />
              {/*   <Icon
                  name="ios-qr-code"
                  size={SCREEN_WIDTH * 0.73}
                  color={iconScanColor}
                /> */}
              <Animatable.View
                style={styles.scanBar}
                direction="alternate-reverse"
                iterationCount="infinite"
                duration={1700}
                easing="linear"
                animation={makeSlideOutTranslation(
                  'translateY',
                  SCREEN_WIDTH * -0.54,
                )}
              />
            </View>

            <View style={styles.leftAndRightOverlay} />
          </View>

          <View style={styles.bottomOverlay} />
        </View>
      }
    />
  );
};

const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = 'red';

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = '#22ff00';

const iconScanColor = 'blue';

const styles = {
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25,
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },
};

export default ScanScreen;
