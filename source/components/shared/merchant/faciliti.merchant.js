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
import {
  common
} from '../../../assets/stylesheets/common';
import { ADD_FACILITI, DELETE_FACILITI } from '../../../queries/queryMerchant';
import { FETCH_USER } from '../../../queries/queryUser';


class FacilitiMerchant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addfaciliti: [],
      savedfaciliti: [],
      facilitistatus: true
    }
  }

  componentDidMount = () => {
    this.setState({
      savedfaciliti: this.props.facilities ? this.props.facilities : []
    })
  }

  closemodal = () => {
    this.props.hidemodalservice();
  }

  addfaciliti = () => {
    this.setState({
      addfaciliti: [...this.state.addfaciliti, ""]
    })
  }

  removefieldfaciliti = (indexID) => {
    this.state.addfaciliti.splice(indexID, 1);
    this.setState({
      addfaciliti: this.state.addfaciliti
    });
  }

  addfacilitichange = (index, value) => {
    this.state.addfaciliti[index] = value;
    this.setState({addfaciliti: this.state.addfaciliti})
  }

  handleaddfaciliti = async() => {
    var addfaciliti = [];
    this.state.addfaciliti.forEach((faciliti) => {
      addfaciliti.push({child: faciliti})
    });
    var response = await this.props.addfaciliti({
      variables: {
        userID: this.props.currentuser._id,
        merchantID: this.props.merchantID,
        facilitiprop: addfaciliti
      },
      refetchQueries: [{
        query: FETCH_USER,
        variables: { userID: this.props.currentuser._id }
      }]
    });
    var { status, error, facilities } = response.data.addfaciliti;
    if(status === true) {
      this.props.facilitiesfeedback(facilities);
      this.setState({
        facilitistatus: true,
        addfaciliti: [],
        savedfaciliti: facilities
      })
    }
  }

  deletefaciliti = async(facilitiID, indexID) => {
    var response = await this.props.deletefaciliti({
      variables: {
        facilitideleteprop: {
          userID: this.props.currentuser._id,
          merchantID: this.props.merchantID,
          facilitiID: facilitiID
        }
      },
      refetchQueries: [{
        query: FETCH_USER,
        variables: { userID: this.props.currentuser._id }
      }]
    });
    var { status, error } = response.data.deletefaciliti;
    if(status === true) {
      this.state.savedfaciliti.splice(indexID, 1);
      this.setState({
        savedrules: this.state.savedfaciliti
      });
    }
  }

  formfaciliti = () => {
    return this.state.addfaciliti.map((faciliti, index) => {
      return (
        <View key={index} style={{width: '100%', height: 50, marginBottom: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: '85%', height: 50}}>
              <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#FACILITI-0{this.state.savedfaciliti.length + index + 1}</Text>
              <TextInput onChangeText={(xtx) => this.addfacilitichange(index, xtx)} autoCorrect={false} style={[common.fontbody, {color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
            </View>
            <View style={{width: '15%', height: 50, justifyContent: 'flex-end', alignItems: 'flex-end', transform:[{translateY: 7}]}}>
              <TouchableOpacity onPress={(e) => this.removefieldfaciliti(index)} style={{borderRadius: 4,backgroundColor: '#6c7e70',width: 39, height: 37, justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="ios-radio-button-on" size={18} color="#f6f5f3"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    })
  }

  savedfacilitisetup = () => {
    return this.state.savedfaciliti.map((faciliti, index) => {
      return (
        <View key={index} style={{width: '100%', height: 40, marginBottom: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: '85%', height: 40}}>
              <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#FACILITI-0{index + 1}</Text>
              <Text style={[common.fontbody, {color: '#7f8082'}]}>{faciliti.child}</Text>
            </View>
            <View style={{width: '15%', height: 40, justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={(e) => this.deletefaciliti(faciliti._id, index)} style={{borderRadius: 4,backgroundColor: 'rgba(255,255,255,0)',width: 39, height: 37, justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="ios-radio-button-on" size={14} color="#6c7e70"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    })
  }

  facilitisetup = () => {
    return (
      <View style={{width: '100%', height: 'auto'}}>
        <Text style={[common.fontitle, {fontSize: 12, color: '#444'}]}>WHAT THEY GOT?</Text>
        <View style={{width: '100%', height: 45, marginBottom: 10}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .09, justifyContent: 'center'}}>
              <Ionicons name="ios-radio" size={24} color="#6c7e70"/>
            </View>
            <View style={{flex: this.state.facilitistatus === false ? .61 : .71, justifyContent: 'center'}}>
              <Text style={[common.fontbody, { color: '#444'}]}>Facilities</Text>
              <Text style={[common.fontbody, { color: '#7f8082'}]}>Customers additional service</Text>
            </View>
            <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
              <TouchableOpacity onPress={(e) => this.setState({facilitistatus: !this.state.facilitistatus})} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Ionicons name="ios-repeat" size={24} color="#6c7e70"/>
              </TouchableOpacity>
            </View>
              {
                this.state.facilitistatus === false ?
                <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
                  <TouchableOpacity onPress={(e) => this.handleaddfaciliti()} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Ionicons name="ios-checkmark" size={28} color="#6c7e70"/>
                  </TouchableOpacity>
                </View> : null
              }
            <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
              <TouchableOpacity onPress={(e) => this.closemodal()} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Ionicons name="ios-arrow-round-back" size={28} color="#6c7e70"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{width: '100%', height: 'auto', marginTop: 10}}>
          {
            this.state.facilitistatus === false && this.state.savedfaciliti.length + this.state.addfaciliti.length < 4 ?
            <View style={{width: '100%', height: 26, marginBottom: 20}}>
              <TouchableOpacity onPress={(e) => this.addfaciliti()} style={{width: '25%', height: 26, backgroundColor: '#6c7e70', borderRadius: 4, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={[common.fontitle, {fontSize: 10,color: '#f6f5f3'}]}>NEW FIELD</Text>
              </TouchableOpacity>
            </View> : null
          }
          <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
            { this.state.facilitistatus === true ? this.savedfacilitisetup() : this.formfaciliti() }
          </View>
        </View>
      </View>
    )
  }

  render() {
    return(
      <View style={{flex: 1, flexDirection: 'column', paddingHorizontal: 20}}>
        { this.facilitisetup() }
      </View>
    )
  }
}


export default compose(
  graphql(ADD_FACILITI, {name: 'addfaciliti'}),
  graphql(DELETE_FACILITI, {name: 'deletefaciliti'})
)(FacilitiMerchant);
