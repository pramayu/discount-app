import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity,
  StatusBar, Animated, TextInput,
  Dimensions, Keyboard
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  common
} from '../../assets/stylesheets/common';


class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formstatus: false
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
      duration: 500,
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
    return (
      <View style={[common.container, { backgroundColor: '#fe9d07' }]}>
        <StatusBar backgroundColor="#fe9d07" barStyle="light-content" />
        <View style={{width: width, height: height / 3, justifyContent: 'flex-end', alignItems: 'center'}}>
          <View style={{width: 150, height: 150, justifyContent: 'center', alignItems: 'center'}}>
            <MaterialIcons name="landscape" color="#ffffff" size={72}/>
            <Text style={{transform: [{translateY: -20}],margin: 0,fontSize: 22, color: '#ffffff', letterSpacing: 3, fontFamily: 'Oswald'}}>POCENI</Text>
          </View>
        </View>
        <Animated.View style={{transform: [{translateY: this.state.formstatus === true ? todownsty : totopsty}], width: width, height: height / 1.2, paddingTop: 50, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 40, backgroundColor: '#ffffff', borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
          <View style={{width: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: '15%', marginBottom: 25}}>
            <Text style={[common.fontitle, {color: '#fe9d07', fontSize: 14}]}>Create Account</Text>
            <Text style={[common.fontbody, {textAlign: 'center',color: '#fe9d07', lineHeight: 22}]}>Find all discounted items in our application</Text>
          </View>
          <TextInput autoCorrect={false} autoCapitalize='none' placeholder="Username" placeholderTextColor="#fe9d07" placeholderText style={[common.fontitle, common.field]}/>
          <TextInput autoCorrect={false} autoCapitalize='none' placeholder="Email Address" placeholderTextColor="#fe9d07" placeholderText style={[common.fontitle, common.field]}/>
          <TextInput keyboardType='number-pad' autoCorrect={false} autoCapitalize='none' placeholder="Phone Number" placeholderTextColor="#fe9d07" placeholderText style={[common.fontitle, common.field]}/>
          <TextInput secureTextEntry={true} autoCorrect={false} autoCapitalize='none' placeholder="Password" placeholderTextColor="#fe9d07" placeholderText style={[common.fontitle, common.field]}/>
          <TouchableOpacity style={{marginTop: 20, width: '100%', height: 38, borderRadius: 20, backgroundColor: '#fe9d07', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[common.fontitle, {fontSize: 13, color: '#ffffff'}]}>Let's Goo</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}

export default SignUp;
