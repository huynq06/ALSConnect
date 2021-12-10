import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../../constants/Text';
import {COLORS, SIZES} from '../../constants';

const EmptyList = ({containerStyle, text = 'There is no transactions'}) => (
  <View
    style={{alignItems: 'center', justifyContent: 'center', ...containerStyle}}>
    {/* <Image
        style={s.image}
        resizeMode="contain"
        source={sadSmile}
      /> */}
    <Text h3 darkGray style={styles.emptyText}>
      {text}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  emptyText: {paddingTop: SIZES.padding, textAlign: 'center'},
});

export default EmptyList
