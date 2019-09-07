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
import {
  DISCOUNT_TYPE
} from '../../../queries/queryDiscountype';
import {
  MADE_DISCOUNT
} from '../../../queries/queryDiscount';

class MadeDiskon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discounts: [],
      selecteday: '',
      stuffID: '',
      current_user: '',
      discount: '',
      discountypes: [],
      discountypeID: '',
      discountypeChild: '',
      quantity: ''
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      stuffID         : nextProps.stuffID ? nextProps.stuffID : '',
      current_user    : nextProps.current_user ? nextProps.current_user : '',
      discountypes    : nextProps.discountypes ? nextProps.discountypes : [],
      discounts       : nextProps.discounts ? nextProps.discounts : []
    })
  }

  sethandleDiscount = async() => {
    var response = await this.props.madediskon({
      variables: {
        reqdiscount: {
          stuffID: this.state.stuffID,
          userID: this.state.current_user._id,
          discountypeID: this.state.discountypeID,
          enddate: this.state.selecteday,
          discount: this.state.discount,
          quantity: this.state.quantity,
        }
      }
    });
    var { status, error, discount } = response.data.madediskon;
    if(status === true) {
      this.setState({
        discountypeID: '',
        enddate: '',
        discount: '',
        quantity: '',
        discountypeChild: '',
        discounts: [...this.state.discounts, discount]
      })
    }
  }

  sethandleInput = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  renderArrow = (direction) => {
    if(direction === 'right') {
      return <Ionicons name="ios-arrow-round-forward" size={24} color="#444"/>
    } else {
      return <Ionicons name="ios-arrow-round-back" size={24} color="#444"/>
    }
  }

  renderDiscountype = (discountypes) => {
    return discountypes.map((discountype, index) => {
      return(
        <TouchableOpacity onPress={(e) => this.setState({discountypeID: discountype._id, discountypeChild: discountype.child})} key={index} style={{marginRight: 5, marginBottom: 5, paddingVertical: 5, paddingHorizontal: 8, borderRadius: 4, backgroundColor: this.state.discountypeID === discountype._id ? '#ea4c89':'#f6f5f3', alignSelf: 'flex-start'}}>
          <Text style={[common.fontbody, {fontSize: 14, color: this.state.discountypeID === discountype._id ? '#f6f5f3' : '#444'}]}>{discountype.child}</Text>
        </TouchableOpacity>
      )
    })
  }


  render () {
    var { width, height } = Dimensions.get('window');
    return (
      <View style={{flex: 1, flexDirection: 'column', paddingTop: 15}}>
        <View style={{width: '100%', flexDirection: 'row', height: 60}}>
          <View style={{flex: .7, paddingRight: 10}}>
            <TextInput onChangeText={(txt) => this.sethandleInput('discount', txt)} placeholder="Discount 50%" style={[common.fontbody, {borderWidth: 1, borderColor: '#fff',marginBottom: 15, color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#fff', paddingHorizontal: 10}]}/>
          </View>
          <View style={{flex: .3}}>
            <TouchableOpacity onPress={(e) => this.sethandleDiscount()} style={{width: '100%', height: 38, borderRadius: 4, backgroundColor: '#6c7e70', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[common.fontbody, {fontSize: 12, color: '#f6f5f3'}]}>LET'S SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', height: 65, backgroundColor: '#ffffff', marginBottom: 20, borderRadius: 4, paddingVertical: 5, paddingHorizontal: 5}}>
          <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
            { this.renderDiscountype(this.state.discountypes) }
            {
              this.state.discountypeChild === 'limit people' || this.state.discountypeChild === 'purchase quantity' ?
              <TextInput onChangeText={(txt) => this.sethandleInput('quantity', txt)} placeholderTextColor={color='#f6f5f3'} placeholder={`type quantity...`} style={[common.fontbody, {color: '#f6f5f3', width: '40%', height: 24, backgroundColor: '#ea4c89', borderRadius: 4, paddingLeft: 10, paddingVertical: 2}]}/> : null
            }
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
  textDayFontSize: 12,
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
    borderRadius: 4,
    paddingTop: 2,
    marginTop: -2
  },
  text: {
    color: '#f6f5f3'
  }
}

export default compose(
  graphql(DISCOUNT_TYPE, {
    name: 'discountypes',
    options: (props) => ({
      fetchPolicy: 'network-only'
    }),
    props: ({ discountypes: {discountypes}}) => ({ discountypes })
  }),
  graphql(MADE_DISCOUNT, {name: 'madediskon'})
)(MadeDiskon);
