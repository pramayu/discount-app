import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity,
  StatusBar, Animated, TextInput,
  Dimensions, Keyboard
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { compose, graphql } from 'react-apollo';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import {
  common
} from '../../assets/stylesheets/common';
import {
  CHANGE_PASSWORD, CURRENT_USER
} from '../../queries/queryUser';

class ChangePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formstatus: false,
      oldpassword: '',
      newpassword: '',
      confirmpassword: '',
      errors: {},
      current_user: ''
    }
    this.formtotop = new Animated.Value(0);
    this.formtodown = new Animated.Value(0);
  }

  componentDidMount = () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      current_user: nextProps.current_user ? nextProps.current_user : ''
    })
  }

  componentWillUnmount = () => {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.totop()
  }

  _keyboardDidHide = () => {
    this.todown()
  }

  totop = () => {
    Animated.timing(this.formtotop, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true
    }).start(() => {
      this.setState({ formstatus: true });
      this.formtodown.setValue(0);
    })
  };

  todown = () => {
    Animated.timing(this.formtodown, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      this.setState({ formstatus: false });
      this.formtotop.setValue(0);
    })
  };

  validator = (data) => {
    var errors = {};
    if(data.oldpassword.length === 0) {
      errors.oldpassword = 'This Field is Required';
    }
    if(data.newpassword.length < 8) {
      errors.newpassword = 'Min Password 8 Character';
    }
    else if(data.newpassword !== data.confirmpassword) {
      errors.newpassword = 'New Password & Confirm Password not match';
    }
    else if(data.oldpassword === data.newpassword) {
      errors.newpassword = 'New Password & Old Password can\'t same';
    }
    if(data.confirmpassword.length < 8) {
      errors.confirmpassword = 'This Field is Required';
    }
    return {
      errors,
      isValid: _.isEmpty(errors)
    }
  }

  isValid = () => {
    var { errors, isValid } = this.validator(this.state);
    if(!isValid) {
      this.setState({ errors })
    }
    return isValid
  }

  onchangehandle = (name, value) => {
    if(!!this.state.errors) {
      var errors = Object.assign({}, this.state.errors);
      delete errors[name];
      this.setState({
        [name]: value,
        errors
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  handlesubmit = async() => {
    if(this.isValid()) {
      var response = await this.props.changepassword({
        variables: {
          userID: this.state.current_user._id,
          oldpassword: this.state.oldpassword,
          newpassword: this.state.newpassword,
          confirmpassword: this.state.confirmpassword,
        }
      });
      var { status, error } = response.data.changepassword;
      if(status === true) {
        await AsyncStorage.removeItem('token');
        this.props.navigation.navigate('CheckToken');
      }
      if(!_.isEmpty(error)) {
        var errors = {};
        errors[`${error[0].path}`] = `${error[0].message}`
        this.setState({
          errors: errors
        });
      }
    }
  }

  render () {
    var { width, height } = Dimensions.get('window');
    var totopsty = this.formtotop.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -120]
    });
    var todownsty = this.formtodown.interpolate({
      inputRange: [0, 1],
      outputRange: [-120, 0]
    });
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
        <View style={{width: width, height: height / 3, justifyContent: 'flex-end', alignItems: 'center'}}>
          <View style={{width: 150, height: 150, justifyContent: 'center', alignItems: 'center'}}>
            <MaterialIcons name="landscape" color="#444" size={72}/>
            <Text style={{transform: [{translateY: -20}],margin: 0,fontSize: 22, color: '#444', letterSpacing: 3, fontFamily: 'Oswald'}}>POCENI</Text>
          </View>
        </View>
        <Animated.View style={{transform: [{translateY: this.state.formstatus === true ? todownsty : totopsty}], width: width, height: height / 1.1, paddingTop: 50, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 40, backgroundColor: '#444', borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
          <View style={{width: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: '15%', marginBottom: 25}}>
            <Text style={[common.fontitle, {color: '#f6f5f3', fontSize: 14}]}>Change Password</Text>
            <Text style={[common.fontbody, {textAlign: 'center',color: '#f6f5f3', lineHeight: 22}]}>Change your password regularly for account security.</Text>
          </View>
          <TextInput onChangeText={(txt) => this.onchangehandle('oldpassword', txt)} secureTextEntry={true} autoCorrect={false} autoCapitalize='none' placeholder="Old Password" placeholderTextColor="#444" placeholderText
            style={[common.fontbody, common.field, {borderWidth: 1, borderColor: this.state.errors.oldpassword ? '#bf7c55' : '#444'}]}/>
          <TextInput onChangeText={(txt) => this.onchangehandle('newpassword', txt)} secureTextEntry={true} autoCorrect={false} autoCapitalize='none' placeholder="New Password" placeholderTextColor="#444" placeholderText
            style={[common.fontbody, common.field, {borderWidth: 1, borderColor: this.state.errors.newpassword ? '#bf7c55' : '#444'}]}/>
          <TextInput onChangeText={(txt) => this.onchangehandle('confirmpassword', txt)} secureTextEntry={true} autoCorrect={false} autoCapitalize='none' placeholder="Confirm New Password" placeholderTextColor="#444" placeholderText
            style={[common.fontbody, common.field, {borderWidth: 1, borderColor: this.state.errors.confirmpassword ? '#bf7c55' : '#444'}]}/>
          <TouchableOpacity onPress={(e) => this.handlesubmit()} style={{marginTop: 20, width: '100%', height: 38, borderRadius: 4, backgroundColor: '#6c7e70', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[common.fontitle, {fontSize: 13, color: '#f6f5f3'}]}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}

export default compose(
  graphql(CURRENT_USER, {
    name: 'current_user',
    options: (ownProps) => ({
      fetchPolicy: 'network-only'
    }),
    props: ({ current_user: { current_user }}) => ({ current_user })
  }),
  graphql(CHANGE_PASSWORD, {
    name: 'changepassword'
  })
)(ChangePassword);
