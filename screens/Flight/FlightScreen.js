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
  ScrollView,
  Platform,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import {SIZES, COLORS, icons, FONTS} from '../../constants';
import Header from '../../components/Header';
import * as loadingActions from '../../stores/actions/loadingActions';
import Calendar from '../../components/Calendar/Calendar';
import moment from 'moment';
import Subtitle from '../../components/Subtitle';
import FlightItem from '../../components/FlightItem';
import {
  startOfDay,
  startOfYesterday,
  back7days,
  back30days,
  isYesterday,
  isToday,
  dateWithTime,
  dateWithSec,
} from '../../utils/dateHelpers';
import * as flightsActions from '../../stores/actions/flights';
import {useToast} from 'react-native-toast-notifications';
const FlightScreen = ({navigation, route}) => {
  const {tokenId} = route.params;
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateForFiltering, setDateForFiltering] = useState(startOfDay);
  const [isVisibleCalendar, toggleCalendar] = useState(false);
  const [isActiveCalendar, setActiveCalendar] = useState(false);
  const [error, setError] = useState();
  const textInputRef = React.useRef();
  const toast = useToast();
  const flights = useSelector(state => {
    const loadFlight = [];
    if (searchText === '') {
      return state.flights.flights;
    } else {
      state.flights.flights.forEach((element, index) => {
        if ((element.code + element.flightNo).includes(searchText)) {
          loadFlight.push(element);
        }
      });
      return loadFlight;
    }
  });
  const favouriteFlights = useSelector(
    state => state.flights.favourtiteFlights,
  );
  const setActive = item => {
    setActiveCalendar(false);
    item(true);
  };
  const dispatch = useDispatch();
  const loadFavouriteFlights = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(flightsActions.fetchFavouriteFlights('IMPORT'));
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);
  const loadFlights = useCallback(
    async (code, number, date) => {
      setError(null);
      setIsRefreshing(true);
      /*   dispatch(loadingActions.start({ key: 'fetchFlight' })) */
      try {
        await dispatch(flightsActions.fetchFlights(code, number, date));
      } catch (err) {
        setError(err.message);
      } finally {
        /*    dispatch(loadingActions.stop({ key: 'fetchFlight' })) */
      }
      setIsRefreshing(false);
    },
    [dispatch, setIsLoading, setError],
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFlights('', '', dateWithSec(dateForFiltering));
      loadFavouriteFlights();
    });

    return () => {
      unsubscribe();
    };
  }, [loadFlights]);
  useEffect(() => {
    setIsLoading(true);

    const dateCheck = dateWithSec(dateForFiltering);
    loadFlights('', '', dateCheck).then(() => {
      setIsLoading(false);
      loadFavouriteFlights().then(() => {
        setIsLoading(false);
      });
    });
  }, [dispatch, loadFlights, dateForFiltering]);

  //   useEffect(() => {
  //     focusScanText();
  //   }, [navigation]);
  //   const focusScanText = function () {
  //     setTimeout(() => {
  //       textInputRef.current.focus();
  //     }, 200);
  //   };
  const onToggleCalendar = () => {
    toggleCalendar(prev => !prev);
  };
  const onChangeCalendar = date => {
    if (!date.from && !date.to) return;
    setActive(setActiveCalendar);
    /*   if (!date.to) {
      if (isToday(date.from)) setActive(setActiveToday);
      else if (isYesterday(date.from) ) setActive(setActiveYesterday);
    } */
    setDateForFiltering(date.to ? date : date.from);
  };
  const onChangeTextHandle = text => {
    setSearchText(text);
  };
  const toggleFavoriteHandler = id => {
    dispatch(flightsActions.addFavouriteFlights(id, tokenId, 'IMPORT'));
    if (favouriteFlights.includes(id)) {
      toast.show('Hủy nhận thống báo thành công', {
        type: 'error',
        placement: 'top',
        swipeEnabled: true,
        style: {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.red,
        },
        duration: 2000,
        animationType: 'slide-in',
      });
    } else {
      toast.show('Đăng ký nhận thông báo thành công!', {
        type: 'success',
        placement: 'top',
        swipeEnabled: true,
        style: {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.green,
        },
        duration: 2000,
        animationType: 'slide-in',
      });
    }
  };
  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          paddingHorizontal: SIZES.padding,
           marginTop: Platform.OS=='ios'? 30:0,
          alignItems: 'center',
          backgroundColor: COLORS.white,
          //   borderBottomRightRadius:SIZES.radius*2
        }}
        title="Flight"
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
  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 45,
            flex: 1,
            //   marginTop:SIZES.padding,
            marginBottom: SIZES.base,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
            // paddingTop:5
            //justifyContent:'center'
          }}>
          <Image
            source={icons.search}
            style={{height: 20, width: 20, tintColor: COLORS.black}}
          />
          <View
            style={{
              alignItems: 'center',
              //  backgroundColor:COLORS.yellow,
              marginBottom: -5,
            }}>
            <TextInput
              // onEndEditing={onSearchHandler}
              ref={textInputRef}
              style={{
                flex: 1,
                // backgroundColor:COLORS.white,
                ...FONTS.body3,
              }}
              placeholder="Search Flight...ex:EK9222     "
              value={searchText}
              onChangeText={text => onChangeTextHandle(text)}
            />
          </View>
        </View>
        {/* render Date Filter */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: SIZES.base,
            marginBottom: 10,
            // backgroundColor:COLORS.red
          }}>
          <Calendar
            isVisible={isVisibleCalendar}
            isActiveIcon={isActiveCalendar}
            onToggleCalendar={onToggleCalendar}
            onSelectedDate={onChangeCalendar}
            initialDate={dateForFiltering}
          />
        </View>
      </View>
    );
  }
  function renderFlights() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={COLORS.primaryALS} />
          </View>
        ) : (
          <FlatList
            numColumns={2}
            onRefresh={() => loadFlights('', '', dateWithSec(dateForFiltering))}
            refreshing={isRefreshing}
            data={flights}
            contentContainerStyle={{
              marginTop: SIZES.padding,
              marginHorizontal: SIZES.padding,
              marginBottom: 20,
              backgroundColor: COLORS.white,
            }}
            ListFooterComponent={() => {
              return (
                <View
                  style={{
                    height: 15,
                  }}></View>
              );
            }}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            keyExtractor={item => item.id}
            renderItem={itemData => (
              <FlightItem
                id={itemData.item.id}
                entity={itemData.item}
                onToggleFavourite={toggleFavoriteHandler}
              />
            )}
          />
        )}
      </View>
    );
  }
  function renderSuggesstion() {
    return (
      <View>
        <Text>Suggestion</Text>
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
          height: Platform.OS=='ios'? 110 : 80,
          backgroundColor: COLORS.white,
        }}></View>
      {renderSearch()}
      <Subtitle
        containerStyle={{
          marginHorizontal: SIZES.padding,
          paddingTop: SIZES.base,
          borderBottomColor: COLORS.lightGray1,
          borderBottomWidth: 1,
        }}
        leftText=""
        date={dateForFiltering}
        withoutPadding
      />
      {/*   {searchText === '' && renderSuggesstion()} */}
      {renderFlights()}
    </View>
  );
};

export default FlightScreen;
