import React,{useState,useEffect,useCallback} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,FlatList,
    Animated,
    TouchableNativeFeedback,
    Modal,
    ScrollView
} from 'react-native';
import { COLORS,FONTS,SIZES,icons,constants } from '../../../constants';
import IconButton from '../../../components/IconButton';
import TextButton from '../../../components/TextButton';
import TextIconButton from '../../../components/TextIconButton';
const Section =({containerStyle,title,children})=>{
    return(
        <View
            style={{
                marginTop:SIZES.padding,
                ...containerStyle
            }}
        >
            <Text style={{...FONTS.h3}}>{title}</Text>
            {children}
        </View>
    )
}
const ModalFilter =  ({isVisible,onClose,onPress}) =>{
   
    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current
    const [showFilterModal,setShowFilterModal] = React.useState(isVisible)
    const [selectRange,setSelectRange] = useState("")
    React.useEffect(()=>{
        if(showFilterModal){
            Animated.timing(modalAnimatedValue,{
                toValue:1,
                duration:500,
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
        outputRange:[SIZES.height,SIZES.height-300]

    })
    const HandlerFilter = () =>{
        if(selectRange !== ''){
            onPress(selectRange)
            setShowFilterModal(false)
        }
       
    }
    function renderDeliveryTime(){
        return(
            <Section
                title="Time Range"
                containerStyle={{
                    marginTop:40
                }}
            >
                <View
                    style={{flexDirection:'row',
                flexWrap:'wrap',marginTop:SIZES.radius}}
                >
                    <TextButton
                                label= "Week"
                                labelStyle={{
                                    color:  selectRange === "Week" ? COLORS.white : COLORS.primaryALS,
                                    ...FONTS.body3
                                }}
                                buttonContainerStyle = {{
                                    width:'30%',
                                    height:50,
                                    margin:5,
                                    alignItems:'center',
                                    borderRadius: SIZES.base,
                                    backgroundColor: selectRange === "Week" ? COLORS.primaryALS : COLORS.lightGray2
                                }}
                                onPress={()=>setSelectRange("Week")}
                            />
                              <TextButton
                                label= "Month"
                                labelStyle={{
                                    color:  selectRange === "Month" ? COLORS.white : COLORS.primaryALS,
                                    ...FONTS.body3
                                }}
                                buttonContainerStyle = {{
                                    width:'30%',
                                    height:50,
                                    margin:5,
                                    alignItems:'center',
                                    borderRadius: SIZES.base,
                                    backgroundColor: selectRange === "Month" ? COLORS.primaryALS : COLORS.lightGray2
                                }}
                                onPress={()=>setSelectRange("Month")}
                            />
                </View>
            </Section>
        )
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
                            alignItems:'center'
                        }}
                    >
                        <Text
                            style={{
                                flex:1,
                                ...FONTS.h3,fontSize:18
                            }}
                        >Filter your search</Text>
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
                        {renderDeliveryTime()}
                        {/* Pricing Range */}
                    </View>
                    {/* Appy Button */}
                    <View
                        style={{
                            // position:'absolute',
                            // bottom:50,
                            // left:0,
                            // right:0,
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
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}

export default ModalFilter;