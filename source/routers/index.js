import React, { Component } from 'react';
import { Animated, Easing, Platform, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import Ionicons from 'react-native-vector-icons/Ionicons';

import BasePreloader from '../components/preloader/base';
import SignUp from '../components/authenticate/signup';
import SignIn from '../components/authenticate/signin';
import UniquePin from '../components/authenticate/uniquepin';

import AccountBuyer from '../components/dashboard/buyer/account';
import BasketBuyer from '../components/dashboard/buyer/basket';
import DiscoverBuyer from '../components/dashboard/buyer/discover';
import Notif from '../components/dashboard/buyer/notif';
import BuyerDashboard from '../components/dashboard/buyer/timeline';
import SettingUser from '../components/shared/setting';
import ChangePassword from '../components/shared/changepassword';

import CheckToken from '../components/authenticate/checktoken';
import Offline from '../components/offline/offline';

import TabBarComponent from './tab_component';

var SlideFromRight = (index, position, width) => {
  var translateX = position.interpolate({
    inputRange: [index -1, index],
    outputRange: [width, 0]
  });
  return { transform: [{translateX}]}
}

var TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 800,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      var { layout, position, scene } = sceneProps;
      var width = layout.initWidth;
      var height = layout.initHeight;
      var { index, route } = scene
      var params = route.params || {};
      var transition = params.transition || 'default';
      return {
        default: SlideFromRight(index, position, width)
      }[transition]
    }
  }
}

var authenticateRoute = createStackNavigator({
  BasePreloader: {
    screen: BasePreloader
  },
  SignUp: {
    screen: SignUp
  },
  SignIn: {
    screen: SignIn
  },
  UniquePin: {
    screen: UniquePin
  },
  CheckToken: {
    screen: CheckToken
  },
  Offline: {
    screen: Offline
  }
}, {
  headerMode: 'none',
  transitionConfig: TransitionConfiguration,
});


var accountBuyer = createStackNavigator({
  AccountBuyer: { screen: AccountBuyer },
  SettingUser: { screen: SettingUser },
  ChangePassword: { screen: ChangePassword }
}, {
  headerMode: 'none',
  transitionConfig: TransitionConfiguration,
});

accountBuyer.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  if(navigation.state.index > 0) {
    tabBarVisible = false
  }
  return {
    tabBarVisible
  }
}


var buyerDashboard = createBottomTabNavigator({
  BuyerDashboard: {
    screen: BuyerDashboard
  },
  DiscoverBuyer: {
    screen: DiscoverBuyer
  },
  BasketBuyer: {
    screen: BasketBuyer
  },
  Notif: {
    screen: Notif
  },
  AccountBuyer: {
    screen: accountBuyer
  }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      var { routeName } = navigation.state;
      if(routeName === 'BuyerDashboard') {
        return (
          <View style={style.container}>
            <View style={[style.container, focused ? { transform: [{translateY: 13}], opacity: 1 } : { opacity: 0, transform: [{translateY: -20}]}]}>
              <Text style={style.text}>Timeline.</Text>
              <Ionicons name='ios-radio-button-on' color='#444' size={8}/>
            </View>
            <View style={focused ? { transform: [{translateY: 20}], opacity: 0} : { opacity: 1, transform: [{translateY: -13.5}] }}>
              <Ionicons name='ios-grid' size={20} color='#444' />
            </View>
          </View>
        )
      } else if (routeName === 'BasketBuyer') {
        return (
          <View style={style.container}>
            <View style={[style.container, focused ? { transform: [{translateY: 13}], opacity: 1 } : { opacity: 0, transform: [{translateY: -20}]}]}>
              <Text style={style.text}>Coupons.</Text>
              <Ionicons name='ios-radio-button-on' color='#444' size={8}/>
            </View>
            <Ionicons name='ios-archive' size={20} color='#444' style={focused ? { transform: [{translateY: 20}], opacity: 0} : { opacity: 1, transform: [{translateY: -13.5}] }}/>
          </View>
        )
      } else if(routeName === 'DiscoverBuyer') {
        return (
          <View style={style.container}>
            <View style={[style.container, focused ? { transform: [{translateY: 13}], opacity: 1 } : { opacity: 0, transform: [{translateY: -20}]}]}>
              <Text style={style.text}>Discovers.</Text>
              <Ionicons name='ios-radio-button-on' color='#444' size={8}/>
            </View>
            <Ionicons name='ios-compass' size={20} color='#444' style={focused ? { transform: [{translateY: 20}], opacity: 0} : { opacity: 1, transform: [{translateY: -13.5}] }}/>
          </View>
        )
      } else if (routeName === 'Notif') {
        return (
          <View style={style.container}>
            <View style={[style.container, focused ? { transform: [{translateY: 13}], opacity: 1 } : { opacity: 0, transform: [{translateY: -20}]}]}>
              <Text style={style.text}>Reminder.</Text>
              <Ionicons name='ios-radio-button-on' color='#444' size={8}/>
            </View>
            <Ionicons name='ios-notifications' size={22} color='#444' style={focused ? { transform: [{translateY: 20}], opacity: 0} : { opacity: 1, transform: [{translateY: -13.5}] }}/>
          </View>
        )
      } else if (routeName === 'AccountBuyer') {
        return (
          <View style={style.container}>
            <View style={[style.container, focused ? { transform: [{translateY: 13}], opacity: 1 } : { opacity: 0, transform: [{translateY: -20}]}]}>
              <Text style={style.text}>Account.</Text>
              <Ionicons name='ios-radio-button-on' color='#444' size={8}/>
            </View>
            <Ionicons name='ios-finger-print' size={20} color='#444' style={focused ? { transform: [{translateY: 20}], opacity: 0} : { opacity: 1, transform: [{translateY: -13.5}] }}/>
          </View>
        )
      }
    }
  }),
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: '#f6f5f3',
      height: 52,
      borderColor: '#f6f5f3',
      borderTopWidth: 0,
    },
    tabStyle: {
      backgroundColor: '#f6f5f3'
    }
  }
});

var style = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'PT_Sans-Web-Regular',
    fontSize: 14,
    color: '#444',
    marginBottom: 4
  }
});

export var MainScreen = createAppContainer(createSwitchNavigator({
  CheckToken: { screen: CheckToken },
  AuthenticateScreen: { screen: authenticateRoute },
  BuyerDashRoute: { screen: buyerDashboard }
}));
