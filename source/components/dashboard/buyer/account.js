import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Image,
  TouchableHighlight, Animated
} from 'react-native';
import { compose, graphql, Query } from 'react-apollo';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  common
} from '../../../assets/stylesheets/common';
import {
  CURRENT_USER, FETCH_USER, CHANGE_USER_TYPE
} from '../../../queries/queryUser';



class AccountBuyer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stuffs: [],
      current_user: '',
      modalstatus: false,
      errors: {}
    }
    this.showmodal = new Animated.Value(0);
    this.hidemodal = new Animated.Value(0);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      current_user: nextProps.current_user ? nextProps.current_user : ''
    })
  }

  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#6c7e70');
    })
  }

  componentWillUnmount = () => {
    this._navListener.remove();
  }

  userlogout = async() => {
    await AsyncStorage.removeItem('token');
    this.props.navigation.navigate('CheckToken');
  }

  changeusertype = async() => {
    var response = await this.props.changeusertype({
      variables: {
        userID: this.state.current_user._id,
        usertype: 'merchant'
      }
    });
    var { status, error, token } = response.data.changeusertype;
    if(status === true) {
      await AsyncStorage.setItem('token', token);
      this.props.navigation.navigate('CheckToken');
    } else if (status === false) {
      var errors = {};
      errors[`${error[0].path}`] = `${error[0].message}`
      this.setState({
        errors: errors
      });
    }
  }

  toshowmodal = () => {
    Animated.timing(this.showmodal, {
      toValue: 2,
      duration: 800
    }).start(() => {
      this.hidemodal.setValue(0);
      this.setState({ modalstatus: true });
    })
  }

  tohidemodal = () => {
    Animated.timing(this.hidemodal, {
      toValue: 2,
      duration: 800
    }).start(() => {
      this.showmodal.setValue(0);
      this.setState({ modalstatus: false });
    })
  }


  render() {
    var { width, height } = Dimensions.get('window');
    showmodalsty = this.showmodal.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [height, -20, 0]
    });
    hidemodalsty = this.hidemodal.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -20, height]
    });
    if(this.state.current_user) {
      return (
        <Query query={FETCH_USER} variables={{userID: this.state.current_user._id}}>
          {({ loading, error, data }) => {
            if(loading || data.user.status === false) {
              return (
                <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
                  <View style={{width: '100%', height: height / 2.5, backgroundColor: '#6c7e70', borderBottomRightRadius: 70}}></View>
                  <View style={{width: '100%', height: 'auto', paddingHorizontal: 20, paddingTop: 35}}></View>
                </View>
              )
            }
            return (
              <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
                <View style={{width: '100%', height: height / 2.5, backgroundColor: '#6c7e70', borderBottomRightRadius: 70}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: .12, width: '100%'}}>
                      <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 20, height: '100%'}}>
                        <View style={{flex: .2, justifyContent: 'flex-end'}}>
                          <TouchableOpacity onPress={(e) => this.props.navigation.navigate('SettingUser', {user: data.user.user})} style={{height: '100%', justifyContent: 'center'}}>
                            <Ionicons name="ios-cog" size={26} color="#f6f5f3"/>
                          </TouchableOpacity>
                        </View>
                        <View style={{flex: .6, justifyContent: 'center', alignItems: 'center'}}>
                          <Text style={[common.fontbody, { color: '#f6f5f3', letterSpacing: .5}]}>@{data.user.user.username}</Text>
                        </View>
                        <View style={{flex: .2, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                          <TouchableOpacity onPress={(e) => this.userlogout()} tyle={{height: '100%', justifyContent: 'center'}}>
                            <Ionicons name="ios-power" size={22} color="#f6f5f3"/>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View style={{flex: .88, width: '100%'}}>
                      <View style={{width: '100%', alignItems: 'center', height: '85%', justifyContent: 'center'}}>
                        <View style={{backgroundColor: '#f6f5f3',borderRadius: 80, width: 110, height: 110, alignItems: 'center',justifyContent: 'center'}}>
                          {
                            data.user.user.photos.length > 0 ?
                            <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 80, borderWidth: 1, borderColor: '#444'}} source={{uri: data.user.user.photos[0].secureUrl}}/> :
                            <MaterialIcons name="landscape" color="#6c7e70" size={64}/>
                          }
                        </View>
                        <Text style={[common.fontitle, { color: '#f6f5f3', marginTop: 15}]}>
                          { data.user.user.fullname ? data.user.user.fullname : 'Update Fullname'}
                        </Text>
                        <Text style={[common.fontbody, { color: '#f6f5f3', marginTop: 8}]}>
                          { data.user.user.address ? data.user.user.address : 'Update Address'}
                        </Text>
                      </View>
                      <View style={{zIndex: 10, width: '100%', height: '15%', paddingHorizontal: 20, transform: [{translateY: 15}]}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <View style={{width: '20%'}}>
                            <TouchableHighlight onPress={(e) => this.toshowmodal()} style={{borderWidth: 1, borderColor: '#f6f5f3',width: 42, height: 42, justifyContent: 'center', alignItems: 'center', borderRadius: 40, backgroundColor: '#444'}}>
                              <Ionicons name="ios-flash" size={22} color="#f6f5f3"/>
                            </TouchableHighlight>
                          </View>
                          <View style={{width: '20%'}}>
                            <TouchableHighlight style={{borderWidth: 1, borderColor: '#f6f5f3',width: 42, height: 42, justifyContent: 'center', alignItems: 'center', borderRadius: 40, backgroundColor: '#444'}}>
                              <Ionicons name="ios-card" size={22} color="#f6f5f3"/>
                            </TouchableHighlight>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{width: '100%', height: 'auto', paddingHorizontal: 20, paddingTop: 35}}>
                  <View style={{width: '100%', alignItems: 'center'}}>
                    <Text style={[common.fontitle, {color: '#444'}]}>Recent from Following</Text>
                  </View>
                  <View style={{width: '100%', alignItems: 'center', paddingHorizontal: '17%', paddingVertical: 5}}>
                    <Text style={[common.fontbody, {color: '#7f8082', textAlign: 'center'}]}>These are all discount stuffs from the merchant you following.</Text>
                  </View>
                  <View style={{width: '100%', paddingTop: 15}}>
                    <View style={{flex: 1, flexDirection: 'row', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                      <View style={{width: '32%', height: 110, marginBottom: 7}}>
                        <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 4}} source={{uri: 'https://images.unsplash.com/photo-1514952902821-eaf63e66c12e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}}/>
                        <TouchableOpacity style={{width: '100%',height: '100%', position: 'absolute', backgroundColor: 'rgba(246, 245, 243,.3)', borderRadius: 4}}></TouchableOpacity>
                      </View>
                      <View style={{width: '32%', height: 110, marginBottom: 7}}>
                        <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 4}} source={{uri: 'https://images.unsplash.com/photo-1552611052-33e04de081de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}}/>
                        <TouchableOpacity style={{width: '100%',height: '100%', position: 'absolute', backgroundColor: 'rgba(246, 245, 243,.3)', borderRadius: 4}}></TouchableOpacity>
                      </View>
                      <View style={{width: '32%', height: 110, marginBottom: 7}}>
                        <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 4}} source={{uri: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}}/>
                        <TouchableOpacity style={{width: '100%',height: '100%', position: 'absolute', backgroundColor: 'rgba(246, 245, 243,.3)', borderRadius: 4}}></TouchableOpacity>
                      </View>
                      <View style={{width: '32%', height: 110, marginBottom: 7}}>
                        <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 4}} source={{uri: 'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}}/>
                        <TouchableOpacity style={{width: '100%',height: '100%', position: 'absolute', backgroundColor: 'rgba(246, 245, 243,.3)', borderRadius: 4}}></TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <Animated.View style={{transform: [{translateY: this.state.modalstatus === false ? showmodalsty : hidemodalsty}],position: 'absolute', width: width, height: height, paddingHorizontal: 50, justifyContent: 'flex-start', paddingTop: 70}}>
                  <View style={{width: '100%', height: 220, backgroundColor: '#f6f5f3', borderRadius: 4, elevation: 50}}>
                    <View style={{flex: 1}}>
                      <View style={{width: '100%', height: 40, paddingHorizontal: 10}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <View style={{flex: .7, justifyContent: 'center'}}>
                            <Text style={[common.fontitle, {fontSize: 12, color: '#444'}]}>Create Merchant.</Text>
                          </View>
                          <View style={{flex: .3, justifyContent: 'center', alignItems: 'flex-end'}}>
                            <TouchableOpacity onPress={(e) => this.tohidemodal()}>
                              <Ionicons name="ios-close-circle-outline" size={24} color="#7f8082"/>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                      <View style={{width: '100%', alignItems: 'center', paddingTop: 10}}>
                        <Ionicons name="ios-repeat" size={50} color="#7f8082"/>
                      </View>
                      <View style={{width: '100%', alignItems: 'center', paddingTop: 15, paddingHorizontal: 40}}>
                        <Text style={[common.fontbody, {color: '#444', textAlign: 'center'}]}>Create e merchant and promote your shop and stuffs.</Text>
                        <TouchableOpacity onPress={(e) => this.changeusertype()} style={{marginTop: 20, height: 34, width: '100%', backgroundColor: '#6c7e70', borderRadius: 80, justifyContent: 'center', alignItems: 'center'}}>
                          <Text style={[common.fontbody, { color: '#f6f5f3'}]}>Got It</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Animated.View>
              </View>
            )
          }}
        </Query>
      )
    } else {
      return (
        <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
          <View style={{width: '100%', height: height / 2.5, backgroundColor: '#6c7e70', borderBottomRightRadius: 70}}></View>
          <View style={{width: '100%', height: 'auto', paddingHorizontal: 20, paddingTop: 35}}></View>
        </View>
      )
    }
  }
}

export default compose(
  graphql(CURRENT_USER, {
    name: 'current_user',
    props: ({ current_user: { current_user }}) => ({ current_user }),
    options: (ownProps) => ({
      fetchPolicy: 'network-only'
    })
  }),
  graphql(CHANGE_USER_TYPE, { name: 'changeusertype' })
)(AccountBuyer);
