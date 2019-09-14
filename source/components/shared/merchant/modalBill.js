import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Animated
} from 'react-native';
import {
  common
} from '../../../assets/stylesheets/common';

class ModalExp extends Component {

  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true)
    });
  }

  componentWillUnmount = () => {
    this._navListener.remove();
  }

  render () {
    var {width, height} = Dimensions.get('window');
    return (
      <View style={[common.container, {backgroundColor: 'rgba(0,0,0,.2)', justifyContent: 'center', alignItems: 'center'}]}>
        <View style={{width: '78%', height: height / 1.8, backgroundColor: '#f6f5f3', borderRadius: 4}}></View>
      </View>
    )
  }
}

export default ModalExp;
