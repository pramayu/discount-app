import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Image,
  Animated, TextInput, TouchableHighlight,
  ScrollView, Keyboard
} from 'react-native';
import _ from 'lodash';
import {compose, graphql, Query} from 'react-apollo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { common } from '../../assets/stylesheets/common';
import {COMMENT_TO_STUFF, COMMENT_STUFF} from '../../queries/queryComment';
import {CURRENT_USER} from '../../queries/queryUser';


class ReviewStuff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyAnimatedStatus: false,
      keyHeight: 0,
      stuffID: '',
      child: '',
      current_user: ''
    }
    this.animatedTextInputUp = new Animated.Value(0);
    this.animatedTextInputDw = new Animated.Value(0);
    this.animatedEmoticonSw  = new Animated.Value(0);
    this.animatedEmoticonHd  = new Animated.Value(0);
  }

  componentDidMount = () => {
    var {stuffID} = this.props.navigation.state.params;
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true)
    });
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide.bind(this),
    );
    this.setState({ stuffID: stuffID })
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      current_user: nextProps.current_user ? nextProps.current_user : ''
    })
  }

  componentWillUnmount = () => {
    this._navListener.remove();
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow(e) {
    this.setState({keyHeight: e.endCoordinates.height});
    this.animatedTextInputUpServ()
  }

  _keyboardDidHide() {
    this.animatedTextInputDwServ()
  }

  commentToStuff = async() => {
    var res = await this.props.comment_to_stuff({
      variables: {
        commentprop: {
          child       : this.state.child,
          stuffID     : this.state.stuffID,
          userID      : this.state.current_user._id
        }
      },
      refetchQueries: [{
        query: COMMENT_STUFF,
        variables: {
          commentprop: {
            stuffID     : this.state.stuffID,
            userID      : this.state.current_user._id
          }
        }
      }]
    });
    var {status, error, comment} = res.data.comment_to_stuff;
    if(status === true) {
      this.setState({child: ''});
      Keyboard.dismiss();
    }
  }

  animatedTextInputUpServ = () => {
    Animated.parallel([
      Animated.timing(this.animatedTextInputUp, {
        toValue: 1,
        duration: 400,
      }),
      Animated.timing(this.animatedEmoticonSw, {
        toValue: 1,
        duration: 200,
      })
    ]).start((e) => {
      this.setState({ keyAnimatedStatus: true });
      this.animatedTextInputDw.setValue(0);
      this.animatedEmoticonHd.setValue(0);
    })
  }

  animatedTextInputDwServ = () => {
    Animated.parallel([
      Animated.timing(this.animatedTextInputDw, {
        toValue: 1,
        duration: 400,
      }),
      Animated.timing(this.animatedEmoticonHd, {
        toValue: 1,
        duration: 200,
      })
    ]).start((e) => {
      this.setState({ keyAnimatedStatus: false });
      this.animatedTextInputUp.setValue(0);
      this.animatedEmoticonSw.setValue(0);
    });
  }

  _renderComment = (comments) => {
    return _.map(comments, (comment, index) => {
      return (
        <View key={index} style={{width: '100%', height: 'auto'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: '17%', height: 'auto'}}>
              <View style={{width: 35, height: 35, borderRadius: 60}}>
                <Image source={{uri: comment.user.photos[0].secureUrl}} style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 60}}/>
              </View>
            </View>
            <View style={{width: '83%', height: 'auto', paddingTop: 3}}>
              <View style={{width: '100%', height: 24}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: .7}}>
                    <Text style={[{fontFamily: 'Oswald', fontSize: 14, color: '#444'}]}>{comment.user.fullname.length > 0 ? comment.user.fullname : comment.user.username} <Text style={[{fontFamily: 'Oswald', color: '#7f8082', fontSize: 12, marginLeft: 15}]}>5d ago.</Text></Text>
                  </View>
                  <View style={{flex: .3, alignItems: 'flex-end'}}>
                    <MaterialCommunityIcons size={20} color="#444" name="emoticon-kiss-outline"/>
                  </View>
                </View>
              </View>
              <Text style={[common.fontbody, {color: '#7f8082', marginTop: 5, lineHeight: 20, paddingTop: 5, paddingBottom: 7, paddingHorizontal: 10, borderRadius: 6, backgroundColor: '#f0f0f0', marginBottom: 5}]}>{comment.child}</Text>
              {
                this.state.current_user._id === comment.user._id ?
                <View style={{width: '100%', height: 20}}>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <View style={{width: '12%', height: '100%'}}>
                      <TouchableOpacity style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Ionicons name="ios-swap" size={18} color="#dbd9d9"/>
                      </TouchableOpacity>
                    </View>
                    <View style={{width: '12%', height: '100%'}}>
                      <TouchableOpacity style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Ionicons name="ios-flame" size={18} color="#dbd9d9"/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View> : null
              }
              {/*
                <View style={{width: '100%', height: 'auto'}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: '20%'}}>
                      <View style={{width: 35, height: 35}}>
                        <Image source={{uri: 'https://cdn.dribbble.com/users/5031/screenshots/7008431/dribbble.png'}} style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 60, borderWidth: 1, borderColor: '#ea4c89'}}/>
                      </View>
                    </View>
                    <View style={{width: '80%'}}>
                      <Text style={[{fontFamily: 'Oswald', fontSize: 14, color: '#444'}]}>Momo Chan <Text style={[{fontFamily: 'Oswald', color: '#7f8082', fontSize: 12, marginLeft: 15}]}>2h ago.</Text></Text>
                      <Text style={[common.fontbody, {color: '#7f8082', marginTop: 5, lineHeight: 20, paddingTop: 5, paddingBottom: 7, paddingHorizontal: 10, borderRadius: 6, backgroundColor: '#f0f0f0', marginBottom: 5}]}>かわいい〜浴衣似合う🥺家族でゆっくりできてよかったね！</Text>
                      <View style={{width: '100%', height: 16, alignItems: 'flex-end'}}>
                        <TouchableOpacity style={{width: '20%', height: '100%'}}>
                          <Text style={[common.fontbody, {color: '#dbd9d9', fontSize: 12}]}>REPLY</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                */}
            </View>
          </View>
        </View>
      )
    })
  }

  render() {
    var {width, height} = Dimensions.get('window');
    var animatedTextInputUpSty = this.animatedTextInputUp.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -this.state.keyHeight - 30]
    });
    var animatedEmoticonSwSty = this.animatedEmoticonSw.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -width + 20]
    });
    var animatedEmoticonHdSty = this.animatedEmoticonHd.interpolate({
      inputRange: [0, 1],
      outputRange: [-width + 20, 0]
    });
    var animatedTextInputDwSty = this.animatedTextInputDw.interpolate({
      inputRange: [0, 1],
      outputRange: [-this.state.keyHeight - 30, 0]
    });
    if(this.state.current_user._id && this.state.stuffID) {
      return (
        <Query query={COMMENT_STUFF} variables={{
            commentprop: {
              userID: this.state.current_user._id,
              stuffID: this.state.stuffID
            }
          }}>
          {({loading, error, data}) => {
            if(loading) return <View style={[common.container, {backgroundColor: '#f6f5f3'}]}></View>
            return (
              <View style={[common.container, {backgroundColor: '#f6f5f3'}]}>
                <Animated.View style={{width: width * 2, height: 80, backgroundColor: 'rgba(255,255,255,.0)', position: 'absolute', top: 0, zIndex: 15, paddingHorizontal: 20, transform: [{translateX: this.state.keyAnimatedStatus === false ? animatedEmoticonSwSty : animatedEmoticonHdSty}]}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: '50%', height: '100%',paddingRight: 20 }}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: .2}}>
                          <TouchableOpacity onPress={(e) => this.props.navigation.goBack()} style={{height: '100%', justifyContent: 'center'}}>
                            <Ionicons name="ios-arrow-round-back" size={28} color="#444"/>
                          </TouchableOpacity>
                        </View>
                        <View style={{flex: .8, justifyContent: 'center', alignItems: 'flex-end'}}>
                          <Text style={[common.fontitle, {color: '#444', fontSize: 12}]}>{data.comment_stuff.length} {data.comment_stuff.length > 1 ? 'REVIEWS' : 'REVIEW'}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{width: '50%', height: '100%', paddingLeft: 20, paddingTop: 20}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                          <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}>
                            <MaterialCommunityIcons size={24} color="#7f8082" name="emoticon-angry-outline"/>
                          </TouchableOpacity>
                        </View>
                        <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                          <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}>
                            <MaterialCommunityIcons size={24} color="#7f8082" name="emoticon-neutral-outline"/>
                          </TouchableOpacity>
                        </View>
                        <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                          <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}>
                            <MaterialCommunityIcons size={24} color="#7f8082" name="emoticon-happy-outline"/>
                          </TouchableOpacity>
                        </View>
                        <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                          <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}>
                            <MaterialCommunityIcons size={24} color="#7f8082" name="emoticon-excited-outline"/>
                          </TouchableOpacity>
                        </View>
                        <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                          <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}>
                            <MaterialCommunityIcons size={24} color="#7f8082" name="emoticon-kiss-outline"/>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </Animated.View>
                <View style={{width: width, height: height}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{width: '100%', height: height - 80, marginTop: 30, paddingHorizontal: 20, paddingTop: 50}}>
                      <View style={{flex: 1, flexDirection: 'column'}}>
                        { this._renderComment(data.comment_stuff ? data.comment_stuff : []) }
                      </View>
                    </View>
                    {/*form*/}
                    <Animated.View style={{backgroundColor: '#f6f5f3',width: '100%', height: 80, transform: [{translateY: this.state.keyAnimatedStatus === false ? animatedTextInputUpSty : animatedTextInputDwSty}]}}>
                      <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 20}}>
                        <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                          <View style={{width: 40, height: 40}}>
                            <Image source={{uri: 'https://cdn.dribbble.com/users/1355613/screenshots/6317190/smoking_hot_2x.jpg'}} style={{width:'100%', height: '100%', borderRadius: 100, resizeMode: 'cover'}}/>
                          </View>
                        </View>
                        <View style={{width: '85%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                          <TextInput value={this.state.child} onChangeText = {(txt) => this.setState({child: txt})} placeholder="Give us review" style={[common.fontbody, {paddingRight: 40, fontSize: 14, color: '#444',width: '100%', height: 42, borderRadius: 20, paddingHorizontal: 15, backgroundColor: '#fff'}]}/>
                          <View style={{position: 'absolute', height: 32, width: 32, right: 10}}>
                            <TouchableOpacity onPress={(e) => this.commentToStuff()} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                              <Ionicons name="ios-color-wand" size={22} color="#444"/>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </Animated.View>
                  </View>
                </View>
              </View>
            )
          }}
        </Query>
      )
    } else {
      return <View style={[common.container, {backgroundColor: '#f6f5f3'}]}></View>
    }
  }
}

export default compose(
  graphql(COMMENT_TO_STUFF, {
    name: 'comment_to_stuff'
  }),
  graphql(CURRENT_USER, {
    name: 'current_user',
    options: (props) => ({
      fetchPolicy: 'network-only'
    }),
    props: ({current_user: {current_user}}) => ({current_user})
  })
)(ReviewStuff);
