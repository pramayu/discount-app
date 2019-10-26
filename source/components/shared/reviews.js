import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Image,
  Animated, TextInput, TouchableHighlight,
  ScrollView, Keyboard
} from 'react-native';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { common } from '../../assets/stylesheets/common';


class ReviewStuff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyAnimatedStatus: false,
      keyHeight: 0
    }
    this.animatedTextInputUp = new Animated.Value(0);
    this.animatedTextInputDw = new Animated.Value(0);
    this.animatedEmoticonSw  = new Animated.Value(0);
    this.animatedEmoticonHd  = new Animated.Value(0);
  }
  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true)
    });
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide.bind(this),
    );
  }

  componentWillUnmount = () => {
    this._navListener.remove();
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow(e) {
    this.setState({keyHeight: e.endCoordinates.height});
    this.animatedTextInputUpServ()
  }

  _keyboardDidHide() {
    this.animatedTextInputDwServ()
  }

  animatedTextInputUpServ = () => {
    Animated.parallel([
      Animated.timing(this.animatedTextInputUp, {
        toValue: 1,
        duration: 400,
      }),
      Animated.timing(this.animatedEmoticonSw, {
        toValue: 1,
        duration: 200,
      })
    ]).start((e) => {
      this.setState({ keyAnimatedStatus: true });
      this.animatedTextInputDw.setValue(0);
      this.animatedEmoticonHd.setValue(0);
    })
  }

  animatedTextInputDwServ = () => {
    Animated.parallel([
      Animated.timing(this.animatedTextInputDw, {
        toValue: 1,
        duration: 400,
      }),
      Animated.timing(this.animatedEmoticonHd, {
        toValue: 1,
        duration: 200,
      })
    ]).start((e) => {
      this.setState({ keyAnimatedStatus: false });
      this.animatedTextInputUp.setValue(0);
      this.animatedEmoticonSw.setValue(0);
    })
  }

  render() {
    var {width, height} = Dimensions.get('window');
    var animatedTextInputUpSty = this.animatedTextInputUp.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -this.state.keyHeight - 30]
    });
    var animatedEmoticonSwSty = this.animatedEmoticonSw.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -width + 20]
    });
    var animatedEmoticonHdSty = this.animatedEmoticonHd.interpolate({
      inputRange: [0, 1],
      outputRange: [-width + 20, 0]
    });
    var animatedTextInputDwSty = this.animatedTextInputDw.interpolate({
      inputRange: [0, 1],
      outputRange: [-this.state.keyHeight - 30, 0]
    });
    return (
      <View style={[common.container, {backgroundColor: '#f6f5f3'}]}>
        <Animated.View style={{width: width * 2, height: 80, backgroundColor: 'rgba(255,255,255,.0)', position: 'absolute', top: 0, zIndex: 15, paddingHorizontal: 20, transform: [{translateX: this.state.keyAnimatedStatus === false ? animatedEmoticonSwSty : animatedEmoticonHdSty}]}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: '50%', height: '100%',paddingRight: 20 }}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: .2}}>
                  <TouchableOpacity onPress={(e) => this.props.navigation.goBack()} style={{height: '100%', justifyContent: 'center'}}>
                    <Ionicons name="ios-arrow-round-back" size={28} color="#444"/>
                  </TouchableOpacity>
                </View>
                <View style={{flex: .8, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Text style={[common.fontbody, {color: '#444', fontSize: 14}]}>26 REVIEWS</Text>
                </View>
              </View>
            </View>
            <View style={{width: '50%', height: '100%', paddingLeft: 20, paddingTop: 20}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                  <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}>
                    <MaterialCommunityIcons size={24} color="#7f8082" name="emoticon-angry-outline"/>
                  </TouchableOpacity>
                </View>
                <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                  <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}>
                    <MaterialCommunityIcons size={24} color="#7f8082" name="emoticon-neutral-outline"/>
                  </TouchableOpacity>
                </View>
                <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                  <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}>
                    <MaterialCommunityIcons size={24} color="#7f8082" name="emoticon-happy-outline"/>
                  </TouchableOpacity>
                </View>
                <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                  <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}>
                    <MaterialCommunityIcons size={24} color="#7f8082" name="emoticon-excited-outline"/>
                  </TouchableOpacity>
                </View>
                <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                  <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}>
                    <MaterialCommunityIcons size={24} color="#7f8082" name="emoticon-kiss-outline"/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
        <View style={{width: width, height: height}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{width: '100%', height: height - 80, marginTop: 30}}></View>
            <Animated.View style={{backgroundColor: '#f6f5f3',width: '100%', height: 80, transform: [{translateY: this.state.keyAnimatedStatus === false ? animatedTextInputUpSty : animatedTextInputDwSty}]}}>
              <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 20}}>
                <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                  <View style={{width: 40, height: 40}}>
                    <Image source={{uri: 'https://cdn.dribbble.com/users/1355613/screenshots/6317190/smoking_hot_2x.jpg'}} style={{width:'100%', height: '100%', borderRadius: 100, resizeMode: 'cover'}}/>
                  </View>
                </View>
                <View style={{width: '85%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                  <TextInput placeholder="Give us review" style={[common.fontbody, {fontSize: 12, color: '#444',width: '100%', height: 42, borderRadius: 20, paddingHorizontal: 15, backgroundColor: '#fff'}]}/>
                  <View style={{position: 'absolute', height: 32, width: 32, right: 10}}>
                    <TouchableOpacity style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                      <Ionicons name="ios-color-wand" size={22} color="#444"/>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Animated.View>
          </View>
        </View>
      </View>
    )
  }
}

export default ReviewStuff;
