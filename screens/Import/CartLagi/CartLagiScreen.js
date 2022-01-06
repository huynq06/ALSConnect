import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Tabs from '../../../components/Tabs';
import {
  COLORS,
  SIZES,
  Text,
  images,
  icons,
  constants,
} from '../../../constants';
import LineDivider from '../../../components/LineDivider';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import IconLabel from '../../../components/IconLabel';
import TextButton from '../../../components/TextButton';
import {SwipeListView} from 'react-native-swipe-list-view';
import IconButton from '../../../components/IconButton';
import * as cartLagiAction from '../../../stores/actions/cartLagi';
import * as orderAction from '../../../stores/actions/orderLagi';
import * as lagiAction from '../../../stores/actions/lagis';
import FooterTotal from '../../../components/FooterTotal';
import Icon from 'react-native-vector-icons/FontAwesome';
const CartLagiScreen = ({navigation, route}) => {
  const {tokenId} = route.params;
  const cartLagiQuantity = useSelector(state => state.cartLagi.quantity);
  const dispatch = useDispatch();
  const removeMyCartHandler = id => {
    dispatch(cartLagiAction.removeFromCartLagi(id));
  };
  const listFavourite = useSelector(state => state.lagis.favoriteLagi);
  const toggleFavorite = async id => {
    await dispatch(lagiAction.toggleFavorite(id));
  };
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cartLagi.items) {
      transformedCartItems.push({
        lId: key,
        mawb: state.cartLagi.items[key].mawb,
        hawb: state.cartLagi.items[key].hawb,
        isFavourite: listFavourite.some(c => c === key) ? true : false,
      });
    }
    return transformedCartItems;
  });
  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          paddingHorizontal: SIZES.padding,
          marginTop: Platform.OS=='ios'? SIZES.padding : 0,
          alignItems: 'center',
          backgroundColor: COLORS.white,
          //   borderBottomRightRadius:SIZES.radius*2
        }}
        title="Cart Item"
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
        //  rightComponent={<CartQuantityButton quantity={cartLagiQuantity} onPress={()=>navigation.navigate("CartLagi")} />}
      />
    );
  }
  function rendercartList() {
    return (
      <SwipeListView
        data={cartItems}
        keyExtractor={item => `${item.lId}`}
        contentContainerStyle={{
          marginTop: 80,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.padding * 2,
        }}
        disableRightSwipe={true}
        rightOpenValue={-75}
        renderItem={(data, _) => {
          return (
            <View
              style={{
                height: 80,
                backgroundColor: COLORS.lightGray2,
                ...styles.cartItemContainer,
              }}>
              <View
                style={{
                  flex: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text body3>{data.item.mawb}</Text>
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 5,
                      borderColor: COLORS.yellow,
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // alignSelf:'flex-end'
                    }}
                    onPress={() => toggleFavorite(data.item.lId)}>
                    <Icon
                      name="bolt"
                      size={20}
                      color={
                        data.item.isFavourite ? COLORS.yellow : COLORS.white
                      }
                    />
                    {/* <Image source={icons.lighting}
            style={{
              width:20,
              height:20,
              tintColor: currentLagiIsFavorite ? COLORS.red : COLORS.white,
            }}
          />  */}
                  </TouchableOpacity>
                </View>

                <Text primary h3>
                  {data.item.hawb}
                </Text>
              </View>
            </View>
          );
        }}
        renderHiddenItem={(data, rowMap) => (
          <IconButton
            containerStyle={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: COLORS.primary,
              ...styles.cartItemContainer,
            }}
            icon={icons.delete_icon}
            iconStyle={{
              marginRight: 10,
            }}
            onPress={() => removeMyCartHandler(data.item.lId)}
          />
        )}
      />
    );
  }
  const OrderHandler = () => {
    dispatch(orderAction.addOrder(cartItems, tokenId));
    navigation.navigate('OrderSuccess');
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {/* render Header */}
      {renderHeader()}
      <View
        style={{
          marginTop: Platform.OS==='ios'? 30 : 0,
        }}></View>
      {/* Body */}
      {rendercartList()}
      {/* Footer */}
      <FooterTotal total={cartLagiQuantity} onPress={OrderHandler} />
    </View>
  );
};
const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
});
export default CartLagiScreen;
