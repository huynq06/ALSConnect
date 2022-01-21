import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
  Animated,
  LogBox,
  ScrollView,
  Platform,
  Keyboard,
  RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authActions from '../../stores/actions/auth';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/HeaderButton';
import {SIZES, COLORS, icons, FONTS} from '../../constants';
import Header from '../../components/Header';
import * as lagiAction from '../../stores/actions/lagis';
import LagiItem from '../../components/LagiItem';
import * as labsAction from '../../stores/actions/labs';
import CartQuantityButton from '../../components/CartQuantityButton';
import LabItem from '../../components/LabItem';
import {FullWindowOverlay} from 'react-native-screens';
import FlightExportItem from '../../components/FlightExportItem';
import LineDivider from '../../components/LineDivider';
import TextButton from '../../components/TextButton';
import { useToast } from "react-native-toast-notifications";
import { set } from 'lodash';
const ExpAwbScreen = ({navigation, route}) => {
  const labsLoaded = useSelector(state => state.labs.labs);
  const labIdent = useSelector(state=>state.labs.labIdent)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {tokenId} = route.params;
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFavourite,setIsFavourite] = useState(labsLoaded?.isFavourite)
  const dispatch = useDispatch();
  const toast = useToast();
  // useEffect(() => {
  //   LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  // }, []);
  const loadLabs = useCallback(
    async (text) => {
      setError(null);
      setIsRefreshing(true);
      try {
        await dispatch(labsAction.getLab(text));
      } catch (err) {}
      finally{
        setIsRefreshing(false);
      }
    },
    [dispatch,labsLoaded,isFavourite],
  );
