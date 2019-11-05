import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Image,
  Animated, TextInput, TouchableHighlight,
  ScrollView
} from 'react-native';
import {
  common
} from '../../../assets/stylesheets/common';
import Ionicons from 'react-native-vector-icons/Ionicons';

class BasketBuyer extends Component {
  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#f6f5f3');
      StatusBar.setTranslucent(false)
    });
  }

  componentWillUnmount = () => {
    this._navListener.remove();
  }
  render() {
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3'}]}>
        <View style={{flex: .07, justifyContent: 'center', paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .7, justifyContent: 'center', alignItems: 'flex-start'}}>
              <Text style={[common.fontbody, {color: '#444', fontSize: 12}]}>COUPON</Text>
            </View>
            <View style={{flex: .3, justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity>
                <Ionicons name="ios-folder-open" size={20} color="#444"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default BasketBuyer;
