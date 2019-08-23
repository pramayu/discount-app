import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, TouchableHighlight,
  TextInput, Dimensions,
  Animated, Image, ScrollView
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import {
  common
} from '../../assets/stylesheets/common';
import {
  CURRENT_USER
} from '../../queries/queryUser';

class StuffDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      picture: [],
      title: '',
      price: '',
      description: '',
      categori: [],
      c_id: '',
      cusername: '',
      cpicture: [],
      m_id: '',
      mname: '',
      mpicture: [],
      discountstatus: false,
      stuffstatus: false,
      current_user: ''
    }
  }

  componentDidMount = () => {
    var { stuff } = this.props.navigation.state.params;
    this.setState({
      picture         : stuff ? stuff.photos            : [],
      title           : stuff ? stuff.title             : '',
      price           : stuff ? stuff.price             : '',
      description     : stuff ? stuff.description       : '',
      categori        : stuff ? stuff.categori          : [],
      c_id            : stuff ? stuff.manager._id       : '',
      cusername       : stuff ? stuff.manager.username  : '',
      cpicture        : stuff ? stuff.manager.photos  : [],
      m_id            : stuff ? stuff.merchant._id      : '',
      mname           : stuff ? stuff.merchant.name     : '',
      mpicture        : stuff ? stuff.merchant.photos   : [],
      discountstatus  : stuff ? stuff.discountstatus    : false,
      stuffstatus     : stuff ? stuff.stuffstatus       : false
    })
  }

  stuffpicture = (picture) => {
    var { width, height } = Dimensions.get('window');
    return picture.map((picture, index) => {
      return (
        <View key={index} style={{width: width, height: height / 2}}>
          <Image source={{uri: picture.secureUrl}} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
          <View style={{zIndex: 9, width: '100%', height: '100%', position: 'absolute', top: 0, backgroundColor: 'rgba(0,0,0,.1)'}}></View>
        </View>
      )
    })
  };

  categorimap = (categori) => {
    var and = [];
    for(var i=0; i<categori.length; i++) {
      and.push(" / ")
    }
    return categori.map((ctg, index) => {
      return <Text key={index} style={[common.fontbody, {color: '#7f8082',alignSelf: 'flex-start', paddingVertical: 5}]}>{ctg.child.charAt(0).toUpperCase() + ctg.child.substring(1)}{index < categori.length - 1 ? and[index] : null}</Text>
    })
  }

  render() {
    var { width, height } = Dimensions.get('window');
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3'}]}>
        <StatusBar translucent backgroundColor={'transparent'} barStyle="light-content"/>
        <View style={{width: width, height: height / 2}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
              { this.stuffpicture(this.state.picture) }
            </ScrollView>
            <View style={{width: '100%', height: 38, position: 'absolute', zIndex: 10, justifyContent: 'flex-start', top: 35, paddingHorizontal: 20}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: .5}}>
                  <TouchableHighlight onPress={(e) => this.props.navigation.goBack()} style={{justifyContent: 'center', alignItems: 'center',borderWidth: 1, borderColor: 'rgba(255,255,255,.6)' ,width: 45, height: 28, backgroundColor: 'rgba(246,245,243,.5)', borderRadius: 4}}>
                    <Ionicons name="ios-arrow-round-back" size={24} color="#444"/>
                  </TouchableHighlight>
                </View>
                <View style={{flex: .5, alignItems: 'flex-end'}}>
                  <TouchableOpacity style={{width: 34, height: 34, borderRadius: 40, elevation: 20}}>
                    {
                      this.state.mpicture.length > 0 ?
                      <Image source={{uri: this.state.mpicture[0].secureUrl}} style={{borderWidth: 1, borderColor: '#fff', width: '100%', height: '100%', borderRadius: 40, resizeMode: 'cover'}}/> : null
                    }
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{width: width, height: height, marginTop: -30, paddingHorizontal: 20, paddingTop: 25, borderRadius: 25, backgroundColor: '#f6f5f3'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{width: '100%', height: 45, flexDirection: 'row'}}>
              <View style={{width: '70%'}}>
                <Text style={[common.fontitle, {fontSize: 15, color: '#444'}]}>{this.state.title}</Text>
                <View style={{width: '100%', height: 14, justifyContent: 'center'}}>
                  <View style={{width: '100%', flexDirection: 'row'}}>
                    <View style={{width: '70%', flexDirection: 'row', paddingTop: 15}}>
                      {this.categorimap(this.state.categori)}
                    </View>
                    <View style={{width: '30%'}}></View>
                  </View>
                </View>
              </View>
              <View style={{width: '30%', alignItems: 'flex-end'}}>
                <Text style={[common.fontitle, {fontSize: 24, color: '#444', paddingRight:3}]}>34%</Text>
                <Text style={[common.fontbody, {color: '#444', fontSize: 12}]}>DISCOUNT</Text>
              </View>
            </View>
            <View style={{width: '100%', height: 35, flexDirection: 'row', alignItems: 'flex-end', paddingTop: 5}}>
              <View style={{alignSelf: 'flex-start', paddingHorizontal: 8, borderRadius: 3, paddingVertical: 4, flexDirection: 'row', backgroundColor: '#6c7e70'}}>
                <Text style={[common.fontbody, {color: '#f6f5f3', alignSelf: 'flex-start', fontSize: 11}]}>RATING#4.5</Text>
              </View>
              <View style={{marginLeft: 5,alignSelf: 'flex-start', paddingHorizontal: 8, borderRadius: 3, paddingVertical: 4, flexDirection: 'row', backgroundColor: '#5e74bc'}}>
                <Text style={[common.fontbody, {color: '#f6f5f3', alignSelf: 'flex-start', fontSize: 11}]}>43#REVIEWS</Text>
              </View>
              <View style={{marginLeft: 5,alignSelf: 'flex-start', paddingHorizontal: 8, borderRadius: 3, paddingVertical: 4, flexDirection: 'row', backgroundColor: '#e2a85c'}}>
                <Text style={[common.fontbody, {color: '#f6f5f3', alignSelf: 'flex-start', fontSize: 11}]}>14#LIKES</Text>
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
    options: (ownProps) => ({
      fetchPolicy: 'network-only'
    }),
    props: ({ current_user: { current_user }}) => ({ current_user })
  })
)(StuffDetail);
