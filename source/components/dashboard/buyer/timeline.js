import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Image,
  Animated, TextInput, TouchableHighlight,
  ScrollView
} from 'react-native';
import { Query, graphql, compose } from 'react-apollo';
import _ from 'lodash';
import axios from 'axios';
import { BottomTabBar } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  common
} from '../../../assets/stylesheets/common';
import TimelineProgress from '../../shared/timelineProgress';
import { CURRENT_USER } from '../../../queries/queryUser';
import { GET_TIMELINE, USERTIMELINE } from '../../../queries/queryTimeline';

class BuyerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      current_user: '',
      city: '',
      rotatestatus: false,
      opaciti: new Animated.Value(1),
      opaciti2:  new Animated.Value(0)
    }
    this.rotateUsernameX = new Animated.Value(0);
    this.rotateUsernameN = new Animated.Value(0);
    this.searchHide      = new Animated.Value(0);
    this.searchShow      = new Animated.Value(0);
    this.closeHide       = new Animated.Value(0);
    this.closeShow       = new Animated.Value(0);
    this.schinputShow    = new Animated.Value(0);
    this.schinputHide    = new Animated.Value(0);
  }



  componentWillReceiveProps = (nextProps) => {
    this.setState({
      current_user        : nextProps.current_user ? nextProps.current_user : '',
      niches              : nextProps.niches ? nextProps.niches : []
    })
  }

  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true)
    });
    // this.props.navigation.setParams({ isVisible: false });
    this.getcurrentPosition();
    this.getpo();
  }

  componentWillUnmount = () => {
    this._navListener.remove();
    navigator.geolocation.clearWatch(this.watchID);
  }

  getcurrentPosition = () => {
    this.watchID = navigator.geolocation.watchPosition(async(res) => {
      this.setState({
        latitude: res.coords.latitude,
        longitude: res.coords.longitude
      });
      this.getregion(res.coords.latitude, res.coords.longitude);
      var coordinate = {};
      coordinate.latitude = res.coords.latitude;
      coordinate.longitude = res.coords.longitude;
      // this.props.navigation.setParams({ isVisible: true });
      await AsyncStorage.setItem('coordinate', JSON.stringify(coordinate));
    });
  }

  getpo = async() => {
    var coordinate = await AsyncStorage.getItem('coordinate');
    if(coordinate !== null) {
      var objCoordinate = JSON.parse(coordinate);
    }
  }

  getregion = async(lat, long) => {
    var region = await axios.get(`http://open.mapquestapi.com/geocoding/v1/reverse?key=p7kcAQYKiB4wHc2GkYdA0lzy66a4IPG4&location=${parseFloat(lat)},${parseFloat(long)}&includeRoadMetadata=true&includeNearestIntersection=true`);
    this.setState({
      city: `${region.data.results[0].locations[0].adminArea5}, ${region.data.results[0].locations[0].adminArea3}`
    })
  }

  renderRecentStuff = (stuffs) => {
    var { width, height } = Dimensions.get('window');
    return _.map(stuffs, (stuff, index) => {
      var discount = _.filter(stuff.discounts, (discount) => {return discount.status === true})
      return (
        <View key={index} style={{width: width / 3, height: '100%', marginRight: 10}}>
          <View style={{width: '100%', height: height / 3.8}}>
            <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 6}} source={{uri: stuff.photos[0].secureUrl}}/>
            <View style={{position: 'absolute', width: '100%', height: '100%', borderRadius: 6, padding: 10, justifyContent: 'flex-end'}}>
              <Text style={[common.fontbody, {fontSize: 12, color: '#f6f5f3',alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 5, borderRadius: 4, backgroundColor: '#ea4c89'}]}>{discount[0].discount}% OFF</Text>
            </View>
          </View>
          <TouchableOpacity onPress={(e) => this.props.navigation.navigate('StuffBuyer', {stuff_id: stuff._id})} style={{position: 'absolute', height: '100%', width: '100%'}}><Text></Text></TouchableOpacity>
        </View>
      )
    })
  }

  renderShopStuffs = (stuffs) => {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: .7, paddingRight: 3}}>
          <Image style={{width: '100%', height: '100%', borderTopLeftRadius: 6, borderBottomLeftRadius: 6, resizeMode: 'cover'}} source={{uri: stuffs[0].photos[0].secureUrl}}/>
        </View>
        <View style={{flex: .3}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: .5, paddingBottom: 1.5}}>
              <Image style={{width: '100%', height: '100%', borderTopRightRadius: 6, resizeMode: 'cover'}} source={{uri: stuffs[1].photos[0].secureUrl}}/>
            </View>
            <View style={{flex: .5, paddingTop: 1.5}}>
              <Image style={{width: '100%', height: '100%', borderBottomRightRadius: 6, resizeMode: 'cover'}} source={{uri: stuffs[2].photos[0].secureUrl}}/>
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderNearShop = (merchants) => {
    var { width, height } = Dimensions.get('window');
    return _.map(merchants, (merchant, index) => {
      return (
        <View key={index} style={{width: width / 1.5, height: '100%', marginRight: 10}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: .8}}>
              {
                merchant.stuffs.length >= 3 ?
                this.renderShopStuffs(merchant.stuffs) :
                <Image source={{uri: merchant.stuffs[0].photos[0].secureUrl}} style={{width: '100%', height: '100%', borderRadius: 6, resizeMode: 'cover'}}/>
              }
              <View style={{width: '100%', height: '100%', borderRadius: 6, position: 'absolute', backgroundColor: 'rgba(255,255,255,.15)'}}></View>
            </View>
            <View style={{flex: .2}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{width: '14%', height: '100%',justifyContent: 'flex-end'}}>
                  <View style={{width: 24, height: 24}}>
                    <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 20}} source={{uri: merchant.photos[0].secureUrl}}/>
                  </View>
                </View>
                <View style={{width: '80%', height: '100%',justifyContent: 'center', paddingTop: 8}}>
                  <Text style={[common.fontbody, {color: '#444', fontSize: 12}]}>{merchant.name}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )
    })
  }

  renderHeaderTimeline = (userID) => {
    var rotateUsernameSty = this.rotateUsernameX.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -50]
    });
    var rotateNormalSty = this.rotateUsernameN.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, 0]
    });
    var searchHideSty = this.searchHide.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 80]
    });
    var searchShowSty = this.searchShow.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 0]
    });
    var closeShowSty = this.closeShow.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 0]
    });
    var closeHideSty = this.closeHide.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 80]
    });
    var inputShowSty = this.schinputShow.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%']
    });
    var inputHideSty = this.schinputHide.interpolate({
      inputRange: [0, 1],
      outputRange: ['100%', '0%']
    });
    return (
      <Query query={USERTIMELINE} variables={{userID: userID}}>
        {({loading, error, data}) => {
          return (
            <View style={{width: '100%', height: 50, paddingHorizontal: 20}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: .14, justifyContent: 'center'}}>
                  <View style={{width: 30, height: 30, marginTop: 5}}>
                    <Image source={{uri: data.usertimeline ? data.usertimeline.photos[0].secureUrl : 'https://cdn.dribbble.com/users/5637/screenshots/1565044/missing_file_02_1x.jpg'}} style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 40}}/>
                  </View>
                </View>
                <View style={{flex: .86, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: .85, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <View style={{flex: 1, flexDirection: 'column'}}>
                          <Animated.View style={{backgroundColor: '#f6f5f3',opacity: this.state.opaciti ,zIndex: this.state.rotatestatus === false ? 10 : 9,transform: [{translateY: this.state.rotatestatus === false ? rotateUsernameSty : rotateNormalSty}],position: 'absolute',width: '100%', height: '100%', justifyContent: 'center'}}>
                            <Text style={[common.fontbody, {color: '#444'}]}>Hi, {data.usertimeline ? data.usertimeline.fullname : 'Welcome back'}</Text>
                            <Text style={[common.fontbody, {color: '#7f8082', fontSize: 12}]}>{this.state.city ? this.state.city : '[...]'}</Text>
                          </Animated.View>
                          <Animated.View style={{opacity: this.state.opaciti2, backgroundColor: '#f6f5f3',zIndex: this.state.rotatestatus === false ? 9 : 10, alignItems: 'flex-end',height: '100%', width: this.state.rotatestatus === false ? inputShowSty : inputHideSty, position: 'absolute', justifyContent: 'center', paddingLeft: 10}}>
                            <TextInput placeholder="Search" style={[common.fontbody, {marginTop: 5, color: '#444',width: '100%', height: 34, paddingHorizontal: 10, borderRadius: 4, backgroundColor: 'rgba(255,255,255,.5)', paddingVertical: 0}]}/>
                          </Animated.View>
                      </View>
                    </View>
                    <View style={{flex: .15, justifyContent: 'center', alignItems: 'flex-end'}}>
                      {
                        this.state.rotatestatus === false ?
                        <Animated.View style={{flex: 1, flexDirection: 'column', transform: [{translateX: this.state.rotatestatus === false ? searchHideSty : searchShowSty}]}}>
                          <TouchableOpacity style={{width: 50, height: 50, justifyContent: 'center', alignItems: 'flex-end'}} onPress={(e) => this.rotateUsernameXA()}>
                            <Ionicons name="ios-search" size={24} color="#444"/>
                          </TouchableOpacity>
                        </Animated.View> :
                        <Animated.View style={{flex: 1, flexDirection: 'column', transform: [{translateX: this.state.rotatestatus === false ? closeShowSty : closeHideSty}]}}>
                          <TouchableOpacity style={{width: 50, height: 50, justifyContent: 'center', alignItems: 'flex-end'}} onPress={(e) => this.rotateUsernameNA()}>
                            <MaterialCommunityIcons name="blur" size={22} color="#444"/>
                          </TouchableOpacity>
                        </Animated.View>
                      }
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )
        }}
      </Query>
    )
  }

  rotateUsernameXA = () => {
    Animated.parallel([
      Animated.timing(this.state.opaciti, {
        toValue: 0,
        duration: 100,
        delay: 50,
      }),
      Animated.timing(this.rotateUsernameX, {
        toValue: 1,
        duration: 250
      }),
      Animated.timing(this.state.opaciti2, {
        toValue: 1,
        duration: 80,
        delay: 200
      }),
      Animated.timing(this.searchHide, {
        toValue: 1,
        duration: 100,
        delay: 200,
      }),
      Animated.timing(this.closeShow, {
        toValue: 1,
        duration: 100,
        delay: 100,
      }),
      Animated.timing(this.schinputShow, {
        toValue: 1,
        duration: 200,
        delay: 250
      })
    ]).start(() => {
      this.setState({rotatestatus: true});
      this.rotateUsernameN.setValue(0);
      this.searchShow.setValue(0);
      this.closeHide.setValue(0);
      this.schinputHide.setValue(0);
    })
  }

  rotateUsernameNA = () => {
    Animated.parallel([
      Animated.timing(this.state.opaciti, {
        toValue: 1,
        duration: 50,
        delay: 100,
      }),
      Animated.timing(this.schinputHide, {
        toValue: 1,
        duration: 200,
      }),
      Animated.timing(this.state.opaciti2, {
        toValue: 0,
        duration: 80,
        delay: 150
      }),
      Animated.timing(this.rotateUsernameN, {
        toValue: 1,
        duration: 250,
        delay: 200
      }),
      Animated.timing(this.closeHide, {
        toValue: 1,
        duration: 100,
        delay: 200,
      }),
      Animated.timing(this.searchShow, {
        toValue: 1,
        duration: 100,
        delay: 100,
      }),
    ]).start(() => {
      this.setState({rotatestatus: false});
      this.rotateUsernameX.setValue(0);
      this.searchHide.setValue(0);
      this.closeShow.setValue(0);
      this.schinputShow.setValue(0);
    })
  }

  render() {
    var { width, height } = Dimensions.get('window');
    if(this.state.current_user._id && this.state.latitude.toString().length > 0 && this.state.longitude.toString().length > 0) {
      return (
        <Query query={GET_TIMELINE} variables={{
            timelineProp: {
              userID: this.state.current_user._id,
              latitude: this.state.latitude.toString(),
              longitude: this.state.longitude.toString()
            }
          }}>
          {({loading, error, data}) => {
            if(loading) return <TimelineProgress />
            return (
              <View style={[common.container, { backgroundColor: '#f6f5f3', paddingTop: 30}]}>
                { this.renderHeaderTimeline(this.state.current_user._id) }
                <View style={{width: width-20, height: (height / 4) - 50, justifyContent: 'flex-start', paddingHorizontal: 20, paddingRight: '20%', paddingTop: 30}}>
                  <TouchableHighlight>
                    <Text style={[{fontFamily:'Oswald',color: '#444', fontSize: 24, lineHeight: 42}]}>DISCOUNT HUNTERS JOIN HERE & GET YOUR LUCK</Text>
                  </TouchableHighlight>
                  <View style={{width: width-20, height: '50%', backgroundColor: 'rgba(255,255,255,.0)', position: 'absolute', marginTop: 25}}></View>
                </View>
                <View style={{width: width, height: height / 1.5, justifyContent: 'flex-start', paddingTop: 20}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{width: width, height: height / 2.8, paddingLeft: 20}}>
                      <Text style={[common.fontitle, {fontSize: 12, color: '#7f8082', marginBottom: 15}]}>RECENT DISCOUNT</Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flex: 1, flexDirection: 'row'}}>
                        { this.renderRecentStuff(data.timeline.stuffs) }
                      </ScrollView>
                    </View>
                    <View style={{width: width, height: height / 3.7, paddingLeft: 20}}>
                      <Text style={[common.fontitle, {fontSize: 12, color: '#7f8082', marginBottom: 15}]}>NEAR MERCHANT</Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flex: 1, flexDirection: 'row'}}>
                        { this.renderNearShop(data.timeline.merchant) }
                      </ScrollView>
                    </View>
                  </View>
                </View>
              </View>
            )
          }}
        </Query>
      )
    } else {
      return <TimelineProgress />
    }
  }
}

export default compose(
  graphql(CURRENT_USER, {
    name: 'current_user',
    options: (props) => ({
      fetchPolicy: 'network-only'
    }),
    props: ({current_user: {current_user}}) => ({ current_user })
  })
)(BuyerDashboard);
