import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  common
} from '../../../assets/stylesheets/common';

class BuyerDashboard extends Component {
  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#f6f5f3');
    })
  }

  componentWillUnmount = () => {
    this._navListener.remove();
  }
  render() {
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
      </View>
    )
  }
}

export default BuyerDashboard;
