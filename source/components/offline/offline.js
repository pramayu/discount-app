import React, { Component } from 'react';
import {
  View, Text, StatusBar, TouchableOpacity
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loading from '../shared/loading';


class Offline extends Component {
  render() {
    return <Loading caption={"Smartphone is Offline ;<"}/>
  }
}

export default Offline;
