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
      scanstatus: false,
      opaciti: new Animated.Value(0),
    }
    this.firstLook  = new Animated.Value(0);
    this.scanner    = new Animated.Value(0);
  }

  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true)
    });
    firstlook(this.firstLook, this.state.opaciti);
  }

  componentWillUnmount = () => {
    this._navListener.remove();
  }

  scannerAnimated = () => {
    this.setState({scanstatus: true})
    Animated.loop(Animated.sequence([
      Animated.timing(this.scanner, {
        toValue: 3,
        duration: 1500
      })
    ])).start()
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
    var scannerSty = this.scanner.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [-13, -110, -13]
    });
    var scanHeightSty = this.scanner.interpolate({
      inputRange: [0, 1, 2, 3],
      outputRange: [0, 95, 95, 0]
    });
    return (
      <Animated.View style={[common.container, { backgroundColor: '#f6f5f3', transform:[{translateY: firstLookSty}], opacity: this.state.opaciti}]}>
        <View style={{height: 60, justifyContent: 'center', paddingHorizontal: 20, marginTop: 30}}>
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
        <View style={{height: height - 60, width: width}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{position: 'absolute',backgroundColor: '#f6f5f3', width: '100%', height: '100%', zIndex: 9, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{width: '100%', alignItems: 'center', height: height / 4.5, justifyContent: 'flex-end'}}>
                <MaterialCommunityIcons name="qrcode-scan" size={120} color="#444" style={{position: 'absolute'}}/>
                <Animated.View style={{width: 95, height: 2, borderRadius: 4, opacity: this.state.scanstatus === false ? 0 : 1, backgroundColor: 'rgba(234,76,137,.7)', transform:[{translateY: -12}]}}></Animated.View>
                <Animated.View style={{width: 95, height: this.state.scanstatus === false ? 0 : scanHeightSty, opacity: this.state.scanstatus === false ? 0 : 1, borderRadius: 4, backgroundColor: 'rgba(234,76,137,.2)', transform:[{translateY: -12}]}}></Animated.View>
              </View>
              {
                this.state.scanstatus === true ?
                <TouchableOpacity onPress={(e) => this.setState({scanstatus: false})} style={{marginTop: 60, width: '38%', height: 35, borderRadius: 30, backgroundColor: '#ea4c89', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={[common.fontitle, {fontSize: 12, color: '#f6f5f3'}]}>TERMINATE</Text>
                </TouchableOpacity> :
                <TouchableOpacity onPress={(e) => this.props.navigation.navigate('ModalBill')} style={{marginTop: 60, width: '38%', height: 35, borderRadius: 30, backgroundColor: '#444', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={[common.fontitle, {fontSize: 12, color: '#f6f5f3'}]}>START</Text>
                </TouchableOpacity>
              }
            </View>
            {
              this.state.scanstatus === true ?
              <QRCodeScanner onRead={this.onSuccess} cameraStyle={{width: width, height: height}}/> : null
            }
          </View>
        </View>
      </Animated.View>
    )
  }
}

export default Scan;
