import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, TouchableHighlight,
  Dimensions, Image, Animated
} from 'react-native';
import { graphql, compose, Query } from 'react-apollo';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {
  common
} from '../../../assets/stylesheets/common';
import {
  CURRENT_USER, FETCH_USER
} from '../../../queries/queryUser';
import Loading from '../../shared/loading';
import { firstlook } from '../../shared/sharedaction';

class Shop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current_user: '',
      opaciti: new Animated.Value(0)
    }
    this.firstLook = new Animated.Value(0)
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      current_user: nextProps.current_user ? nextProps.current_user : ''
    })
  }

  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#f6f5f3');
    }),
    firstlook(this.firstLook, this.state.opaciti)
  }

  componentWillUnmount = () => {
    this._navListener.remove();
  }

  mainScreen = (user) => {
    var firstLookSty = this.firstLook.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0]
    });
    return (
      <Animated.View style={{flex: 1, flexDirection: 'column', transform:[{translateY: firstLookSty}], opacity: this.state.opaciti}}>
        <View style={{flex: .1, width: '100%', paddingHorizontal: 25}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .7, justifyContent: 'flex-end', alignItems: 'flex-start'}}>
              <Text style={[common.fontitle, {color: '#7f8082'}]}>Hello,</Text>
              <Text style={[common.fontitle, {color: '#444', fontSize: 16}]}>
                { user.fullname.length > 0 ? user.fullname : user.username }
              </Text>
            </View>
            <View style={{flex: .3, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <TouchableHighlight onPress={(e) => this.props.navigation.navigate('ShopSetting', {merchant: user.merchant})} style={{width: 40, height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#6c7e70', elevation: 5}}>
                {
                  _.isEmpty(user.photos) ?
                  <MaterialIcons name="landscape" color="#f6f5f3" size={24}/> :
                  <Image source={{uri: user.photos[0].secureUrl }} style={{width: '100%', height: '100%', borderRadius: 50, resizeMode: 'cover'}}/>
                }
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={{flex: .3, width: '100%', paddingHorizontal: 25, justifyContent: 'flex-end'}}>
          <View style={{width: '100%', height: '78%', backgroundColor: '#6c7e70', borderRadius: 8, elevation: 20}}>
            <View style={{flex: 1, flexDirection: 'column', paddingHorizontal: 10}}>
              <View style={{flex: .2}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: .06, justifyContent: 'center'}}>
                    <Ionicons name="ios-nutrition" size={14} color="#f6f5f3"/>
                  </View>
                  <View style={{flex: .8, justifyContent: 'center'}}>
                    <Text style={[common.fontbody, {color: '#f6f5f3'}]}>SUMMARY REPORT</Text>
                  </View>
                </View>
              </View>
              <View style={{flex: .8}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: .33, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 20}}>
                    <Text style={[common.fontitle, {color: '#a1bba6', fontSize: 15}]}>138</Text>
                    <Ionicons name="ios-people" size={24} color="#a1bba6" style={{marginTop: 5}}/>
                    <Text style={[common.fontbody, {color: '#a1bba6', marginTop: 2, fontSize: 12}]}>SUBSCRIBER</Text>
                  </View>
                  <View style={{flex: .33, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 20}}>
                    <Text style={[common.fontitle, {color: '#a1bba6', fontSize: 15}]}>78</Text>
                    <Ionicons name="ios-card" size={24} color="#a1bba6" style={{marginTop: 5}}/>
                    <Text style={[common.fontbody, {color: '#a1bba6', marginTop: 2, fontSize: 12}]}>TRANSACTION</Text>
                  </View>
                  <View style={{flex: .33, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 20}}>
                    <Text style={[common.fontitle, {color: '#a1bba6', fontSize: 15}]}>4.5</Text>
                    <Ionicons name="ios-ribbon" size={24} color="#a1bba6" style={{marginTop: 5}}/>
                    <Text style={[common.fontbody, {color: '#a1bba6', marginTop: 2, fontSize: 12}]}>RATING</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center', transform: [{translateY: 23}]}}>
              <Text style={{textAlign: 'center',fontFamily: 'Oswald', fontSize: 40, color: '#f6f5f3', letterSpacing: 20}}>POCENI</Text>
            </View>
          </View>
        </View>
        <View style={{flex: .12, width: '100%', paddingHorizontal: 25}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .5, justifyContent: 'flex-end', alignItems: 'flex-start'}}>
              <Text style={[common.fontbody, {color: '#444'}]}>Your Balance</Text>
              <Text style={[common.fontitle, {color: '#444', marginTop: 5, fontSize: 16}]}>IDR 200.000</Text>
            </View>
            <View style={{flex: .5, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
              <TouchableOpacity style={{width: '60%', height: 26, borderRadius: 20, borderWidth: 1, borderColor: '#444', backgroundColor: '#f6f5f3', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={[common.fontitle, {fontSize: 12, color: '#444'}]}>TODAY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flex: .48, width: '100%', paddingHorizontal: 25, paddingTop: 30}}>
          <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            <View style={{width: '32%', height: 130, marginBottom: 7}}>
              <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#9aaf9a', borderRadius: 4}}>
                <View style={{width: '100%', height: 35, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                  <View style={{width: 35, height: 35, borderRadius: 4,backgroundColor: 'rgba(0,0,0,.1)', justifyContent: 'flex-start', alignItems: 'flex-start', borderBottomRightRadius: 30, paddingTop: 6, paddingLeft: 6}}>
                    <Ionicons name='ios-pulse' size={18} color='#f6f5f3'/>
                  </View>
                </View>
                <View style={{width: '100%', height: 60, justifyContent: 'flex-start',paddingTop: 10, paddingLeft: 15, alignItems: 'flex-start'}}>
                  <Text style={[common.fontitle, {color: '#5c6a5c', fontSize: 24}]}>35</Text>
                  <Text style={[common.fontbody, {color: '#5c6a5c', marginTop: 5, fontSize: 12}]}>TRANSACTION</Text>
                </View>
                <View style={{width: '100%', alignItems: 'flex-end',paddingRight: 15, paddingTop: 5}}>
                  <Ionicons name='ios-arrow-round-forward' size={22} color='#5c6a5c'/>
                </View>
              </View>
              <TouchableOpacity style={{position: 'absolute', width: '100%', height: '100%', borderRadius: 4, justifyContent: 'center', alignItems: 'center'}}>
              </TouchableOpacity>
            </View>
            <View style={{width: '32%', height: 130, marginBottom: 7}}>
              <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#275b5c', borderRadius: 4}}>
                <View style={{width: '100%', height: 35, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                  <View style={{width: 35, height: 35, borderRadius: 4,backgroundColor: 'rgba(0,0,0,.1)', justifyContent: 'flex-start', alignItems: 'flex-start', borderBottomRightRadius: 30, paddingTop: 6, paddingLeft: 6}}>
                    <Ionicons name='ios-people' size={18} color='#f6f5f3'/>
                  </View>
                </View>
                <View style={{width: '100%', height: 60, justifyContent: 'flex-start',paddingTop: 10, paddingLeft: 15, alignItems: 'flex-start'}}>
                  <Text style={[common.fontitle, {color: '#3b8b8e', fontSize: 24}]}>14</Text>
                  <Text style={[common.fontbody, {color: '#3b8b8e', marginTop: 5, fontSize: 12}]}>EMPLOYEE</Text>
                </View>
                <View style={{width: '100%', alignItems: 'flex-end',paddingRight: 15, paddingTop: 5}}>
                  <Ionicons name='ios-arrow-round-forward' size={22} color='#3b8b8e'/>
                </View>
              </View>
              <TouchableOpacity style={{position: 'absolute', width: '100%', height: '100%', borderRadius: 4, justifyContent: 'center', alignItems: 'center'}}>
              </TouchableOpacity>
            </View>
            <View style={{width: '32%', height: 130, marginBottom: 7}}>
              <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#114345', borderRadius: 4}}>
                <View style={{width: '100%', height: 35, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                  <View style={{width: 35, height: 35, borderRadius: 4,backgroundColor: 'rgba(0,0,0,.1)', justifyContent: 'flex-start', alignItems: 'flex-start', borderBottomRightRadius: 30, paddingTop: 6, paddingLeft: 8}}>
                    <Ionicons name='ios-flash' size={18} color='#f6f5f3'/>
                  </View>
                </View>
                <View style={{width: '100%', height: 60, justifyContent: 'flex-start',paddingTop: 10, paddingLeft: 15, alignItems: 'flex-start'}}>
                  <Text style={[common.fontitle, {color: '#3b8b8e', fontSize: 24}]}>25</Text>
                  <Text style={[common.fontbody, {color: '#3b8b8e', marginTop: 5, fontSize: 12}]}>DISCOUNT</Text>
                </View>
                <View style={{width: '100%', alignItems: 'flex-end',paddingRight: 15, paddingTop: 5}}>
                  <Ionicons name='ios-arrow-round-forward' size={22} color='#3b8b8e'/>
                </View>
              </View>
              <TouchableOpacity style={{position: 'absolute', width: '100%', height: '100%', borderRadius: 4, justifyContent: 'center', alignItems: 'center'}}>
              </TouchableOpacity>
            </View>
            <View style={{width: '32%', height: 130}}>
              <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#356e71', borderRadius: 4}}>
                <View style={{width: '100%', height: 35, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                  <View style={{width: 35, height: 35, borderRadius: 4,backgroundColor: 'rgba(0,0,0,.1)', justifyContent: 'flex-start', alignItems: 'flex-start', borderBottomRightRadius: 30, paddingTop: 6, paddingLeft: 6}}>
                    <Ionicons name='ios-chatbubbles' size={18} color='#f6f5f3'/>
                  </View>
                </View>
                <View style={{width: '100%', height: 60, justifyContent: 'flex-start',paddingTop: 10, paddingLeft: 15, alignItems: 'flex-start'}}>
                  <Text style={[common.fontitle, {color: '#49a2a6', fontSize: 24}]}>65</Text>
                  <Text style={[common.fontbody, {color: '#49a2a6', marginTop: 5, fontSize: 12}]}>REVIEW</Text>
                </View>
                <View style={{width: '100%', alignItems: 'flex-end',paddingRight: 15, paddingTop: 5}}>
                  <Ionicons name='ios-arrow-round-forward' size={22} color='#49a2a6'/>
                </View>
              </View>
            </View>
            <View style={{width: '66%', height: 130}}>
              <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#506b6e', borderRadius: 4}}>
                <View style={{width: '100%', height: 35, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: .3}}>
                      <View style={{width: 35, height: 35, borderRadius: 4,backgroundColor: 'rgba(0,0,0,.1)', justifyContent: 'flex-start', alignItems: 'flex-start', borderBottomRightRadius: 30, paddingTop: 6, paddingLeft: 6}}>
                        <Ionicons name='ios-fitness' size={18} color='#f6f5f3'/>
                      </View>
                    </View>
                    <View style={{flex: .7, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 15}}>
                      <Text style={[common.fontbody, {color: '#82a4a8', marginTop: 5, fontSize: 12}]}>COMPETITOR</Text>
                    </View>
                  </View>
                </View>
                <View style={{width: '100%', height: 40, justifyContent: 'flex-start',paddingTop: 10, paddingLeft: 15, alignItems: 'flex-start'}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: .2}}>
                      <Text style={[common.fontitle, {color: '#82a4a8', fontSize: 24}]}>15</Text>
                    </View>
                    <View style={{flex: .8, paddingTop: 3}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: 20, height: 20, borderRadius: 50, backgroundColor: '#82a4a8', marginRight: 4}}></View>
                        <View style={{width: 20, height: 20, borderRadius: 50, backgroundColor: '#82a4a8', marginRight: 4}}></View>
                        <View style={{width: 20, height: 20, borderRadius: 50, backgroundColor: '#82a4a8', marginRight: 4}}></View>
                        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center',width: 20, height: 20, borderRadius: 50, backgroundColor: '#82a4a8', marginRight: 4}}>
                          <Ionicons size={16} color='#506b6e' name="ios-add"/>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{width: '100%', paddingHorizontal: 15, paddingRight: 35, paddingTop: 5}}>
                  <Text style={[common.fontbody, {color: '#82a4a8', marginTop: 5, fontSize: 14}]}>
                    Know what discounts competitors offer.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    )
  }

  render() {
    var { width, height } = Dimensions.get('window');
    if(this.state.current_user._id) {
      return (
        <Query query={FETCH_USER} variables={{userID: this.state.current_user._id}}>
          {({ loading, error, data }) => {
            if(loading || data.user.status === false) {
              return <View style={[common.container, { backgroundColor: '#f6f5f3' }]}></View>
            }
            return (
              <View style={[common.container, { backgroundColor: '#f6f5f3'}]}>
                { this.mainScreen(data.user.user) }
              </View>
            )
          }}
        </Query>
      )
    } else {
      return <View style={[common.container, { backgroundColor: '#f6f5f3' }]}></View>
    }
  }
}

export default compose(
  graphql(CURRENT_USER, {
    name: 'current_user',
    options: (ownProps) => ({
      fetchPolicy: 'network-only'
    }),
    props: ({ current_user: { current_user }}) => ({ current_user })
  })
)(Shop);
