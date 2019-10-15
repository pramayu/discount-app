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
                <View style={{width: '100%', height: height / 2}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    {this.renderPicture(data.stuff.stuff.photos)}
                  </View>
                  <View style={{width: '100%', height: 60, position: 'absolute', bottom: 0, borderTopLeftRadius: 30, backgroundColor: '#f6f5f3', zIndex: 14}}></View>
                </View>
                <View style={{width: '100%', height: height / 2}}></View>
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
