import React,{useState} from 'react';
import { View,Pick } from 'react-native';
import { SIZES } from '../../constants';
import Calendar from '../Calendar/Calendar';
const DateFilter = ({dateForFiltering,setDateForFiltering}) => {
    const [isVisibleCalendar,toggleCalendar] = useState(false);
    const [isActiveCalendar,setActiveCalendar] = useState(false);
    const onToggleCalendar = () =>{
        toggleCalendar(prev=>!prev);
      }
    const setActive = () =>{
        setActiveCalendar(true);
    }
    const onChangeCalendar = (date) => {
        if (!date.from && !date.to) return;
        setActive();
        setDateForFiltering(date.to ? date : date.from);
      }
   
    return (
        <View style={{
            marginTop:SIZES.base,
            marginHorizontal:SIZES.padding,
            flexDirection:'row',
            justifyContent:'space-between'
        }}>
            <Calendar
            isVisible={isVisibleCalendar}
            isActiveIcon={isActiveCalendar}
            onToggleCalendar={onToggleCalendar}
            onSelectedDate={onChangeCalendar}
            initialDate={dateForFiltering}
            />
   </View>
    )
}
export default DateFilter;

