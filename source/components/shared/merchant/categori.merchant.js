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
import { FETCH_USER } from '../../../queries/queryUser';
import { CHOOSE_CATEGORI } from '../../../queries/queryMerchant';


class CategoriMerchant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      niches: [],
      nicheID: ''
    }
  }

  componentDidMount = () => {
    this.setState({
      niches: this.props.niches ? this.props.niches : [],
      nicheID: this.props.nicheID ? this.props.nicheID : ''
    })
  }

  closemodal = () => {
    this.props.hidemodalservice();
  }

  chooseniche = (_id) => {
    this.setState({nicheID: _id})
  }

  handlechoosecategori = async(nicheID) => {
    if(nicheID) {
      var response = await this.props.choosecategori({
        variables: {
          categoriprop: {
            userID: this.props.currentuser._id,
            merchantID: this.props.merchantID,
            nicheID: nicheID
          }
        },
        refetchQueries: [{
          query: FETCH_USER,
          variables: { userID: this.props.currentuser._id}
        }]
      });
      var { status, error } = response.data.choosecategori;
      if(status === true) {
        this.props.nicheIDfeedback(nicheID);
        this.closemodal()
      }
    }
  }

  nichesloop = () => {
    return this.state.niches.map((niche, index) => {
      return (
        <TouchableOpacity onPress={(e) => this.chooseniche(niche._id)} key={index} style={{marginBottom: 6, marginLeft: 3, marginRight: 3, borderWidth: 1, borderColor: 'rgba(255,255,255,.7)',width: '22%', height: 40, borderRadius: 4, backgroundColor: this.state.nicheID !== niche._id ? 'rgba(255,255,255,.5)' : '#6c7e70', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[common.fontitle, {color: this.state.nicheID !== niche._id ? '#444' : '#f6f5f3', fontSize: 12}]}>{niche.child.toUpperCase()}</Text>
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
              <Ionicons name="ios-locate" size={24} color="#6c7e70"/>
            </View>
            <View style={{flex: .71, justifyContent: 'center'}}>
              <Text style={[common.fontbody, { color: '#444'}]}>Categori</Text>
              <Text style={[common.fontbody, { color: '#7f8082'}]}>Choose the type of stuff you sell</Text>
            </View>
            <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
              <TouchableOpacity onPress={(e) => this.handlechoosecategori(this.state.nicheID)} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Ionicons name="ios-checkmark" size={28} color="#6c7e70"/>
              </TouchableOpacity>
            </View>
            <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
              <TouchableOpacity onPress={(e) => this.closemodal()} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Ionicons name="ios-arrow-round-forward" size={28} color="#6c7e70"/>
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


export default compose(
  graphql(CHOOSE_CATEGORI, { name: 'choosecategori' })
)(CategoriMerchant);
