import React, { Component } from 'react';
import { Animated, Easing, Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import BasePreloader from '../components/preloader/base';
import SignUp from '../components/authenticate/signup';

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
      duration: 650,
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

var frontscreen = createStackNavigator({
  BasePreloader: {
    screen: BasePreloader
  },
  SignUp: {
    screen: SignUp
  }
}, {
  headerMode: 'none',
  transitionConfig: TransitionConfiguration,
});

export var FrontScreen = createAppContainer(frontscreen);
