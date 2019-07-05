import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity,
  StatusBar, Animated, TextInput,
  Dimensions, Keyboard
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import {
  common
} from '../../assets/stylesheets/common';
import { CREATE_USER } from '../../queries/queryUser';


class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formstatus: false,
      username: '',
      email: '',
      phone: '',
      password: '',
      errors: {}
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
  };

  componentWillUnmount = () => {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  };

  _keyboardDidShow = () => {
    this.totop();
  };

  _keyboardDidHide = () => {
    this.todown();
  };

  totop = () => {
    Animated.timing(this.formtotop, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true
    }).start(() => {
      this.setState({ formstatus: true });
      this.formtodown.setValue(0);
    });
  };

  todown = () => {
    Animated.timing(this.formtodown, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      this.setState({ formstatus: false });
      this.formtotop.setValue(0);
    });
  };

  validator = (data) => {
    var errors = {};
    if(data.username.length === 0) {
      errors.username = 'this field is required';
    };
    if(data.email.length === 0) {
      errors.email = 'this field is required';
    };
    if(data.phone.length === 0) {
      errors.phone = 'this field is required';
    };
    if(data.password.length < 8) {
      errors.phone = 'this field is required';
    };
    return {
      errors,
      isValid: _.isEmpty(errors)
    };
  };

  isValid = () => {
    var { errors, isValid } = this.validator(this.state);
    if(!isValid) {
      this.setState({ errors })
    }
    return isValid
  }

  fieldOnChange = (name, value) => {
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
  };

  handleSubmit = async() => {
    if(this.isValid()) {
      var response = await this.props.createuser({
        variables: {
          username: this.state.username,
          email: this.state.email,
          phone: this.state.phone,
          password: this.state.password
        }
      });
    }
  }

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
            <Text style={[common.fontitle, {color: '#f6f5f3', fontSize: 14}]}>Create Account</Text>
            <Text style={[common.fontbody, {textAlign: 'center',color: '#f6f5f3', lineHeight: 22}]}>Find all discounted items in our application</Text>
          </View>
          <TextInput onChangeText={(txt) => this.fieldOnChange('username',txt)} autoCorrect={false} autoCapitalize='none' placeholder="Username" placeholderTextColor="#444" placeholderText style={[common.fontbody, common.field]}/>
          <TextInput onChangeText={(txt) => this.fieldOnChange('email',txt)} autoCorrect={false} autoCapitalize='none' placeholder="Email Address" placeholderTextColor="#444" placeholderText style={[common.fontbody, common.field]}/>
          <TextInput onChangeText={(txt) => this.fieldOnChange('phone',txt)} keyboardType='number-pad' autoCorrect={false} autoCapitalize='none' placeholder="Phone Number" placeholderTextColor="#444" placeholderText style={[common.fontbody, common.field]}/>
          <TextInput onChangeText={(txt) => this.fieldOnChange('password',txt)} secureTextEntry={true} autoCorrect={false} autoCapitalize='none' placeholder="Password" placeholderTextColor="#444" placeholderText style={[common.fontbody, common.field]}/>
          <TouchableOpacity onPress={(e) => this.handleSubmit()} style={{marginTop: 20, width: '100%', height: 38, borderRadius: 4, backgroundColor: '#6c7e70', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[common.fontitle, {fontSize: 13, color: '#f6f5f3'}]}>Let's Goo</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}

export default compose(
  graphql(CREATE_USER, { name: 'createuser' })
)(SignUp);
