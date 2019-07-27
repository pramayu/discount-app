import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, TouchableHighlight
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  common
} from '../../../assets/stylesheets/common';

class Shop extends Component {
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
        <View style={{flex: .1, width: '100%', paddingHorizontal: 25}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .7, justifyContent: 'flex-end', alignItems: 'flex-start'}}>
              <Text style={[common.fontitle, {color: '#7f8082'}]}>Hello,</Text>
              <Text style={[common.fontitle, {color: '#444', fontSize: 16}]}>Lawrance Anzela</Text>
            </View>
            <View style={{flex: .3, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <TouchableHighlight style={{width: 40, height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#6c7e70'}}>
                <MaterialIcons name="landscape" color="#f6f5f3" size={24}/>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={{flex: .3, width: '100%', paddingHorizontal: 25, justifyContent: 'flex-end'}}>
          <View style={{width: '100%', height: '78%', backgroundColor: '#6c7e70', borderRadius: 8, elevation: 20}}>
            <View style={{flex: 1, flexDirection: 'column', paddingHorizontal: 10}}>
              <View style={{flex: .2}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: .06, justifyContent: 'center'}}>
                    <Ionicons name="ios-nutrition" size={14} color="#f6f5f3"/>
                  </View>
                  <View style={{flex: .8, justifyContent: 'center'}}>
                    <Text style={[common.fontbody, {color: '#f6f5f3'}]}>SUMMARY REPORT</Text>
                  </View>
                </View>
              </View>
              <View style={{flex: .8}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: .33, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 20}}>
                    <Text style={[common.fontitle, {color: '#a1bba6', fontSize: 15}]}>138</Text>
                    <Ionicons name="ios-people" size={24} color="#a1bba6" style={{marginTop: 5}}/>
                    <Text style={[common.fontbody, {color: '#a1bba6', marginTop: 2, fontSize: 12}]}>SUBSCRIBER</Text>
                  </View>
                  <View style={{flex: .33, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 20}}>
                    <Text style={[common.fontitle, {color: '#a1bba6', fontSize: 15}]}>78</Text>
                    <Ionicons name="ios-card" size={24} color="#a1bba6" style={{marginTop: 5}}/>
                    <Text style={[common.fontbody, {color: '#a1bba6', marginTop: 2, fontSize: 12}]}>TRANSACTION</Text>
                  </View>
                  <View style={{flex: .33, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 20}}>
                    <Text style={[common.fontitle, {color: '#a1bba6', fontSize: 15}]}>4.5</Text>
                    <Ionicons name="ios-ribbon" size={24} color="#a1bba6" style={{marginTop: 5}}/>
                    <Text style={[common.fontbody, {color: '#a1bba6', marginTop: 2, fontSize: 12}]}>RATING</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center', transform: [{translateY: 23}]}}>
              <Text style={{textAlign: 'center',fontFamily: 'Oswald', fontSize: 40, color: '#f6f5f3', letterSpacing: 20}}>POCENI</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Shop;
