import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Image,
  Animated, TextInput, TouchableHighlight,
  Easing
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  common
} from '../../assets/stylesheets/common';


class TimelineProgress extends Component {
  constructor(props) {
    super(props);
    this._opacityAnimationValue = new Animated.Value(0);
  }

  componentDidMount = () => {
    this.opacityAnimationValue()
  }

  opacityAnimationValue = () => {
    Animated.sequence([
      Animated.timing(this._opacityAnimationValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear
      }),
      Animated.timing(this._opacityAnimationValue, {
        toValue: 0,
        duration: 800,
        easing: Easing.linear
      })
    ]).start(() => this.opacityAnimationValue())
  }

  recentProgress = () => {
    var {width, height} = Dimensions.get('window');
    return [1, 2, 3].map((recent, index) => {
      return (
        <Animated.View key={index} style={{width: width / 3, height: '85%', marginRight: 10, backgroundColor: '#dbd9d9', borderRadius: 6, opacity: this._opacityAnimationValue}}>
        </Animated.View>
      )
    })
  }

  merchantProgress = () => {
    var {width, height} = Dimensions.get('window');
    return [1, 2].map((merchant, index) => {
      return (
        <Animated.View  key={index} style={{width: width / 1.5, height: '100%', marginRight: 10, backgroundColor: '#dbd9d9', borderRadius: 6, opacity: this._opacityAnimationValue}}>
        </Animated.View>
      )
    })
  }

  render() {
    var {width, height} = Dimensions.get('window');
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
        <View style={{width: '100%', height: 50, paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .14, justifyContent: 'center'}}>
              <Animated.View style={{width: 30, height: 30, marginTop: 5, borderRadius: 50, backgroundColor: '#dbd9d9', opacity: this._opacityAnimationValue}}>
              </Animated.View>
            </View>
            <View style={{flex: .86, justifyContent: 'center', alignItems: 'flex-end'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: .85, justifyContent: 'center', alignItems: 'flex-start'}}>
                  <Animated.View style={{width: '50%', height: 20, backgroundColor: '#dbd9d9', marginTop: 5, opacity: this._opacityAnimationValue}}>
                  </Animated.View>
                </View>
                <View style={{flex: .15, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <TouchableOpacity style={{width: 50, height: 50, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 5}}>
                    <Ionicons name="ios-search" size={24} color="#dbd9d9"/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{width: width-20, height: (height / 4) - 50, justifyContent: 'flex-start', paddingHorizontal: 20, paddingRight: '20%', paddingTop: 30}}>
          <Animated.View style={{width: '100%', height: 32, backgroundColor: '#dbd9d9', opacity: this._opacityAnimationValue}}>
          </Animated.View>
          <Animated.View style={{width: '60%', height: 32, backgroundColor: '#dbd9d9', marginTop: 15, opacity: this._opacityAnimationValue}}>
          </Animated.View>
          <View style={{width: width-20, height: '50%', backgroundColor: 'rgba(255,255,255,.0)', position: 'absolute', marginTop: 25}}></View>
        </View>
        <View style={{width: width, height: height / 1.5, justifyContent: 'flex-start', paddingTop: 20}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{width: width, height: height / 2.8, paddingHorizontal: 20}}>
              <Text style={[common.fontitle, {fontSize: 12, color: '#dbd9d9', marginBottom: 15}]}>RECENT DISCOUNT</Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                { this.recentProgress() }
              </View>
            </View>
            <View style={{width: width, height: height / 3.7, paddingLeft: 20}}>
              <Text style={[common.fontitle, {fontSize: 12, color: '#dbd9d9', marginBottom: 15}]}>NEAR MERCHANT</Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                {this.merchantProgress()}
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}


export default TimelineProgress;
