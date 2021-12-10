import React from 'react'
import {
    Text,
    TouchableOpacity,
    
  } from 'react-native'
import { COLORS } from '../../constants'

const Tab = props => {
    const getContainerStyle = () => ({
        ...styles.container,
        ...(props.isActive ? styles.containerActive : {}),
        ...props.customContainerStyle
      });
    
    const   getDayStyle = () => ({
        ...styles.text,
        ...styles.day,
        ...(props.isActive ? styles.textActive : {})
      });
    
    const  getDateStyle = () => ({
        ...styles.text,
        ...styles.date,
        ...(props.isActive ? styles.textActive : {})
      });
      const onLayout = () => {
        // const {
        //   index,
        //   onRender,
        // } = this.props;
        // const { nativeEvent: { layout: { width } } } = event;
        props.onRender(props.index, props.width);
      }
     const onPress = () => {
        props.onPress(props.index);
      };
    return(
        <TouchableOpacity
            style={getContainerStyle()}
            // onLayout={()=>{onLayout}}
            onPress={()=>{onPress()}}
      >
        <Text style={getDayStyle()}>{props.tab}</Text>
        {/* <Text style={getDateStyle()}>{props.date.format('DD')}</Text> */}
      </TouchableOpacity>
    )
}
const styles =  {
    container: {
      borderBottomColor: COLORS.lightGray1,
      borderBottomWidth: 2,
      flex:1,
      alignItems:'center',
      justifyContent:'center',
     // paddingHorizontal: 15,
      paddingVertical: 10,
     // backgroundColor: COLORS.white,
    //  width:'200%'

    },
    containerActive: {
      borderBottomColor: COLORS.primaryALS
    },
    day: {
      fontSize: 12,
    },
    date: {
      fontSize: 22,
    },
    text: {
      color: COLORS.gray,
      //textAlign: 'center',
    },
    textActive: {
      color: COLORS.primaryALS
    },
  };

  export default Tab;