import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import * as dimensions from '../constants/dimensions'
import { formatDateForSubtitle } from '../utils/dateHelpers';
import {COLORS,FONTS,SIZES,Text} from '../constants'

const styles = StyleSheet.create({
  leftText: {
    fontSize: FONTS.h3
  },
  rightText: {
    fontSize: FONTS.body3
  },
  textContainer: {
    paddingBottom: dimensions.halfIndent,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  withoutPaddingBottom: {
    paddingBottom: 0,
  },
  withoutPadding: {
    padding: 0,
  },
  rightContainer: {
    flexDirection: 'row',
  },
});

const Subtitle = ({containerStyle,leftText,date,withoutPadding}) =>{
    return (
    
        <View style={{...styles.textContainer, ...containerStyle, ...withoutPadding && styles.withoutPaddingBottom}}>
          <Text h3 gray >{leftText}</Text>
          <View style={styles.rightContainer}>
              <Text body3 gray >{formatDateForSubtitle(date)}</Text>
            </View>
      
        </View>
      );
}

export default Subtitle;
