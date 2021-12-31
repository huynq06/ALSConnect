import React, { useRef, useState,useEffect } from "react";
import { View, ImageBackground, Image, Animated } from "react-native";
import { images, constants, Text, FONTS, SIZES, COLORS } from "../../constants";
import TextButton from "../../components/TextButton";
import * as authActions from  '../../stores/actions/auth';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoarding = ({navigation}) => {
  const dispatch = useDispatch();
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef();
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const onViewChangeRef = useRef(({ viewableItems, changed }) => {
      setCurrentIndex(viewableItems[0].index);
    });
    function renderHeaderLogo() {
      return (
        <View
          style={{
            position: "absolute",
            top: SIZES.width > 800 ? 50 : 25,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={images.logo_02}
            style={{
              resizeMode: "contain",
              width: SIZES.width * 0.35,
              height: 100,
            }}
          />
        </View>
      );
    }
    const Dots = () => {
      const dotPosition = Animated.divide(scrollX, SIZES.width);
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {constants.onboarding_screens.map((_, index) => {
            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index],
              outputRange: [
                COLORS.lightOrange,
                COLORS.primary,
                COLORS.lightOrange,
              ],
              extrapolate: "clamp",
            });
            const dotWidth = dotPosition.interpolate({
              inputRange: [index - 1, index, index],
              outputRange: [10, 30, 10],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={`dot-${index}`}
                style={{
                  width: dotWidth,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 6,
                  backgroundColor: dotColor,
                }}
              ></Animated.View>
            );
          })}
        </View>
      );
    };
    function renderFooter() {
      return (
        <View
          style={{
            height: 160,
          }}
        >
          {/* Section Dot */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Dots />
          </View>
          {/* Button */}
          {currentIndex < constants.onboarding_screens.length - 1 && (
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: SIZES.padding,
                marginVertical: SIZES.padding,
                justifyContent: "space-between",
              }}
            >
              <TextButton
                buttonContainerStyle={{
                  backgroundColor: null,
                }}
                label="Skip"
                labelStyle={{
                  color: COLORS.darkGray2,
                }}
                onPress={()=>dispatch(authActions.setAppLauched())}
              />
              <TextButton
                buttonContainerStyle={{
                  width: 200,
                  height: 60,
                  borderRadius: SIZES.radius,
                }}
                label="Next"
                onPress={() => {
                  flatListRef?.current?.scrollToIndex({
                    index: currentIndex + 1,
                    animated: true,
                  });
                }}
              />
            </View>
          )}
          {currentIndex == constants.onboarding_screens.length - 1 && (
            <View
              style={{
                paddingHorizontal: SIZES.padding,
                marginVertical: SIZES.padding,
              }}
            >
              <TextButton
                buttonContainerStyle={{
                  height: 60,
                  borderRadius: SIZES.radius,
                }}
                label="Get Stated"
                onPress={()=>dispatch(authActions.setAppLauched())}
              />
            </View>
          )}
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}
      >
        {/* {renderHeaderLogo()} */}
        <Animated.FlatList
          ref={flatListRef}
          data={constants.onboarding_screens}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          onViewableItemsChanged={onViewChangeRef.current}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item, id }) => {
            return (
              <View
                style={{
                  width: SIZES.width,
                }}
              >
                {/* Header Section */}
                <View
                  style={{
                    flex: 3,
                    backgroundColor:COLORS.white,
                  
                   // borderRadius: SIZES.padding*3
                  }}
                >
                
                  <View
                    style={{
                      width:'100%',
                      height:'100%',
                      alignItems: "center",
                      justifyContent: "flex-end",
                      backgroundColor:COLORS.white
                    }}
                  >
                      <View
                    style={{
                      width:200,
                      height:200,
                      backgroundColor:COLORS.white,
                      alignItems:'center',
                      justifyContent:'center',
                      marginBottom: SIZES.padding,
                     // alignItems:'center',
                      //marginTop:100
                    }}
                  >
                    <Text h3>Image Holder</Text>
                  </View>
                       <Image
                      source={item.bannerImage}
                      resizeMode="contain"
                      style={{
                        width: SIZES.width * 0.3,
                        height: SIZES.width * 0.3,
                        marginBottom: -SIZES.padding*2.8,
                      }}
                    />
                  </View>
               {/*    <ImageBackground
                    source={item.backgroundImage}
                    style={{
                      width: "100%",
                      height: "92%",
                      alignItems: "center",
                      justifyContent: "flex-end",

                      //  backgroundColor:COLORS.red,
                      flex: 1,
                    }}
                  > */}
                 
                  {/* </ImageBackground> */}
                </View>
                {/* Detail */}
                <View
                  style={{
                    flex: 1,
                    marginTop: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: SIZES.radius,
                  }}
                >
                  <Text
                    h1
                    style={{
                      fontSize: 25,
                    }}
                  >
                    {item.title}
                  </Text>
  
                  <Text
                    body3
                    darkGray
                    style={{
                      marginTop: SIZES.radius,
                      textAlign: "center",
                      paddingHorizontal: SIZES.padding,
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        {renderFooter()}
      </View>
    );
  };
  
  export default OnBoarding;