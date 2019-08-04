import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, TouchableHighlight,
  TextInput, Dimensions, KeyboardAvoidingView,
  Animated, Image, Keyboard
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  common
} from '../../../assets/stylesheets/common';
import Loading from '../loading';
import SettingModal from './settingmodal';
import UploadImage from '../upload';
import { setpicture } from '../sharedaction';
import { CURRENT_USER, FETCH_USER } from '../../../queries/queryUser';
import { BASIC_UPDATE_MERCHANT } from '../../../queries/queryMerchant';

class ShopSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      merchantID: '',
      name: '',
      phone: '',
      sosmed: '',
      description: '',
      current_user: '',
      fetchstatus: false,
      imageupload: [],
      fetchlocal: false,
      fetchimage: false,
      image: [],
      modalstatus: false,
      formchoose: '',
      showkeybord: false,
      location: []
    }
    this.showfetch = new Animated.Value(0);
    this.hidefetch = new Animated.Value(0);
    this.modalshow = new Animated.Value(0);
    this.modalhide = new Animated.Value(0);
    this.totopform = new Animated.Value(0);
    this.todwnform = new Animated.Value(0);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      current_user: nextProps.current_user ? nextProps.current_user : ''
    });
  }

  componentDidMount = () => {
    var { merchant } = this.props.navigation.state.params;
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#f6f5f3');
    });
    this.setState({
      merchantID: merchant._id ? merchant._id : '',
      name: merchant.name ? merchant.name : '',
      phone: merchant.phone ? merchant.phone : '',
      sosmed: merchant.sosmed ? merchant.sosmed : '',
      description: merchant.description ? merchant.description : '',
      image: merchant.photos.length > 0 ? merchant.photos : [],
      location: merchant.location ? merchant.location : []
    });
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount = () => {
    this._navListener.remove();
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.totopservice();
  }

  _keyboardDidHide = () => {
    this.todwnservice();
  }

  changebasicupdatemerchant = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  handlebasicupdatemerchant = async() => {
    this.setState({ fetchstatus: true });
    var choose = [];
    if(!_.isEmpty(this.state.imageupload)) {
      this.setpicture = await setpicture(this.state.imageupload);
      if(this.setpicture) {
        choose.push({
          publicId: this.setpicture.result.data.public_id,
          imgType: this.setpicture.result.data.format,
          secureUrl: this.setpicture.result.data.secure_url,
        });
      }
    }
    var response = await this.props.basicupdatemerchant({
      variables: {
        basicupdateprop: {
          merchantID: this.state.merchantID,
          userID: this.state.current_user._id,
          name: this.state.name,
          phone: this.state.phone,
          sosmed: this.state.sosmed,
          description: this.state.description,
        },
        imageupload: choose.length > 0 ? choose : []
      },
        refetchQueries: [{
          query: FETCH_USER,
          variables: { userID: this.state.current_user._id }
        }]
    });
    var { status, error } = response.data.basicupdatemerchant;
    if(status === true) {
      this.setState({ fetchstatus: false });
    }
  }

  showfetchservice = () => {
    Animated.timing(this.showfetch, {
      toValue: 1,
      duration: 600
    }).start(() => {
      this.hidefetch.setValue(0);
      this.setState({ fetchimage: true, fetchlocal: true })
    })
  };

  hidefetchservice = () => {
    Animated.timing(this.hidefetch, {
      toValue: 1,
      duration: 600
    }).start(() => {
      this.showfetch.setValue(0);
      this.setState({ fetchimage: false, fetchlocal: false })
    })
  };

  showmodalservice = (formchoose) => {
    Animated.timing(this.modalshow, {
      toValue: 1,
      duration: 600
    }).start(() => {
      this.modalhide.setValue(0);
      this.setState({ modalstatus: true, formchoose: formchoose})
    })
  };

  hidemodalservice = () => {
    Animated.timing(this.modalhide, {
      toValue: 1,
      duration: 600
    }).start(() => {
      this.modalshow.setValue(0);
      this.setState({ modalstatus: false, formchoose: '' })
    })
  };

  totopservice = () => {
    Animated.timing(this.totopform, {
      toValue: 1,
      duration: 600
    }).start(() => {
      this.todwnform.setValue(0);
      this.setState({ showkeybord: true })
    })
  };

  todwnservice = () => {
    Animated.timing(this.todwnform, {
      toValue: 1,
      duration: 600
    }).start(() => {
      this.totopform.setValue(0);
      this.setState({ showkeybord: false })
    })
  };

  setupload = (image) => {
    this.setState({ imageupload: image});
  };



  imagecondition = () => {
    if(this.state.image.length > 0) {
      return <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 80}} source={{uri: this.state.image[0].secureUrl}}/>
    } else {
      return (
        <View style={{backgroundColor: '#6c7e70',borderRadius: 80, width: '100%', height: '100%', alignItems: 'center',justifyContent: 'center'}}>
          <MaterialIcons name="landscape" color="#f6f5f3" size={64}/>
        </View>
      )
    }
  }

  render() {
    var { width, height } = Dimensions.get('window');
    var showfetchsty = this.showfetch.interpolate({
      inputRange: [0, 1],
      outputRange: [-height, 0]
    });
    var hidefetchsty = this.hidefetch.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -height]
    });
    var modalshowsty = this.modalshow.interpolate({
      inputRange: [0, 1],
      outputRange: [width, 0]
    });
    var modalhidesty = this.modalhide.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width]
    });
    var totopformsty = this.totopform.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -200]
    });
    var todwnformsty = this.todwnform.interpolate({
      inputRange: [0, 1],
      outputRange: [-200, 0]
    });
    if(this.state.fetchstatus === true) {
      return <Loading />
    }
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
        <View style={{height: 50, width: width, paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex:.3, justifyContent:'center'}}>
              <TouchableOpacity onPress={(e) => this.props.navigation.goBack()}>
                <Ionicons name="ios-arrow-round-back" size={28} color="#444"/>
              </TouchableOpacity>
            </View>
            <View style={{flex:.7, justifyContent:'center', alignItems: 'flex-end'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{ width: '95%', height: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
                  {
                    this.state.formchoose.length === 0 ?
                    <TouchableOpacity onPress={(e) => this.handlebasicupdatemerchant()}>
                      <Text style={[common.fontbody, { color: '#444'}]}>Save Update.</Text>
                    </TouchableOpacity> : null
                  }
                </View>
              </View>
            </View>
          </View>
        </View>
        <KeyboardAvoidingView style={{height: height / 4, width: width, paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .4, paddingTop: 10, alignItems: 'center'}}>
              <View style={{width: 110, height: 110}}>
                { !_.isEmpty(this.state.imageupload) ? <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 80}} source={{uri: this.state.imageupload.image.uri}}/> : this.imagecondition() }
                <TouchableOpacity onPress={(e) => this.showfetchservice()} style={{justifyContent:"center", alignItems: 'center',position: 'absolute', width: '100%', height: '100%', borderRadius: 100, borderWidth: 1, borderColor: '#6c7e70', backgroundColor: 'rgba(0,0,0,.1)'}}>
                  <Ionicons name="ios-camera" size={32} color="rgba(255,255,255,.5)"/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: .6, paddingLeft: 10, paddingTop: 10}}>
              <TextInput onChangeText={(txt) => this.changebasicupdatemerchant('name', txt)} value={this.state.name} autoCorrect={false} placeholderTextColor="#7f8082" placeholder="Merchant name" style={[common.field, common.fontbody, {height: 24, letterSpacing: 0, paddingVertical: 0, marginBottom: 0}]}/>
              <TextInput onChangeText={(txt) => this.changebasicupdatemerchant('phone', txt)} value={this.state.phone} autoCorrect={false} placeholderTextColor="#7f8082" placeholder="Phone" style={[common.field, common.fontbody, {height: 24, letterSpacing: 0, paddingVertical: 0, marginBottom: 0}]}/>
              <TextInput onChangeText={(txt) => this.changebasicupdatemerchant('sosmed', txt)} value={this.state.sosmed} autoCorrect={false} placeholderTextColor="#7f8082" placeholder="Sosmed" style={[common.field, common.fontbody, {height: 24, letterSpacing: 0, paddingVertical: 0, marginBottom: 5}]}/>
              <TextInput onChangeText={(txt) => this.changebasicupdatemerchant('description', txt)} value={this.state.description} multiline={true} autoCorrect={false} placeholderTextColor="#7f8082" placeholder="Description" style={[common.field, common.fontbody, {paddingVertical: 5,textAlignVertical: 'top', height: 50, letterSpacing: 0, paddingVertical: 0, marginBottom: 0}]}/>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={{width: width, height: 'auto', paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={[common.fontitle, {fontSize: 12, color: '#444'}]}>MERCHANT LOCATION</Text>
            <View style={{width: '100%', height: 45}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: .09, justifyContent: 'center'}}>
                  <Ionicons name="ios-pin" size={24} color="#6c7e70"/>
                </View>
                <View style={{flex: .81, justifyContent: 'center'}}>
                  <Text style={[common.fontbody, { color: '#444'}]}>Share Location</Text>
                  <Text style={[common.fontbody, { color: '#7f8082'}]}>For ease of finding your store</Text>
                </View>
                <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
                  <TouchableOpacity onPress={(e) => this.showmodalservice('location')} style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Ionicons name="ios-arrow-round-forward" size={28} color="#dbd9d9"/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginTop: 20}]}>MERCHANT TYPE</Text>
            <View style={{width: '100%', height: 45}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: .09, justifyContent: 'center'}}>
                  <Ionicons name="ios-locate" size={24} color="#6c7e70"/>
                </View>
                <View style={{flex: .81, justifyContent: 'center'}}>
                  <Text style={[common.fontbody, { color: '#444'}]}>Categori</Text>
                  <Text style={[common.fontbody, { color: '#7f8082'}]}>Choose the type of stuffs you sell</Text>
                </View>
                <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
                  <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Ionicons name="ios-arrow-round-forward" size={28} color="#dbd9d9"/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginTop: 20}]}>EXCHANGE RULES</Text>
            <View style={{width: '100%', height: 45}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: .09, justifyContent: 'center'}}>
                  <Ionicons name="ios-clipboard" size={23} color="#6c7e70"/>
                </View>
                <View style={{flex: .81, justifyContent: 'center'}}>
                  <Text style={[common.fontbody, { color: '#444'}]}>Set Rules</Text>
                  <Text style={[common.fontbody, { color: '#7f8082'}]}>Makes it easy to exchange coupon</Text>
                </View>
                <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
                  <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Ionicons name="ios-arrow-round-forward" size={28} color="#dbd9d9"/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginTop: 20}]}>WHAT THEY GOT?</Text>
            <View style={{width: '100%', height: 45}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: .09, justifyContent: 'center'}}>
                  <Ionicons name="ios-radio" size={23} color="#6c7e70"/>
                </View>
                <View style={{flex: .81, justifyContent: 'center'}}>
                  <Text style={[common.fontbody, { color: '#444'}]}>Facilities</Text>
                  <Text style={[common.fontbody, { color: '#7f8082'}]}>Give your customers additional service</Text>
                </View>
                <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
                  <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Ionicons name="ios-arrow-round-forward" size={28} color="#dbd9d9"/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginTop: 20}]}>EXCHANGE PREVILEGE</Text>
            <View style={{width: '100%', height: 45}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: .09, justifyContent: 'center'}}>
                  <Ionicons name="ios-git-compare" size={23} color="#6c7e70"/>
                </View>
                <View style={{flex: .81, justifyContent: 'center'}}>
                  <Text style={[common.fontbody, { color: '#444'}]}>Buyer Mode</Text>
                  <Text style={[common.fontbody, { color: '#7f8082'}]}>Back to buyer user type</Text>
                </View>
                <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 8}}>
                  <TouchableOpacity style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Ionicons name="ios-arrow-round-forward" size={28} color="#dbd9d9"/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        {
          this.state.fetchimage === true ?
          <Animated.View style={{transform:[{translateY: this.state.fetchimage === false ? showfetchsty : hidefetchsty}], width: '100%', height: '100%', position: 'absolute', backgroundColor: '#f6f5f3'}}>
            <UploadImage setupload={this.setupload.bind(this)} hidefetchservice={this.hidefetchservice.bind(this)}/>
          </Animated.View> : null
        }
        <Animated.View style={{transform: [{translateX: this.state.modalstatus === false ? modalshowsty : modalhidesty}, {translateY: this.state.showkeybord === false ? totopformsty : todwnformsty }], position: 'absolute', width: width, height: height, justifyContent: 'flex-end', alignItems: 'center'}}>
          <View style={{width: '100%', height: height / 1.45, backgroundColor: '#f6f5f3', paddingTop: 20}}>
            <SettingModal location={this.state.location} currentuser={this.state.current_user} merchantID={this.state.merchantID} formchoose={this.state.formchoose} hidemodalservice={this.hidemodalservice.bind(this)}/>
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
  }),
  graphql(BASIC_UPDATE_MERCHANT, { name: 'basicupdatemerchant' })
)(ShopSetting);
