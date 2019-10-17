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


class StuffBuyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: '',
      stuffID: ''
    }
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

  render() {
    var { width, height } = Dimensions.get('window');
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
            return (
              <View style={[common.container, { backgroundColor: '#f6f5f3'}]}>
                <View style={{width: '100%', height: 80, backgroundColor: 'rgba(255,255,255,.0)', position: 'absolute', top: 0, zIndex: 15, paddingHorizontal: 20}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                      <TouchableOpacity style={{height: '100%', justifyContent: 'center'}}>
                        <Ionicons name="ios-arrow-round-back" size={28} color="#f6f5f3"/>
                      </TouchableOpacity>
                    </View>
                    <View style={{width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}></View>
                    <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
                      <TouchableOpacity style={{height: '100%', justifyContent: 'center'}}>
                        <Ionicons name="ios-archive" size={18} color="#f6f5f3"/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{width: '100%', height: height / 1.9}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    {this.renderPicture(data.stuff.stuff.photos)}
                  </View>
                  <View style={{width: 40, height: 40, borderRadius: 50, backgroundColor: '#f6f5f3', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 50, elevation: 10, marginLeft: 30, zIndex: 16}}>
                    <TouchableOpacity style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: '#ea4c89'}}>
                      <Ionicons name="ios-heart" size={24} color="#f6f5f3"/>
                    </TouchableOpacity>
                  </View>
                  <View style={{width: '100%', height: 70, paddingHorizontal: 20, position: 'absolute', bottom: 0, borderTopLeftRadius: 20, backgroundColor: '#f6f5f3', zIndex: 14}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flex: .75, paddingTop: 25}}>
                        <Text style={[common.fontitle, {fontSize: 18, color: '#444',lineHeight: 26}]}>{data.stuff.stuff.title}</Text>
                      </View>
                      <View style={{flex: .25, paddingTop: 20, alignItems: 'flex-end'}}>
                        <Text style={[common.fontitle, {fontSize: 24, color: '#444'}]}>50%</Text>
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
                  <Text style={[common.fontitle, {fontSize: 16, color: '#444'}]}>IDR 35000 / <Text style={{fontSize: 12, color: '#7f8082'}}>IDR {data.stuff.stuff.price}</Text></Text>
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
                        <Text style={[common.fontitle, {fontSize: 12, color: '#444'}]}>145+</Text>
                        <Text style={[common.fontitle, {fontSize: 10, color: '#444'}]}>VOTES</Text>
                      </View>
                      <View style={{width: 70, height: 70, backgroundColor: '#ececec', borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                        <Ionicons size={24} color="#dbd9d9" name="ios-paper-plane"/>
                        <Text style={[common.fontitle, {fontSize: 10, color: '#444'}]}>MORE</Text>
                        <Text style={[common.fontitle, {fontSize: 10, color: '#444'}]}>INFO</Text>
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
  })
)(StuffBuyer);
