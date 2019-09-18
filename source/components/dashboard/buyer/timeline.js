import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    var { width, height } = Dimensions.get('window');
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
        <View style={{width: '100%', height: 50, paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .14, justifyContent: 'center'}}>
              <View style={{width: 30, height: 30}}>
                <Image source={{uri: 'https://cdn.dribbble.com/users/185856/screenshots/7142963/allelevens4_1x.png'}} style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 40}}/>
              </View>
            </View>
            <View style={{flex: .86, justifyContent: 'center', alignItems: 'flex-end'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: .85, justifyContent: 'center', alignItems: 'flex-start'}}>
                  <Text style={[common.fontbody, {color: '#444'}]}>Hi, Bolsterli</Text>
                  <Text style={[common.fontbody, {color: '#7f8082', fontSize: 12}]}>Singaradja</Text>
                </View>
                <View style={{flex: .15, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <TouchableOpacity>
                    <Ionicons name="ios-search" size={24} color="#444"/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default BuyerDashboard;
