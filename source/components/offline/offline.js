import React, { Component } from 'react';
import {
  View, Text, StatusBar, TouchableOpacity
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


class Offline extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ECEFF1'}}>
        <StatusBar backgroundColor='#ECEFF1' barStyle='dark-content'/>
        <View style={{width: 150, height: 150, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center'}}>
            <MaterialIcons name="landscape" color="#444" size={72}/>
            <Text style={{transform: [{translateY: -20}],margin: 0,fontSize: 22, color: '#444', letterSpacing: 3, fontFamily: 'Oswald'}}>POCENI</Text>
          </View>
          <View style={{position: 'absolute', width: 120, height: 120, borderRadius: 100, borderTopWidth: 0, borderWidth: 2, borderColor: '#444'}}></View>
        </View>
      </View>
    )
  }
}

export default Offline;
