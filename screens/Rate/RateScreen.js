import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  icons,
} from '../../constants';
import Header from '../../components/Header';
import FormInput from '../../components/FormInput';
import {useDispatch, useSelector} from 'react-redux';
import TextButton from '../../components/TextButton';
import LineDivider from '../../components/LineDivider';
import TextIconButton from '../../components/TextIconButton';

const RateScreen = () =>{
    return(
        <View>
            <Text>Rate Screen</Text>
        </View>
    )

}

export default RateScreen