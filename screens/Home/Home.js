import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS, SIZES, FONTS, icons, images, dummyData} from '../../constants';
import Header from '../../components/Header';
import OptionItem from '../../components/OptionItem';
const Home = ({navigation}) => {
  function reanderHeaderMain() {
    return (
      <Header
        containerStyle={{
          height: 60,
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
          backgroundColor: COLORS.white,
        }}
        title="Home"
        rightComponent={
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              style={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.white,
              }}>
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
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  height: 10,
                  width: 10,
                  backgroundColor: COLORS.red,
                  borderRadius: 5,
                }}></View>
            </TouchableOpacity>
          </View>
        }
        /*  rightComponent={<CartQuantityButton quantity={cartLagiQuantity} onPress={()=>navigation.navigate("CartLagi")} />} */
      />
    );
  }
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          marginBottom: SIZES.padding,
        }}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.h2}}>Hello!</Text>
          <Text style={{...FONTS.body3, color: COLORS.gray}}>Admin,</Text>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.lightGray2,
            }}>
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
                position: 'absolute',
                top: -5,
                right: -5,
                height: 10,
                width: 10,
                backgroundColor: COLORS.red,
                borderRadius: 5,
              }}></View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function renderImpFeatures() {
    const Header = () => (
      <View style={{marginBottom: SIZES.padding}}>
        <Text style={{...FONTS.h3}}>Import Features</Text>
      </View>
    );

    const renderItem = ({item, index}) => (
      <OptionItem
        key={index}
        icon={item.icon}
        bgColor={item.bgColor}
        label={item.description}
        onPress={() =>
          navigation.navigate(item.srceenNavigagor, {
            screen: item.srceenNavigagor,
          })
        }
      />
    );
    return (
      <FlatList
        ListHeaderComponent={Header}
        data={dummyData.featuresImpData}
        numColumns={3}
 /*        columnWrapperStyle={{justifyContent: 'space-between'}} */
        listKey={(item, index) => 'D' + index.toString()}
        //  keyExtractor={(item) => `Imp-${item.id}`}
        renderItem={renderItem}
        style={{marginTop: SIZES.padding}}
      />
    );
  }
  function renderExpFeatures() {
    const Header = () => (
      <View style={{marginBottom: SIZES.padding}}>
        <Text style={{...FONTS.h3}}>Export Features</Text>
      </View>
    );

    const renderItem = ({item, index}) => (
      <OptionItem
        key={index}
        icon={item.icon}
        bgColor={item.bgColor}
        label={item.description}
        onPress={() =>
          navigation.navigate(item.srceenNavigagor, {
            screen: item.srceenNavigagor,
          })
        }
      />
    );

    return (
      <FlatList
        ListHeaderComponent={Header}
        data={dummyData.featuresExpData}
        numColumns={3}
     /*    columnWrapperStyle={{justifyContent: 'space-between'}} */
        listKey={(item, index) => 'D' + index.toString()}
        renderItem={renderItem}
        style={{marginTop: SIZES.padding}}
      />
    );
  }
  function renderGenaralTitle() {
    return (
      <View style={{marginVertical: SIZES.padding}}>
        <Text style={{...FONTS.h3}}>Genaral Features</Text>
      </View>
    );
  }
  function renderFeature() {
    const HeaderComponent = () => {
      return (
        <View>
          {renderImpFeatures()}
          {renderExpFeatures()}
          {renderGenaralTitle()}
        </View>
      );
    };
    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{paddingHorizontal: SIZES.padding}}
        data={dummyData.featuresGenaralData}
        numColumns={3}
      /*   columnWrapperStyle={{justifyContent: 'space-between'}} */
        keyExtractor={item => `${item.id}`}
        renderItem={({item, index}) => {
          return (
          <>
              <OptionItem
              key={index}
              icon={item.icon}
              bgColor={item.bgColor}
              label={item.description}
              onPress={() =>
                navigation.navigate(item.srceenNavigagor, {
                  screen: item.srceenNavigagor,
                })
              }
            />
           <OptionItem
              key={'av'}
              icon={item.icon}
             // label={item.description}
              onPress={() =>
                navigation.navigate(item.srceenNavigagor, {
                  screen: item.srceenNavigagor,
                })
              }
            />
              <OptionItem
              key={'cd'}
              icon={item.icon}
             // label={item.description}
              onPress={() =>
                navigation.navigate(item.srceenNavigagor, {
                  screen: item.srceenNavigagor,
                })
              }
            />
        </>
           
            
          );
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{marginBottom: 80}}></View>}
      />
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {reanderHeaderMain()}
      <View
        style={{
          height: 60,
          backgroundColor: COLORS.white,
        }}></View>
      {renderFeature()}
    </SafeAreaView>
  );
};
export default Home;
