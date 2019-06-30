import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity,
  StatusBar
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  common
} from '../../assets/stylesheets/common';


class BasePreloader extends Component {
  render () {
    return (
      <View style={[common.container, { backgroundColor: '#fe9d07' }]}>
        <StatusBar backgroundColor="#fe9d07" barStyle="light-content" />
        <View style={{flex: .4, justifyContent: 'flex-end', alignItems: 'center'}}>
          <MaterialIcons name="landscape" color="#fdf4ec" size={60}/>
          <Text style={{transform: [{translateY: -20}],margin: 0,fontSize: 18, color: '#fdf4ec', letterSpacing: 3, fontFamily: 'Oswald'}}>POCENI</Text>
        </View>
        <View style={{flex: .1}}></View>
        <View style={{flex: .5, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={{width: '50%', height: 35, borderRadius: 20, backgroundColor: '#fdf4ec', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[common.fontitle, {fontSize: 13, color: '#fe9d07'}]}>Make Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop: 20, width: '50%', height: 34, borderRadius: 20, backgroundColor: '#fe9d07', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[common.fontitle, {fontSize: 13, color: '#fdf4ec'}]}>Let's Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default BasePreloader;
