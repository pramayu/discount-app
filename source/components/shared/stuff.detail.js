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
import MadeDiskon from './merchant/madediskon';

class StuffDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stuffID: '',
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
      rules: [],
      facilities: [],
      discountstatus: false,
      stuffstatus: false,
      current_user: '',
      madediskon: false
    }
    this.madediskonvalue   = new Animated.Value(0);
    this.closediskonvalue  = new Animated.Value(0);
  }

  componentDidMount = () => {
    var { stuff } = this.props.navigation.state.params;
    this.setState({
      stuffID         : stuff ? stuff._id                 : '',
      picture         : stuff ? stuff.photos              : [],
      title           : stuff ? stuff.title               : '',
      price           : stuff ? stuff.price               : '',
      description     : stuff ? stuff.description         : '',
      categori        : stuff ? stuff.categori            : [],
      c_id            : stuff ? stuff.manager._id         : '',
      cusername       : stuff ? stuff.manager.username    : '',
      cpicture        : stuff ? stuff.manager.photos      : [],
      m_id            : stuff ? stuff.merchant._id        : '',
      mname           : stuff ? stuff.merchant.name       : '',
      mpicture        : stuff ? stuff.merchant.photos     : [],
      rules           : stuff ? stuff.merchant.rules      : [],
      facilities      : stuff ? stuff.merchant.facilities : [],
      discountstatus  : stuff ? stuff.discountstatus      : false,
      stuffstatus     : stuff ? stuff.stuffstatus         : false,
    });
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
      and.push(" * ")
    }
    return categori.map((ctg, index) => {
      return <Text key={index} style={[common.fontbody, {color: '#7f8082',alignSelf: 'flex-start', paddingVertical: 5}]}>{ctg.child.charAt(0).toUpperCase() + ctg.child.substring(1)}{index < categori.length - 1 ? and[index] : null}</Text>
    })
  }

  truncate = (str, limit) => {
    return str.split(" ").splice(0, limit).join(" ");
  }

  rulemap = (rules) => {
    return rules.map((rule, index) => {
      return <Text key={index} style={[common.fontbody, {color: '#444', marginBottom: 5}]}>#{rule.child}</Text>
    });
  }

  facilitimap = (facilities) => {
    return facilities.map((faciliti, index) => {
      return <Text key={index} style={[common.fontbody, {color: '#444', marginBottom: 5}]}>#{faciliti.child}</Text>
    });
  }

  madediskonservice = () => {
    Animated.timing(this.madediskonvalue, {
      toValue: 2,
      duration: 900
    }).start(() => {
      this.closediskonvalue.setValue(0);
      this.setState({ madediskon: true })
    });
  }

  closediskonservice = () => {
    Animated.timing(this.closediskonvalue, {
      toValue: 2,
      duration: 900
    }).start(() => {
      this.madediskonvalue.setValue(0);
      this.setState({ madediskon: false })
    });
  }

  render() {
    var { width, height } = Dimensions.get('window');
    var madediskonsty = this.madediskonvalue.interpolate({
      inputRange:   [0, 1, 2],
      outputRange:  [height, -20, 0]
    });
    var closediskonsty = this.closediskonvalue.interpolate({
      inputRange:   [0, 1, 2],
      outputRange:  [0, -20, height]
    });
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
        <View style={{width: width, height: height / 1.7, marginTop: -45, paddingHorizontal: 20, paddingTop: 25, borderRadius: 25, backgroundColor: '#f6f5f3'}}>
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
                <Text style={[common.fontbody, {color: '#f6f5f3', alignSelf: 'flex-start', fontSize: 11}]}>14#BOUGHT</Text>
              </View>
            </View>
            <View style={{flex: .15}}>
              <View style={{width: '100%', flexDirection: 'row'}}>
                <Text style={[common.fontitle, {color: '#444', fontSize: 16, alignSelf: 'flex-start'}]}>IDR{this.state.price - (this.state.price * 34 / 100)}</Text>
                <Text style={[common.fontitle, {color: '#7f8082', fontSize: 12, paddingTop: 2.7, marginLeft: 5}]}>IDR{this.state.price} (25 days left)</Text>
              </View>
            </View>
            <View style={{flex: .35}}>
              <View style={{width: '80%'}}>
                <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginBottom: 5}]}>DESCRIPTION</Text>
                <Text style={[common.fontbody, {color: '#444', lineHeight: 20}]}>
                  {this.truncate(this.state.description, 18)}
                  {this.state.description.split(" ").length > 18 ? ' ...' : null}
                </Text>
              </View>
            </View>
            <View style={{flex: .4}}>
              <View style={{width: '100%'}}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <View style={{flex: 1, paddingRight: 20}}>
                    <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginBottom: 5}]}>EXCHANGE RULE</Text>
                    {
                      this.state.rules.length > 0 ?
                      this.rulemap(this.state.rules) : null
                    }
                  </View>
                </View>
              </View>
            </View>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <View style={{width: '50%'}}>

              </View>
              <View style={{width: '50%', alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={(e) => this.madediskonservice()} style={{marginTop: -8, width: 28, height: 28 , borderRadius: 50, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons name="ios-arrow-round-up" size={24} color="#444"/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Animated.View style={{transform: [{translateY: this.state.madediskon === false ? madediskonsty : closediskonsty}],position: 'absolute', width: width, height: height, backgroundColor: 'rgba(255,255,255,0)'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: .25}}></View>
            <View style={{flex: .75, borderTopLeftRadius: 25, borderTopRightRadius: 25, backgroundColor: '#f6f5f3', paddingTop: 20}}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{width: '100%', height: 30, paddingHorizontal: 20}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: .5, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginBottom: 5}]}>SET DISCOUNT</Text>
                    </View>
                    <View style={{flex: .5, justifyContent: 'center', alignItems: 'flex-end'}}>
                      <TouchableOpacity onPress={(e) => this.closediskonservice()} style={{marginTop: -8, width: 28, height: 28 , borderRadius: 50, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center'}}>
                        <Ionicons name="ios-arrow-round-down" size={24} color="#444"/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{width: '100%', height: 'auto', paddingHorizontal: 20}}>
                  {
                    this.state.madediskon === true ?
                    <MadeDiskon current_user={this.state.current_user} stuffID={this.state.stuffID}/> : null
                  }
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
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
