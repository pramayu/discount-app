import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, TouchableHighlight,
  TextInput, Dimensions, KeyboardAvoidingView,
  Animated, Image
} from 'react-native';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  common
} from '../../../assets/stylesheets/common';
import AddressMerchant from './addressmerchant';
import CategoriMerchant from './categorimerchant';


class SettingModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: [],
      current_user: '',
      merchantID: '',
      formchoose: '',
      niches: []
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      location      : nextProps.location ? nextProps.location : [],
      current_user  : nextProps.currentuser ? nextProps.currentuser : '',
      merchantID    : nextProps.merchantID ? nextProps.merchantID : '',
      formchoose    : nextProps.formchoose ? nextProps.formchoose : '',
      niches        : nextProps.niches ? nextProps.niches : []
    })
  }

  choosescreen = () => {
    if(this.state.formchoose === 'location') {
      return <AddressMerchant location={this.state.location} currentuser={this.state.current_user} merchantID={this.state.merchantID} hidemodalservice={this.closemodal.bind(this)}/>
    } else if(this.state.formchoose === 'merchantype') {
      return <CategoriMerchant niches={this.state.niches} currentuser={this.state.current_user} merchantID={this.state.merchantID} hidemodalservice={this.closemodal.bind(this)}/>
    }
  }

  closemodal = () => {
    this.props.hidemodalservice();
  }

  render() {
    return(
      <View style={{flex: 1, flexDirection: 'column'}}>
        { this.choosescreen() }
      </View>
    )
  }
}

export default SettingModal;
