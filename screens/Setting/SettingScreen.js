import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import LineDivider from '../../components/LineDivider';
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
import ProfileValue from '../../components/ProfileValue';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useToast} from 'react-native-toast-notifications';
import {useSelector, useDispatch} from 'react-redux';
import * as authAction from '../../stores/actions/auth';
import api from '../../utils/apiHelper'
const Setting = ({navigation, route}) => {
  const dispatch = useDispatch();
  const userName = useSelector(state=>state.auth.userName)
  const toast = useToast();
  const options = {
    title: 'Select Image',
    customButtons: [
      {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
    ],
    storageOptions: {skipBackup: true, path: 'images'},
    maxWidth: 768,
    maxHeight: 1024,
  };
  const [imgUri, setImgUri] = useState();
  const uploadPhoto = () => {
    launchImageLibrary(options, onCameraResult);
  };
  const avatar = useSelector(state => state.auth.avatarUrl);
  const onCameraResult = response => {
    console.log(response);
    if (response.didCancel) {
      toast.show('Cancel image picker', {
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
    } else if (response.errorCode) {
      toast.show(response.errorMessage, {
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
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      if (Array.isArray(response.assets) && response.assets.length > 0) {
        let firstAssets = response.assets[0];
        let addFile = {
          uri: firstAssets?.uri,
          name: firstAssets?.fileName?.replace(
            'rn_image_picker_lib_temp',
            'deliver_dt',
          ),
          type: firstAssets?.type,
        };
        let form = new FormData();
        form.append('File', addFile);
        api.post(
          '/api/Upload/uploadImage',
          form
        ).then(({data})=>{
          dispatch(authAction.changeAvatar(firstAssets?.uri));
        })
      
      }
    }
  };
  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 60,
          marginTop: Platform.OS == 'ios' ? 30 : 0,
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
          backgroundColor: COLORS.white,
        }}
        title="Settings"
      />
    );
  }
  function renderProfileSection() {
    return (
      <View style={style.profileSectionContainer}>
        <ProfileValue icon={icons.profile} label="Huy" value="By Huy" />
        <LineDivider />
        <ProfileValue
          icon={icons.email}
          label="Email"
          value="huy.nguyen.quang@als.com.vn"
        />
        <LineDivider />
        <ProfileValue
          icon={icons.password}
          label="Password"
          value="Updated two week ago"
          onPress={() => navigation.navigate('ChangePassword')}
        />
        <LineDivider />
        <ProfileValue
          icon={icons.call}
          label="Contact Number"
          value="0983833193"
        />
        <LineDivider />
        <ProfileValue
          icon={icons.logout}
          label="Log Out"
          value="System"
          onPress={() => dispatch(authAction.logout())}
        />
      </View>
    );
  }
  function renderProfileCard() {
    return (
      <View
        style={{
          flexDirection: 'row',
          //marginTop:SIZES.padding,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 20,
          backgroundColor: COLORS.white,
        }}>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
          }}
          onPress={uploadPhoto} 
          // onPress={() => {
          //   navigation.navigate('ImagePicker');
          // }}
          >
          <Image
            source={!avatar ? icons.defaultUser : {uri: avatar}}
            //source={imgUri}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 40,
              borderWidth: 1,
              borderColor: COLORS.white,
              //tintColor:COLORS.gray
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                marginBottom: -15,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: COLORS.primary,
              }}>
              <Image
                source={icons.camera}
                resizeMode="contain"
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: SIZES.radius,
          }}>
          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.h3,
            }}>
            {userName}
          </Text>
        </View>
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
      {renderProfileCard()}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 150,
        }}>
        {renderProfileSection()}
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.lightGray1,
  },
});

export default Setting;
