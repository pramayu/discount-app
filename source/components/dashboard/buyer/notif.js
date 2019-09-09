import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, ScrollView, Dimensions,
  Animated
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  common
} from '../../../assets/stylesheets/common';
import {
  absoluteform
} from '../../shared/sharedaction';

class Notif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menustatus: false
    }
    this.slideKanan = new Animated.Value(0);
    this.slideKiri  = new Animated.Value(0);
  }

  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#f6f5f3');
    })
  }

  componentWillUnmount = () => {
    this._navListener.remove();
  }

  slideKananService = () => {
    Animated.timing(this.slideKanan, {
      toValue: 2,
      duration: 600
    }).start((e) => {
      this.setState({ menustatus: false });
      this.slideKiri.setValue(0)
    })
  }

  slideKiriService = () => {
    Animated.timing(this.slideKiri, {
      toValue: 2,
      duration: 600
    }).start((e) => {
      this.setState({ menustatus: true });
      this.slideKanan.setValue(0)
    })
  }

  render() {
    var { width, height } = Dimensions.get('window');
    var slideKiriSty = this.slideKiri.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -width, 0]
    });
    var slideKananSty = this.slideKanan.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -width, 0]
    });
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
        <View style={{flex: .08, justifyContent: 'center', paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .7, justifyContent: 'center', alignItems: 'flex-start'}}>
              <Text style={[common.fontitle, {color: '#444', fontSize: 12}]}>NOTIFICATIONS</Text>
            </View>
            <View style={{flex: .3, justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity>
                <Ionicons name="ios-search" size={24} color="#444"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flex: .92, paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Animated.View style={{flex: .12, paddingTop: 10, transform: [{translateX: this.state.menustatus === false ? slideKiriSty : slideKananSty}]}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                {
                  this.state.menustatus === false ?
                  <TouchableOpacity style={{marginRight: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,.8)',width: '27%', height: 32, borderRadius: 4, justifyContent:'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,.5)'}}>
                    <Text style={[common.fontbody, {color: '#444', fontSize: 12}]}>RECENT</Text>
                  </TouchableOpacity> : null
                }
                {
                  this.state.menustatus === true ?
                  <TouchableOpacity onPress={(e) => this.slideKananService()} style={{marginRight: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,.8)',width: '15%', height: 32, borderRadius: 4, justifyContent:'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,.5)'}}>
                    <Ionicons name="ios-more" size={20} color="#444"/>
                  </TouchableOpacity> : null
                }
                <TouchableOpacity style={{marginRight: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,.8)',width: '27%', height: 32, borderRadius: 4, justifyContent:'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,.5)'}}>
                  <Text style={[common.fontbody, {color: '#444', fontSize: 12}]}>REVIEWS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginRight: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,.8)',width: '27%', height: 32, borderRadius: 4, justifyContent:'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,.5)'}}>
                  <Text style={[common.fontbody, {color: '#444', fontSize: 12}]}>SUBSCRIBER</Text>
                </TouchableOpacity>
                {
                  this.state.menustatus === false ?
                  <TouchableOpacity onPress={(e) => this.slideKiriService()} style={{borderWidth: 1, borderColor: 'rgba(255,255,255,.8)',width: '15%', height: 32, borderRadius: 4, justifyContent:'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,.5)'}}>
                    <Ionicons name="ios-more" size={20} color="#444"/>
                  </TouchableOpacity> : null
                }
                {
                  this.state.menustatus === true ?
                  <TouchableOpacity style={{marginRight: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,.8)',width: '27%', height: 32, borderRadius: 4, justifyContent:'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,.5)'}}>
                    <Text style={[common.fontbody, {color: '#444', fontSize: 12}]}>TRANSACTION</Text>
                  </TouchableOpacity> : null
                }
              </View>
            </Animated.View>
          </View>
        </View>
      </View>
    )
  }
}

export default Notif;
