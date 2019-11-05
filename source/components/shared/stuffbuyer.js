import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Image,
  Animated, TextInput, TouchableHighlight,
  ScrollView
} from 'react-native';
import _ from 'lodash';
import {compose, graphql, Query} from 'react-apollo';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { common } from '../../assets/stylesheets/common';
import { titleCase, countDiscount } from './sharedaction';
import { GET_STUFF } from '../../queries/queryStuff';
import { CURRENT_USER } from '../../queries/queryUser';
import { ADD_TO_CART, GET_USER_CART } from '../../queries/queryCart';
import { ADD_VOTE_STUFF, UNVOTE_STUFF } from '../../queries/queryVote';


class StuffBuyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: '',
      stuffID: '',
      bottomSheetStatus: false
    }
    this.bottomSheetUp = new Animated.Value(0);
    this.bottomSheetDw = new Animated.Value(0);
    this.moveBottomsLf = new Animated.Value(0);
    this.moveBottomsRg = new Animated.Value(0);
    this.pushVote      = new Animated.Value(0);
  }
  componentDidMount = () => {
    var {stuff_id} = this.props.navigation.state.params;
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true)
    });
    this.setState({
      stuffID: stuff_id ? stuff_id : ''
    })
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      current_user        : nextProps.current_user ? nextProps.current_user : '',
    })
  }

  componentWillUnmount = () => {
    this._navListener.remove()
  }

  bottomSheetAnimatedUp = () => {
    Animated.parallel([
      Animated.timing(this.moveBottomsLf, {
        toValue: 1,
        duration: 400
      }),
      Animated.timing(this.bottomSheetUp, {
        toValue: 1,
        duration: 500
      })
    ]).start((e) => {
      this.setState({ bottomSheetStatus: true });
      this.bottomSheetDw.setValue(0);
      this.moveBottomsRg.setValue(0);
    })
  };

  bottomSheetAnimatedDw = () => {
    Animated.parallel([
      Animated.timing(this.bottomSheetDw, {
        toValue: 1,
        duration: 500
      }),
      Animated.timing(this.moveBottomsRg, {
        toValue: 1,
        duration: 400
      })
    ]).start((e) => {
      this.setState({ bottomSheetStatus: false });
      this.bottomSheetUp.setValue(0);
      this.moveBottomsLf.setValue(0);
    })
  };

  truncate = (str, limit) => {
    return str.split(" ").splice(0, limit).join(" ");
  }

  renderPicture = (pictures) => {
    var {width, height} = Dimensions.get('window');
    return _.map(pictures, (picture, index) => {
      return (
        <View key={index} style={{width: width, height: height / 2.2}}>
          <Image source={{uri: picture.secureUrl}} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
          <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,.1)', position: 'absolute'}}></View>
        </View>
      )
    })
  }

  renderCategorimap = (categori) => {
    var and = [];
    for(var i=0; i<categori.length; i++) {
      and.push(" * ")
    }
    return categori.map((ctg, index) => {
      return <Text key={index} style={[common.fontbody, {marginRight: 5, fontSize: 12, color: '#aa9460',alignSelf: 'flex-start', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 4, backgroundColor: '#e2cb93'}]}>{ctg.child.toUpperCase()}</Text>
    })
  }

  setTrueDiscount = (discounts) => {
    var trueDiscount = _.filter(discounts, (discount) => discount.status === true);
    return <Text style={[common.fontbody, {color: '#7f8082',alignSelf: 'flex-start', paddingVertical: 5}]}>
      <Text>{titleCase(trueDiscount[0].discountype.child)} *</Text>
      <Text> {trueDiscount[0].quantity.length > 0 ? `${trueDiscount[0].quantity}` : null} {trueDiscount[0].discountype.child === 'limit people' ? 'People *' : trueDiscount[0].discountype.child === 'purchase quantity' ? 'Stuffs *' : null}</Text>
      <Text> {countDiscount(trueDiscount[0].enddate)} Days Left</Text>
    </Text>
  }

  addToCart = async(stuffID) => {
    var res = await this.props.add_to_cart({
      variables: {
        stuffID: stuffID,
        userID: this.state.current_user._id
      },
      refetchQueries: [{
        query: GET_USER_CART,
        variables: {
          usercartprop: {
            userID: this.state.current_user._id,
            stuffID: stuffID
          }
        }
      }]
    });
    var { status, error, cart } = res.data.add_to_cart;
  }

  addVoteToStuff = async(stuffID) => {
    var res = await this.props.add_vote_stuff({
      variables: {
        voteprop: {
          userID: this.state.current_user._id,
          stuffID: stuffID
        }
      },
      refetchQueries: [{
        query: GET_STUFF,
        variables: {stuffID: stuffID}
      }]
    });
    var {status, error} = res.data.add_vote_stuff;
    if(status === true) {
      Animated.timing(this.pushVote, {
        toValue: 2,
        duration: 200
      }).start((e) => this.pushVote.setValue(0))
    }
  }

  unvoteToStuff = async (stuffID, voteID) => {
    var res = await this.props.unvote_stuff({
      variables: {
        voteprop: {
          userID: this.state.current_user._id,
          stuffID: stuffID,
          voteID: voteID
        }
      },
      refetchQueries: [{
        query: GET_STUFF,
        variables: {stuffID: stuffID}
      }]
    });
    var {status, error} = res.data.unvote_stuff;
    if(status === true) {
      Animated.timing(this.pushVote, {
        toValue: 2,
        duration: 200
      }).start((e) => this.pushVote.setValue(0))
    }
  }

  renderDiscount = (discounts) => {
    var trueDiscount = _.filter(discounts, (discount) => discount.status === true);
    return trueDiscount;
  }

  renderRules = (rules) => {
    return _.map(rules, (rule, index) => {
      return <Text key={index} style={[common.fontbody, {color: '#7f8082', lineHeight: 21}]}># {rule.child}</Text>
    })
  }

  renderFacilities = (facilities) => {
    return _.map(facilities, (faciliti, index) => {
      return <Text key={index} style={[common.fontbody, {color: '#7f8082', lineHeight: 21}]}># {faciliti.child}</Text>
    })
  }

  renderStoreLocation = (locations) => {
    return _.map(locations, (location, index) => {
      return <Text key={index} style={[common.fontbody, {color: '#7f8082', lineHeight: 21}]}># {location.address}</Text>
    })
  }

  renderGetUserCart = (stuffID, userID) => {
    return (
      <Query query={GET_USER_CART} variables={{
          usercartprop: {
            userID: userID,
            stuffID: stuffID
          }
        }}>
        {({loading, error, data}) => {
          if(loading) {
            return (
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                <View style={{borderTopLeftRadius: 20, borderBottomLeftRadius: 20,flex: .6, justifyContent: 'center', alignItems: 'flex-end',paddingRight: 10, height: 55, backgroundColor: '#444'}}>
                  <Text style={[common.fontitle, {color: '#f6f5f3', fontSize: 16}]}>ADD TO CART</Text>
                </View>
                <View style={{borderTopRightRadius: 20, borderBottomRightRadius: 20, flex: .4, justifyContent: 'center', alignItems: 'flex-start', height: 55, backgroundColor: '#444'}}>
                  <Ionicons name="ios-arrow-round-forward" size={28} color="#f6f5f3"/>
                </View>
              </View>
            )
          }
          return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
              <View style={{borderTopLeftRadius: 20, borderBottomLeftRadius: 20,flex: .6, justifyContent: 'center', alignItems: 'flex-end',paddingRight: 10, height: 55, backgroundColor: '#393b47'}}>
                {
                  data.get_user_cart.status === false ?
                  <Text style={[common.fontitle, {color: '#f6f5f3', fontSize: 16}]}>ADD TO CART</Text> : <Text style={[common.fontitle, {color: '#f6f5f3', fontSize: 16}]}>ALREADY IN CART</Text>
                }
              </View>
              <View style={{borderTopRightRadius: 20, borderBottomRightRadius: 20, flex: .4, justifyContent: 'center', alignItems: 'flex-start', height: 55, backgroundColor: '#393b47'}}>
                <Ionicons name="ios-arrow-round-forward" size={28} color="#f6f5f3"/>
              </View>
              {
                data.get_user_cart.status === false ?
                <TouchableOpacity onPress={(e) => this.addToCart(stuffID)} style={{width: '100%', height: 55, position: 'absolute', borderRadius: 20}}>
                  <Text></Text>
                </TouchableOpacity> : null
              }
            </View>
          )
        }}
      </Query>
    )
  }

  renderVoteStatus = (votes, stuffID) => {
    var voter = _.filter(votes, (vote) => {return vote.voter._id === this.state.current_user._id});
    if(voter.length > 0) {
      return (
        <TouchableOpacity onPress={(e) => this.unvoteToStuff(stuffID, voter[0]._id)} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: '#ea4c89'}}>
          <Ionicons name="ios-heart" size={24} color="#f6f5f3"/>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={(e) => this.addVoteToStuff(stuffID)} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: '#f6f5f3'}}>
          <Ionicons name="ios-heart" size={24} color="#ea4c89"/>
        </TouchableOpacity>
      )
    }
  }

  render() {
    var { width, height } = Dimensions.get('window');
    var bottomSheetUpSty = this.bottomSheetUp.interpolate({
      inputRange: [0, 1],
      outputRange: [height + 40, 0]
    });
    var moveBottomsLfSty = this.moveBottomsLf.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -width]
    });
    var bottomSheetDwSty = this.bottomSheetDw.interpolate({
      inputRange: [0, 1],
      outputRange: [0, height + 40]
    });
    var moveBottomsRgSty = this.moveBottomsRg.interpolate({
      inputRange: [0, 1],
      outputRange: [-width, 0]
    });
    var pushVoteSty = this.pushVote.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -50, 0]
    });
    if(this.state.stuffID.length > 0) {
      return (
        <Query query={GET_STUFF} variables={{stuffID: this.state.stuffID}}>
          {({loading, error, data}) => {
            if(loading) {
              return (
                <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
                </View>
              )
            }
            var trueDiscount = this.renderDiscount(data.stuff ? data.stuff.stuff.discounts : [])
            return (
              <View style={[common.container, { backgroundColor: '#f6f5f3'}]}>
                <View style={{width: '100%', height: 80, backgroundColor: 'rgba(255,255,255,.0)', position: 'absolute', top: 0, zIndex: 15, paddingHorizontal: 20}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                      <TouchableOpacity onPress={(e) => this.props.navigation.goBack()} style={{height: '100%', justifyContent: 'center'}}>
                        <Ionicons name="ios-arrow-round-back" size={28} color="#f6f5f3"/>
                      </TouchableOpacity>
                    </View>
                    <View style={{width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}></View>
                    <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
                      <TouchableOpacity style={{height: '100%', justifyContent: 'center'}}>
                        {/*<Ionicons name="ios-archive" size={18} color="#f6f5f3"/> */}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{width: '100%', height: height / 1.9}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    {this.renderPicture(data.stuff.stuff.photos)}
                  </View>
                  <Animated.View style={{transform: [{translateX: this.state.bottomSheetStatus === false ? moveBottomsLfSty : moveBottomsRgSty}, {translateY: pushVoteSty}], position: 'absolute', width: 40, height: 40, borderRadius: 50, backgroundColor: '#f6f5f3', justifyContent: 'center', alignItems: 'center', bottom: 50, elevation: 10, marginLeft: 30, zIndex: 16}}>
                    {this.renderVoteStatus(data.stuff.stuff.vote, data.stuff.stuff._id)}
                  </Animated.View>
                  <View style={{width: '100%', height: 70, paddingHorizontal: 20, position: 'absolute', bottom: 0, borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: '#f6f5f3', zIndex: 14}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flex: .75, paddingTop: 25}}>
                        <Text style={[common.fontitle, {fontSize: 18, color: '#444',lineHeight: 26}]}>{data.stuff.stuff.title}</Text>
                      </View>
                      <View style={{flex: .25, paddingTop: 20, alignItems: 'flex-end'}}>
                        <Text style={[common.fontitle, {fontSize: 24, color: '#444'}]}>{trueDiscount[0].discount}%</Text>
                        <Text style={[common.fontitle, {fontSize: 12, color: '#444'}]}>DISCOUNT</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{width: '100%', height: height / 2, paddingHorizontal: 20}}>
                  <View style={{width: '100%', minHeight: 30}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      {this.renderCategorimap(data.stuff.stuff.categori)}
                    </View>
                  </View>
                  <View style={{width: '100%', height: 30}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      { this.setTrueDiscount(data.stuff.stuff.discounts) }
                    </View>
                  </View>
                  <Text style={[common.fontitle, {fontSize: 16, color: '#444'}]}>IDR {Math.round(parseInt(data.stuff.stuff.price) - (parseInt(data.stuff.stuff.price) * parseInt(trueDiscount[0].discount) / 100))} / <Text style={{fontSize: 12, color: '#7f8082'}}>IDR {data.stuff.stuff.price}</Text></Text>
                  <View style={{width: '100%', paddingRight: '15%', paddingTop: 10}}>
                    <Text style={[common.fontbody, {color: '#444', lineHeight: 20}]}>{this.truncate(data.stuff.stuff.description, 18)} <Text style={{fontSize: 12}}>{data.stuff.stuff.description.split(" ").length > 18 ? ' [...]' : null}</Text></Text>
                  </View>
                  <View style={{width: '100%', height: 90}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                      <View style={{width: 70, height: 70, backgroundColor: '#ececec', borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                        <Ionicons size={24} color="#dbd9d9" name="ios-chatbubbles"/>
                        <Text style={[common.fontitle, {fontSize: 12, color: '#444'}]}>140+</Text>
                        <Text style={[common.fontitle, {fontSize: 10, color: '#444'}]}>REVIEWS</Text>
                      </View>
                      <View style={{width: 70, height: 70, backgroundColor: '#ececec', borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                        <Ionicons size={24} color="#dbd9d9" name="ios-card"/>
                        <Text style={[common.fontitle, {fontSize: 12, color: '#444'}]}>80</Text>
                        <Text style={[common.fontitle, {fontSize: 10, color: '#444'}]}>BOUGHT</Text>
                      </View>
                      <View style={{width: 70, height: 70, backgroundColor: '#ececec', borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                        <Ionicons size={24} color="#dbd9d9" name="ios-heart"/>
                        <Text style={[common.fontitle, {fontSize: 12, color: '#444'}]}>{data.stuff.stuff.vote.length}+</Text>
                        <Text style={[common.fontitle, {fontSize: 10, color: '#444'}]}>VOTES</Text>
                      </View>
                      <View style={{width: 70, height: 70, backgroundColor: '#ececec', borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                        <Ionicons size={24} color="#dbd9d9" name="ios-paper-plane"/>
                        <Text style={[common.fontitle, {fontSize: 10, color: '#444'}]}>MORE</Text>
                        <Text style={[common.fontitle, {fontSize: 10, color: '#444'}]}>INFO</Text>
                        <TouchableOpacity onPress={(e) => this.bottomSheetAnimatedUp()} style={{width: '100%', height: '100%', position: 'absolute'}}></TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={{width: '100%', height: height / 10, marginTop: 30}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flex: .75}}>
                        {this.renderGetUserCart(this.state.stuffID, this.state.current_user._id)}
                      </View>
                      <View style={{flex: .25, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={(e) => this.props.navigation.navigate('ReviewStuff', {stuffID: data.stuff.stuff._id, merchantID: data.stuff.stuff.merchant._id})} style={{width: '80%', height: 55, backgroundColor: '#e2cb93', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
                          <Ionicons name="ios-chatbubbles" size={28} color="#aa9460"/>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <Animated.View style={{position: 'absolute', width: width, height: height + 30, justifyContent: 'flex-end', zIndex: 17, transform: [{translateY: this.state.bottomSheetStatus === false ? bottomSheetUpSty : bottomSheetDwSty}]}}>
                  <View style={{width: '100%', height: 20, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={(e) => this.bottomSheetAnimatedDw()} style={{width: 40, height: 20, justifyContent: 'center'}}>
                      <View style={{width: 40, height: 4, backgroundColor: '#f6f5f3', borderRadius: 20}}></View>
                    </TouchableOpacity>
                  </View>
                  <View style={{width: '100%', height: height / 1.5, backgroundColor: '#f6f5f3', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 20}}>
                    <View style={{width: '100%', height: 70, marginTop: 30}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: '22%', height: '100%'}}>
                          <View style={{width: 60, height: 60}}>
                            <Image source={{uri: data.stuff.stuff.merchant.photos[0].secureUrl}} style={{width: '100%', height: '100%', borderRadius: 50, resizeMode: 'cover'}}/>
                          </View>
                        </View>
                        <View style={{width: '78%', height: '100%'}}>
                          <Text style={[common.fontitle, {color: '#444'}]}>{data.stuff.stuff.merchant.name}</Text>
                          <Text style={[common.fontbody, {color: '#7f8082', marginTop: 5}]}>{data.stuff.stuff.merchant.sosmed}</Text>
                          <View style={{width: '100%', height: 34}}>
                            <View style={{flex: 1, flexDirection: 'row', paddingTop:5}}>
                              <Ionicons name="ios-ribbon" size={18} color="#7f8082" style={{alignSelf: 'flex-start', marginRight: 5}}/>
                              <Text style={[common.fontbody, {color: '#7f8082', marginRight: 10, paddingTop: 2}]}>4.6</Text>
                              <Ionicons name="ios-person" size={18} color="#7f8082" style={{alignSelf: 'flex-start', marginRight: 5}}/>
                              <Text style={[common.fontbody, {color: '#7f8082', marginRight: 10, paddingTop: 2}]}>500 follower</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginTop: 20, marginBottom: 5}]}><Ionicons name="ios-pin" size={18} color="#444"/>  STORE LOCATION</Text>
                    {this.renderStoreLocation(data.stuff.stuff.merchant.location)}
                    <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginTop: 20, marginBottom: 5}]}><Ionicons name="ios-repeat" size={18} color="#444"/>  RULES EXCHANGE</Text>
                    {this.renderRules(data.stuff.stuff.merchant.rules)}
                    <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginTop: 20, marginBottom: 5}]}><Ionicons name="ios-play-circle" size={18} color="#444"/>  FACILITIES</Text>
                    {this.renderFacilities(data.stuff.stuff.merchant.facilities)}
                  </View>
                </Animated.View>
              </View>
            )
          }}
        </Query>
      )
    }
    else {
      return (
        <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
        </View>
      )
    }
  }
}

export default compose(
  graphql(CURRENT_USER, {
    name: 'current_user',
    options: (props) => ({
      fetchPolicy: 'network-only'
    }),
    props: ({current_user: {current_user}}) => ({current_user})
  }),
  graphql(ADD_TO_CART, {
    name: 'add_to_cart'
  }),
  graphql(ADD_VOTE_STUFF, {
    name: 'add_vote_stuff'
  }),
  graphql(UNVOTE_STUFF, {
    name: 'unvote_stuff'
  })
)(StuffBuyer);
