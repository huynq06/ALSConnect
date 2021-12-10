import {useSelector,useDispatch} from 'react-redux'
import {COLORS} from '../../constants/'
import React from 'react';
import {View,Text,ActivityIndicator,StyleSheet} from 'react-native'
/* import {activeTheme} from '../../theme/variables' */
const Loading = () =>{
    const loading = useSelector(state=>state.loading.loading)
    const opacity = useSelector(state=>state.loading.opacity)
    return loading ? (
      <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
      ) : null;
}
/* const backdropStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  };
  
  export const styles = StyleSheet.create({
    container: {
      ...backdropStyle,
      backgroundColor: 'transparent',
      zIndex: activeTheme.zIndex.indicator,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backdrop: backdropStyle,
    spinner: {
      color: activeTheme.brandPrimary,
      fontSize: 100,
    },
  }); */
  
export default Loading;