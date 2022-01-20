import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
    Modal,
    Animated,
    TouchableNativeFeedback,
    TextInput,
    FlatList
  } from 'react-native';
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    icons,
    images,
    theme,
  } from '../../constants';
import Header from "../../components/Header";
import FormInput from "../../components/FormInput";
import IconButton from "../../components/IconButton";
import { useDispatch } from 'react-redux';
import TextButton from "../../components/TextButton";
import { utils } from "../../utils";
import * as authActions from '../../stores/actions/auth'
import LineDivider from "../../components/LineDivider";

const ModalFilter =  ({isVisible,onClose,onPress,address,onSelect,target}) =>{
    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current
    const [showFilterModal,setShowFilterModal] = React.useState(isVisible)
    const [listAddress,setListAddress]= useState([...address])
    const [selectRange,setSelectRange] = useState("")
    React.useEffect(()=>{
        if(showFilterModal){
            Animated.timing(modalAnimatedValue,{
                toValue:1,
                duration:100,
                useNativeDriver:false
            }).start();
        }else{
            Animated.timing(modalAnimatedValue,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            }).start(()=> onClose());
        }
      
    },[showFilterModal])
    const modalY = modalAnimatedValue.interpolate({
        inputRange:[0,1],
        outputRange:[SIZES.height,SIZES.height-600]

    })
  
    const [searchText,setSearchText]= useState('')
    const onChangeTextHandle = text =>{
        setSearchText(text)
        const cityFilter = [];
       address.forEach((item,_) => {
           if(item.name.includes(text)){
               cityFilter.push(item)
           }
       });
       setListAddress(cityFilter);
    }
    const selectItemHandle = (item) =>{
        onSelect(item,target)
        setShowFilterModal(false)
        
    }
    const HandlerFilter = () =>{
       
    }
    function renderList(){
        return(
            <FlatList
                data={listAddress}
                keyExtractor={item=>`city-${item.id}`}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom:300,
                    //backgroundColor:COLORS.red
                }}
                ListFooterComponentStyle={{
                   marginBottom: 50,
                   backgroundColor:COLORS.red
                }}
                renderItem={({item,index})=>{
                    return(
                        <TouchableOpacity
                            style={{
                              //  backgroundColor:COLORS.white,
                                paddingVertical:SIZES.radius,
                                
                            }}
                            onPress={()=>{
                                selectItemHandle(item)
                            }}
                        >
                            <Text style={{
                                ...FONTS.body3
                            }}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
                ItemSeparatorComponent={()=>(
                    <LineDivider  />
                )}
            />
        )
    }
    function renderSearch() {
        return (
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 45,
              // flex:1,
              marginHorizontal: SIZES.padding,
              marginVertical: SIZES.padding,
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2,
              // paddingTop:5
              //justifyContent:'center'
            }}>
            <Image
              source={icons.search}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{height: 20, width: 20, tintColor: COLORS.black}}
            />
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                alignItems: 'center',
                //  backgroundColor:COLORS.yellow,
                marginBottom: -5,
              }}>
              <TextInput
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  flex: 1,
                  // backgroundColor:COLORS.white,
                  ...FONTS.body3,
                }}
                placeholder="Search text     "
                value={searchText}
                onChangeText={text => onChangeTextHandle(text)}
              />
            </View>
          </View>
        );
      }
    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
        >
            <View
                style={{
                    flex:1,
                    backgroundColor:COLORS.transparentBlack7
                }}
            >
                <TouchableNativeFeedback
                    onPress={()=>setShowFilterModal(false)}
                >
                    <View
                    style={{
                        position:'absolute',
                        top:0,
                        left:0,
                        right:0,
                        bottom:0
                    }}></View>
                </TouchableNativeFeedback>
                <Animated.View
                    style={{
                        position:'absolute',
                        left:0,
                        top:modalY,
                        width:'100%',
                        bottom:0,
                        height:'100%',
                        borderTopLeftRadius:SIZES.padding,
                        borderTopRightRadius:SIZES.padding,
                        padding:SIZES.padding,
                        backgroundColor:COLORS.white
                    }}
                >
                    {/* Header */}
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                          //  padding:SIZES.padding,
                            // paddingHorizontal:SIZES.padding,
                            // paddingVertical:SIZES.radius,
                            //backgroundColor:COLORS.green
                        }}
                    >
                        <Text
                            style={{
                                flex:1,
                               alignContent:'center',
                                justifyContent:'center',
                                ...FONTS.h3,fontSize:18
                            }}
                        >Chọn {target==='city'? 'Tỉnh/Thành phố' :'Quận/huyện'}</Text>
                        <IconButton
                            containerStyle = {{
                                borderWidth:2,
                                borderRadius:10,
                                borderColor: COLORS.gray2
                            }}
                            icon= {icons.cross}
                            iconStyle = {{
                                tintColor: COLORS.gray2
                            }}
                            onPress={()=>{setShowFilterModal(false)}}
                        />
                    </View>
                    <View
                       // showsVerticalScrollIndicator={false}
                            
                        style={{
                           // paddingBottom:100,
                            // backgroundColor:COLORS.red
                        }}
                    >
                        {/* delivery TIme */}
                        {renderSearch()}
                        {/* Pricing Range */}
                        {renderList()}
                    </View>
                    {/* Appy Button */}
                 {/*    <View
                        style={{
                             position:'absolute',
                             bottom:50,
                             left:0,
                             right:0,
                            height:110,
                            paddingHorizontal:SIZES.padding,
                            paddingVertical:SIZES.radius,
                            backgroundColor:COLORS.white
                        }}
                    >
                        <TextButton
                            label="Apply Filter"
                            labelStyle={{
                                color:COLORS.white
                            }}
                            buttonContainerStyle={{
                                height:50,
                                borderRadius:SIZES.base,
                                backgroundColor:COLORS.primaryALS
                            }}
                            onPress={HandlerFilter}
                        />
                    </View> */}
                </Animated.View>
            </View>
        </Modal>
    )
}

export default ModalFilter;