useEffect(()=>{
  setIsFavourite(labsLoaded?.isFavourite)
},[dispatch,labsLoaded])
  const onChangeTextHandle = text => {
    setSearchText(text);
    if (text.length === 11) {
      Keyboard.dismiss()
      setLoading(true);
      loadLabs(text).then(() => {
        setLoading(false);
  
      });
    }
  };
  const addFavLab = useCallback(async (labParam)=>{
    setError(null);
    try {
      dispatch(labsAction.addFavouriteLab(labParam,tokenId))
    } catch (error) {
      
    }
  },[dispatch])
  const toggleFavoriteHandle = () =>{
     try{
      addFavLab(labIdent).then(()=>{
        setIsFavourite(!isFavourite)
        if(isFavourite){
          toast.show("Hủy nhận thống báo thành công",{
            type:'error',
            placement:'top',
          swipeEnabled:true,
          style:{
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:COLORS.red
          },
            duration:2000,
            animationType:'slide-in'
          });
        }
        else{
          toast.show("Đăng ký nhận thông báo thành công!",{
            type:'success',
            placement:'top',
          swipeEnabled:true,
          style:{
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:COLORS.green
          },
            duration:2000,
            animationType:'slide-in'
          });
        }
      })
     
     
     }catch(err){
       console.log(err);
        /* Alert.alert(err) */
     }
  }
  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 45,
          marginHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray1,
        }}>
        <Image
          source={icons.search}
          style={{height: 20, width: 20, tintColor: COLORS.black}}
        />
        <View
          style={{
            alignItems: 'center',
            marginBottom: -5,
          }}>
          <TextInput
            style={{
              flex: 1,
              ...FONTS.body3,
            }}
            placeholder="Search AWB...ex:16040662451     "
            value={searchText}
            onChangeText={text => onChangeTextHandle(text)}
          />
        </View>
      </View>
    );
  }
  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 60,
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
          marginTop: Platform.OS == 'ios'? 30 : 0,
          backgroundColor: COLORS.white,
        }}
        title="AWB Export"
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

        /*  rightComponent={<CartQuantityButton quantity={cartLagiQuantity} onPress={()=>navigation.navigate("CartLagi")} />} */
      />
    );
  }
  function renderAwbDetail(){
    return(
      <View>
         <View
          style={{
            paddingVertical: SIZES.base,
            backgroundColor: COLORS.white,
            flexDirection: 'row',
            marginHorizontal: SIZES.padding,
          }}>
          <Text
            style={{
              ...FONTS.h3,
              flex: 7,
            }}>
            Chi tiết vận đơn
          </Text>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'space-around',
              backgroundColor: COLORS.white,
            }}>
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                borderRadius: 5,
                alignSelf: 'flex-end',
                borderColor: COLORS.primary,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={toggleFavoriteHandle}>
              <Image
                source={icons.love}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: isFavourite? COLORS.red: COLORS.gray,
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                borderRadius: 5,
                alignSelf: 'flex-end',
                borderColor: COLORS.gray,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {}}>
              <Image
                source={icons.menu}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.gray,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <LineDivider />
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: COLORS.white,
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.padding,
          }}>
          <Text
            style={{
              flex: 2,
              ...FONTS.body3,
            }}>
            SO AWB
          </Text>
          <Text
            style={{
              flex: 5,
              ...FONTS.body3,
            }}>
            {labsLoaded?.genralExp?.Mawb}
          </Text>
        </View>
        {/* kien & can */}
        <View
          style={{
            flexDirection: 'row',
            height: 30,
            backgroundColor: COLORS.white,
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.padding,
          }}>
          <Text
            style={{
              flex: 2,
              ...FONTS.body3,
            }}>
            SỐ KIỆN:
          </Text>
          <Text
            style={{
              flex: 5,
              ...FONTS.body3,
            }}>
            {labsLoaded?.genralExp?.Pieces}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 30,
            backgroundColor: COLORS.white,
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.padding,
          }}>
          <Text
            style={{
              flex: 2,
              ...FONTS.body3,
            }}>
            SỐ CÂN:
          </Text>
          <Text
            style={{
              flex: 5,
              ...FONTS.body3,
            }}>
            {labsLoaded?.genralExp?.Weight}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 30,
            backgroundColor: COLORS.white,
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.padding,
          }}>
          <Text
            style={{
              flex: 2,
              ...FONTS.body3,
            }}>
            TÊN HÀNG:
          </Text>
          <Text
            style={{
              flex: 5,
              ...FONTS.body3,
            }}>
            {labsLoaded?.genralExp?.Commodity}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: COLORS.white,
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.padding,
          }}>
          <Text
            style={{
              flex: 2,
              ...FONTS.body3,
            }}>
            ORG:
          </Text>
          <Text
            style={{
              flex: 5,
              ...FONTS.body3,
            }}>
            HAN
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 30,
            backgroundColor: COLORS.white,
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.padding,
          }}>
          <Text
            style={{
              flex: 2,
              ...FONTS.body3,
            }}>
            DES:
          </Text>
          <Text
            style={{
              flex: 5,
              ...FONTS.body3,
            }}>
            {labsLoaded?.genralExp?.Dest}
          </Text>
        </View>
        <LineDivider />
        <View
          style={{
            height:5,
            backgroundColor:COLORS.lightGray1
          }}
        ></View>
        <TouchableOpacity
        onPress={()=>{
          navigation.navigate('AwbTracking',{
            cargoStatus: labsLoaded?.cargoStatus,
            labId: labIdent,
            awb: labsLoaded?.genralExp?.Mawb
         })}}
          style={{
            flexDirection: 'row',
            paddingVertical: SIZES.padding,
            marginHorizontal: SIZES.padding,
          }}>
          <Image
            source={icons.baby_car}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.green,
            }}
          />
          <Text
            style={{
              ...FONTS.body3,
              marginLeft: SIZES.radius,
              flex: 1,
            }}>
            Tracking
          </Text>
          <Image
            source={icons.right_arrow}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray,
            }}
          />
        </TouchableOpacity>
        <LineDivider />
        <View
          style={{
            height:5,
            backgroundColor:COLORS.lightGray1
          }}
        ></View>
        <TouchableOpacity
           onPress={()=>{navigation.navigate('AwbCustomTracking',{
            labId: labIdent,
            awb: labsLoaded?.genralExp?.Mawb
           })}}
          style={{
            flexDirection: 'row',
            paddingVertical: SIZES.radius,
            marginBottom:SIZES.radius,
            marginHorizontal: SIZES.padding,
          }}>
          <Image
            source={icons.profile}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.green,
            }}
          />
          <Text
            style={{
              ...FONTS.body3,
              marginLeft: SIZES.radius,
              flex: 1,
            }}>
            Custom
          </Text>
          <Image
            source={icons.right_arrow}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray,
            }}
          />
        </TouchableOpacity>
        <LineDivider />
        <View
          style={{
            height:5,
            backgroundColor:COLORS.lightGray1,
            marginBottom:SIZES.padding
          }}
        ></View>
      </View>
    )
  }
  function renderLabs() {
    return (
      loading ? (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size="large" color={COLORS.primaryALS} />
        </View>
      ) : <View
        style={{
          backgroundColor: COLORS.white,
          marginTop: SIZES.base,
        }}>
        {/* thong tin chung */}
       
        <View
          style={{
            paddingVertical: SIZES.base,
          
          }}>
            <View
              style={{
                marginHorizontal:SIZES.padding
              }}
            >
            <Text
            style={{
              ...FONTS.h3,
            }}>
            Thông tin chuyến bay
          </Text>
            </View>
        
          <FlatList
            numColumns={2}
            refreshing={isRefreshing}
            onRefresh={()=>loadLabs(searchText)}
            ListHeaderComponent={()=>{
              return(
                renderAwbDetail()
              )
              
            }}
            ListHeaderComponentStyle={{
              paddingHorizontal:0
            }}
            listKey='Flights'
            data={labsLoaded?.flightExps}
            contentContainerStyle={{
              marginTop: SIZES.padding,
              marginBottom: 20,
              //paddingHorizontal:SIZES.padding
            }}
            ListFooterComponent={() => {
              return (
                <View
                  style={{
                    height: 200,
                  }}></View>
              );
            }}

            columnWrapperStyle={{justifyContent: 'space-between'}}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item,index}) => {
              return(
                <FlightExportItem
                id={item}
                entity={item}
                customContainerStyle={{
                  borderWidth:1,
                  borderColor: COLORS.primaryALS,
                  marginLeft: index%2==0? SIZES.radius: 0,
                  marginRight: index%2==0? 0 : SIZES.radius
                  //marginHorizontal:10
                }}
              />
              )
            }}
          />
        </View>
      </View>
    );
  }
  function renderBody() {
    return (
      <View
        style={{
          flex: 1,
          // marginTop:80,
          backgroundColor: COLORS.white,
        }}>
        {renderSearch()}
        <View
          style={{
            height: 2,
            backgroundColor: COLORS.lightGray1,
            marginTop: SIZES.padding,
          }}></View>
        {labsLoaded.genralExp ? renderLabs() : <View></View>}
      </View>
    );
  }
  function renderFooter() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 60,
          marginBottom: 10,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
          paddingVertical: SIZES.base,
          borderTopWidth: 1,
          borderTopColor: COLORS.lightGray1,
        }}>
        {/* Reset */}
        <TextButton
          buttonContainerStyle={{
            flex: 1,
            borderRadius: SIZES.radius,
            borderWidth: 1,
            backgroundColor: null,
          }}
          label="Reset"
          labelStyle={{
            color: COLORS.black,
            ...FONTS.h3,
          }}
        />
        {/* Apply */}
        <TextButton
          buttonContainerStyle={{
            flex: 1,
            borderRadius: SIZES.radius,
            marginLeft: SIZES.radius,
            borderColor: COLORS.primary,
            borderWidth: 1,
            backgroundColor: COLORS.primary,
          }}
          label="Apply"
          labelStyle={{
            color: COLORS.black,
            ...FONTS.h3,
          }}
        />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
      <View
        style={{
          height: Platform.OS === 'ios' ? 90 : 60,
          backgroundColor: COLORS.white,
        }} />
      {renderBody()}
      {/*  {renderFooter()} */}
    </View>
  );
};
export default ExpAwbScreen;
