import React from 'react';
import * as dimensions from '../constants/dimensions'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const NavIcon = ({ tintColor, ...props }) => (
    <FontAwesome
      size={dimensions.iconSize}
      style={{ color: tintColor }}
      {...props}
    />
  );
  
  export default NavIcon;