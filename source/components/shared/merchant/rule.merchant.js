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
import { ADD_RULE, DELETE_RULE } from '../../../queries/queryMerchant';
import { FETCH_USER } from '../../../queries/queryUser';


class RuleMerchant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addrules: [],
      savedrules: [],
      rulestatus: true,
    }
  }

  componentDidMount = () => {
    this.setState({
      savedrules: this.props.rules ? this.props.rules : [],
      rulestatus: this.props.rules.length > 0
    })
  }

  closemodal = () => {
    this.props.hidemodalservice();
  }

  addrules = () => {
    this.setState({
      addrules: [...this.state.addrules, ""]
    })
  }

  removefieldrule = (index) => {
    this.state.addrules.splice(index, 1);
    this.setState({
      addrules: this.state.addrules
    })
  }

  addruleschange = (index, value) => {
    this.state.addrules[index] = value;
    this.setState({addrules: this.state.addrules})
  }

  addruleshandle = async() => {
    var addrules = [];
    this.state.addrules.forEach((rule) => {
      addrules.push({child: rule})
    });
    var response = await this.props.addrules({
      variables: {
        userID: this.props.currentuser._id,
        merchantID: this.props.merchantID,
        ruleprop: addrules
      },
      refetchQueries: [{
        query: FETCH_USER,
        variables: {userID: this.props.currentuser._id}
      }]
    });
    var { status, error, rules } = response.data.addrules;
    if(status === true) {
      this.props.rulesfeddback(rules);
      this.setState({
        savedrules: rules,
        rulestatus: true,
        addrules: []
      })
    }
  }

  deleterule = async(ruleID, indexID) => {
    // if(ruleID && indexID) {
      var response = await this.props.ruledelete({
        variables: {
          ruledeleteprop: {
            userID: this.props.currentuser._id,
            merchantID: this.props.merchantID,
            ruleID: ruleID
          }
        },
        refetchQueries: [{
          query: FETCH_USER,
          variables: { userID: this.props.currentuser._id }
        }]
      });
      var { status, error } = response.data.ruledelete;
      if(status === true) {
        this.state.savedrules.splice(indexID, 1);
        this.setState({
          savedrules: this.state.savedrules
        });
      }
    // }
  }

  formsetup = () => {
    return this.state.addrules.map((rule, index) => {
      return (
        <View key={index} style={{width: '100%', height: 50, marginBottom: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: '85%', height: 50}}>
              <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#RULE-0{this.state.savedrules.length + this.state.addrules.length}</Text>
              <TextInput onChangeText={(xtx) => this.addruleschange(index, xtx)} autoCorrect={false} style={[common.fontbody, {color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
            </View>
            <View style={{width: '15%', height: 50, justifyContent: 'flex-end', alignItems: 'flex-end', transform:[{translateY: 7}]}}>
              <TouchableOpacity onPress={(e) => this.removefieldrule(index)} style={{borderRadius: 4,backgroundColor: '#6c7e70',width: 39, height: 37, justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="ios-radio-button-on" size={18} color="#f6f5f3"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    })
  }

  savedrulesetup = () => {
    return this.state.savedrules.map((rule, index) => {
      return (
        <View key={index} style={{width: '100%', height: 40, marginBottom: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: '85%', height: 40}}>
              <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#RULE-0{index + 1}</Text>
              <Text style={[common.fontbody, {color: '#7f8082'}]}>{rule.child}</Text>
            </View>
            <View style={{width: '15%', height: 40, justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={(e) => this.deleterule(rule._id, index)} style={{borderRadius: 4,backgroundColor: 'rgba(255,255,255,0)',width: 39, height: 37, justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="ios-radio-button-on" size={14} color="#6c7e70"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    })
  }

  rulesetup = () => {
    return (
      <View style={{width: '100%', height: 'auto'}}>
        <Text style={[common.fontitle, {fontSize: 12, color: '#444'}]}>EXCHANGE RULES</Text>
        <View style={{width: '100%', height: 45, marginBottom: 10}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .09, justifyContent: 'center'}}>
              <Ionicons name="ios-clipboard" size={24} color="#6c7e70"/>
            </View>
            <View style={{flex: this.state.rulestatus === false ? .61 : .71, justifyContent: 'center'}}>
              <Text style={[common.fontbody, { color: '#444'}]}>Set Rules</Text>
              <Text style={[common.fontbody, { color: '#7f8082'}]}>Makes easy to exchange coupon</Text>
            </View>
            <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
              <TouchableOpacity onPress={(e) => this.setState({rulestatus: !this.state.rulestatus})} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Ionicons name="ios-repeat" size={24} color="#6c7e70"/>
              </TouchableOpacity>
            </View>
              {
                this.state.rulestatus === false ?
                <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
                  <TouchableOpacity onPress={(e) => this.addruleshandle()} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
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
            this.state.rulestatus === false && this.state.savedrules.length + this.state.addrules.length < 4 ?
            <View style={{width: '100%', height: 26, marginBottom: 20}}>
              <TouchableOpacity onPress={(e) => this.addrules()} style={{width: '25%', height: 26, backgroundColor: '#6c7e70', borderRadius: 4, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={[common.fontitle, {fontSize: 10,color: '#f6f5f3'}]}>NEW FIELD</Text>
              </TouchableOpacity>
            </View> : null
          }
          <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
            { this.state.rulestatus === true ? this.savedrulesetup() : this.formsetup() }
          </View>
        </View>
      </View>
    )
  }
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', paddingHorizontal: 20}}>
        { this.rulesetup() }
      </View>
    )
  }
}

export default compose(
  graphql(ADD_RULE, {name: 'addrules'}),
  graphql(DELETE_RULE, {name: 'ruledelete'})
)(RuleMerchant);
