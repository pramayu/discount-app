import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Animated,
  Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  common
} from '../../../assets/stylesheets/common';

class ModalBill extends Component {

  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true)
    });
  }

  componentWillUnmount = () => {
    this._navListener.remove();
  }

  render () {
    var {width, height} = Dimensions.get('window');
    return (
      <View style={[common.container, {backgroundColor: 'rgba(0,0,0,.2)', justifyContent: 'center', alignItems: 'center'}]}>
        <View style={{width: '80%', height: height / 1.8, backgroundColor: '#f6f5f3', borderRadius: 6}}>
          <View style={{width: '100%', height: 60}}>
            <View style={{flex: 1, flexDirection: 'row',borderStyle: 'dashed', borderWidth: 1, borderColor: '#c5c4c2', borderRadius: 6}}></View>
            <View style={{zIndex: 19,width: '100%', height: 60 -2, position: 'absolute', backgroundColor: '#f6f5f3', borderRadius: 6}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: .7, justifyContent: 'flex-end', alignItems: 'flex-start'}}>
                  <View style={{flex: 1, flexDirection: 'row',paddingLeft: 10}}>
                    <View style={{flex: .23, justifyContent: 'center'}}>
                      <View style={{width: 34, height: 34, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={{uri: 'https://cdn.dribbble.com/users/185856/screenshots/7142963/allelevens4_1x.png'}} style={{resizeMode: 'cover', width: '100%', height: '100%', borderRadius: 60}}/>
                      </View>
                    </View>
                    <View style={{flex: .77, justifyContent: 'center'}}>
                      <Text style={[common.fontbody, {color: '#444'}]}>Lisa Engler,</Text>
                      <Text style={[common.fontbody, {color: '#7f8082', marginTop: 2, fontSize: 12}]}>would paid the order.</Text>
                    </View>
                  </View>
                  <View style={{position: 'absolute', zIndex: 20, width: 12, height: 12, borderRadius: 20, backgroundColor: '#c5c4c2', transform: [{translateY: 7},{translateX: -5}]}}></View>
                </View>
                <View style={{flex: .3, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                  <TouchableOpacity style={{width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10}}>
                    <Ionicons name="ios-close-circle-outline" size={20} color="#7f8082"/>
                  </TouchableOpacity>
                  <View style={{position: 'absolute', zIndex: 20, width: 12, height: 12, borderRadius: 20, backgroundColor: '#c5c4c2', transform: [{translateY: 7},{translateX: 5}]}}></View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default ModalBill;
