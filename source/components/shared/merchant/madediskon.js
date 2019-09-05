import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, TouchableHighlight,
  TextInput, Dimensions,
  Animated, Image, ScrollView
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import {
  common
} from '../../../assets/stylesheets/common';

class MadeDiskon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selecteday: '',
      stuffID: '',
      current_user: '',
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      stuffID         : nextProps.stuffID ? nextProps.stuffID : '',
      current_user    : nextProps.current_user ? nextProps.current_user : '',
    })
  }

  renderArrow = (direction) => {
    if(direction === 'right') {
      return <Ionicons name="ios-arrow-round-forward" size={24} color="#444"/>
    } else {
      return <Ionicons name="ios-arrow-round-back" size={24} color="#444"/>
    }
  }


  render () {
    var { width, height } = Dimensions.get('window');
    return (
      <View style={{flex: 1, flexDirection: 'column', paddingTop: 15}}>
        <View style={{width: '100%', flexDirection: 'row', height: 60}}>
          <View style={{flex: .7, paddingRight: 10}}>
            <TextInput placeholder="Discount 50%" style={[common.fontbody, {borderWidth: 1, borderColor: '#fff',marginBottom: 15, color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#fff', paddingHorizontal: 10}]}/>
          </View>
          <View style={{flex: .3}}>
            <TouchableOpacity style={{width: '100%', height: 38, borderRadius: 4, backgroundColor: '#6c7e70', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[common.fontbody, {fontSize: 12, color: '#f6f5f3'}]}>DISCOUNTYPE</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', height: height / 2.5}}>
          <Calendar hideDayNames={true} markingType={'custom'} markedDates={{[`${this.state.selecteday}`]: {selected: true, marked: true, customStyles: selectedStyle},}}
            onDayPress={(day) => this.setState({selecteday: day.dateString})} renderArrow={(left) => this.renderArrow(left)}
            theme={calendarStyle} style={{borderRadius: 4}}/>
        </View>
      </View>
    )
  }
}

var calendarStyle = {
  backgroundColor: '#fff',
  calendarBackground: '#fff',
  textDayFontFamily: 'PT_Sans-Web-Regular',
  textDayFontSize: 14,
  dayTextColor: '#7f8082',
  todayTextColor: '#ea4c89',
  textMonthFontFamily: 'FjallaOne-Regular',
  textMonthFontSize: 12,
  monthTextColor: '#444',
}

var selectedStyle = {
  container: {
    backgroundColor: '#ea4c89',
    width: 28,
    height: 28,
    borderRadius: 4
  },
  text: {
    color: '#f6f5f3'
  }
}

export default MadeDiskon;
