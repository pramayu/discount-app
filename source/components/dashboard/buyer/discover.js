import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Image,
  Animated, TextInput, TouchableHighlight
} from 'react-native';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  common
} from '../../../assets/stylesheets/common';



class DiscoverBuyer extends Component {
  render() {
    var {width, height} = Dimensions.get('window');
    return (
      <View style={[common.container]}>
        <View style={{width: '100%', height: 50, paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .85, justifyContent: 'center'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableHighlight style={{marginRight: 30, justifyContent: 'center'}}>
                  <Text style={[common.fontbody, {color: '#444', fontSize: 12}]}>ALL STUFF</Text>
                </TouchableHighlight>
                <TouchableHighlight style={{marginRight: 30, justifyContent: 'center'}}>
                  <Text style={[common.fontbody, {color: '#7f8082', fontSize: 12}]}>FOODS</Text>
                </TouchableHighlight>
                <TouchableHighlight style={{marginRight: 30, justifyContent: 'center'}}>
                  <Text style={[common.fontbody, {color: '#7f8082', fontSize: 12}]}>APPAREL</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flex: .15, justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableHighlight>
                <Ionicons name="ios-options" size={22} color='#444'/>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={{width: width, height: height - 50, paddingHorizontal: 20, paddingTop: 10}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .5, flexDirection: 'column', paddingRight: 10}}>
              <Text style={[{fontFamily:'Oswald',color: '#444', fontSize: 18, lineHeight: 30}]}>WE DISCOVER 41 STUFF NEAR YOU</Text>
            </View>
            <View style={{flex: .5, flexDirection: 'column', paddingLeft: 10}}></View>
          </View>
        </View>
      </View>
    )
  }
}

export default DiscoverBuyer;
