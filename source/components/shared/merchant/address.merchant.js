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
import { ADDRESS_UPDATE_MERCHANT, DELETE_ADDRESS } from '../../../queries/queryMerchant';
import { FETCH_USER } from '../../../queries/queryUser';



class AddressMerchant extends Component {

  constructor(props) {
    super(props)
    this.state = {
      latitude: '',
      longitude: '',
      province: '',
      distric: '',
      address: '',
      locationID: '',
      fetchstatus: false,
      addlocation: false,
      indexID: '',
      location: [],
      errorcoordinate: ''
    }
  }

  componentDidMount = () => {
    this.setState({
      location: this.props.location ? this.props.location : []
    })
  }

  componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.watchID);
  }

  closemodal = () => {
    this.props.hidemodalservice();
    this.setState({
      addlocation: false,
      locationID: '',
      indexID: '',
      address: '',
      distric: '',
      province: '',
      latitude: '',
      longitude: '',
    });
  }

  getcoordinate = () => {
    this.setState({ fetchstatus: true })
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        latitude: position.coords.latitude.toString(),
        longitude: position.coords.longitude.toString(),
        fetchstatus: position ? false : true,
        errorcoordinate: ''
      })
    }, error => {
      if(error) {
        this.setState({errorcoordinate: 'Activate your phone GPS'})
      }
    });
  }

  addressonchange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  handleservicemerchant = async() => {
    var response = await this.props.addressupdatemerchant({
      variables: {
        addressupdateprop: {
          merchantID    : this.props.merchantID,
          userID        : this.props.currentuser._id,
          locationID    : this.state.locationID ? this.state.locationID : '',
          indexID       : this.state.indexID ? this.state.indexID : '',
          address       : this.state.address,
          distric       : this.state.distric,
          province      : this.state.province,
          latitude      : this.state.latitude,
          longitude     : this.state.longitude
        }
      },
      refetchQueries: [{
        query: FETCH_USER,
        variables: {userID: this.props.currentuser._id}
      }]
    });
    var { status, error, location } = response.data.addressupdatemerchant;
    if(status === true) {
      if(this.state.indexID.length > 0) {
        this.state.location.splice(this.state.indexID, 1);
        var updated = _.filter(location, (loc) => {
          return loc._id === this.state.locationID
        });
        this.state.location.push(updated[0]);
      } else {
        this.state.location.push(location[0]);
      }
      this.setState({
        addlocation: false,
        latitude: '',
        longitude: '',
        address: '',
        distric: '',
        province: '',
      });
    }
  }

  deleteaddress = async() => {
    var response = await this.props.addressdelete({
      variables: {
        addressdeleteprop: {
          userID      : this.props.currentuser._id,
          merchantID  : this.props.merchantID,
          locationID  : this.state.locationID ? this.state.locationID : '',
          indexID     : this.state.indexID
        }
      },
      refetchQueries: [{
        query: FETCH_USER,
        variables: {userID: this.props.currentuser._id}
      }]
    });
    var {status, error} = response.data.addressdelete;
    if(status === true) {
      this.state.location.splice(this.state.indexID, 1);
      this.setState({
        addlocation: false,
        location: this.state.location,
        locationID: '',
        indexID: '',
        address: '',
        distric: '',
        province: '',
        latitude: '',
        longitude: '',
      });
    }
  }

  setaddressupdate = (loc_id, indexID) => {
    var location = _.filter(this.state.location, (location) => {
      return location._id === loc_id
    });
    if(location) {
      this.setState({
        locationID    : location[0]._id,
        address       : location[0].address,
        distric       : location[0].distric,
        province      : location[0].province,
        // latitude      : location[0].coordinate[0].latitude,
        // longitude     : location[0].coordinate[0].longitude,
        indexID       : indexID.toString(),
        addlocation   : true
      });
    }
  }

  locationform = () => {
    return (
      <View>
        <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#Full Address</Text>
        <TextInput value={this.state.address} onChangeText={(txt) => this.addressonchange('address',txt)} autoCorrect={false} multiline={true} style={[common.fontbody, {marginBottom: 15, color: '#444',textAlignVertical: 'top',width: '100%', height: 65, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10, paddingVertical: 10, lineHeight: 22}]}/>
        <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#Distric</Text>
        <TextInput value={this.state.distric} onChangeText={(txt) => this.addressonchange('distric',txt)} autoCorrect={false} style={[common.fontbody, {marginBottom: 15, color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
        <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#Province</Text>
        <TextInput value={this.state.province} onChangeText={(txt) => this.addressonchange('province',txt)} autoCorrect={false} style={[common.fontbody, {marginBottom: 15, color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
        {
          this.state.locationID.length === 0 ?
          <View style={{width: '100%', height: 50}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{width: '43%', justifyContent: 'center', paddingRight: 5}}>
                <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#Latitude</Text>
                <TextInput value={this.state.latitude} onChangeText={(txt) => this.addressonchange('latitude',txt)} autoCorrect={false} style={[common.fontbody, {color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
              </View>
              <View style={{width: '43%', justifyContent: 'center', paddingRight: 5}}>
                <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#Longitude</Text>
                <TextInput value={this.state.longitude} onChangeText={(txt) => this.addressonchange('longitude',txt)} autoCorrect={false} style={[common.fontbody, {color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
              </View>
              <View style={{width: '14%', justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 5}]}></Text>
                <TouchableOpacity onPress={(e) => this.getcoordinate()} style={{borderRadius: 4,backgroundColor: '#6c7e70',width: 39, height: 37, justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons name="ios-pin" size={24} color="#f6f5f3"/>
                </TouchableOpacity>
              </View>
            </View>
          </View> : null
        }
      </View>
    )
  }

  locationloop = () => {
    return this.state.location.map((loc, index) => {
      return (
        <TouchableOpacity key={index} onPress={(e) => this.setaddressupdate(loc._id, index)} style={{marginBottom: 6, marginLeft: 3, marginRight: 3, borderWidth: 1, borderColor: 'rgba(255,255,255,.7)',width: '22%', height: 40, borderRadius: 4, backgroundColor: 'rgba(255,255,255,.5)', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[common.fontitle, {color: '#444', fontSize: 12}]}>LOC-0{index+1}</Text>
        </TouchableOpacity>
      )
    })
  }

  locationdisplay = () => {
    return(
      <View style={{width: '100%', height: 'auto'}}>
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          <TouchableOpacity onPress={(e) => this.setState({addlocation: true})} style={{marginBottom: 6, arginLeft: 3, marginRight: 3, borderWidth: 1, borderColor: 'rgba(255,255,255,.7)',width: '22%', height: 40, borderRadius: 4, backgroundColor: 'rgba(255,255,255,.5)', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[common.fontitle, {color: '#444', fontSize: 12}]}>CREATE NEW</Text>
          </TouchableOpacity>
          { this.locationloop() }
        </View>
      </View>
    )
  }

  locationsetup = () => {
    return (
      <View style={{width: '100%', height: 'auto'}}>
        <Text style={[common.fontitle, {fontSize: 12, color: '#444'}]}>MERCHANT LOCATION</Text>
        <View style={{width: '100%', height: 45, marginBottom: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .09, justifyContent: 'center'}}>
              <Ionicons name="ios-pin" size={24} color="#6c7e70"/>
            </View>
            <View style={{flex: .61, justifyContent: 'center'}}>
              <Text style={[common.fontbody, { color: '#444'}]}>Share Location</Text>
              <Text style={[common.fontbody, { color: '#7f8082'}]}>For ease of finding your store</Text>
            </View>
            <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
              {
                this.state.locationID ?
                <TouchableOpacity onPress={(e) => this.deleteaddress()} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Ionicons name="ios-close" size={28} color="#6c7e70"/>
                </TouchableOpacity> : null
              }
            </View>
            <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
              {
                this.state.addlocation === true ?
                <TouchableOpacity onPress={(e) => this.handleservicemerchant()} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Ionicons name="ios-checkmark" size={28} color="#6c7e70"/>
                </TouchableOpacity> : null
              }
            </View>
            <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
              <TouchableOpacity onPress={(e) => this.closemodal()} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Ionicons name="ios-arrow-round-forward" size={28} color="#6c7e70"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        { this.state.addlocation === true ? this.locationform() : this.locationdisplay() }
      </View>
    )
  }

  render () {
    var { width, height } = Dimensions.get('window');
    if(this.state.fetchstatus === true || this.state.errorcoordinate.length > 0) {
      return (
        <View style={{flex: 1, flexDirection: 'column', paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center'}}>
          <MaterialIcons name="landscape" color="#444" size={72}/>
          <Text style={{transform: [{translateY: -20}],margin: 0,fontSize: 22, color: '#444', letterSpacing: 3, fontFamily: 'Oswald'}}>POCENI</Text>
          {
            this.state.errorcoordinate.length > 0 ?
            <View style={{width: '100%', marginTop: 10, alignItems: 'center'}}>
              <Text style={[common.fontbody,{ color: '#444', marginBottom: 10}]}>{this.state.errorcoordinate}</Text>
              <TouchableOpacity onPress={(e) => this.getcoordinate()} style={{width: '35%', height: 32, borderRadius: 4, backgroundColor: '#444', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[common.fontbody,{ color: '#f6f5f3'}]}>Refresh</Text>
              </TouchableOpacity>
            </View> : null
          }
        </View>
      )
    }
    return (
      <View style={{flex: 1, flexDirection: 'column', paddingHorizontal: 20}}>
        { this.locationsetup() }
      </View>
    )
  }
}

export default compose(
  graphql(ADDRESS_UPDATE_MERCHANT, {name: 'addressupdatemerchant'}),
  graphql(DELETE_ADDRESS, {name: 'addressdelete'})
)(AddressMerchant);
