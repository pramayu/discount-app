import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Animated,
  TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  common
} from '../../../assets/stylesheets/common';
import { firstlook } from '../../shared/sharedaction';

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opaciti: new Animated.Value(0)
    }
    this.firstLook = new Animated.Value(0)
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

  emptyfield = (width, height) => {
    return (
      <View style={{width: width, height: height - 102, justifyContent: 'center', alignItems: 'center'}}>
        <Ionicons name="ios-repeat" size={32} color="#444" />
        <TouchableOpacity style={{marginTop: 15, width: 90, height: 32, borderRadius: 4, backgroundColor: '#444', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[common.fontitle, {color: '#f6f5f3', fontSize: 12}]}>UPLOAD</Text>
        </TouchableOpacity>
      </View>
    )
  }

  uploadform = (width, height) => {
    return (
      <View style={{width: width, height: height - 102, paddingHorizontal: 20, paddingVertical: 20}}>
        <View style={{width: '100%', height: height / 3.3, marginBottom: 20}}>
          <View style={{borderStyle: 'dashed',borderWidth: 1, borderColor: '#7f8082',width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0efed', borderRadius: 4}}>
            <Ionicons name="ios-images" size={48} color="#444"/>
            <TouchableOpacity style={{marginTop: 20, width: '30%', height: 28, backgroundColor: '#444', justifyContent: 'center', alignItems: 'center', borderRadius: 4}}>
              <Text style={[common.fontbody, {color: '#f6f5f3', fontSize: 10}]}>BROWSE IMAGES</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#TITLE</Text>
        <TextInput autoCorrect={false} style={[common.fontbody, {borderStyle: 'dashed',borderWidth: 1, borderColor: '#7f8082', marginBottom: 15, color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
        <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#DESCRIPTION</Text>
        <TextInput autoCorrect={false} multiline={true} style={[common.fontbody, {borderStyle: 'dashed',borderWidth: 1, borderColor: '#7f8082', marginBottom: 15, color: '#444',textAlignVertical: 'top',width: '100%', height: 65, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10, paddingVertical: 10, lineHeight: 22}]}/>
        <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#PRICE</Text>
        <View style={{width: '100%', height: 38, marginBottom: 30}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .6,paddingRight: 10}}>
              <TextInput autoCorrect={false} style={[common.fontbody, {borderStyle: 'dashed',borderWidth: 1, borderColor: '#7f8082', marginBottom: 15, color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
            </View>
            <View style={{flex: .4}}>
              <TouchableOpacity style={{width: '100%', height: 38, backgroundColor: '#444', justifyContent: 'center', alignItems: 'center', borderRadius: 4}}>
                <Text style={[common.fontbody, {color: '#f6f5f3', fontSize: 12}]}>EXTRA FIELD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity style={{width: '100%', height: 38, borderRadius: 4, backgroundColor: '#6c7e70', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[common.fontbody, {color: '#f6f5f3', fontSize: 12}]}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    var {width, height} = Dimensions.get('window');
    var firstLookSty = this.firstLook.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0]
    });
    return (
      <Animated.View style={[common.container, { backgroundColor: '#f6f5f3', transform:[{translateY: firstLookSty}], opacity: this.state.opaciti}]}>
        <View style={{height: 50, width: width, paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .7, alignItems: 'flex-start', justifyContent: 'center'}}>
              <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginBottom: 3}]}>UPLOAD STUFF</Text>
              <Text style={[common.fontbody, { color: '#7f8082'}]}>Offer quality stuffs to customers.</Text>
            </View>
            <View style={{flex: .3}}>
              <TouchableOpacity style={{width: '100%', height: '100%', alignItems: 'flex-end', justifyContent: 'center'}}>
                <Ionicons name="ios-repeat" size={24} color="#444"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        { this.uploadform(width, height) }
      </Animated.View>
    )
  }
}

export default Upload;
