import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity,
  StatusBar, Animated,
  Easing
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  common
} from '../../assets/stylesheets/common';


class BasePreloader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opaciti: new Animated.Value(0)
    }
    this.logo = new Animated.Value(0);
  }

  componentDidMount = () => {
    this.logoToTop();
  }

  logoToTop = () => {
    Animated.parallel([
      Animated.timing(this.logo, {
        toValue: 3,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.opaciti, {
        toValue: 1,
        duration: 300,
        delay: 850,
        useNativeDriver: true,
      })
    ]).start()
  }

  render () {
    var logoToTopSty = this.logo.interpolate({
      inputRange: [0, 1, 2, 3],
      outputRange: [200, -20, 5, 0]
    });
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
        <StatusBar backgroundColor="#f6f5f3" barStyle="dark-content" />
        <View style={{flex: .5, justifyContent: 'flex-end', alignItems: 'center'}}>
          <Animated.View style={{width: 150, height: 150, justifyContent: 'center', alignItems: 'center', opacity: 1, transform:[{translateY: logoToTopSty}]}}>
            <MaterialIcons name="landscape" color="#444" size={72}/>
            <Text style={{transform: [{translateY: -20}],margin: 0,fontSize: 22, color: '#444', letterSpacing: 3, fontFamily: 'Oswald'}}>POCENI</Text>
          </Animated.View>
        </View>
        <View style={{flex: .2, justifyContent: 'flex-end', alignItems: 'center'}}>
        </View>
        <Animated.View style={{flex: .4, justifyContent: 'flex-start', alignItems: 'center', opacity: this.state.opaciti}}>
          <TouchableOpacity onPress={(e) => this.props.navigation.navigate('SignUp')} style={{width: '50%', height: 38, borderRadius: 4, backgroundColor: '#444', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[common.fontitle, {fontSize: 13, color: '#f6f5f3'}]}>Make Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={(e) => this.props.navigation.navigate('SignIn')} style={{marginTop: 20, width: '50%', height: 38, borderRadius: 4, backgroundColor: '#dbd9d9', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[common.fontitle, {fontSize: 13, color: '#444'}]}>Let's Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}

export default BasePreloader;
