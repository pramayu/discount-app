import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, TouchableHighlight,
  TextInput, Dimensions, KeyboardAvoidingView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { graphql, compose } from 'react-apollo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  common
} from '../../../assets/stylesheets/common';
import Loading from '../loading';
import { CURRENT_USER, FETCH_USER } from '../../../queries/queryUser';
import { BASIC_UPDATE_MERCHANT } from '../../../queries/queryMerchant';

class ShopSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      merchantID: '',
      name: '',
      phone: '',
      sosmed: '',
      description: '',
      current_user: '',
      fetchstatus: false
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      current_user: nextProps.current_user ? nextProps.current_user : ''
    });
  }

  componentDidMount = () => {
    var { merchant } = this.props.navigation.state.params;
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#f6f5f3');
    });
    this.setState({
      merchantID: merchant._id ? merchant._id : '',
      name: merchant.name ? merchant.name : '',
      phone: merchant.phone ? merchant.phone : '',
      sosmed: merchant.sosmed ? merchant.sosmed : '',
      description: merchant.description ? merchant.description : '',
    });
  }

  componentWillUnmount = () => {
    this._navListener.remove();
  }

  changebasicupdatemerchant = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  handlebasicupdatemerchant = async() => {
    this.setState({ fetchstatus: true });
    var response = await this.props.basicupdatemerchant({
      variables: {
        basicupdateprop: {
          merchantID: this.state.merchantID,
          userID: this.state.current_user._id,
          name: this.state.name,
          phone: this.state.phone,
          sosmed: this.state.sosmed,
          description: this.state.description
        }
      },
        refetchQueries: [{
          query: FETCH_USER,
          variables: { userID: this.state.current_user._id }
        }]
    });
    var { status, error } = response.data.basicupdatemerchant;
    if(status === true) {
      this.setState({ fetchstatus: false });
    }
  }

  render() {
    var { width, height } = Dimensions.get('window');
    if(this.state.fetchstatus === true) {
      return <Loading />
    }
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
        <View style={{height: 50, width: width, paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex:.3, justifyContent:'center'}}>
              <TouchableOpacity onPress={(e) => this.props.navigation.goBack()}>
                <Ionicons name="ios-arrow-round-back" size={28} color="#444"/>
              </TouchableOpacity>
            </View>
            <View style={{flex:.7, justifyContent:'center', alignItems: 'flex-end'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{ width: '95%', height: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
                  <TouchableOpacity onPress={(e) => this.handlebasicupdatemerchant()}>
                    <Text style={[common.fontbody, { color: '#444'}]}>Save Update.</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        <KeyboardAvoidingView style={{height: height / 4.2, width: width, paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .4, paddingTop: 10, alignItems: 'center'}}>
              <View style={{width: 110, height: 110}}>
                <View style={{backgroundColor: '#6c7e70',borderRadius: 80, width: '100%', height: '100%', alignItems: 'center',justifyContent: 'center'}}>
                  <MaterialIcons name="landscape" color="#f6f5f3" size={64}/>
                </View>
                <TouchableOpacity style={{justifyContent:"center", alignItems: 'center',position: 'absolute', width: '100%', height: '100%', borderRadius: 100, borderWidth: 1, borderColor: '#6c7e70', backgroundColor: 'rgba(0,0,0,.1)'}}>
                  <Ionicons name="ios-camera" size={32} color="rgba(255,255,255,.5)"/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: .6, paddingLeft: 10, paddingTop: 10}}>
              <TextInput onChangeText={(txt) => this.changebasicupdatemerchant('name', txt)} value={this.state.name} autoCorrect={false} placeholderTextColor="#7f8082" placeholder="Merchant name" style={[common.field, common.fontbody, {height: 24, letterSpacing: 0, paddingVertical: 0, marginBottom: 0}]}/>
              <TextInput onChangeText={(txt) => this.changebasicupdatemerchant('phone', txt)} value={this.state.phone} autoCorrect={false} placeholderTextColor="#7f8082" placeholder="Phone" style={[common.field, common.fontbody, {height: 24, letterSpacing: 0, paddingVertical: 0, marginBottom: 0}]}/>
              <TextInput onChangeText={(txt) => this.changebasicupdatemerchant('sosmed', txt)} value={this.state.sosmed} autoCorrect={false} placeholderTextColor="#7f8082" placeholder="Sosmed" style={[common.field, common.fontbody, {height: 24, letterSpacing: 0, paddingVertical: 0, marginBottom: 5}]}/>
              <TextInput onChangeText={(txt) => this.changebasicupdatemerchant('description', txt)} value={this.state.description} multiline={true} autoCorrect={false} placeholderTextColor="#7f8082" placeholder="Description" style={[common.field, common.fontbody, {paddingVertical: 5,textAlignVertical: 'top', height: 50, letterSpacing: 0, paddingVertical: 0, marginBottom: 0}]}/>
            </View>
          </View>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{flex: .61}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: .07, paddingHorizontal: 20}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: .08, justifyContent: 'center', alignItems: 'flex-start'}}>
                  <Ionicons name="ios-git-merge" size={22} color="#6c7e70"/>
                </View>
                <View style={{flex: .92, justifyContent: 'center', alignItems: 'flex-start'}}>
                  <Text style={[common.fontitle,{color: '#444', fontSize: 13}]}>Customize Merchant</Text>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}


export default compose(
  graphql(CURRENT_USER, {
    name: 'current_user',
    options: (ownProps) => ({
      fetchPolicy: 'network-only'
    }),
    props: ({ current_user: { current_user }}) => ({ current_user })
  }),
  graphql(BASIC_UPDATE_MERCHANT, { name: 'basicupdatemerchant' })
)(ShopSetting);
