import React,{useState,useEffect} from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Keyboard
} from "react-native";
import {useSelector, useDispatch} from 'react-redux';
import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  images,
  dummyData,
} from "../../constants";

const Home = ({navigation}) => {
  function renderHeader() {
    return (
      <View style={{ 
          flexDirection: "row",
          marginTop: SIZES.padding,
          marginBottom: SIZES.padding 
       }}>
        <View style={{ flex: 1 }}>
          <Text style={{ ...FONTS.h2 }}>Hello!</Text>
          <Text style={{ ...FONTS.body3, color: COLORS.gray }}>
            Admin,
          </Text>
        </View>

        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.lightGray2,
            }}
          >
            <Image
              source={icons.bell}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.secondaryALS,
              }}
            />
            <View
              style={{
                position: "absolute",
                top: -5,
                right: -5,
                height: 10,
                width: 10,
                backgroundColor: COLORS.red,
                borderRadius: 5,
              }}
            ></View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function renderImpFeatures() {
    const Header = () => (
      <View style={{ marginBottom: SIZES.padding * 2 }}>
        <Text style={{ ...FONTS.h3 }}>Import Features</Text>
      </View>
    );

    const renderItem = ({ item,index }) => (
      <TouchableOpacity
      key={index}
        style={{
          marginBottom: SIZES.padding * 2,
          width: 100,
          alignItems: "center",
         // backgroundColor:COLORS.green
        }}
        onPress={() =>navigation.navigate(item.srceenNavigagor, { screen: item.srceenNavigagor })}
      >
        <View
          style={{
            height: 80,
            width: 80,
            marginBottom: 5,
            borderRadius: 20,
            backgroundColor: item.backgroundColor,
            alignItems: "center",
            justifyContent: "center",

          }}
        >
          <Image
            source={item.icon}
            resizeMode="contain"
            style={{
              height: 40,
              width: 40,
              tintColor: item.color,
            }}
          />
        </View>
        <Text style={{ textAlign: "center", ...FONTS.body4 }}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );

    return (
      <FlatList
        ListHeaderComponent={Header}
        data={dummyData.featuresImpData}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        listKey={(item, index) => 'D' + index.toString()}
     //  keyExtractor={(item) => `Imp-${item.id}`}
        renderItem={renderItem}
        style={{ marginTop: SIZES.padding }}
      />
    );
  }
  function renderExpFeatures(){
    const Header = () => (
        <View style={{ marginBottom: SIZES.padding * 2 }}>
          <Text style={{ ...FONTS.h3 }}>Export Features</Text>
        </View>
      );
  
      const renderItem = ({ item,index }) => (
        <TouchableOpacity
        key={index}
          style={{
            marginBottom: SIZES.padding * 2,
            width: 60,
            alignItems: "center",
          }}
          onPress={() =>navigation.navigate('CallTruck', { screen: 'CallTruck' })}
        >
          <View
            style={{
              height: 50,
              width: 50,
              marginBottom: 5,
              borderRadius: 20,
              backgroundColor: item.backgroundColor,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                height: 20,
                width: 20,
                tintColor: item.color,
              }}
            />
          </View>
          <Text style={{ textAlign: "center", flexWrap: "wrap", ...FONTS.body4 }}>
            {item.description}
          </Text>
        </TouchableOpacity>
      );
  
      return (
        <FlatList
          ListHeaderComponent={Header}
          data={dummyData.featuresExpData}
          numColumns={4}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          listKey={(item, index) => 'D' + index.toString()}
        //  keyExtractor={(item) => `Exp-${item.id}`}
          renderItem={renderItem}
          style={{ marginTop: SIZES.padding }}
        />
      ); 
  }
  function renderFeature() {
    const HeaderComponent = () => {
      return (
        <View>
          {renderHeader()}
          {renderImpFeatures()}
     {/*      {renderExpFeatures()} */}
        </View>
      );
    };
    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{ paddingHorizontal: SIZES.padding }}
        //  numColumns={2}
        //  columnWrapperStyle={{ justifyContent: 'space-between' }}
        data={dummyData.featuresGenaralData}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item, index }) => {
          return <View></View>;
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ marginBottom: 80 }}></View>}
      />
    );
  }
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:COLORS.white }}>
      {renderFeature()}
    </SafeAreaView>
  );
};
export default Home;
