import React,{useState,useCallback,useRef,useEffect} from "react";
import {View,Text,TouchableOpacity,Image,TextInput,FlatList,ActivityIndicator, Alert,Animated} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authActions from  '../../stores/actions/auth';
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from "../../components/HeaderButton";
import { SIZES,COLORS, icons,FONTS } from "../../constants";
import Header from "../../components/Header";
import * as lagiAction from '../../stores/actions/lagis'
import LagiItem from "../../components/LagiItem";
import { VISITOR_KEYS } from "@babel/types";
import * as cartLagiAction from '../../stores/actions/cartLagi'
import CartQuantityButton from "../../components/CartQuantityButton";
const ImpAwbScreen = ({navigation,route}) =>{
    const cartLagiQuantity = useSelector(state=>state.cartLagi.quantity)
    const cartItemsKey = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cartLagi.items) {
          transformedCartItems.push(key);
        }
        return transformedCartItems
      });
    const debounceTime = 100;  
    const lagisLoaded = useSelector((state) => state.lagis.lagis);
    const [searchText,setSearchText] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const lagiFavourite = useSelector(c=>c.lagis.favoriteLagi)
    const [scaleAnim,setScaleAnim] =useState(new Animated.Value(0));
   // const token = useSelector(c=>c.token.token)
    const selectItemHander = (id,mawb,hawb)=>{
        navigation.navigate('ImpAwbDetail',{
            lagiId:id,
            mawb: mawb,
            hawb: hawb
        })
    }
    const dispatch = useDispatch();
    const handleReset = () =>{
        dispatch(authActions.logout())
    }
    const onChangeTextHandle = text =>{
        setSearchText(text);
        if (text.length === 11) {
            setLoading(true);
            loadLagis(text).then(() => {
              setLoading(false);
            });
        }
    }
    const loadLagis = useCallback(
        async (text) => {
          setError(null);
          try {
            await dispatch(lagiAction.getLagi(text));
          } catch (err) {}
        },
        [dispatch]
      );
    function renderHeader(){
        return(
            <Header
                containerStyle={{
                    height:60,
                    paddingHorizontal: SIZES.padding,
                    alignItems:'center',
                    backgroundColor:COLORS.white,
                }}
                title="AWB Import"
                leftComponent={
                    <TouchableOpacity
                        style={{
                            width:35,
                            height:35,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:SIZES.radius,
                            borderWidth:1,
                            borderColor:COLORS.gray2,
                            
                        }}
                        onPress={()=>navigation.goBack()}
                    >
                       <Image 
                       source={icons.back}
                       style={{
                           width:25,
                           height:25
                       }}
                       resizeMode="contain" />
                    </TouchableOpacity>
                }
                rightComponent={
                    <TouchableOpacity
            style={{
                width:40,
                height:40,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:SIZES.radius,
                backgroundColor:COLORS.lightOrange2,
            }}
            onPress={()=>navigation.navigate("CartLagi")}
        >
            <Animated.Image
                source={icons.cart}
                style={{
                    width:20,
                    height:20,
                    tintColor:COLORS.black,
                    transform:[{scale:scaleAnim.interpolate({
                        inputRange:[0,0.2,0.8,1],
                        outputRange:[1,1.2,1.8,1],
                        extrapolate:'clamp'
                      })}]
                }}
            />
            <View
                style={{
                    position:'absolute',
                    top:5,
                    right:5,
                    height:16,
                    width:16,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:8,
                    backgroundColor:COLORS.primary
                }}
            >
                <Text style={{
                    color:COLORS.white,
                    fontSize: SIZES.body5
                }}>{cartLagiQuantity}</Text>
            </View>
        </TouchableOpacity>
                }
                /*  rightComponent={<CartQuantityButton quantity={cartLagiQuantity} onPress={()=>navigation.navigate("CartLagi")} />} */
            />
            
        )
    }
    function renderSearch(){
        return(
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    height:45,
                   // flex:1,
                    marginHorizontal:SIZES.padding,
                    marginVertical:SIZES.padding,
                    paddingHorizontal:SIZES.radius,
                    borderRadius:SIZES.radius,
                    backgroundColor:COLORS.lightGray2,
                   // paddingTop:5
                    //justifyContent:'center'
                
                }}
            >
                 <Image source={icons.search}
                style={{height:20,width:20,tintColor:COLORS.black}}
                />
                <View style={{
                    alignItems:'center',
                  //  backgroundColor:COLORS.yellow,
                    marginBottom:-5
                }}>
                <TextInput style={{
                    flex:1,
                  // backgroundColor:COLORS.white,
                    ...FONTS.body3
                }} 
                placeholder="Search AWB...ex:16062287595     "  
                value={searchText}
                onChangeText={(text)=>onChangeTextHandle(text)}
                />
                </View>
                  
            </View>
        )
    }
    const onPickUpHandler = async (lagi) =>{
        if(cartItemsKey.indexOf(lagi.id)!== -1){
            return alert('Đã tồn tại awb trong danh sách')
        }
        dispatch(cartLagiAction.addToCartLagi(lagi))
        Animated.timing(
            scaleAnim,
            {
              duration:500,
              toValue:1,
              useNativeDriver:true
            },
          
          ).start(({ finished }) => {
            setScaleAnim(new Animated.Value(0))
          })
    }
    const toggleFavoriteHandler = async (id)=>{
        await dispatch(lagiAction.toggleFavorite(id))
      }
    function renderBody(){
          return(
              <View
                style={{
                    flex:1,
                   // marginTop:80,
                    backgroundColor:COLORS.white,
                    borderTopLeftRadius:SIZES.radius*2
                }}
              >
                   {renderSearch()}
            {renderLagis()}
              </View>
          )
      }
      
//   if (loading) {
//     return 
//   }
    function renderLagis(){
        return(
            loading ? (
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <ActivityIndicator size="large" color={COLORS.primaryALS} />
                </View>
              ) : (<FlatList
                data={lagisLoaded}
                keyExtractor={item=>`${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={()=>{
                    return(
                        <View style={{
                            marginVertical:SIZES.base,
                            marginHorizontal:SIZES.padding,
                        }}>
                            <Text>LIST HAWB OF MAWB {searchText}</Text>
                        </View>
                    )
                }}
                renderItem={({item,index})=>{
                    return(
                        <LagiItem
                            item={item}
                            onToggleFavourite = {toggleFavoriteHandler}
                            onPress={selectItemHander}
                            onPickUp = {onPickUpHandler}
                        />
                    )
                }}
            />)
        )
    }
   
    return(
        <View
            style={{
                flex:1,
                backgroundColor: COLORS.white
            }}
        >
            {renderHeader()}
            <View
                style={{
                    height:60,
                    backgroundColor:COLORS.white
                }}
            ></View>
            {renderBody()}
           
        </View>
    )
}
export const screenOptions = navData => {
    return {
        headerTitle: 'AWB Detail',
        headerTitleContainerStyle:{
            paddingLeft:SIZES.padding *3
          //  backgroundColor:COLORS.green,
          //  alignItems:'center'
        },
        headerBackTitleStyle:{
            backgroundColor:COLORS.red
        },
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Back"
                iconName={Platform.OS === 'android' ? 'chevron-back' : 'chevron-back'}
                onPress={() => {
                    navData.navigation.goBack()
                }}
              />
            </HeaderButtons>
        )
    }
  };
export default ImpAwbScreen;