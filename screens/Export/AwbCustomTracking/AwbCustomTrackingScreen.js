import React, {useEffect, useState,useCallback} from 'react';
import {View, StyleSheet, ScrollView, Image,TouchableOpacity,ActivityIndicator,RefreshControl, FlatList} from 'react-native';
import Tabs from '../../../components/Tabs';
import {
  COLORS,
  SIZES,
  Text,
  images,
  icons,
  constants,
  FONTS,
} from '../../../constants';
import { useSelector, useDispatch } from "react-redux";
import Header from '../../../components/Header';
import * as labsAction from '../../../stores/actions/labs'
import LineDivider from '../../../components/LineDivider';
import { F } from 'ramda';
const AwbCustomTrackingScreen = ({navigation,route}) =>{
const dispatch = useDispatch();
  const {labId,awb} = route.params
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const trackCustomStatusList = useSelector(state=>state.expTrackCustomStatus.trackCustomStatus)
  const loadTrackCustomStatus = useCallback( async (id)=>{
    setError(null);
    setIsRefreshing(true);
    try {
    await  dispatch(labsAction.trackCustomStatus(id))
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  },[dispatch])
  useEffect(()=>{
    setIsLoading(true);
    loadTrackCustomStatus(labId).then(()=>{
      setIsLoading(false);
    })
  },[dispatch])
  console.log('isLoading------------------------------------------------------------',isLoading)
  const clearTrackCustom = () =>{
    dispatch(labsAction.clearTrackCusTomStatus())
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', clearTrackCustom);

    return () => {
      unsubscribe();
    };
  }, [clearTrackCustom]);
/*   if (isLoading) {
    console.log('da chay vao Loading +++++++++++++++++++++++++++++++++')
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.red} />
      </View>
    );
  } */

  // if (!isLoading && trackCustomStatusList.length === 0) {
  //   return (
  //     <View style={styles.centered}>
  //       <Text style={{
  //                   ...FONTS.h3
  //                 }}>Chua co thong tin Get In</Text>
  //     </View>
  //   );
  // }
    function renderHeader(){
        return (
            <Header
              containerStyle={{
                height: 60,
                paddingHorizontal: SIZES.padding,
                alignItems: 'center',
                backgroundColor: COLORS.white,
              }}
              title="AWB Custom Tracking"
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
      
          
            />
          );
    }
    function renderCustomTracking(){
      return(
        isLoading? (
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color={COLORS.primaryALS} />
          </View>
        ):  (<View
          style={{
            flex:1,
            backgroundColor: COLORS.white
          }}
        >
        <FlatList
              keyExtractor={item=>`Custom-${item.goodsId}}`}
              data={trackCustomStatusList}
             // ItemSeparatorComponent={LineDivider}
            /*   ListHeaderComponentStyle={{
                marginVertical:SIZES.padding
              }} */
              ListHeaderComponent={<View
                style={{
                  backgroundColor:COLORS.white,
                  marginTop:SIZES.padding,
                  marginHorizontal:SIZES.padding,
                  marginBottom: 10
                }}
                >
                  <Text style={{
                    ...FONTS.h3
                  }}>Thong tin HQ lo hang {awb}</Text>
                </View>}
                ListFooterComponent={<View
                  style={{
                    height:20
                  }}
                ></View>}
                ListEmptyComponent={<View
                  style={{
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center'
                  }}
                  ><Text>Chua co thong tin Get In</Text></View>} 
                renderItem={({item,index})=>{
                  return(
                    <View
                      style={{
                        marginHorizontal:SIZES.padding,
                        backgroundColor:COLORS.white,
                        paddingHorizontal:SIZES.base,
                        borderRadius:SIZES.radius,
                        paddingVertical:SIZES.radius,
                        marginBottom:SIZES.radius,
                        shadowColor:COLORS.black,
                        shadowOffset:{width:0,height:2},
                        shadowOpacity:0.1,
                        shadowRadius:12,
                        elevation:2
                        
                      }}
                    >
                      <View
                        style={{
                          flexDirection:'row'
                        }}
                      >
                        <Text 
                          style={{
                            flex:2,
                            ...FONTS.h3
                          }}
                        >SDD</Text>
                        <Text  style={{
                          ...FONTS.body3,
                            flex:5
                          }}>{item.goodsId}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection:'row'
                        }}
                      >
                           <Text 
                          style={{
                            flex:2,
                            ...FONTS.h3
                          }}
                        >STK</Text>
                        <Text  style={{
                          ...FONTS.body3,
                            flex:5
                          }}>{item.stk}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection:'row'
                        }}
                      >
                         <Text 
                          style={{
                            flex:2,
                            ...FONTS.h3
                          }}
                        >So Kien</Text>
                          <Text  style={{
                          ...FONTS.body3,
                            flex:5
                          }}>{item.getInPieces}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection:'row'
                        }}
                      >
                       <Text 
                          style={{
                            flex:2,
                            ...FONTS.h3
                          }}
                        >Created</Text>
                         <Text  style={{
                          ...FONTS.body3,
                            flex:5
                          }}>{item.getInCreated}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection:'row'
                        }}
                      >
                        <Text 
                          style={{
                            flex:2,
                            ...FONTS.h3
                          }}
                        >Trang Thai</Text>
                         <Text  style={{
                          ...FONTS.body3,
                            flex:5
                          }}>{item.getInMessage}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection:'row'
                        }}
                      >
                        <Text 
                          style={{
                            flex:2,
                            ...FONTS.h3
                          }}
                        >So Kien Get Out</Text>
                          <Text  style={{
                          ...FONTS.body3,
                            flex:5
                          }}>{item.getOutPieces}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection:'row'
                        }}
                      >
                        <Text 
                          style={{
                            flex:2,
                            ...FONTS.h3
                          }}
                        >Created</Text>
                         <Text  style={{
                          ...FONTS.body3,
                            flex:5
                          }}>{item.getOutCreated}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection:'row'
                        }}
                      >
                        <Text 
                          style={{
                            flex:2,
                            ...FONTS.h3
                          }}
                        >Trang Thai</Text>
                          <Text  style={{
                          ...FONTS.body3,
                            flex:5
                          }}>{item.getOutMessage}</Text>
                      </View>
                    </View>
                  )
                }}
            
           />
           
        </View>)
      )
    }
    return(
        <View
            style={{
                backgroundColor: COLORS.white,
                flex:1
            }}
        >
               {renderHeader()}
         <View
        style={{
          height: 60,
          backgroundColor: COLORS.white,
        }}></View>
        {renderCustomTracking()}
        </View>
    )
}


export default AwbCustomTrackingScreen;