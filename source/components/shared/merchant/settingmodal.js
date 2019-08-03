import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, TouchableHighlight,
  TextInput, Dimensions, KeyboardAvoidingView,
  Animated, Image
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  common
} from '../../../assets/stylesheets/common';
import { ADDRESS_UPDATE_MERCHANT } from '../../../queries/queryMerchant';



class SettingModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      latitude: '',
      longitude: '',
      province: '',
      distric: '',
      address: '',
      fetchstatus: false
    }
  }

  closemodal = () => {
    this.props.hidemodalservice()
  }

  getcoordinate = () => {
    this.setState({ fetchstatus: true })
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude.toString(),
        longitude: position.coords.longitude.toString(),
        fetchstatus: position ? false : true
      })
    }, error => {
      console.log(error)
    }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
  }

  addressonchange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  handleservicemerchant = async() => {
    var response = await this.props.addressupdatemerchant({
      variables: {
        addressupdateprop: {
          merchantID    : this.props.merchantID,
          userID        : this.props.currentuser._id,
          address       : this.state.address,
          distric       : this.state.distric,
          province      : this.state.province,
          latitude      : this.state.latitude,
          longitude     : this.state.longitude
        }
      }
    });
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
            <View style={{flex: .71, justifyContent: 'center'}}>
              <Text style={[common.fontbody, { color: '#444'}]}>Share Location</Text>
              <Text style={[common.fontbody, { color: '#7f8082'}]}>For ease of finding your store</Text>
            </View>
            <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
              {
                this.state.address.length > 0 && this.state.latitude.length > 0 && this.state.longitude.length > 0 ?
                <TouchableOpacity onPress={(e) => this.handleservicemerchant()} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Ionicons name="ios-checkmark" size={28} color="#6c7e70"/>
                </TouchableOpacity> : null
              }
            </View>
            <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
              <TouchableOpacity onPress={(e) => this.closemodal()} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Ionicons name="ios-close" size={28} color="#6c7e70"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#Full Address</Text>
        <TextInput value={this.state.address} onChangeText={(txt) => this.addressonchange('address',txt)} autoCorrect={false} multiline={true} style={[common.fontbody, {marginBottom: 15, color: '#444',textAlignVertical: 'top',width: '100%', height: 65, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10, paddingVertical: 10, lineHeight: 22}]}/>
        <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#Distric</Text>
        <TextInput value={this.state.distric} onChangeText={(txt) => this.addressonchange('distric',txt)} autoCorrect={false} style={[common.fontbody, {marginBottom: 15, color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
        <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#Province</Text>
        <TextInput value={this.state.province} onChangeText={(txt) => this.addressonchange('province',txt)} autoCorrect={false} style={[common.fontbody, {marginBottom: 15, color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
        <View style={{width: '100%', height: 50}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: '43%', justifyContent: 'center', paddingRight: 5}}>
              <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#Latitude</Text>
              <TextInput value={this.state.latitude} onChangeText={(txt) => this.addressonchange('latitude',txt)} autoCorrect={false} style={[common.fontbody, {color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
            </View>
            <View style={{width: '43%', justifyContent: 'center', paddingRight: 5}}>
              <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#Longitude</Text>
              <TextInput value={this.state.longitude} onChangeText={(txt) => this.addressonchange('longitude',txt)} autoCorrect={false} style={[common.fontbody, {color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
            </View>
            <View style={{width: '14%', justifyContent: 'center', alignItems: 'flex-end'}}>
              <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 5}]}></Text>
              <TouchableOpacity onPress={(e) => this.getcoordinate()} style={{borderRadius: 4,backgroundColor: '#6c7e70',width: 39, height: 37, justifyContent: 'center', alignItems: 'center'}}>
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
    if(this.state.fetchstatus === true) {
      return (
        <View style={{flex: 1, flexDirection: 'column', paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center'}}>
          <MaterialIcons name="landscape" color="#444" size={72}/>
          <Text style={{transform: [{translateY: -20}],margin: 0,fontSize: 22, color: '#444', letterSpacing: 3, fontFamily: 'Oswald'}}>POCENI</Text>
        </View>
      )
    }
    return (
      <View style={{flex: 1, flexDirection: 'column', paddingHorizontal: 20}}>
        { this.props.formchoose.length > 0 ? this.locationsetup() : null }
      </View>
    )
  }
}

export default compose(
  graphql(ADDRESS_UPDATE_MERCHANT, {name: 'addressupdatemerchant'})
)(SettingModal);
