import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';
import Tabs from '../../../components/Tabs';
import {
  COLORS,
  SIZES,
  Text,
  images,
  icons,
  constants,
} from '../../../constants';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../../components/Header';
import CartQuantityButton from '../../../components/CartQuantityButton';
import * as lagiAction from '../../../stores/actions/lagiDetail';
import LineDivider from '../../../components/LineDivider';
const ImportAwbDetailScreen = ({navigation, route}) => {
  let _scrollView;
  const cartLagiQuantity = useSelector(state => state.cartLagi.quantity);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  /*   const [currentStep, setCurrentStep] = useState(-1);
  const [currentCustomStep, setCurrentCustomStep] = useState(-1); */
  const tabs = ['GENERAL', 'TRACKING', 'CUSTOM'];
  const {lagiId, mawb, hawb} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const onSelectTab = index => {
    setCurrentTabIndex(index);
    // props.onSelectDate(dates[index]);
  };
  const lagiDetail = useSelector(state => {
    const awb = state.lagiDetail.lagiDetail;
    return awb;
  });
  const currentStep = useSelector(state => state.lagiDetail.currentStep);
  const currentCustomStep = useSelector(
    state => state.lagiDetail.currentCustomStep,
  );
  const loadLagiDetails = useCallback(
    async id => {
      setError(null);
      setIsRefreshing(true);
      try {
        await dispatch(lagiAction.getLagi(id));
      } catch (err) {
        setError(err.message);
      }
      setIsRefreshing(false);
    },
    [dispatch, setIsLoading, setError],
  );
  /*   useEffect(() => {
    const willFocusSub = navigation.addListener(
      'willFocus',
      loadLagiDetails
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadLagiDetails]); */
  useEffect(() => {
    setIsLoading(true);
    loadLagiDetails(lagiId).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadLagiDetails]);
  function renderGennaralInformation() {
    return (
      <View
        style={{
          flex: 1,
         //   justifyContent:'center',
           //  alignItems:'center',

      
          // height:200,
          //backgroundColor:COLORS.green
        }}>
        <View
          style={{
            alignItems: 'center',
          //  width: 220,
           //   height: 150,
            //marginHorizontal: SIZES.padding,
          }}>
          <Image
            source={images.logoALS_full}
            resizeMode='contain'
            style={{
              width: 220,
              height: 150,
            //  tintColor:COLORS.lightGray1
            }}
          />
        </View>
        <View
          style={{
            height: 50,
            backgroundColor: COLORS.lightOrange2,
            borderWidth: 1,
            borderColor: COLORS.orange,
            marginHorizontal: SIZES.padding,
            padding: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text h3 darkGray>
            {mawb}/
          </Text>
          <Text h3 black>
            {hawb}
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: SIZES.padding,
            marginTop: SIZES.padding,
            //  backgroundColor:COLORS.blue,
            flexWrap: 'wrap',
            flexDirection: 'row',
            marginBottom: SIZES.padding,
          }}>
          <View
            style={{
              width: '50%',
              //  backgroundColor:COLORS.yellow
            }}>
            <Text h3 darkGray>
              Tổng kiện
            </Text>
            <Text body3 green>
              {lagiDetail.piecesReceived}
            </Text>
          </View>
          <View
            style={{
              width: '50%',
              //    backgroundColor:COLORS.yellow
            }}>
            <Text h3 darkGray>
              Tổng cân
            </Text>
            <Text body3 green>
              {lagiDetail.weightReceived}
            </Text>
          </View>
          <View
            style={{
              width: '50%',
              //  backgroundColor:COLORS.yellow
            }}>
            <Text h3 darkGray>
              Người gửi
            </Text>
            <Text body3 black>
              {lagiDetail.shipper}
            </Text>
          </View>
          <View
            style={{
              width: '50%',
              //   backgroundColor:COLORS.yellow
            }}>
            <Text h3 darkGray>
              Địa chỉ
            </Text>
            <Text body3 black>
              {lagiDetail.consignee}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 8,
            backgroundColor: COLORS.lightGray1,
            borderTopColor: COLORS.gray,
            borderTopWidth: 1,
            borderBottomColor: COLORS.gray,
            borderBottomWidth: 1,
          }}
        />
      </View>
    );
  }
  function renderTrackOrder() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          paddingVertical: SIZES.padding,
          borderRadius: SIZES.radius,
          borderWidth: 2,
          borderColor: COLORS.lightGray2,
          marginHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
        }}>
        {/* Track Order */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            paddingHorizontal: SIZES.padding,
          }}>
          <Text h3>Tracking</Text>
          <Text gray body3>
            {hawb}
          </Text>
        </View>
        <LineDivider />
        {/* Status */}
        <View
          style={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}>
          {constants.track_order_status.map((item, index) => {
            return (
              <View key={`StatusList-${index}`}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: -5,
                  }}>
                  <Image
                    source={icons.check_circle}
                    style={{
                      width: 40,
                      height: 40,
                      tintColor:
                        index <= currentStep
                          ? COLORS.primary
                          : COLORS.lightGray1,
                    }}
                  />
                  <View
                    style={{
                      marginLeft: SIZES.radius,
                    }}>
                    <Text h3>{item.title}</Text>
                    <Text gray body4>
                      {item.sub_title}
                    </Text>
                  </View>
                </View>
                {index < constants.track_order_status.length - 1 && (
                  <View>
                    {index < currentStep && (
                      <View
                        style={{
                          height: 50,
                          width: 3,
                          marginLeft: 18,
                          backgroundColor: COLORS.primary,
                          zIndex: -1,
                        }}></View>
                    )}
                    {index >= currentStep && (
                      <Image
                        source={icons.dotted_line}
                        resizeMode="cover"
                        style={{
                          width: 4,
                          height: 50,
                          marginLeft: 17,
                        }}
                      />
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  }
  function renderTrackCustom() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          paddingVertical: SIZES.padding,
          borderRadius: SIZES.radius,
          borderWidth: 2,
          borderColor: COLORS.lightGray2,
          marginHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
        }}>
        {/* Track Order */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            paddingHorizontal: SIZES.padding,
          }}>
          <Text h3>Tracking</Text>
          <Text gray body3>
            {hawb}
          </Text>
        </View>
        <LineDivider />
        {/* Status */}
        <View
          style={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}>
          {constants.track_custom_status.map((item, index) => {
            return (
              <View key={`StatusList-${index}`}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: -5,
                  }}>
                  <Image
                    source={icons.check_circle}
                    style={{
                      width: 40,
                      height: 40,
                      tintColor:
                        index <= currentCustomStep
                          ? COLORS.primary
                          : COLORS.lightGray1,
                    }}
                  />
                  <View
                    style={{
                      marginLeft: SIZES.radius,
                    }}>
                    <Text h3>{item.title}</Text>
                    <Text gray body4>
                      {item.sub_title}
                    </Text>
                  </View>
                </View>
                {index < constants.track_custom_status.length - 1 && (
                  <View>
                    {index < currentCustomStep && (
                      <View
                        style={{
                          height: 50,
                          width: 3,
                          marginLeft: 18,
                          backgroundColor: COLORS.primary,
                          zIndex: -1,
                        }}></View>
                    )}
                    {index >= currentCustomStep && (
                      <Image
                        source={icons.dotted_line}
                        resizeMode="cover"
                        style={{
                          width: 4,
                          height: 50,
                          marginLeft: 17,
                        }}
                      />
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  }
  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          paddingHorizontal: SIZES.padding,
           marginTop: Platform.OS=='ios'? SIZES.padding : 0,
          alignItems: 'center',
          backgroundColor: COLORS.white,
          //   borderBottomRightRadius:SIZES.radius*2
        }}
        title="AWB Import DETAILS"
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
        rightComponent={
          <CartQuantityButton
            quantity={cartLagiQuantity}
            onPress={() => navigation.navigate('CartLagi')}
          />
        }
      />
    );
  }
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => loadLagiDetails(lagiId)}
        />
      }
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        // flex:1
      }}>
      {renderHeader()}
      <View
        style={{
          marginTop: Platform.OS==='ios'? 110 : 80,
        }}></View>
      <Tabs
        tabs={tabs}
        currentTabIndex={currentTabIndex}
        onSelectTab={onSelectTab}
      />
      {currentTabIndex == 0 && (
        <View
          /*   ref={scrollView => {
            _scrollView = scrollView;
          }} */
          //     refreshControl= {<RefreshControl refreshing={isRefreshing}  onRefresh={()=>loadLagiDetails(lagiId)} />}

          // horizontal={true}                         // Enable horizontal scrolling
          showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicators
          automaticallyAdjustContentInsets={false}
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            //   alignItems:'center'
          }} // Do not adjust content automatically
        >
          {renderGennaralInformation()}
        </View>
      )}

      {currentTabIndex == 1 && (
        <View
          /*    ref={scrollView => {
            _scrollView = scrollView;
          }} */
          //    refreshControl= {<RefreshControl refreshing={isRefreshing}  onRefresh={()=>loadLagiDetails(lagiId)} />}
          // horizontal={true}                         // Enable horizontal scrolling
          showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicators
          automaticallyAdjustContentInsets={false}
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            //   alignItems:'center'
          }} // Do not adjust content automatically
        >
          {renderTrackOrder()}
        </View>
      )}
      {currentTabIndex == 2 && (
        <View
          /* ref={scrollView => {
            _scrollView = scrollView;
          }} */
          //      refreshControl= {<RefreshControl refreshing={isRefreshing}  onRefresh={()=>loadLagiDetails(lagiId)} />}
          // horizontal={true}                         // Enable horizontal scrolling
          showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicators
          automaticallyAdjustContentInsets={false}
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            //   alignItems:'center'
          }} // Do not adjust content automatically
        >
          {renderTrackCustom()}
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  visibleMonthAndYear: {
    color: 'red',
    paddingHorizontal: 15,
    textAlign: 'left',
  },
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
export default ImportAwbDetailScreen;
