import React,{useCallback, useState} from "react";
import {View,Text,TouchableOpacity} from 'react-native'
import ApiTester from "../../components/ApiTester";
import Counter from "../../components/Counter";
import * as appActions from '../../stores/actions'
import {useDispatch,useSelector} from 'react-redux'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authActions from  '../../stores/actions/auth';
const About = () =>{
    const dispatch = useDispatch();
    const state = useSelector(state=>state.counter.count);
    const apiMsg = useSelector(state=>state.apiTester.apiMsg)
const apiHandler = (id) =>{
    dispatch(appActions.actions.apiRequest(id))
}
    return(
        <View
            style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center'
            }}
        >
         <Counter
          count={state}
          increment={()=>dispatch(appActions.actions.increment())}
          decrement = {()=>dispatch(appActions.actions.decrement())}
          incrementAsync= {()=>dispatch(appActions.actions.incrementAsync())}
        />

        <ApiTester
          apiMsg={apiMsg}
         apiRequest ={apiHandler}
        />
            <ApiTester
          apiMsg={apiMsg}
         apiRequest ={apiHandler}
        />
        <TouchableOpacity onPress={()=>dispatch(authActions.logout())}><Text>Logout</Text></TouchableOpacity>
        </View>
    )
}
export default About;