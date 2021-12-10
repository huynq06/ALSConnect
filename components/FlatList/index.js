import React from 'react';
import R from 'ramda';
import { FlatList as List, View, Text,StyleSheet } from 'react-native';
import EmptyList from '../EmptyList/index';
import { SIZES } from '../../constants';
import LineDivider from '../LineDivider'
import * as dimensions from '../../constants/dimensions'
// eslint-disable-next-line react/prop-types
const FlatList = ({ listEmptyText, flatListRef, data, isSimpleEmptyText, ...props }) => (
  <List
    contentContainerStyle={!isSimpleEmptyText && styles.listContainer}
style={{
    marginTop:SIZES.base
}}
    data={data}
    keyExtractor={R.prop('id')}
    ItemSeparatorComponent={LineDivider}
    ListEmptyComponent={isSimpleEmptyText
      ? <Text>{listEmptyText}</Text>
      : <EmptyList text={listEmptyText} />
    }
    ListFooterComponent={data.length ? <View style={{ paddingBottom: 85}}><LineDivider /></View> : null}
    ref={flatListRef}
    {...props}
  />
);
const styles = StyleSheet.create({
    list: {
      // marginTop: dimensions.halfIndent,
    },
    paddingBottom: {
      paddingBottom: 85,
    },
    // emptyText: {
    //   paddingTop: dimensions.indent,
    //   textAlign: 'center',
    //   fontSize: fontSizes.small,
    //   color: colors.greyDarker,
    // },
    listContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
export default FlatList;