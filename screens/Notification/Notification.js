import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Animated,
  LogBox,
  ScrollView,
  Platform
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from '../../components/Header';
import * as authActions from  '../../stores/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import {
    COLORS,
    SIZES,
    FONTS,
    icons,
    images,
    dummyData,
  } from "../../constants";
  import Calendar from "../../components/Calendar/Calendar";
  import DateFilter from "../../components/DateFilter";
  import NotificationItem from '../../components/NotificationItem';
const Notification = ({navigation}) =>{
    const dispatch = useDispatch();
    const [isVisibleCalendar,toggleCalendar] = useState(false);
    const [isActiveCalendar,setActiveCalendar] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const  [notificationData,setNotificationData] = useState([])
    const [dateForFiltering, setDateForFiltering] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const onToggleCalendar = () =>{
      toggleCalendar(prev=>!prev);
    }
    const handleReset = () =>{
        dispatch(authActions.logout())
    }
    const setActive = () =>{
      setActiveCalendar(true);
  }
  const onChangeCalendar = (date) => {
      if (!date.from && !date.to) return;

      setActive();
    }
    const userId = useSelector(state=>state.auth.userId)
    const getNotificationList = async function () {
      if (isLoading) return;
      setIsLoading(true);
      setIsRefreshing(true);
      fetch("http://10.10.1.11:3434/api/notification?userId=" + userId,
        {
          method: "GET",
          headers: {Accept: "application/json", "Content-Type": "application/json"},
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          let notificationList = [];
          responseJson.forEach((item, index) => {
            let createdStr = item?.created || '';
            notificationList.push({
                  id: index,
                  title: item?.title || '',
                  created: createdStr.slice(11, 16),
                  body: item?.body,
                  description: item?.description,
                });
            
          });
          setNotificationData(notificationList)
        })
        .catch((error) => {
          Alert.alert(
            'Lỗi!',
            error.message,
          );
        })
        .finally(function () {
          setIsLoading(false);
          setIsRefreshing(false);
        });
    }
    useEffect(() => {
      getNotificationList().then(() => null);
    }, []);
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </View>
    );
  }
  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 60,
          marginTop: Platform.OS=='ios' ? 30: 0,
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
          backgroundColor: COLORS.white,
        }}
        title="NOTIFICATION"
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

        /*  rightComponent={<CartQuantityButton quantity={cartLagiQuantity} onPress={()=>navigation.navigate("CartLagi")} />} */
      />
    );
  }
  function renderNotification(){
    return(
      <FlatList
        data={notificationData}
        refreshing={isRefreshing}
        onRefresh={()=>getNotificationList()}
        keyExtractor={item=>`Notification-${item.id}}`}
        contentContainerStyle={{
          paddingBottom:60
        }}
        renderItem={({item,index})=>{
          return(
            <NotificationItem
            customContainerStyle={{
              marginHorizontal:SIZES.padding,
              marginBottom: SIZES.radius
            }}
            time= {item.created}
            title={item.title}
            body={item.body}
          />
          )
        }}
      />
 /*      <>
      <NotificationItem
        customContainerStyle={{
          marginHorizontal:SIZES.padding,
          marginBottom: SIZES.radius
        }}
        time='5 minutes ago'
        title='Domino s - Buy 1 get 1 Free'
        body='Buy 1 get 1 free for small size Buy 1 get 1 free for small size'
      />
      <NotificationItem
      customContainerStyle={{
        marginHorizontal:SIZES.padding,
        marginBottom: SIZES.radius
      }}
      time='5 minutes ago'
      title='Domino s - Buy 1 get 1 Free'
      body='Buy 1 get 1 free for small size Buy 1 get 1 free for small size'
    />
    </> */
    )
  }
    return(
        <View
            style={{
                flex:1,
                backgroundColor:COLORS.white
            }}
        >
        {renderHeader()}
      <View
        style={{
          height: Platform.OS=='ios'? 90: 60,
        }}></View>
        <Text
          style={{
            ...FONTS.h3,
            marginHorizontal:SIZES.padding,
            marginVertical:SIZES.padding
          }}
        >Today</Text>
        {renderNotification()}
        </View>
    )
}
const styles = StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
export default Notification;