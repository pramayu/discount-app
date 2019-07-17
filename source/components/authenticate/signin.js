import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity,
  StatusBar, Animated, TextInput,
  Dimensions, Keyboard
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { compose, graphql } from 'react-apollo';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {
  common
} from '../../assets/stylesheets/common';
import { USER_LOGIN } from '../../queries/queryUser';


class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formstatus: false,
      identifier: '',
      password: '',
      errors: {},
      errorstatus: false
    }
    this.formtotop = new Animated.Value(0);
    this.formtodown = new Animated.Value(0);
    this.errorshow = new Animated.Value(0);
    this.erroroff = new Animated.Value(0);
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
  toerrorshow = () => {
    Animated.timing(this.errorshow, {
      toValue: 2,
      duration: 800
    }).start(() => {
      this.setState({
        errorstatus: true
      });
      this.erroroff.setValue(0);
    })
  };

  toerroroff = () => {
    Animated.timing(this.erroroff, {
      toValue: 2,
      duration: 800
    }).start(() => {
      this.setState({
        errorstatus: false
      });
      this.errorshow.setValue(0);
    })
  }

  validator = (data) => {
    var errors = {};
    if(data.identifier.length === 0) {
      errors.identifier = 'This Field is Required';
    }
    if(data.password.length === 0) {
      errors.password = 'This Field is Required';
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

  handleonchange = (name, value) => {
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

  handleSubmit = async() => {
    if(this.isValid()) {
      var response = await this.props.loginuser({
        variables: {
          identifier: this.state.identifier,
          password: this.state.password
        }
      });
      var { status, error, token } = response.data.loginuser;
      if(status === true) {
        await AsyncStorage.setItem('token', token);
        this.props.navigation.navigate('CheckToken');
      }
      if(status === false) {
        var errors = {};
        errors[`${error[0].path}`] = `${error[0].message}`
        this.setState({
          errors: errors
        });
        if(error[0].path === 'loginusercheck') {
          this.toerrorshow();
        }
      }
    }
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

  render() {
    var { width, height } = Dimensions.get('window');
    var totopsty = this.formtotop.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -120]
    });
    var todownsty = this.formtodown.interpolate({
      inputRange: [0, 1],
      outputRange: [-120, 0]
    });
    var toerrorshowsty = this.errorshow.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [-height, 20, 0]
    });
    var toerroroffsty = this.erroroff.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 20, -height]
    });
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
        <StatusBar backgroundColor="#f6f5f3" barStyle="dark-content" />
        <View style={{width: width, height: height / 3, justifyContent: 'flex-end', alignItems: 'center'}}>
          <View style={{width: 150, height: 150, justifyContent: 'center', alignItems: 'center'}}>
            <MaterialIcons name="landscape" color="#444" size={72}/>
            <Text style={{transform: [{translateY: -20}],margin: 0,fontSize: 22, color: '#444', letterSpacing: 3, fontFamily: 'Oswald'}}>POCENI</Text>
          </View>
        </View>
        <Animated.View style={{transform: [{translateY: this.state.formstatus === true ? todownsty : totopsty}], width: width, height: height / 1.1, paddingTop: 50, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 40, backgroundColor: '#444', borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
          <View style={{width: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: '15%', marginBottom: 25}}>
            <Text style={[common.fontitle, {color: '#f6f5f3', fontSize: 14}]}>Welcome Back</Text>
            <Text style={[common.fontbody, {textAlign: 'center',color: '#f6f5f3', lineHeight: 22}]}>Let's log in and explore our stuff discounted.</Text>
          </View>
          <TextInput onChangeText={(txt) => this.handleonchange('identifier',txt)} autoCorrect={false} autoCapitalize='none' placeholder="Username or Email" placeholderTextColor="#444" placeholderText
            style={[common.fontbody, common.field, { borderWidth: 1, borderColor: this.state.errors.identifier ? '#bf7c55' : '#444' }]}/>
          <TextInput onChangeText={(txt) => this.handleonchange('password',txt)} secureTextEntry={true} autoCorrect={false} autoCapitalize='none' placeholder="Password" placeholderTextColor="#444" placeholderText
            style={[common.fontbody, common.field, { borderWidth: 1, borderColor: this.state.errors.password ? '#bf7c55' : '#444' }]}/>
          <TouchableOpacity onPress={(e) => this.handleSubmit()} style={{marginTop: 20, width: '100%', height: 38, borderRadius: 4, backgroundColor: '#6c7e70', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[common.fontitle, {fontSize: 13, color: '#f6f5f3'}]}>Let's Goo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={(e) => AsyncStorage.removeItem('token')} style={{marginTop: 20, width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f6f5f3', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[common.fontitle, {fontSize: 13, color: '#444'}]}>Login with Google</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{transform:[{translateY: this.state.errorstatus === true ? toerroroffsty : toerrorshowsty}],position: 'absolute', width: '100%', height: height, justifyContent: 'flex-start', paddingHorizontal: 30, paddingTop: 40}}>
          <View style={{width: '100%', height: 150, backgroundColor: '#f6f5f3', borderRadius: 4, elevation: 30}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{flex: .25, alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 10}}>
                <TouchableOpacity onPress={(e) => this.toerroroff()}>
                  <Ionicons name="ios-close-circle-outline" size={22} color="#444"/>
                </TouchableOpacity>
              </View>
              <View style={{flex: .75, justifyContent: 'flex-start', alignItems: 'center'}}>
                <Ionicons name="ios-information-circle-outline" size={40} color="#bf7c55"/>
                <Text style={[common.fontitle, {color: '#bf7c55', fontSize: 14, marginTop: 10}]}>Someting Wrong</Text>
                <Text style={[common.fontbody, {color: '#444', fontSize: 14, marginTop: 5}]}>{ this.state.errors.loginusercheck }</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    )
  }
}

export default compose(
  graphql(USER_LOGIN, { name: 'loginuser'})
)(SignIn);
