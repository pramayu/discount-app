import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Image,
  Animated, TextInput
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  common
} from '../../../assets/stylesheets/common';

class BuyerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotatestatus: false,
      opaciti: new Animated.Value(1),
      opaciti2:  new Animated.Value(0)
    }
    this.rotateUsernameX = new Animated.Value(0);
    this.rotateUsernameN = new Animated.Value(0);
    this.searchHide      = new Animated.Value(0);
    this.searchShow      = new Animated.Value(0);
    this.closeHide       = new Animated.Value(0);
    this.closeShow       = new Animated.Value(0);
    this.schinputShow    = new Animated.Value(0);
    this.schinputHide    = new Animated.Value(0);
  }

  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#f6f5f3');
    });
  }

  componentWillUnmount = () => {
    this._navListener.remove();
  }

  rotateUsernameXA = () => {
    Animated.parallel([
      Animated.timing(this.state.opaciti, {
        toValue: 0,
        duration: 100,
        delay: 50,
      }),
      Animated.timing(this.rotateUsernameX, {
        toValue: 1,
        duration: 250
      }),
      Animated.timing(this.state.opaciti2, {
        toValue: 1,
        duration: 80,
        delay: 200
      }),
      Animated.timing(this.searchHide, {
        toValue: 1,
        duration: 100,
        delay: 200,
      }),
      Animated.timing(this.closeShow, {
        toValue: 1,
        duration: 100,
        delay: 100,
      }),
      Animated.timing(this.schinputShow, {
        toValue: 1,
        duration: 200,
        delay: 250
      })
    ]).start(() => {
      this.setState({rotatestatus: true});
      this.rotateUsernameN.setValue(0);
      this.searchShow.setValue(0);
      this.closeHide.setValue(0);
      this.schinputHide.setValue(0);
    })
  }

  rotateUsernameNA = () => {
    Animated.parallel([
      Animated.timing(this.state.opaciti, {
        toValue: 1,
        duration: 50,
        delay: 100,
      }),
      Animated.timing(this.schinputHide, {
        toValue: 1,
        duration: 200,
      }),
      Animated.timing(this.state.opaciti2, {
        toValue: 0,
        duration: 80,
        delay: 150
      }),
      Animated.timing(this.rotateUsernameN, {
        toValue: 1,
        duration: 250,
        delay: 200
      }),
      Animated.timing(this.closeHide, {
        toValue: 1,
        duration: 100,
        delay: 200,
      }),
      Animated.timing(this.searchShow, {
        toValue: 1,
        duration: 100,
        delay: 100,
      }),
    ]).start(() => {
      this.setState({rotatestatus: false});
      this.rotateUsernameX.setValue(0);
      this.searchHide.setValue(0);
      this.closeShow.setValue(0);
      this.schinputShow.setValue(0);
    })
  }

  render() {
    var { width, height } = Dimensions.get('window');
    var rotateUsernameSty = this.rotateUsernameX.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -50]
    });
    var rotateNormalSty = this.rotateUsernameN.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, 0]
    });
    var searchHideSty = this.searchHide.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 80]
    });
    var searchShowSty = this.searchShow.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 0]
    });
    var closeShowSty = this.closeShow.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 0]
    });
    var closeHideSty = this.closeHide.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 80]
    });
    var inputShowSty = this.schinputShow.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%']
    });
    var inputHideSty = this.schinputHide.interpolate({
      inputRange: [0, 1],
      outputRange: ['100%', '0%']
    });
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
        <View style={{width: '100%', height: 50, paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .14, justifyContent: 'center'}}>
              <View style={{width: 30, height: 30, marginTop: 5}}>
                <Image source={{uri: 'https://cdn.dribbble.com/users/185856/screenshots/7142963/allelevens4_1x.png'}} style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 40}}/>
              </View>
            </View>
            <View style={{flex: .86, justifyContent: 'center', alignItems: 'flex-end'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: .85, justifyContent: 'center', alignItems: 'flex-start'}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                      <Animated.View style={{backgroundColor: '#f6f5f3',opacity: this.state.opaciti ,zIndex: this.state.rotatestatus === false ? 10 : 9,transform: [{translateY: this.state.rotatestatus === false ? rotateUsernameSty : rotateNormalSty}],position: 'absolute',width: '100%', height: '100%', justifyContent: 'center'}}>
                        <Text style={[common.fontbody, {color: '#444'}]}>Hi, Bolsterli</Text>
                        <Text style={[common.fontbody, {color: '#7f8082', fontSize: 12}]}>Singaradja</Text>
                      </Animated.View>
                      <Animated.View style={{opacity: this.state.opaciti2, backgroundColor: '#f6f5f3',zIndex: this.state.rotatestatus === false ? 9 : 10, alignItems: 'flex-end',height: '100%', width: this.state.rotatestatus === false ? inputShowSty : inputHideSty, position: 'absolute', justifyContent: 'center', paddingLeft: 10}}>
                        <TextInput placeholder="Search" style={[common.fontbody, {marginTop: 5, color: '#444',width: '100%', height: 34, paddingHorizontal: 10, borderRadius: 4, backgroundColor: 'rgba(255,255,255,.5)', paddingVertical: 0}]}/>
                      </Animated.View>
                  </View>
                </View>
                <View style={{flex: .15, justifyContent: 'center', alignItems: 'flex-end'}}>
                  {
                    this.state.rotatestatus === false ?
                    <Animated.View style={{flex: 1, flexDirection: 'column', transform: [{translateX: this.state.rotatestatus === false ? searchHideSty : searchShowSty}]}}>
                      <TouchableOpacity style={{width: 50, height: 50, justifyContent: 'center', alignItems: 'flex-end'}} onPress={(e) => this.rotateUsernameXA()}>
                        <Ionicons name="ios-search" size={24} color="#444"/>
                      </TouchableOpacity>
                    </Animated.View> :
                    <Animated.View style={{flex: 1, flexDirection: 'column', transform: [{translateX: this.state.rotatestatus === false ? closeShowSty : closeHideSty}]}}>
                      <TouchableOpacity style={{width: 50, height: 50, justifyContent: 'center', alignItems: 'flex-end'}} onPress={(e) => this.rotateUsernameNA()}>
                        <MaterialCommunityIcons name="blur" size={22} color="#444"/>
                      </TouchableOpacity>
                    </Animated.View>
                  }
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{width: '100%', height: (height / 4) - 50, justifyContent: 'flex-start', paddingHorizontal: 20, paddingRight: '28%', paddingTop: 20}}>
          <Text style={[{fontFamily:'Oswald',color: '#444', fontSize: 28, lineHeight: 40}]}>Being Unlucky! Find your Luck Here.</Text>
        </View>
      </View>
    )
  }
}

export default BuyerDashboard;
