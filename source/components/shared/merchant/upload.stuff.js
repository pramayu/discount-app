import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Animated,
  TextInput, Keyboard, CameraRoll,
  Image, ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  common
} from '../../../assets/stylesheets/common';

class StuffUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      picture: [],
      choosed: [],
      fetchstatus: false,
      screenheight: 0,
    }
  }

  componentDidMount = () => {
    this.cameraRoll();
  }

  cameraRoll = () => {
    this.setState({ fetchstatus: true })
    CameraRoll.getPhotos({
      first: 100,
      assetType: 'Photos',
    }).then((xyz) => {
      this.setState({ picture: xyz.edges, fetchstatus: false })
    })
  }

  pushbeobj = (node) => {
    var choosed = [];
    choosed.push(...this.state.choosed, node)
    this.setState({
      choosed: choosed
    })
  };

  handleupload = () => {
    alert(JSON.stringify(this.state.choosed))
  }

  contentsizechange = (contentWidth, contentHeight) => {
    this.setState({ screenheight: contentHeight })
  }

  looppicture = (picture) => {
    return picture.map((picture, index) => {
      return (
        <View key={index} style={{width: '33.33%', height: 120, padding: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={{uri: picture.node.image.uri}} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
          <TouchableOpacity onLongPress={(e) => this.pushbeobj(picture.node)} style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,.2)'}}>
          </TouchableOpacity>
        </View>
      )
    })
  }

  render() {
    var {width, height} = Dimensions.get('window');
    var scrollEnabled = this.state.screenheight > height / 4;
    if(this.state.fetchstatus === true) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f6f5f3'}}>
          <View style={{width: 150, height: 150, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center'}}>
              <MaterialIcons name="landscape" color="#444" size={72}/>
              <Text style={{transform: [{translateY: -20}],margin: 0,fontSize: 22, color: '#444', letterSpacing: 3, fontFamily: 'Oswald'}}>POCENI</Text>
            </View>
            <View style={{position: 'absolute', width: 120, height: 120, borderRadius: 100}}></View>
          </View>
        </View>
      )
    } else {
      return (
        <View style={[common.container, {backgroundColor: '#f6f5f3'}]}>
          <View style={{height: 50, width: width, paddingHorizontal: 20}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: .3, justifyContent: 'center', alignItems: 'flex-start'}}>
                <TouchableOpacity onPress={(e) => this.props.navigation.goBack()} style={{width: '50%', height: 38, justifyContent: 'center'}}>
                  <Ionicons name="ios-arrow-round-back" size={28} color="#444"/>
                </TouchableOpacity>
              </View>
              <View style={{flex: .7, justifyContent: 'center', alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={(e) => this.handleupload()} style={{justifyContent: 'center', alignItems: 'flex-end', height: 38, width: '50%'}}>
                  <Text style={[common.fontbody, {color: '#444'}]}>Choose Image</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{height: height - 50, width: width}}>
            <ScrollView onContentSizeChange={this.contentsizechange} scrollEnabled={scrollEnabled} style={{flex: 1}} contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
              { this.looppicture(this.state.picture) }
            </ScrollView>
          </View>
        </View>
      )
    }
  }
}

export default StuffUpload;