import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, TouchableHighlight,
  TextInput, Dimensions, KeyboardAvoidingView,
  Animated, Image
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  common
} from '../../../assets/stylesheets/common';


class SettingModal extends Component {

  closemodal = () => {
    this.props.hidemodalservice()
  }

  locationsetup = () => {
    return (
      <View style={{width: '100%', height: 'auto'}}>
        <Text style={[common.fontitle, {fontSize: 12, color: '#444'}]}>MERCHANT LOCATION</Text>
        <View style={{width: '100%', height: 45, marginBottom: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .09, justifyContent: 'center'}}>
              <Ionicons name="ios-pin" size={24} color="#6c7e70"/>
            </View>
            <View style={{flex: .81, justifyContent: 'center'}}>
              <Text style={[common.fontbody, { color: '#444'}]}>Share Location</Text>
              <Text style={[common.fontbody, { color: '#7f8082'}]}>For ease of finding your store</Text>
            </View>
            <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
              <TouchableOpacity onPress={(e) => this.closemodal()} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Ionicons name="ios-close" size={28} color="#6c7e70"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#Full Address</Text>
        <TextInput autoCorrect={false} multiline={true} style={[common.fontbody, {marginBottom: 15, color: '#444',textAlignVertical: 'top',width: '100%', height: 65, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10, paddingVertical: 10, lineHeight: 22}]}/>
        <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#Distric</Text>
        <TextInput autoCorrect={false} style={[common.fontbody, {marginBottom: 15, color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
        <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#Province</Text>
        <TextInput autoCorrect={false} style={[common.fontbody, {marginBottom: 15, color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
        <View style={{width: '100%', height: 50}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: '43%', justifyContent: 'center', paddingRight: 5}}>
              <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#Latitude</Text>
              <TextInput autoCorrect={false} style={[common.fontbody, {color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
            </View>
            <View style={{width: '43%', justifyContent: 'center', paddingRight: 5}}>
              <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#Longitude</Text>
              <TextInput autoCorrect={false} style={[common.fontbody, {color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
            </View>
            <View style={{width: '14%', justifyContent: 'center', alignItems: 'flex-end'}}>
              <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 5}]}></Text>
              <TouchableOpacity style={{borderRadius: 4,backgroundColor: '#6c7e70',width: 39, height: 37, justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="ios-pin" size={24} color="#f6f5f3"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  render () {
    var { width, height } = Dimensions.get('window');
    return (
      <View style={{flex: 1, flexDirection: 'column', paddingHorizontal: 20}}>
        { this.props.formchoose.length > 0 ? this.locationsetup() : null }
      </View>
    )
  }
}

export default SettingModal;
