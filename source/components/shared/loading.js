import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity,
  StatusBar, Animated, TextInput,
  Dimensions, Keyboard
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { compose, graphql } from 'react-apollo';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import {
  common
} from '../../assets/stylesheets/common';


class Loading extends Component {
  render () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f6f5f3'}}>
        <StatusBar backgroundColor='#ECEFF1' barStyle='dark-content'/>
        <View style={{width: '100%', height: 150, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center'}}>
            <MaterialIcons name="landscape" color="#444" size={72}/>
            <Text style={{transform: [{translateY: -20}],margin: 0,fontSize: 22, color: '#444', letterSpacing: 3, fontFamily: 'Oswald'}}>POCENI</Text>
          </View>
          <Text style={[common.fontbody,{ color: '#444'}]}>{this.props.caption ? this.props.caption : ''}</Text>
          <View style={{position: 'absolute', width: 120, height: 120, borderRadius: 100}}></View>
        </View>
      </View>
    )
  }
}

export default Loading;
