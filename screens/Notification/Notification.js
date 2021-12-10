import React,{useState,useEffect} from "react";
import {View,Text,TouchableOpacity,ActivityIndicator,StyleSheet,Keyboard} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authActions from  '../../stores/actions/auth';
import { useDispatch } from 'react-redux';
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
const Notification = ({navigation}) =>{
    const dispatch = useDispatch();
    const [isVisibleCalendar,toggleCalendar] = useState(false);
    const [isActiveCalendar,setActiveCalendar] = useState(false);
    const [dateForFiltering, setDateForFiltering] = useState(new Date());
    console.log(dateForFiltering);
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
      //setDateForFiltering(date.to ? date : date.from);
    }
 
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </View>
    );
  }
    return(
        <View
            style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center'
            }}
        >
          {/*    <DateFilter
            dateForFiltering={dateForFiltering}
            setDateForFiltering={setDateForFiltering}
          /> */}
          <Text>Chức năng đang phát triển</Text>
            <TouchableOpacity
                onPress={handleReset}
            >
                <Text>Reset</Text>
            </TouchableOpacity>
            {/* <View><Text>{dateForFiltering}</Text></View> */}
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