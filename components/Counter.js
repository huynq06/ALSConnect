import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const Counter = ({count, increment, decrement, incrementAsync}) =>{
    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text>{count}</Text>
          <TouchableOpacity onPress={increment} style={styles.button}>
            <Text>up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={decrement} style={styles.button}>
            <Text>down</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={incrementAsync} style={styles.button}>
            <Text>async up</Text>
          </TouchableOpacity>
        </View>
      );
  }
  const styles = StyleSheet.create({
    button: {
      width: 150,
      height: 50,
      padding: 10,
      backgroundColor: 'lightgray',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 3
    }
  });
  export default Counter;
