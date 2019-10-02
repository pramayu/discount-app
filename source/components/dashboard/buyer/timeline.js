import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Image,
  Animated, TextInput, TouchableHighlight
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  common
} from '../../../assets/stylesheets/common';
import {
  CURRENT_USER
} from '../../../queries/queryUser';

class BuyerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: '',
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
      StatusBar.setBackgroundColor('#f6f5f3');
    });
  }

  componentWillUnmount = () => {
    this._navListener.remove();
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
      <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
        <View style={{width: '100%', height: 50, paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .14, justifyContent: 'center'}}>
              <View style={{width: 30, height: 30, marginTop: 5}}>
                <Image source={{uri: 'https://cdn.dribbble.com/users/185856/screenshots/7142963/allelevens4_1x.png'}} style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 40}}/>
              </View>
            </View>
            <View style={{flex: .86, justifyContent: 'center', alignItems: 'flex-end'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: .85, justifyContent: 'center', alignItems: 'flex-start'}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                      <Animated.View style={{backgroundColor: '#f6f5f3',opacity: this.state.opaciti ,zIndex: this.state.rotatestatus === false ? 10 : 9,transform: [{translateY: this.state.rotatestatus === false ? rotateUsernameSty : rotateNormalSty}],position: 'absolute',width: '100%', height: '100%', justifyContent: 'center'}}>
                        <Text style={[common.fontbody, {color: '#444'}]}>Hi, Bolsterli</Text>
                        <Text style={[common.fontbody, {color: '#7f8082', fontSize: 12}]}>Singaradja</Text>
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
        <View style={{width: width-20, height: (height / 4) - 50, justifyContent: 'flex-start', paddingHorizontal: 20, paddingRight: '20%', paddingTop: 30}}>
          <TouchableHighlight>
            <Text style={[{fontFamily:'Oswald',color: '#444', fontSize: 24, lineHeight: 42}]}>DISCOUNT HUNTERS JOIN HERE & GET YOUR LUCK</Text>
          </TouchableHighlight>
          <View style={{width: width-20, height: '50%', backgroundColor: 'rgba(255,255,255,.0)', position: 'absolute', marginTop: 25}}></View>
        </View>
        <View style={{width: width, height: height / 1.5, justifyContent: 'flex-start', paddingTop: 20}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{width: width, height: height / 2.8, paddingHorizontal: 20}}>
              <Text style={[common.fontitle, {fontSize: 12, color: '#7f8082', marginBottom: 15}]}>RECENT DISCOUNT</Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{width: width / 3, height: '100%', marginRight: 10}}>
                  <View style={{width: '100%', height: height / 3.8}}>
                    <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 6}} source={{uri: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80'}}/>
                    <View style={{position: 'absolute', width: '100%', height: '100%', borderRadius: 6, padding: 10, justifyContent: 'flex-end'}}>
                      <Text style={[common.fontbody, {fontSize: 12, color: '#f6f5f3',alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 5, borderRadius: 4, backgroundColor: '#ea4c89'}]}>34% OFF</Text>
                    </View>
                  </View>
                </View>
                <View style={{width: width / 3, height: '100%', marginRight: 10}}>
                  <View style={{width: '100%', height: height / 3.8}}>
                    <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 6}} source={{uri: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=662&q=80'}}/>
                      <View style={{position: 'absolute', width: '100%', height: '100%', borderRadius: 6, padding: 10, justifyContent: 'flex-end'}}>
                        <Text style={[common.fontbody, {fontSize: 12, color: '#f6f5f3',alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 5, borderRadius: 4, backgroundColor: '#ea4c89'}]}>10% OFF</Text>
                      </View>
                  </View>
                </View>
                <View style={{width: width / 3, height: '100%', marginRight: 10}}>
                  <View style={{width: '100%', height: height / 3.8}}>
                    <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 6}} source={{uri: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'}}/>
                      <View style={{position: 'absolute', width: '100%', height: '100%', borderRadius: 6, padding: 10, justifyContent: 'flex-end'}}>
                        <Text style={[common.fontbody, {fontSize: 12, color: '#f6f5f3',alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 5, borderRadius: 4, backgroundColor: '#ea4c89'}]}>6% OFF</Text>
                      </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{width: width, height: height / 3.7, paddingLeft: 20}}>
              <Text style={[common.fontitle, {fontSize: 12, color: '#7f8082', marginBottom: 15}]}>NEAR MERCHANT</Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{width: width / 1.5, height: '100%', marginRight: 10}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: .8}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: .7, paddingRight: 3}}>
                          <Image style={{width: '100%', height: '100%', borderTopLeftRadius: 6, borderBottomLeftRadius: 6, resizeMode: 'cover'}} source={{uri: 'https://cdn.dribbble.com/users/145033/screenshots/3874749/1.png'}}/>
                        </View>
                        <View style={{flex: .3}}>
                          <View style={{flex: 1, flexDirection: 'column'}}>
                            <View style={{flex: .5, paddingBottom: 1.5}}>
                              <Image style={{width: '100%', height: '100%', borderTopRightRadius: 6, resizeMode: 'cover'}} source={{uri: 'https://cdn.dribbble.com/users/145033/screenshots/4450155/shimurhuman.png'}}/>
                            </View>
                            <View style={{flex: .5, paddingTop: 1.5}}>
                              <Image style={{width: '100%', height: '100%', borderBottomRightRadius: 6, resizeMode: 'cover'}} source={{uri: 'https://cdn.dribbble.com/users/145033/screenshots/4629791/sh4.png'}}/>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={{width: '100%', height: '100%', borderRadius: 6, position: 'absolute', backgroundColor: 'rgba(255,255,255,.15)'}}></View>
                    </View>
                    <View style={{flex: .2}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: '14%', height: '100%',justifyContent: 'flex-end'}}>
                          <View style={{width: 24, height: 24}}>
                            <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 20}} source={{uri: 'https://cdn.dribbble.com/users/2996009/screenshots/5798857/dribbble_nike_blazer_mid_2x.png'}}/>
                          </View>
                        </View>
                        <View style={{width: '80%', height: '100%',justifyContent: 'center', paddingTop: 8}}>
                          <Text style={[common.fontbody, {color: '#444', fontSize: 12}]}>Nike Official Store</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{width: width / 1.5, height: '100%', marginRight: 10}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: .8}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: .7, paddingRight: 3}}>
                          <Image style={{width: '100%', height: '100%', borderTopLeftRadius: 6, borderBottomLeftRadius: 6, resizeMode: 'cover'}} source={{uri: 'https://cdn.dribbble.com/users/408980/screenshots/3171906/food.jpg'}}/>
                        </View>
                        <View style={{flex: .3}}>
                          <View style={{flex: 1, flexDirection: 'column'}}>
                            <View style={{flex: .5, paddingBottom: 1.5}}>
                              <Image style={{width: '100%', height: '100%', borderTopRightRadius: 6, resizeMode: 'cover'}} source={{uri: 'https://cdn.dribbble.com/users/145033/screenshots/4450155/shimurhuman.png'}}/>
                            </View>
                            <View style={{flex: .5, paddingTop: 1.5}}>
                              <Image style={{width: '100%', height: '100%', borderBottomRightRadius: 6, resizeMode: 'cover'}} source={{uri: 'https://cdn.dribbble.com/users/145033/screenshots/4629791/sh4.png'}}/>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={{width: '100%', height: '100%', borderRadius: 6, position: 'absolute', backgroundColor: 'rgba(255,255,255,.15)'}}></View>
                    </View>
                    <View style={{flex: .2}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: '14%', height: '100%',justifyContent: 'flex-end'}}>
                          <View style={{width: 24, height: 24}}>
                            <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 20}} source={{uri: 'https://cdn.dribbble.com/users/339280/screenshots/3744467/____---macarrao-santo.png'}}/>
                          </View>
                        </View>
                        <View style={{width: '80%', height: '100%',justifyContent: 'center', paddingTop: 8}}>
                          <Text style={[common.fontbody, {color: '#444', fontSize: 12}]}>一ノ瀬アミン Store</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
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
