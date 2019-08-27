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
  setpicture
} from '../sharedaction';
import UploadImage from '../upload';

class StuffUpdateChild extends Component {
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

  componentDidMount = () => {
    this.setState({
      picture: this.props.stuff ? this.props.stuff.photos : [],
      title: this.props.stuff ? this.props.stuff.title : '',
      price: this.props.stuff ? this.props.stuff.price : '',
      description: this.props.stuff ? this.props.stuff.description : '',
      categori: this.props.stuff ? this.props.stuff.categori : [],
      stuffID: this.props.stuff ? this.props.stuff._id : '',
      current_user: this.props.currentuser ? this.props.currentuser : ''
    })
  }

  mappicture = (picture) => {
    var {width, height} = Dimensions.get('window');
    return picture.map((res, index) => {
      return (
        <View key={index} style={{width: width - 40, height: 'auto', justifyContent: 'center', alignItems: 'center'}}>
          <Image source={{uri: res.secureUrl}} style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10}}/>
          <View style={{paddingHorizontal: 10, width: '100%', height: '100%', position: 'absolute', borderRadius: 10, backgroundColor: 'rgba(0,0,0,.1)'}}>
            <View style={{width: '100%', height: '15%', justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableHighlight style={{width: 22, height: 22, borderRadius: 40, backgroundColor: 'rgba(0,0,0,.3)', justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="ios-close" size={24} color="#ffffff"/>
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
    var {width, height} = Dimensions.get('window');
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
        <View style={{flex: .07, paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex:.3, justifyContent:'center'}}>
              {
                this.state.updatestatus === false ?
                <TouchableOpacity onPress={(e) => this.props.gobackservice()}>
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
            <View style={{width:'100%', height: height / 2.6, paddingHorizontal: 20, paddingTop: 10}}>
              {
                this.state.updatestatus === false ?
                <View style={{flex: 1, flexDirection: 'row', borderRadius: 10}}>
                  <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    {this.mappicture(this.state.picture ? this.state.picture : [])}
                  </ScrollView>
                </View> :
                <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0efed', borderRadius: 4}}>
                  <Ionicons name="ios-images" size={48} color="#444"/>
                  <Text style={[common.fontbody, {color: '#444', fontSize: 12, marginTop: 10}]}>MAX FILE SIZE 1 MB</Text>
                  <TouchableHighlight style={{width: '100%', height: '100%', position: 'absolute', borderRadius: 4}}>
                    <Text></Text>
                  </TouchableHighlight>
                </View>
              }
            </View>
            <View style={{width: '100%', height: 'auto', paddingHorizontal: 20, paddingTop: 20}}>
              <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#TITLE</Text>
              <TextInput value={this.state.title} style={[common.fontbody, {borderWidth: 1, borderColor: '#fff',marginBottom: 15, color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
              <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#DESCRIPTION</Text>
              <TextInput value={this.state.description} autoCorrect={false} multiline={true} style={[common.fontbody, {borderWidth: 1, borderColor: '#fff', marginBottom: 15, color: '#444',textAlignVertical: 'top',width: '100%', height: 85, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10, paddingVertical: 10, lineHeight: 22}]}/>
              <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#PRICE</Text>
              <View style={{width: '100%', height: 38, marginBottom: 30}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: .6,paddingRight: 10}}>
                    <TextInput value={this.state.price} autoCorrect={false} style={[common.fontbody, {borderWidth: 1, borderColor: '#fff',marginBottom: 15, color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
                  </View>
                  <View style={{flex: .4}}>
                    <TouchableOpacity style={{width: '100%', height: 38, backgroundColor: '#444', justifyContent: 'center', alignItems: 'center', borderRadius: 4}}>
                      <Text style={[common.fontbody, {color: '#f6f5f3', fontSize: 12}]}>EXTRA FIELD</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{width: width, height: height, position: 'absolute', backgroundColor: 'rgba(255,255,255,.4)'}}>
          <UploadImage />
        </View>
      </View>
    )
  }
}

export default StuffUpdateChild;
