import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, TouchableHighlight,
  TextInput, Dimensions,
  Animated, Image, ScrollView
} from 'react-native';
import { graphql, compose, Query } from 'react-apollo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import {
  common
} from '../../../assets/stylesheets/common';
import {
  CURRENT_USER
} from '../../../queries/queryUser';
import {
  GET_STUFF
} from '../../../queries/queryStuff';

class StuffUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      picture: [],
      title: '',
      price: '',
      description: '',
      categori: [],
      stuffID: '',
      merchantID: '',
      updatestatus: false,
      current_user: '',
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      current_user: nextProps.current_user ? nextProps.current_user : ''
    })
  }

  componentDidMount = () => {
    var { stuffID } = this.props.navigation.state.params;
    this.setState({ stuffID: stuffID ? stuffID : '' })
  }

  mappicture = (picture) => {
    var {width, height} = Dimensions.get('window');
    return picture.map((res, index) => {
      return (
        <View key={index} style={{width: width - 40, height: 'auto', justifyContent: 'center', alignItems: 'center'}}>
          <Image source={{uri: res.secureUrl}} style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10}}/>
          <View style={{paddingHorizontal: 10, width: '100%', height: '100%', position: 'absolute', borderRadius: 10, backgroundColor: 'rgba(0,0,0,.1)'}}>
            <View style={{width: '100%', height: '15%', justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableHighlight>
                <Ionicons name="ios-close-circle-outline" size={24} color="#ffffff"/>
              </TouchableHighlight>
            </View>
            <View style={{width: '100%', height: '85%', justifyContent: 'flex-start', alignItems: 'center', paddingTop: '25%'}}>
              <TouchableOpacity onPress={(e) => this.setState({ updatestatus: true })} style={{width: 45, height: 45, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,.3)'}}>
                <Ionicons name="ios-repeat" size={28} color="#fff"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    });
  }

  render() {
    if(this.state.stuffID) {
      return (
        <Query query={GET_STUFF} variables={{stuffID: this.state.stuffID}}>
          {({loading, error, data}) => {
            if(loading || data.stuff.status === false) {
              return <View style={[common.container, { backgroundColor: '#f6f5f3' }]}></View>
            }
            return(
              <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
                <View style={{flex: .07, paddingHorizontal: 20}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex:.3, justifyContent:'center'}}>
                      {
                        this.state.updatestatus === false ?
                        <TouchableOpacity onPress={(e) => this.props.navigation.goBack()}>
                          <Ionicons name="ios-arrow-round-back" size={28} color="#444"/>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={(e) => this.setState({ updatestatus: false })}>
                          <Ionicons name="ios-repeat" size={24} color="#444"/>
                        </TouchableOpacity>
                      }
                    </View>
                    <View style={{flex:.7, justifyContent:'center', alignItems: 'flex-end'}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{ width: '95%', height: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
                            <TouchableOpacity>
                              <Text style={[common.fontbody, { color: '#444'}]}>Save Update.</Text>
                            </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{flex: .93}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: .4, paddingHorizontal: 20, paddingTop: 10}}>
                      {
                        this.state.updatestatus === false ?
                        <View style={{flex: 1, flexDirection: 'row', borderRadius: 10}}>
                          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            {this.mappicture(data.stuff.status === true ? data.stuff.stuff.photos : [])}
                          </ScrollView>
                        </View> :
                        <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0efed', borderRadius: 4}}>
                          <Ionicons name="ios-images" size={48} color="#444"/>
                          <Text style={[common.fontbody, {color: '#444', fontSize: 12, marginTop: 10}]}>MAX FILE SIZE 1 MB</Text>
                        </View>
                      }
                    </View>
                  </View>
                </View>
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
    options: (props) => ({
      fetchPolicy: 'network-only'
    }),
    props: ({ current_user: {current_user}}) => ({current_user})
  })
)(StuffUpdate);
