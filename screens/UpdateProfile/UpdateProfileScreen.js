import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
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
import Header from '../../components/Header';
import FormInput from '../../components/FormInput';
import {useDispatch,useSelector} from 'react-redux';
import TextButton from '../../components/TextButton';
import {utils} from '../../utils';
import * as authActions from '../../stores/actions/auth';
import LineDivider from '../../components/LineDivider';
import TextRadioButton from '../../components/TextRadioButton';
import ModalFilter from './ModalFilter';
import TextIconButton from '../../components/TextIconButton';
import tinh_tp from '../../constants/tinh_tp';
import quan_huyen from '../../constants/quan_huyen';
import DatePicker from 'react-native-date-picker'
import {
  startOfDay,
  startOfYesterday,
  back7days,
  back30days,
  isYesterday,
  isToday,
  dateWithTime
} from '../../utils/dateHelpers';
import moment from 'moment';
const PICKER_MODE = {
  date: 'date',
  time: 'time',
};

const UpdateProfileScreen = ({navigation, route}) => {
  const fullNameApi = useSelector(state=>state.auth.fullName)
  const dobApi = useSelector(state=>state.auth.dob)
  const cityApi = useSelector(state=>state.auth.city)
  const cccdApi =useSelector(state=>state.auth.cccd)
  const districtApi =useSelector(state=>state.auth.district)
  const wardApi = useSelector(state=>state.auth.ward)
  const email = useSelector(state=>state.auth.email)
  const [sex, setSex] = useState(0);
  const [showFilterModel, setShowFilterModel] = useState(false);
  const [city, setCity] = useState([]);
  const [cityLabel, setCityLabel] = useState(cityApi);
  const [fullName,setFullName] = useState(fullNameApi);
  const [cityId, setCityId] = useState(0);
  const [district, setDistrict] = useState([]);
  const [districtLabel, setDistrictLabel] = useState(districtApi);
  const [districtId,setDistrictId] = useState(0)
  const [ward, setWard] = useState([]);
  const [wardName, setWardName] = useState(wardApi);
  const [target, setTarget] = useState('city');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date())
  const [birthday,setBirthday]= useState(dobApi)
  const [cccd,setCccd] = useState(cccdApi);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [filterDate, setFilterDate] = useState({
    show: false,
    mode: PICKER_MODE.date,
    val: new Date()
  });
  const onDateChange = (date) => {
    setDate(date)
  }


  const onHandlerFilter = value => {};
  const getWardList = async function (id) {
     if (loading) return;
     setLoading(true);
     console.log('https://provinces.open-api.vn/api/d/' +id+'?depth=2')
    // setIsRefreshing(true);
    fetch('https://provinces.open-api.vn/api/d/' +id+'?depth=2', {
      method: 'GET',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(responseJson => {
        /*   if (!responseJson || !responseJson.Space || !responseJson.Data) throw new Error(JSON.stringify(responseJson));
            if (!Array.isArray(responseJson.Data)) throw new Error('Dữ liệu trả về lỗi.'); */
        /*     setSpaceData({Floor1: responseJson?.Space?.Floor1, Floor2: responseJson?.Space?.Floor2}) */
        let wardList = [];
        responseJson.wards.forEach((item, index) => {
          wardList.push({
            id: item?.code,
            name: item?.name,
          });
        });
        setWard(wardList);
      })
      .catch(error => {
        Alert.alert('Lỗi!', error.message);
      })
      .finally(function () {
        setLoading(false);
      });
  };
  const HandleSelectCity = () => {
    setTarget('city');
    const cityArr = [];
    for (const key in tinh_tp) {
      cityArr.push({
        id: key,
        name: tinh_tp[key].name_with_type,
      });
    }
    setCity(cityArr);
    setShowFilterModel(true);
  };
  const HandleSelectDistrict = () => {
    setTarget('districts');
    setShowFilterModel(true);
  };

  const HandleSelectWard = async () =>{
    setTarget('ward');
    setShowFilterModel(true);
   
  }
  const onSelect = async (item, target) => {
    if (target === 'city') {
      setCityLabel(item.name);
      setDistrictLabel('')
      setWardName('')
      const districtArr = [];
      for (const key in quan_huyen) {
        if (quan_huyen[key].parent_code == item.id) {
          districtArr.push({
            id: key,
            name: quan_huyen[key].name_with_type,
          });
        }
      }
      setDistrict(districtArr);
    } else if(target==='districts') {
      setDistrictLabel(item.name);
      setDistrictId(item.id);
      setWardName('')
      await getWardList(item.id)
    }else{
      setWardName(item.name);
    }
  };
  const onHandleSelectDate = () =>{

  }
  const changeFilterDate = (date) =>{
    if (filterDate.mode == PICKER_MODE.date && filterDate.val) {
      date.setHours(filterDate.val.getHours());
      date.setMinutes(filterDate.val.getMinutes());
    }
    setFilterDate({show: false, val: date ? date : filterDate.val});
    setBirthday(date)
   
  }
  console.log('birthday------------------',birthday)
  const submitHandle = async () =>{
    const action = authActions.updateDetail(cityLabel,fullName,birthday,cityLabel,districtLabel,wardName,'',cccd)
    setError(null);
    setIsLoading(true)
    try{
      await dispatch(action);
      setIsLoading(false);
      navigation.goBack()
    }catch(err){
      Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
      setError(err);
      setIsLoading(false);
    }
}
  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          paddingHorizontal: SIZES.padding,
          //  marginTop:SIZES.padding,
          alignItems: 'center',
          backgroundColor: COLORS.white,
          //   borderBottomRightRadius:SIZES.radius*2
        }}
        title="Thông tin cá nhân"
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
  function renderFooter() {
    return (
      <View
        style={{
          paddingTop: SIZES.radius,
          paddingBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}>
        <TextButton
          //disabled={selectedCard==null}
          buttonContainerStyle={{
            height: 60,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primaryALS,
          }}
          label={'Lưu thông tin'}
          onPress={submitHandle}
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
      {/* Header */}
      {renderHeader()}
      <View
        style={{
          height: Platform.OS == 'ios' ? 90 : 60,
          backgroundColor: COLORS.white,
        }}></View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 30,
          paddingTop: 60,
        }}>
        <FormInput
          label="Họ và tên"
          keyboardType="email-address"
          autoCompleteType="email"
          inputValue={fullNameApi}
          inputStyle={{
            color: COLORS.primaryALS,
          }}
          onChange={text => {
            setFullName(text)
          }}
          //  errMsg={emaiError}
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Image
                source={icons.user}
                style={{
                  width: 20,
                  height: 20,
                  tintColor:
                    'email' == ''
                      ? COLORS.gray
                      : 'email' != '' && 'email' == ''
                      ? COLORS.green
                      : COLORS.primaryALS,
                }}
              />
            </View>
          }
        />
        <View
          style={{
            marginTop: SIZES.base,
            marginBottom: SIZES.base,
          }}>
          <Text>Ngày/Tháng năm sinh:</Text>
          <TextIconButton
            labelStyle={{
              color: COLORS.gray,
            }}
            label={moment(birthday).format('DD/MM/YYYY')}
            iconPostion="RIGHT"
            icon={icons.calendar}
            containerStyle={{
              borderRadius: SIZES.radius,
              paddingHorizontal:SIZES.padding,
              height: 55,
              backgroundColor: COLORS.lightGray2,
              borderWidth: 1,
              borderColor: COLORS.lightGray1,
              marginTop: SIZES.base,
            }}
            iconStyle={{
              width: 15,
              height: 15,
              tintColor: COLORS.green
            }}
            onPress={() => setFilterDate({...filterDate, mode: PICKER_MODE.date, show: true})}
          />
        </View>
        {/* Gioi tinh */}
        <View
          style={{
            marginTop: SIZES.base,
            marginBottom: SIZES.base,
          }}>
          <Text>Giới tính</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: SIZES.radius,
            }}>
            <TextRadioButton
              customContainerStyle={{
                flex: 1,
              }}
              iconStyle={
                {
                  tintColor:  COLORS.primaryALS
                }
             
              }
              label="Nam"
              isSelected={sex===0?true : false}
              onPress={()=>{setSex(0)}}
            />
            <TextRadioButton
              customContainerStyle={{
                flex: 1,
              }}
              iconStyle={
                {
                  tintColor:  COLORS.primaryALS
                }
             
              }
              label="Nữ"
              isSelected={sex===1?true : false}
              onPress={()=>{setSex(1)}}
            />
            <TextRadioButton
              customContainerStyle={{
                flex: 1,
              }}
              iconStyle={
                {
                  tintColor:  COLORS.primaryALS
                }
             
              }
              isSelected={sex===2?true : false}
              label="Khác"
              onPress={()=>{setSex(2)}}
            />
          </View>
        </View>
        <FormInput
          containerStyle={{
            marginTop: SIZES.base,
          }}
          ediable={false}
          label="Số điện thoại"
          keyboardType="number-pad"
          autoCompleteType="email"
          inputValue="SDT"
          inputStyle={{
            color: COLORS.primaryALS,
          }}
          onChange={text => {
            //  utils.validateEmail(text, setEmailError);
            // setEmail(text);
          }}
          
          //  errMsg={emaiError}
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Image
                source={icons.phone}
                style={{
                  width: 20,
                  height: 20,
                  tintColor:
                  COLORS.green
                }}
              />
            </View>
          }
        />
        <FormInput
          containerStyle={{
            marginTop: SIZES.base,
          }}
          ediable={false}
          label="Email"
          keyboardType="number-pad"
          autoCompleteType="email"
          inputValue={email}
          inputStyle={{
            color: COLORS.primaryALS,
          }}
          onChange={text => {
            //  utils.validateEmail(text, setEmailError);
            // setEmail(text);
          }}
          
          //  errMsg={emaiError}
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Image
                source={icons.email}
                style={{
                  width: 20,
                  height: 20,
                  tintColor:
                  COLORS.green
                }}
              />
            </View>
          }
        />
        <FormInput
          containerStyle={{
            marginTop: SIZES.base,
          }}
          label={'CCCD'}
          keyboardType="number-pad"
          autoCompleteType="email"
          inputValue={cccdApi}
          inputStyle={{
            color: COLORS.primaryALS,
          }}
          onChange={text => {
            setCccd(text)
            //  utils.validateEmail(text, setEmailError);
            // setEmail(text);
          }}
          //  errMsg={emaiError}
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Image
                source={icons.info}
                style={{
                  width: 20,
                  height: 20,
                  tintColor:
                    'email' == ''
                      ? COLORS.gray
                      : 'email' != '' && 'email' == ''
                      ? COLORS.green
                      : COLORS.primaryALS,
                }}
              />
            </View>
          }
        />
        <View>
          <LineDivider
            lineStyle={{
              marginVertical: SIZES.padding,
              backgroundColor: COLORS.gray2,
            }}
          />
        </View>
        <View
          style={{
            marginTop: SIZES.base,
            marginBottom: SIZES.base,
          }}>
          <Text>Tỉnh/Thành phố:</Text>
          <TextIconButton
            labelStyle={{
              color: COLORS.gray,
            }}
            label={cityLabel}
            iconPostion="RIGHT"
            icon={icons.down_arrow}
            containerStyle={{
              borderRadius: SIZES.radius,
              height: 55,
              backgroundColor: COLORS.lightGray2,
              borderWidth: 1,
              borderColor: COLORS.lightGray1,
              marginTop: SIZES.base,
            }}
            iconStyle={{
              width: 15,
              height: 15,
              marginLeft: 10,
            }}
            onPress={() => HandleSelectCity()}
          />
        </View>

        <View
          style={{
            marginTop: SIZES.base,
            marginBottom: SIZES.base,
          }}>
          <Text>Quận/huyện:</Text>
          <TextIconButton
            labelStyle={{
              color: COLORS.gray,
            }}
            label={districtLabel}
            iconPostion="RIGHT"
            icon={icons.down_arrow}
            containerStyle={{
              borderRadius: SIZES.radius,
              height: 55,
              backgroundColor: COLORS.lightGray2,
              borderWidth: 1,
              borderColor: COLORS.lightGray1,
              marginTop: SIZES.base,
            }}
            iconStyle={{
              width: 15,
              height: 15,
              marginLeft: 10,
            }}
            onPress={() => HandleSelectDistrict()}
          />
        </View>
        <View
          style={{
            marginTop: SIZES.base,
            marginBottom: SIZES.base,
          }}>
          <Text>Phường/xã:</Text>
          <TextIconButton
            labelStyle={{
              color: COLORS.gray,
            }}
            label={wardName}
            iconPostion="RIGHT"
            icon={icons.down_arrow}
            containerStyle={{
              borderRadius: SIZES.radius,
              height: 55,
              backgroundColor: COLORS.lightGray2,
              borderWidth: 1,
              borderColor: COLORS.lightGray1,
              marginTop: SIZES.base,
            }}
            iconStyle={{
              width: 15,
              height: 15,
              marginLeft: 10,
            }}
            onPress={() => HandleSelectWard()}
          />
        </View>
      </ScrollView>
      {showFilterModel && (
        <ModalFilter
          isVisible={showFilterModel}
          onPress={onHandlerFilter}
          onClose={() => setShowFilterModel(false)}
          address={target === 'city' ? city : target==='ward'? ward : district}
          onSelect={onSelect}
          target={target}
        />
      )}
       {
            filterDate.show && (
              <DatePicker
                modal
                mode={filterDate.mode}
                open={filterDate.show}
                //date={filterDate.val}
                onConfirm={changeFilterDate}
                onCancel={() => setFilterDate({...filterDate, show: false})}
                //  minimumDate={new Date(2000, 1, 1)}
                //  maximumDate={new Date()}
                locale={"en"}
                textColor={COLORS.black}
                date={date}
      onDateChange={onDateChange}
              />
            )
          }
      {renderFooter()}
    </View>
  );
};

export default UpdateProfileScreen;
