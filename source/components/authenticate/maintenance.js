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
import Loading from '../shared/loading';


class Maintenance extends Component {
  render () {
    return <Loading caption={"Server Under Maintenance ;("}/>
  }
}


export default Maintenance;
