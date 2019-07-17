import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  Dimensions, StatusBar, Image,
  TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { compose, graphql } from 'react-apollo';
import AsyncStorage from '@react-native-community/async-storage';
import {
  common
} from '../../assets/stylesheets/common';
import {
  UPDATE_USER, CURRENT_USER, FETCH_USER
} from '../../queries/queryUser';

class SettingUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      fullname: '',
      phone: '',
      address: '',
      current_user: ''
    }
  }
  componentDidMount = () => {
    var { user } = this.props.navigation.state.params;
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#6c7e70');
    });
    this.setState({
      username: user.username ? user.username : '',
      email: user.email ? user.email : '',
      fullname: user.fullname ? user.fullname : '',
      phone: user.phone ? user.phone : '',
      address: user.address ? user.address : '',
    });
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      current_user: nextProps.current_user ? nextProps.current_user : ''
    });
  }

  componentWillUnmount = () => {
    this._navListener.remove();
  }

  handleonchange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  handleonsubmit = async() => {
    var response = await this.props.updateuser({
      variables: {
        username: this.state.username,
        email: this.state.email,
        fullname: this.state.fullname,
        phone: this.state.phone,
        address: this.state.address,
        userID: this.state.current_user._id,
      },
      refetchQueries: [{
        query: FETCH_USER,
        variables: { userID: this.state.current_user._id }
      }]
    });
    var { status, error, token } = response.data.updateuser;
    if(token) {
      await AsyncStorage.setItem('token', token);
    }
  }

  render () {
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
        <View style={{flex: .07, paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex:.3, justifyContent:'center'}}>
              <TouchableOpacity onPress={(e) => this.props.navigation.goBack()}>
                <Ionicons name="ios-arrow-round-back" size={28} color="#444"/>
              </TouchableOpacity>
            </View>
            <View style={{flex:.7, justifyContent:'center', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={(e) => this.handleonsubmit()}>
                <Text style={[common.fontbody, { color: '#444'}]}>Save Update.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flex: .27, paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .4, paddingTop: 10, alignItems: 'center'}}>
              <View style={{width: 110, height: 110}}>
                <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 80}} source={{uri: 'https://images.unsplash.com/photo-1498746607408-1e56960e3bdd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}}/>
                <TouchableOpacity style={{justifyContent:"center", alignItems: 'center',position: 'absolute', width: '100%', height: '100%', borderRadius: 100, borderWidth: 1, borderColor: '#6c7e70', backgroundColor: 'rgba(0,0,0,.3)'}}>
                  <Ionicons name="ios-camera" size={32} color="rgba(255,255,255,.5)"/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: .6, paddingLeft: 10, paddingTop: 5}}>
              <TextInput onChangeText={(txt) => this.handleonchange('username',txt)} placeholder="Username" value={this.state.username} style={[common.field, common.fontbody, {height: 24, letterSpacing: 0, paddingVertical: 0, marginBottom: 0}]}/>
              <TextInput onChangeText={(txt) => this.handleonchange('fullname',txt)} placeholder="Fullname" value={this.state.fullname} style={[common.field, common.fontbody, {height: 24, letterSpacing: 0, paddingVertical: 0, marginBottom: 0}]}/>
              <TextInput onChangeText={(txt) => this.handleonchange('email',txt)} placeholder="Email Address" value={this.state.email} style={[common.field, common.fontbody, {height: 24, letterSpacing: 0, paddingVertical: 0, marginBottom: 0}]}/>
              <TextInput onChangeText={(txt) => this.handleonchange('phone',txt)} placeholder="Phone" value={this.state.phone} style={[common.field, common.fontbody, {height: 24, letterSpacing: 0, paddingVertical: 0, marginBottom: 0}]}/>
              <TextInput onChangeText={(txt) => this.handleonchange('address',txt)} placeholder="Address" value={this.state.address} style={[common.field, common.fontbody, {height: 24, letterSpacing: 0, paddingVertical: 0, marginBottom: 0}]}/>
            </View>
          </View>
        </View>
        <View style={{flex: .4, paddingHorizontal: 20}}>
          <Text style={[common.fontitle, {fontSize: 12, color: '#444'}]}>NOTIFICATION</Text>
          <View style={{width: '100%', height: 45}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: .09, justifyContent: 'center'}}>
                <Ionicons name="ios-notifications-outline" size={24} color="#6c7e70"/>
              </View>
              <View style={{flex: .81, justifyContent: 'center'}}>
                <Text style={[common.fontbody, { color: '#444'}]}>Push Notification</Text>
                <Text style={[common.fontbody, { color: '#7f8082'}]}>Tell us when the merchant is made discount</Text>
              </View>
              <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
                <TouchableOpacity style={{width: 18, height: 18, borderRadius: 50, borderWidth: 1, borderColor: '#dbd9d9'}}></TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{width: '100%', height: 45}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: .09, justifyContent: 'center'}}>
                <Ionicons name="ios-card" size={22} color="#6c7e70"/>
              </View>
              <View style={{flex: .81, justifyContent: 'center'}}>
                <Text style={[common.fontbody, { color: '#444'}]}>Successfuly Order</Text>
                <Text style={[common.fontbody, { color: '#7f8082'}]}>Let me know success order</Text>
              </View>
              <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
                <TouchableOpacity style={{width: 18, height: 18, borderRadius: 50, borderWidth: 1, borderColor: '#dbd9d9'}}></TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginTop: 20}]}>SECURITY</Text>
          <View style={{width: '100%', height: 45}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: .09, justifyContent: 'center'}}>
                <Ionicons name="ios-finger-print" size={22} color="#6c7e70"/>
              </View>
              <View style={{flex: .81, justifyContent: 'center'}}>
                <Text style={[common.fontbody, { color: '#444'}]}>Change Password</Text>
                <Text style={[common.fontbody, { color: '#7f8082'}]}>For security, change your password</Text>
              </View>
              <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
                <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Ionicons name="ios-arrow-round-forward" size={28} color="#dbd9d9"/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{width: '100%', height: 45}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: .09, justifyContent: 'center'}}>
                <Ionicons name="ios-pin" size={24} color="#6c7e70"/>
              </View>
              <View style={{flex: .81, justifyContent: 'center'}}>
                <Text style={[common.fontbody, { color: '#444'}]}>Access Location</Text>
                <Text style={[common.fontbody, { color: '#7f8082'}]}>Automatically access your location</Text>
              </View>
              <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
                <TouchableOpacity style={{width: 18, height: 18, borderRadius: 50, borderWidth: 1, borderColor: '#dbd9d9'}}></TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginTop: 20}]}>SUPPORT</Text>
          <View style={{width: '100%', height: 45}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: .09, justifyContent: 'center'}}>
                <Ionicons name="ios-bookmarks" size={20} color="#6c7e70"/>
              </View>
              <View style={{flex: .81, justifyContent: 'center'}}>
                <Text style={[common.fontbody, { color: '#444'}]}>Contact Us</Text>
                <Text style={[common.fontbody, { color: '#7f8082'}]}>Have problem ? Let's contact us</Text>
              </View>
              <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
                <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Ionicons name="ios-arrow-round-forward" size={28} color="#dbd9d9"/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{width: '100%', height: 45}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: .09, justifyContent: 'center'}}>
                <Ionicons name="ios-clipboard" size={22} color="#6c7e70"/>
              </View>
              <View style={{flex: .81, justifyContent: 'center'}}>
                <Text style={[common.fontbody, { color: '#444'}]}>Terms of Service</Text>
                <Text style={[common.fontbody, { color: '#7f8082'}]}>Some rules that you must agree to</Text>
              </View>
              <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
                <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Ionicons name="ios-arrow-round-forward" size={28} color="#dbd9d9"/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{width: '100%', height: 45}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: .09, justifyContent: 'center'}}>
                <Ionicons name="ios-bulb" size={22} color="#6c7e70"/>
              </View>
              <View style={{flex: .81, justifyContent: 'center'}}>
                <Text style={[common.fontbody, { color: '#444'}]}>Help</Text>
                <Text style={[common.fontbody, { color: '#7f8082'}]}>You're still confused, let's check us</Text>
              </View>
              <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
                <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Ionicons name="ios-arrow-round-forward" size={28} color="#dbd9d9"/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default compose(
  graphql(CURRENT_USER, {
    name: 'current_user',
    props: ({ current_user: { current_user }}) => ({ current_user }),
    options: (ownProps) => ({
      fetchPolicy: 'network-only'
    })
  }),
  graphql(UPDATE_USER, { name: 'updateuser' })
)(SettingUser);
