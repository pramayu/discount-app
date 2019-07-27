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
import Loading from '../shared/loading';


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
    try {
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
            this.props.navigation.navigate('MerchantDashRoute');
          } else {
            this.props.navigation.navigate('AuthenticateScreen');
          }
        } else {
          this.props.navigation.navigate('AuthenticateScreen');
        }
      } else {
        this.props.navigation.navigate('AuthenticateScreen');
      }
    } catch (error) {
      if(error) {
        this.props.navigation.navigate('Maintenance');
      }
    }
  }

  render() {
    return <Loading />
  }
}

export default compose(
  graphql(AUTHORIZATION, { name: 'authorization'})
)(CheckToken);
