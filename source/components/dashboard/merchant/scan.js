import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Animated
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firstlook } from '../../shared/sharedaction';
import {
  common
} from '../../../assets/stylesheets/common';

class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenstatus: false,
      opaciti: new Animated.Value(0),
    }
    this.firstLook = new Animated.Value(0);
  }

  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#f6f5f3');
    });
    firstlook(this.firstLook, this.state.opaciti);
  }

  componentWillUnmount = () => {
    this._navListener.remove();
  }

  onSuccess = (e) => {
    alert(JSON.stringify(e))
  }

  render() {
    var {width, height } = Dimensions.get('window');
    var firstLookSty = this.firstLook.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0]
    });
    return (
      <Animated.View style={[common.container, { backgroundColor: '#f6f5f3', transform:[{translateY: firstLookSty}], opacity: this.state.opaciti}]}>
        <View style={{flex: .09, justifyContent: 'center', paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .7, justifyContent: 'center', alignItems: 'flex-start'}}>
              <Text style={[common.fontbody, {color: '#444', fontSize: 14}]}>SCAN QR CODE</Text>
              <Text style={[common.fontbody, {color: '#7f8082', marginTop: 5, fontSize: 12}]}>Place the QR code inside phone area.</Text>
            </View>
            <View style={{flex: .3, justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity>
                <MaterialCommunityIcons name="keyboard-outline" size={20} color="#7f8082"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flex: .91}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{position: 'absolute',backgroundColor: '#f6f5f3', width: '100%', height: '100%', zIndex: 9, justifyContent: 'center', alignItems: 'center'}}>
              <MaterialCommunityIcons name="qrcode-scan" size={120} color="#444"/>
              <TouchableOpacity style={{marginTop: 40, width: '38%', height: 35, borderRadius: 30, backgroundColor: '#444', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={[common.fontitle, {fontSize: 12, color: '#f6f5f3'}]}>START</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    )
  }
}

export default Scan;
