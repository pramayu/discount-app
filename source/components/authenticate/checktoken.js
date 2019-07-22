import React, { Component } from 'react';
import {
  View, Text, StatusBar, TouchableOpacity,
  PermissionsAndroid
} from 'react-native';
import { compose, graphql } from 'react-apollo';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NetInfo from "@react-native-community/netinfo";
import {
  AUTHORIZATION
} from '../../queries/queryUser';



class CheckToken extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isConnected: false
    }
  }


  componentDidMount = () => {
    this.checkconnection();
    this.requestCameraPermission();
  }

  requestCameraPermission = async() => {
    try {
      var granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
          title: 'PERMISSION',
          message: 'EXTERNAL STORAGE PERMISSION',
          buttonNeutral: 'ASK ME LATER',
          buttonNegative: 'CANCEL',
          buttonPositive: 'OK'
        });
    } catch (err) {

    }
  }

  checkconnection = () => {
    NetInfo.fetch().then(state => {
      if(state.isConnected) {
        this.authorization();
      } else {
        this.props.navigation.navigate('Offline');
      }
    });
  }

  authorization = async() => {
    var usertoken = await AsyncStorage.getItem('token');
    if(usertoken) {
      var response = await this.props.authorization({
        variables: {
          usertoken: usertoken
        }
      });
      var { status, usertype } = response.data.authorization;
      if(status === true) {
        if(usertype === 'buyer') {
          this.props.navigation.navigate('BuyerDashRoute');
        } else if (usertype === 'merchant') {

        } else {
          this.props.navigation.navigate('AuthenticateScreen');
        }
      } else {
        this.props.navigation.navigate('AuthenticateScreen');
      }
    } else {
      this.props.navigation.navigate('AuthenticateScreen');
    }
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ECEFF1'}}>
        <StatusBar backgroundColor='#ECEFF1' barStyle='dark-content'/>
        <View style={{width: 150, height: 150, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center'}}>
            <MaterialIcons name="landscape" color="#444" size={72}/>
            <Text style={{transform: [{translateY: -20}],margin: 0,fontSize: 22, color: '#444', letterSpacing: 3, fontFamily: 'Oswald'}}>POCENI</Text>
          </View>
          <View style={{position: 'absolute', width: 120, height: 120, borderRadius: 100}}></View>
        </View>
      </View>
    )
  }
}

export default compose(
  graphql(AUTHORIZATION, { name: 'authorization'})
)(CheckToken);
