import React, { useRef, useState, useEffect } from "react";
import { View, ImageBackground, Image, Animated,Keyboard } from "react-native";
import { images, constants, Text, FONTS, SIZES, COLORS } from "../../constants";
import TextButton from "../../components/TextButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const AuthLayout = ({ title, subTitle, titleContailner, children }) => {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: SIZES.padding,
        backgroundColor: COLORS.white,
      }}
    >
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <View
          style={{
            alignItems: "center",
          //  backgroundColor:COLORS.red
          }}
        >
          {/* Logo */}
          <Image
            source={images.logoALS_full}
            resizeMode="contain"
            style={{
              width: 150,
              height: 100,
             // backgroundColor:COLORS.green
            }}
          />
          {/* Title */}
          <Text h2>{title}</Text>
          <Text body3>{subTitle}</Text>
          {/* Subtitle */}
        </View>
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AuthLayout;
