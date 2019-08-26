import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Animated,
  ScrollView, Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { graphql, compose, Query } from 'react-apollo';
import _ from 'lodash';
import {
  common
} from '../../../assets/stylesheets/common';
import {
  firstlook
} from '../../shared/sharedaction';
import {
  CURRENT_USER, FETCH_USER
} from '../../../queries/queryUser';
import {
  GET_STUFFS
} from '../../../queries/queryStuff';

class Stuff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current_user: '',
      opaciti: new Animated.Value(0),
      btnpressed: 'allstuff',
    }
    this.firstlook = new Animated.Value(0);
    this.showcirle = new Animated.Value(0);
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
    });
    firstlook(this.firstlook, this.state.opaciti)
  }

  componentWillUnmount = () => {
    this._navListener.remove();
  }

  menupressed = (pressed) => {
    this.setState({
      btnpressed: pressed
    });
    if(this.state.btnpressed === pressed) {
      Animated.timing(this.showcirle, {
        toValue: 1,
        duration: 600
      }).start()
    }
  }

  mapstuffs = (stuffs) => {
    var {width, height} = Dimensions.get('window');
    if(this.state.btnpressed === 'allstuff') {
      var _stuffs = stuffs;
    } else if (this.state.btnpressed === 'pending') {
      var _stuffs = _.filter(stuffs, (stuff) => { return stuff.stuffstatus === false })
    } else if (this.state.btnpressed === 'published') {
      var _stuffs = _.filter(stuffs, (stuff) => { return stuff.stuffstatus === true })
    } else if (this.state.btnpressed === 'discount') {
      var _stuffs = _.filter(stuffs, (stuff) => { return stuff.stuffstatus === true && stuff.discountstatus === true })
    }
    return _.map(_stuffs, (stuff, index) => {
      return (
        <View key={index} style={{width: '100%', height: height / 2.4}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: .82}}>
              <Image source={{uri: stuff.photos[0].secureUrl}} style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 4}}/>
              <TouchableOpacity onPress={(e) => this.props.navigation.navigate('StuffDetail', {stuff})} style={{position: 'absolute', width: '100%', height: '100%', borderRadius: 4, backgroundColor: 'rgba(0,0,0,.1)'}}></TouchableOpacity>
            </View>
            <View style={{flex: .18, paddingTop: 15}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: .12, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                  <View style={{width: 25, height: 25}}>
                    <Image source={{uri: stuff.manager.photos[0].secureUrl}} style={{width: '100%', height: '100%', borderRadius: 40, resizeMode: 'cover'}}/>
                  </View>
                </View>
                <View style={{flex: .7, justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: 3}}>
                  <Text style={[common.fontbody, {color: '#444'}]}>{stuff.manager.username}</Text>
                </View>
                <View style={{flex: .18, justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                  <TouchableOpacity onPress={(e) => this.props.navigation.navigate('StuffUpdate',{ stuffID: stuff._id })} style={{borderWidth: 1, borderColor: 'rgba(255,255,255,.7)', width: '100%', height: 28, borderRadius: 4, backgroundColor: 'rgba(255,255,255,.5)', justifyContent: 'center', alignItems: 'center'}}>
                    <Ionicons name="ios-repeat" size={24} color="#444"/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      )
    })
  }

  render() {
    var {width, height} = Dimensions.get('window');
    var firstLookSty = this.firstlook.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0]
    });
    var showcirlesty = this.showcirle.interpolate({
      inputRange: [0, 1],
      outputRange: [-15, -50]
    });
    var hidecirlesty = this.showcirle.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -15]
    });
    if(this.state.current_user._id) {
      return (
        <Query query={GET_STUFFS} variables={{userID: this.state.current_user._id}}>
          {({ loading, error, data }) => {
            if(loading || data.getstuffs.status === false) {
              return <View style={[common.container, { backgroundColor: '#f6f5f3' }]}></View>
            }
            return (
              <View style={[common.container, { backgroundColor: '#f6f5f3', justifyContent: 'flex-start' }]}>
                <Animated.View style={[common.container, {transform: [{translateY: firstLookSty}], opacity: this.state.opaciti}]}>
                  <View style={{width: width, height: 50}}>
                    <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 20}}>
                      <View style={{flex: .2, justifyContent: 'center'}}>
                        <TouchableOpacity>
                          <Ionicons name="ios-options" size={24} color="#444"/>
                        </TouchableOpacity>
                      </View>
                      <View style={{flex: .8, justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Text style={[common.fontitle, {color:'#444', fontSize: 12}]}>OWN STUFFS</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{width: width, height: height - 80}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flex: .19}}>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                          <View style={{flex: .2, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress={(e) => this.menupressed('allstuff')} style={{width: '80%', height: '80%', borderRadius: 4, backgroundColor: '#f6f5f3', justifyContent: 'center', alignItems: 'center'}}>
                              <Text style={[common.fontitle, {color: this.state.btnpressed === 'allstuff' ? '#ea4c89' : '#444', fontSize: 12, transform: [{rotate: '90deg'}]}]}>ALL STUFF</Text>
                            </TouchableOpacity>
                            <Animated.View style={{transform: [{translateX: this.state.btnpressed === 'allstuff' ? -15 : hidecirlesty}], position: 'absolute',width: 6, height: 6, borderRadius: 20, backgroundColor: '#ea4c89'}}></Animated.View>
                          </View>
                          <View style={{flex: .2, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress={(e) => this.menupressed('pending')} style={{width: '80%', height: '80%', borderRadius: 4, backgroundColor: '#f6f5f3', justifyContent: 'center', alignItems: 'center'}}>
                              <Text style={[common.fontitle, {color: this.state.btnpressed === 'pending' ? '#ea4c89' : '#444', fontSize: 12, transform: [{rotate: '90deg'}]}]}>PENDING</Text>
                            </TouchableOpacity>
                            <Animated.View style={{transform: [{translateX: this.state.btnpressed === 'pending' ? showcirlesty : hidecirlesty}], position: 'absolute',width: 6, height: 6, borderRadius: 20, backgroundColor: '#ea4c89'}}></Animated.View>
                          </View>
                          <View style={{flex: .2, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress={(e) => this.menupressed('published')} style={{width: '80%', height: '80%', borderRadius: 4, backgroundColor: '#f6f5f3', justifyContent: 'center', alignItems: 'center'}}>
                              <Text style={[common.fontitle, {color: this.state.btnpressed === 'published' ? '#ea4c89' : '#444', fontSize: 12, transform: [{rotate: '90deg'}]}]}>PUBLISHED</Text>
                            </TouchableOpacity>
                            <Animated.View style={{transform: [{translateX: this.state.btnpressed === 'published' ? showcirlesty : hidecirlesty}], position: 'absolute',width: 6, height: 6, borderRadius: 20, backgroundColor: '#ea4c89'}}></Animated.View>
                          </View>
                          <View style={{flex: .2, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress={(e) => this.menupressed('discount')} style={{width: '80%', height: '80%', borderRadius: 4, backgroundColor: '#f6f5f3', justifyContent: 'center', alignItems: 'center'}}>
                              <Text style={[common.fontitle, {color: this.state.btnpressed === 'discount' ? '#ea4c89' : '#444', fontSize: 12, transform: [{rotate: '90deg'}]}]}>DISCOUNT</Text>
                            </TouchableOpacity>
                            <Animated.View style={{transform: [{translateX: this.state.btnpressed === 'discount' ? showcirlesty : hidecirlesty}], position: 'absolute',width: 6, height: 6, borderRadius: 20, backgroundColor: '#ea4c89'}}></Animated.View>
                          </View>
                        </View>
                      </View>
                      <View style={{flex: .81}}>
                        <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end', paddingRight: 20, paddingTop: 10}}>
                          { this.mapstuffs(data.getstuffs.stuffs) }
                        </View>
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
)(Stuff);
