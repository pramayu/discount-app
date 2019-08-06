import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, TouchableHighlight,
  TextInput, Dimensions, KeyboardAvoidingView,
  Animated, Image
} from 'react-native';
import _ from 'lodash';
import { graphql, compose } from 'react-apollo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  common
} from '../../../assets/stylesheets/common';


class CategoriMerchant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      niches: []
    }
  }

  componentDidMount = () => {
    this.setState({
      niches: this.props.niches ? this.props.niches : []
    })
  }

  closemodal = () => {
    this.props.hidemodalservice();
  }

  nichesloop = () => {
    return this.state.niches.map((niche, index) => {
      return (
        <TouchableOpacity key={index} style={{marginBottom: 6, marginLeft: 3, marginRight: 3, borderWidth: 1, borderColor: 'rgba(255,255,255,.7)',width: '22%', height: 40, borderRadius: 4, backgroundColor: 'rgba(255,255,255,.5)', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[common.fontitle, {color: '#444', fontSize: 12}]}>{niche.child.toUpperCase()}</Text>
        </TouchableOpacity>
      )
    })
  }

  categorisetup = () => {
    return (
      <View style={{width: '100%', height: 'auto'}}>
        <Text style={[common.fontitle, {fontSize: 12, color: '#444'}]}>MERCHANT TYPE</Text>
        <View style={{width: '100%', height: 45, marginBottom: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .09, justifyContent: 'center'}}>
              <Ionicons name="ios-pin" size={24} color="#6c7e70"/>
            </View>
            <View style={{flex: .71, justifyContent: 'center'}}>
              <Text style={[common.fontbody, { color: '#444'}]}>Categori</Text>
              <Text style={[common.fontbody, { color: '#7f8082'}]}>Choose the type of stuff you sell</Text>
            </View>
            <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
              <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Ionicons name="ios-checkmark" size={28} color="#6c7e70"/>
              </TouchableOpacity>
            </View>
            <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
              <TouchableOpacity onPress={(e) => this.closemodal()} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Ionicons name="ios-arrow-round-back" size={28} color="#6c7e70"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{width: '100%', height: 'auto'}}>
          <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
            { this.nichesloop() }
          </View>
        </View>
      </View>
    )
  }
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', paddingHorizontal: 20}}>
        { this.categorisetup() }
      </View>
    )
  }
}


export default CategoriMerchant;
