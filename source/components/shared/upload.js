import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  Dimensions, StatusBar, Image,
  TextInput, CameraRoll, ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  common
} from '../../assets/stylesheets/common';


class UploadImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
      selected: 0,
      fetchstatus: false,
      screenheight: 0,
      image: [],
    }
  }

  componentDidMount = () => {
    this.cameraRoll();
  }

  hidefetchservice = () => {
    this.props.hidefetchservice();
    this.setState({ selected: 0 });
  }

  contentsizechange = (contentWidth, contentHeight) => {
    this.setState({ screenheight: contentHeight })
  }

  handleupload = async(choose) => {
    this.props.setupload(choose);
    this.props.hidefetchservice();
  }

  cameraRoll = () => {
    this.setState({ fetchstatus: true })
    CameraRoll.getPhotos({
      first: 100,
      assetType: 'Photos',
    }).then((xyz) => {
      this.setState({ images: xyz.edges, fetchstatus: false })
    })
  }

  setImage = (images) => {
    return images.map((image, index) => {
      return (
        <View key={index} style={{width: '33.33%', height: 120, padding: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={{uri: image.node.image.uri}} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
          <TouchableOpacity onPress={(e) => this.setState({ selected: index, image: image.node })} style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,.2)'}}>
          </TouchableOpacity>
        </View>
      )
    })
  }

  render() {
    var { width, height } = Dimensions.get('window');
    var scrollEnabled = this.state.screenheight > height / 4;
    if(this.state.fetchstatus === true) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ECEFF1'}}>
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
      return(
        <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
          <View style={{flex: .4}}>
            <View style={{flex: 1, flexDirection: 'column', width: '100%', height: '100%'}}>
              <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri: this.state.images.length > 0 ? this.state.images[this.state.selected].node.image.uri : null}}/>
              <View style={{width: '100%', height: 38, position: 'absolute', top: 20, paddingHorizontal: 20, zIndex: 10}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex:.3, justifyContent:'center'}}>
                    <TouchableOpacity onPress={(e) => this.hidefetchservice()} style={{backgroundColor: '#f6f5f3', width: 38, height: 38, borderRadius: 50, justifyContent: 'center', alignItems: 'center'}}>
                      <Ionicons name="ios-arrow-round-back" size={28} color="#444"/>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex:.7, justifyContent:'center', alignItems: 'flex-end'}}>
                    <TouchableOpacity onPress={(e) => this.handleupload(this.state.image)} style={{backgroundColor: '#f6f5f3', width: 38, height: 38, borderRadius: 50, justifyContent: 'center', alignItems: 'center'}}>
                      <Ionicons name="ios-checkmark" size={30} color="#444"/>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,.15)', position: 'absolute', zIndex: 9}}></View>
            </View>
          </View>
          <View style={{flex: .6}}>
            <ScrollView onContentSizeChange={this.contentsizechange} scrollEnabled={scrollEnabled} style={{flex: 1}} contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
              { this.setImage(this.state.images) }
            </ScrollView>
          </View>
        </View>
      )
    }
  }
}

export default UploadImage;
