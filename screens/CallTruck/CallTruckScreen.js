import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  FlatList,
  Platform,
} from 'react-native';
import AccountSwiper from './components/index';
import LineDivider from '../../components/LineDivider';
import Swiper from 'react-native-swiper';
import {Text, COLORS, SIZES, icons, constants} from '../../constants';
import * as scalingUtils from '../../constants/scalingUtils';
import * as dimensions from '../../constants/dimensions';
import {dummyData} from '../../constants';
import R from 'ramda';
import Header from '../../components/Header';
const locationTabs = constants.locations.map(location => ({
  ...location,
  ref: React.createRef(),
}));
const TabIndicator = ({measureLayout, scrollX}) => {
  const inputRange = locationTabs.map((_, i) => i * SIZES.width);
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.x),
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        height: '100%',
        width: (SIZES.width - SIZES.radius * 2) / 2,
        //  borderRadius:SIZES.radius,
        backgroundColor: COLORS.white,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.red,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};
const Tabs = ({scrollX, onLocationTabPress}) => {
  const [measureLayout, setMeasureLayout] = useState([]);
  const containerRef = React.useRef();
  useEffect(() => {
    let ml = [];
    locationTabs.forEach(locationTab => {
      locationTab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({x, y, width, height});
          if (ml.length === locationTabs.length) {
            setMeasureLayout(ml);
          }
        },
      );
    });
  }, [containerRef.current]);
  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: 'row',
        backgroundColor: COLORS.white,
      }}>
      {/* Tab Indicator */}
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}
      {/* Tab */}
      {locationTabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`LocationTab-${index}`}
            style={{
              flex: 1,
            }}
            onPress={() => onLocationTabPress(index)}
            //onPress
          >
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
              }}>
              <Text gray body3>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const CallTruckScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [truckList, setTruckList] = useState([]);
  const containerRef = React.useRef();
  const [truckData, setTruckData] = useState([]);
  const [locationId, setLocationId] = useState(1);
  const [indexValue, setIndexValue] = useState(0);
  const [listRef, setListRef] = useState(null);
  const [isScrollEnabled, setScrollEnabled] = useState(true);
  const initialId = R.findIndex(R.propEq('id', locationId))(dummyData.Location);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const locationTabScrollViewRef = React.useRef();
  const onLocationTabPress = React.useCallback(locationTabIndex => {
    locationTabScrollViewRef?.current?.scrollToOffset({
      offset: locationTabIndex * SIZES.width,
    });
  });
  const getTruckList = async function () {
    if (loading) return;
    setLoading(true);
    setIsRefreshing(true);
    fetch('http://14.160.23.141:8011/api/CallTrucks', {
      method: 'GET',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(responseJson => {
        /*   if (!responseJson || !responseJson.Space || !responseJson.Data) throw new Error(JSON.stringify(responseJson));
            if (!Array.isArray(responseJson.Data)) throw new Error('Dữ liệu trả về lỗi.'); */
        /*     setSpaceData({Floor1: responseJson?.Space?.Floor1, Floor2: responseJson?.Space?.Floor2}) */
        let truckListTmp = [];
        responseJson.Data.forEach((item, index) => {
          let createdStr = item?.Created || '';
          truckListTmp.push({
            id: index,
            BSX: item?.BSX || '',
            Created: createdStr.slice(11, 16),
            Floor: item?.Floor,
            SortValue: item?.SortValue,
          });
        });
        setTruckList(truckListTmp);
      })
      .catch(error => {
        Alert.alert('Lỗi!', error.message);
      })
      .finally(function () {
        setLoading(false);
        setIsRefreshing(false);
      });
  };
  useEffect(() => {
    getTruckList().then(() => null);
  }, []);
  function renderTabBar() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray,
        }}>
        <Tabs scrollX={scrollX} onLocationTabPress={onLocationTabPress} />
      </View>
    );
  }
  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 60,
          paddingHorizontal: SIZES.padding,
          marginTop: Platform.OS == 'ios' ? 30 : 0,
          alignItems: 'center',
          backgroundColor: COLORS.white,
          //   borderBottomRightRadius:SIZES.radius*2
        }}
        title="Call Trucks"
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
  function renderList() {
    return (
      <Animated.FlatList
        ref={locationTabScrollViewRef}
        data={locationTabs}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: scrollX}},
            },
          ],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
              }}>
              <FlatList
                data={truckList.filter(c => c.Floor === item.id)}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={LineDivider}
                onRefresh={() => getTruckList()}
                refreshing={isRefreshing}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        // marginBottom:SIZES.radius,
                        paddingVertical: SIZES.padding,
                        //   backgroundColor:COLORS.yellow
                      }}>
                      <View style={{}}>
                        <Text style={{marginLeft: SIZES.radius}} body3 gray>
                          {item.BSX}
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}>
                        <Text style={{marginLeft: SIZES.radius}} body3 gray>
                          {item.Created}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    );
  }
  function renderTitle() {
    return (
      <View
        style={{
          height: 40,
          paddingHorizontal: SIZES.radius,
          justifyContent: 'flex-end',
          //backgroundColor:COLORS.red
        }}>
        <Text gray body3>
          Danh sách xe được gọi
        </Text>
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
          height: Platform.OS == 'ios' ? 90 : 60,
          backgroundColor: COLORS.white,
        }}></View>
      {renderTabBar()}
      {renderTitle()}
      {renderList()}
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    height: scalingUtils.verticalScale(150),
  },
  swiperButtons: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: dimensions.indent * 1.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // buttonText: {
  //   color: COLORS.white,
  //   opacity: 0.8,
  //   fontSize: fontSizes.xbig,
  // },
  accountContainer: {
    flex: 1,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
    margin: dimensions.indent,
    borderRadius: dimensions.borderRadius,
  },
  accountNameContainer: {
    position: 'absolute',
    bottom: scalingUtils.verticalScale(10),
  },
});
export default CallTruckScreen;
