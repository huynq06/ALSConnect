import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Picker,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  LogBox
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
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import IconLabel from '../../../components/IconLabel';
import TextButton from '../../../components/TextButton';
import {SwipeListView} from 'react-native-swipe-list-view';
import IconButton from '../../../components/IconButton';
import * as cartLagiAction from '../../../stores/actions/cartLagi';
import * as orderAction from '../../../stores/actions/orderLagi';
/* import DateFilter from '../../../components/DateFilter'; */
import TextIconButton from '../../../components/TextIconButton';
import ModalFilter from './ModalFilter';
import Subtitle from '../../../components/Subtitle';
import { inPeriod } from '../../../utils/ordersHelpers';
import {
  startOfDay,
  startOfYesterday,
  back7days,
  back30days,
  isYesterday,
  isToday,
  dateWithTime
} from '../../../utils/dateHelpers';
import Calendar from '../../../components/Calendar/Calendar';
import OrderHistory from '../../../components/OrderHistory';
const OrderLagiScreen = ({navigation, route}) => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])
  const dispatch = useDispatch();
  const [dateForFiltering, setDateForFiltering] = useState(startOfDay);
  const [isLoading, setIsLoading] = useState(false);
  const [isActiveSelector, setActiveSelector] = useState(false);
  const [isActiveToday, setActiveToday] = useState(true);
  const [isActiveYesterday, setActiveYesterday] = useState(false);
  const [isActiveCalendar, setActiveCalendar] = useState(false);
  const [labelSelect, setLabelSelect] = useState('Select');
  const [showFilterModel, setShowFilterModel] = useState(false);
  const [isVisibleCalendar, toggleCalendar] = useState(false);
  const setActive = item => {
    setActiveToday(false);
    setActiveYesterday(false);
    setActiveSelector(false);
    setActiveCalendar(false);
    item(true);
  };

  const onSetActiveToday = () => {
    setLabelSelect('Select');
    setActive(setActiveToday);
    if (!isActiveToday) setDateForFiltering(startOfDay);
  };
  const onSetActiveYestoday = () => {
    setLabelSelect('Select');
    setActive(setActiveYesterday);
    if (!isActiveYesterday) setDateForFiltering(startOfYesterday);
  };
  const onToggleCalendar = () => {
    toggleCalendar(prev => !prev);
  };
  const onChangeCalendar = date => {
    if (!date.from && !date.to) return;
    setActive(setActiveCalendar);
    if (!date.to) {
      if (isToday(date.from)) setActive(setActiveToday);
      else if (isYesterday(date.from)) setActive(setActiveYesterday);
    }
    setDateForFiltering(date.to ? date : date.from);
  };
  const orders = useSelector(state => {
    const newArray = [];
    state.oderLagi.orders.forEach((item,index)=>{
      if(!dateForFiltering.from){
      }
      const period = !dateForFiltering.format ?
      dateForFiltering : { from: +dateForFiltering.startOf('day'), to: +dateForFiltering.endOf('day') };
      if (inPeriod(period, item?.date)) {
        newArray.push(item);
      }
    })
    return newArray;
  } );
  useEffect(() => {
    setIsLoading(true);
    dispatch(orderAction.fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
const onSelectOrderHandler = item =>{
  navigation.navigate("OrderLagiDetail",{
    screen: 'OrderLagiDetailScreen',
    params: { id: item.id,date:item.date,items:item.items },
  });
}
  const onHandlerFilter = value => {
    setLabelSelect(value);
    setActive(setActiveSelector);
    const period = {from: null, to: moment().endOf('day')};
    if (value === 'Week') {
      period.from = back7days;
    } else {
      period.from = back30days;
    }
    setDateForFiltering(period);
  };
  function renderDateFilter() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* render Select Range */}
        <TextIconButton
          labelStyle={{
            color: isActiveSelector ? COLORS.white : COLORS.gray,
          }}
          label={labelSelect}
          iconPostion="RIGHT"
          icon={icons.down_arrow}
          containerStyle={{
            borderRadius: SIZES.radius,
            height: 55,
            width: 90,
            backgroundColor: isActiveSelector ? COLORS.primaryALS : null,
            borderWidth: 1,
            borderColor: isActiveSelector
              ? COLORS.primaryALS
              : COLORS.lightGray1,
          }}
          iconStyle={{
            width: 10,
            height: 10,
          }}
          onPress={() => setShowFilterModel(true)}
        />
        {/* render Today */}
        <TextButton
          label="Today"
          labelStyle={{
            color: isActiveToday ? COLORS.white : COLORS.gray,
            fontFamily: 'Poppins-Regular',
            fontSize: SIZES.body3,
            lineHeight: 22,
          }}
          buttonContainerStyle={{
            borderRadius: SIZES.radius,
            height: 55,
            width: 80,
            backgroundColor: COLORS.white,
            borderWidth: 1,
            backgroundColor: isActiveToday ? COLORS.primaryALS : null,
            borderColor: isActiveToday ? COLORS.primaryALS : COLORS.lightGray1,
          }}
          onPress={onSetActiveToday}
        />
        {/* render Yesterday */}
        <TextButton
          label="Yesterday"
          labelStyle={{
            color: isActiveYesterday ? COLORS.white : COLORS.gray,
            fontFamily: 'Poppins-Regular',
            fontSize: SIZES.body3,
            lineHeight: 22,
          }}
          buttonContainerStyle={{
            borderRadius: SIZES.radius,
            height: 55,
            width: 100,
            backgroundColor: COLORS.white,
            borderWidth: 1,
            backgroundColor: isActiveYesterday ? COLORS.primaryALS : null,
            borderColor: isActiveYesterday
              ? COLORS.primaryALS
              : COLORS.lightGray1,
          }}
          onPress={onSetActiveYestoday}
        />
        {/* render Date Filter */}
        <View style={{
          justifyContent:'center',
          alignItems:'center',
        //  backgroundColor:COLORS.red
        }}>
        <Calendar
          isVisible={isVisibleCalendar}
          isActiveIcon={isActiveCalendar}
          onToggleCalendar={onToggleCalendar}
          onSelectedDate={onChangeCalendar}
          initialDate={dateForFiltering}
        />
        </View>
      
      </View>
    );
  }
  function renderHeader(){
    return(
        <Header
            containerStyle={{
                height:80,
                paddingHorizontal: SIZES.padding,
              //  marginTop:SIZES.padding,
                alignItems:'center',
                backgroundColor:COLORS.primaryALS,
             //   borderBottomRightRadius:SIZES.radius*2
            }}
            title="Order History"
            /* leftComponent={
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
            } */
            //  rightComponent={<CartQuantityButton quantity={cartLagiQuantity} onPress={()=>navigation.navigate("CartLagi")} />}
        />
        
    )
}
  function renderOrderHistory(){
    if (orders.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:SIZES.padding*2,marginHorizontal:SIZES.padding}}>
        <Text body3>No order found, maybe start ordering some awb?</Text>
      </View>
    );
  } 
    return(
      <OrderHistory
      customContainerStyle={{...styles.shadow}}
      history={orders}
      onPress = {onSelectOrderHandler}
  />
    )
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
      <View
        style={{
          marginTop:80
        }}
      ></View>
      {/* DateFilter */}
      {renderDateFilter()}
      {showFilterModel && (
        <ModalFilter
          isVisible={showFilterModel}
          onPress={onHandlerFilter}
          onClose={() => setShowFilterModel(false)}
        />
      )}
      <Subtitle
        containerStyle={{
          marginHorizontal: SIZES.padding,
          paddingTop: SIZES.base,
        }}
        leftText="History"
        date={dateForFiltering}
        withoutPadding
      />
     <ScrollView style={{flex: 1}}>
      {renderOrderHistory()}
      <View
                            style={{
                                paddingBottom:30,
                                marginBottom:60,
                               // backgroundColor:COLORS.red
                            }}
                           ></View>
      </ScrollView>
      {/* Order History */}
     
    </View>
  );
};
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
export default OrderLagiScreen;
