import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 60,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  }
});

const ApiTester = ({apiMsg, apiRequest}) =>{
    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => apiRequest({section_id: 1})} style={styles.button}>
            <Text>Api Request</Text>
          </TouchableOpacity>
          <Text>{apiMsg}</Text>
        </View>
      );
}

export default ApiTester;