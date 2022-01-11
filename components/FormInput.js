import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, TextInput } from "react-native";
import { dummyData, COLORS, SIZES, FONTS, icons } from "../constants";
import Text from "../constants/Text";

const FormInput = ({
  label,
  keyboardType,
  autoCompleteType,
  errMsg,
  prepandComponent,
  appendComponent,
  secureTextEntry,
  onChange,
  placeHolder,
  inputStyle,
  autoCapitalize,
  containerStyle,
  inputValue = '',
  inputContainerStyle
}) => {
  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      {/* label & errMsg */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text gray body4>
          {label}
        </Text>
        <Text red body4>
          {errMsg}
        </Text>
      </View>
      {/* TextInput */}
      <View
        style={{
          flexDirection: "row",
          height: 55,
          backgroundColor: 55,
          marginTop: SIZES.base,
          paddingHorizontal: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor:COLORS.lightGray2,
          ...inputContainerStyle
        }}
      >
        {prepandComponent}
        <TextInput
          style={{
            flex: 1,
            ...inputStyle,
          }}
          value={inputValue}
          keyboardType={keyboardType}
          placeholder={placeHolder}
          placeholderTextColor={COLORS.gray}
          autoCompleteType={autoCompleteType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          onChangeText={(text) => {
            onChange(text);
          }}
        />
            {appendComponent}
      </View>
  
      {/* Prepand */}
    </View>
  );
};
export default FormInput;
