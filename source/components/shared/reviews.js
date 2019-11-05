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
import images from '../../assets/images/images';
import {COMMENT_TO_STUFF, COMMENT_STUFF, EDIT_COMMENT_STUFF, DELETE_COMMENT_STUFF} from '../../queries/queryComment';
import {REPLY_TO_COMMENT_STUFF, DELETE_REPLY_COMMENT} from '../../queries/querySubcomment';
import {CURRENT_USER} from '../../queries/queryUser';


class ReviewStuff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyAnimatedStatus: false,
      keyHeight: 0,
      stuffID: '',
      merchantID: '',
      child: '',
      current_user: '',
      commentID: '',
      merchantID: '',
      editstatus: false,
      rate: '0',
      typingstatus: false,
      reply: false,
      placeholder: 'Give us review'
    }
    this.animatedTextInputUp = new Animated.Value(0);
    this.animatedTextInputDw = new Animated.Value(0);
    this.animatedEmoticonSw  = new Animated.Value(0);
    this.animatedEmoticonHd  = new Animated.Value(0);
  }

  componentDidMount = () => {
    var {stuffID, merchantID} = this.props.navigation.state.params;
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
    this.setState({ stuffID: stuffID, merchantID: merchantID })
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
    this.setState({keyHeight: e.endCoordinates.height, typingstatus: true});
    this.animatedTextInputUpServ()
  }

  _keyboardDidHide() {
    this.setState({typingstatus: false, rate: '0', child: '', editstatus: false, reply: false});
    this.animatedTextInputDwServ()
  }

  commentToStuff = async() => {
    if(this.state.child.length > 0 && this.state.rate.length > 0) {
      var res = await this.props.comment_to_stuff({
        variables: {
          commentprop: {
            child       : this.state.child,
            stuffID     : this.state.stuffID,
            userID      : this.state.current_user._id,
            rate        : this.state.rate,
            merchantID  : this.state.merchantID
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
  }

  setCommentPost = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  setCommentEdit = (comment) => {
    this.setState({
      child         : comment.child,
      commentID     : comment._id,
      editstatus    : true
    });
  };

  handleStoreComment = async() => {
    var res = await this.props.edit_comment_stuff({
      variables: {
        commentprop: {
          userID      : this.state.current_user._id,
          stuffID     : this.state.stuffID,
          commentID   : this.state.commentID,
          child       : this.state.child
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
    var {status, error} = res.data.edit_comment_stuff;
    if(status === true) {
      this.setState({
        child: '',
        editstatus: false
      });
      Keyboard.dismiss();
    }
  };

  deleteCommentStuff = async(commentID) => {
    var res = await this.props.delete_comment_stuff({
      variables: {
        commentprop: {
          userID    : this.state.current_user._id,
          stuffID   : this.state.stuffID,
          commentID : commentID
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
    })
  }

  replyToCommentStuff = async() => {
    if(this.state.child.length > 0) {
      var res = await this.props.reply_to_comment_stuff({
        variables: {
          subcommentprop: {
            userID: this.state.current_user._id,
            merchantID: this.state.merchantID,
            commentID: this.state.commentID,
            child: this.state.child
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
      var {status, error} = res.data.reply_to_comment_stuff;
      if(status === true) {
        this.setState({
          child: '',
          reply: false
        });
        Keyboard.dismiss();
      }
    }
  }

  deleteReplyComment = async(subcommentID) => {
    var res = await this.props.delete_reply_comment({
      variables: {
        subcommentprop: {
          userID: this.state.current_user._id,
          subcommentID: subcommentID
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
    })
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

  _renderSubComment = (replies) => {
    return _.map(replies, (reply, index) => {
      return (
        <View key={index} style={{width: '100%'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '20%'}}>
              <View style={{width: 35, height: 35}}>
                <Image source={{uri: reply.merchant ? reply.merchant.photos[0].secureUrl : reply.user.photos[0].secureUrl}} style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 60}}/>
              </View>
            </View>
            <View style={{width: '80%'}}>
              <Text style={[{fontFamily: 'Oswald', fontSize: 14, color: '#444'}]}>{reply.merchant ? reply.merchant.name : reply.user.fullname ? reply.user.fullname : reply.user.username} <Text style={[{fontFamily: 'Oswald', color: '#7f8082', fontSize: 12, marginLeft: 15}]}>2h ago.</Text></Text>
              <Text style={[common.fontbody, {color: '#7f8082', marginTop: 5, lineHeight: 20, paddingTop: 5, paddingBottom: 7, paddingHorizontal: 10, borderRadius: 6, backgroundColor: '#f0f0f0', marginBottom: 5}]}>{reply.child}</Text>
              <View style={{width: '100%', height: 16, alignItems: 'flex-end'}}>
                {
                  this.state.current_user._id === reply.user._id ?
                  <View style={{width: '100%', height: 20}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <View style={{width: '12%', height: '100%'}}>
                      </View>
                      <View style={{width: '12%', height: '100%'}}>
                        <TouchableOpacity onPress={(e) => this.deleteReplyComment(reply._id)} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                          <Ionicons name="ios-flame" size={18} color="#dbd9d9"/>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View> :
                  <TouchableOpacity style={{width: '20%', height: '100%', alignItems: 'flex-end'}}>
                    <Text style={[common.fontbody, {color: '#dbd9d9', fontSize: 12}]}>REPLY</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
          </View>
        </View>
      )
    })
  }

  _renderComment = (comments) => {
    var {width, height} = Dimensions.get('window');
    return _.map(comments, (comment, index) => {
      return (
        <View key={index} style={{width: '100%'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '17%'}}>
              <View style={{width: 35, height: 35, borderRadius: 60}}>
                <Image source={{uri: comment.user.photos[0].secureUrl}} style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 60}}/>
              </View>
            </View>
            <View style={{width: '83%', paddingTop: 3}}>
              <View style={{width: '100%', height: 24}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: .7}}>
                    <Text style={[common.fontbody, {fontSize: 14, color: '#444'}]}>{comment.user.fullname.length > 0 ? comment.user.fullname : comment.user.username} <Text style={[common.fontbody, {color: '#7f8082', fontSize: 12, marginLeft: 15}]}>5d ago.</Text></Text>
                  </View>
                  <View style={{flex: .3, alignItems: 'flex-end'}}>
                    {
                      comment.rate.scale === '1' ?
                        <View style={{width: 24, height: 24}}>
                          <Image source={images.icon_1} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
                        </View>:
                      comment.rate.scale === '2' ?
                        <View style={{width: 24, height: 24}}>
                          <Image source={images.icon_2} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
                        </View>:
                      comment.rate.scale === '3' ?
                        <View style={{width: 24, height: 24}}>
                          <Image source={images.icon_3} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
                        </View>:
                      comment.rate.scale === '4' ?
                        <View style={{width: 24, height: 24}}>
                          <Image source={images.icon_4} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
                        </View>:
                      comment.rate.scale === '5' ?
                        <View style={{width: 24, height: 24}}>
                          <Image source={images.icon_5} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
                        </View>: null
                    }
                  </View>
                </View>
              </View>
              <Text style={[common.fontbody, {color: '#7f8082', marginTop: 5, lineHeight: 20, paddingTop: 7, paddingBottom: 9, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#f0f0f0', marginBottom: 5}]}>{comment.child}</Text>
                {
                  this.state.current_user._id === comment.user._id ?
                  <View style={{width: '100%', height: 20}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <View style={{width: '12%', height: '100%'}}>
                        <TouchableOpacity onPress={(e) => this.setCommentEdit(comment)} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                          <Ionicons name="ios-swap" size={18} color="#dbd9d9"/>
                        </TouchableOpacity>
                      </View>
                      <View style={{width: '12%', height: '100%'}}>
                        <TouchableOpacity onPress={(e) => this.deleteCommentStuff(comment._id)} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                          <Ionicons name="ios-flame" size={18} color="#dbd9d9"/>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View> :
                  <View style={{width: '100%', height: 16, alignItems: 'flex-end'}}>
                    {
                      this.state.reply === true ?
                      <TouchableOpacity onPress={(e) => this.setState({reply: false, child: '', placeholder: 'Give us review', commentID: ''})} style={{width: '20%', height: '100%', alignItems: 'flex-end'}}>
                        <Text style={[common.fontbody, {color: '#dbd9d9', fontSize: 12}]}>TERMINATE</Text>
                      </TouchableOpacity> :
                      <TouchableOpacity onPress={(e) => this.setState({reply: true, placeholder: 'Give reply', commentID: comment._id})} style={{width: '20%', height: '100%', alignItems: 'flex-end'}}>
                        <Text style={[common.fontbody, {color: '#dbd9d9', fontSize: 12}]}>REPLY</Text>
                      </TouchableOpacity>
                    }
                  </View>
                }
              {this._renderSubComment(comment.subcomment)}
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
                          <TouchableOpacity onPress={(e) => this.setState({rate: '1'})} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}>
                            {
                              this.state.rate === '1' ?
                              <Image source={images.icon_1} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>:
                              <Image source={images.icon_1_greyscale} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
                            }
                          </TouchableOpacity>
                        </View>
                        <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                          <TouchableOpacity onPress={(e) => this.setState({rate: '2'})} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}>
                            {
                              this.state.rate === '2' ?
                              <Image source={images.icon_2} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>:
                              <Image source={images.icon_2_greyscale} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
                            }
                          </TouchableOpacity>
                        </View>
                        <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                          <TouchableOpacity onPress={(e) => this.setState({rate: '3'})} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}>
                            {
                              this.state.rate === '3' ?
                              <Image source={images.icon_3} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>:
                              <Image source={images.icon_3_greyscale} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
                            }
                          </TouchableOpacity>
                        </View>
                        <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                          <TouchableOpacity onPress={(e) => this.setState({rate: '4'})} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}>
                            {
                              this.state.rate === '4' ?
                              <Image source={images.icon_4} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>:
                              <Image source={images.icon_4_greyscale} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
                            }
                          </TouchableOpacity>
                        </View>
                        <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                          <TouchableOpacity onPress={(e) => this.setState({rate: '5'})} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}>
                            {
                              this.state.rate === '5' ?
                              <Image source={images.icon_5} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>:
                              <Image source={images.icon_5_greyscale} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
                            }
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </Animated.View>
                <View style={{width: width, height: height}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{width: '100%', height: height - 80, marginTop: 20, paddingHorizontal: 20, paddingTop: 50}}>
                      <View style={{flex: 1, flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
                        { this.state.typingstatus === false? this._renderComment(data.comment_stuff ? data.comment_stuff : []) : null}
                      </View>
                    </View>
                    {/*form*/}
                    <Animated.View style={{backgroundColor: '#f6f5f3',width: '100%', height: 80, transform: [{translateY: this.state.keyAnimatedStatus === false ? animatedTextInputUpSty : animatedTextInputDwSty}]}}>
                      <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 20}}>
                        <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                          <TextInput returnKeyType="done" value={this.state.child} onChangeText = {(txt) => this.setCommentPost('child', txt)} placeholder={this.state.placeholder} style={[common.fontbody, {paddingRight: 40, fontSize: 14, color: '#444',width: '100%', height: 42, borderRadius: 20, paddingHorizontal: 15, backgroundColor: '#fff'}]}/>
                          <View style={{position: 'absolute', height: 32, width: 32, right: 10}}>
                            {
                              this.state.editstatus === true ?
                              <TouchableOpacity onPress={(e) => this.handleStoreComment()} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <Ionicons name="ios-color-wand" size={22} color="#444"/>
                              </TouchableOpacity> :
                              this.state.reply === true ?
                              <TouchableOpacity onPress={(e) => this.replyToCommentStuff()} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <Ionicons name="ios-color-wand" size={22} color="#444"/>
                              </TouchableOpacity> :
                              <TouchableOpacity onPress={(e) => this.commentToStuff()} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <Ionicons name="ios-color-wand" size={22} color="#444"/>
                              </TouchableOpacity>
                            }
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
  graphql(EDIT_COMMENT_STUFF, {
    name: 'edit_comment_stuff'
  }),
  graphql(DELETE_COMMENT_STUFF, {
    name: 'delete_comment_stuff'
  }),
  graphql(REPLY_TO_COMMENT_STUFF, {
    name: 'reply_to_comment_stuff'
  }),
  graphql(DELETE_REPLY_COMMENT, {
    name: 'delete_reply_comment'
  }),
  graphql(CURRENT_USER, {
    name: 'current_user',
    options: (props) => ({
      fetchPolicy: 'network-only'
    }),
    props: ({current_user: {current_user}}) => ({current_user})
  })
)(ReviewStuff);
