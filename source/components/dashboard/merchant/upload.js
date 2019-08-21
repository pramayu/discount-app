import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Animated,
  TextInput, Keyboard, ScrollView,
  Image
} from 'react-native';
import { compose, graphql } from 'react-apollo';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  common
} from '../../../assets/stylesheets/common';
import { firstlook, absoluteform } from '../../shared/sharedaction';
import { CURRENT_USER } from '../../../queries/queryUser';
import { USERMERCHANT, MADE_STUFF, STUFF_PUBLISH } from '../../../queries/queryStuff';

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opaciti: new Animated.Value(0),
      screenstatus: false,
      keystatus: false,
      modalstatus: false,
      current_user: '',
      categories: [],
      setcategori: [],
      stuffID: '',
      merchantID: '',
      picture: [],
      title: '',
      description: '',
      price: '',
      savecategori: []
    }
    this.firstLook = new Animated.Value(0);
    this.formtoup = new Animated.Value(0);
    this.formtodown = new Animated.Value(0);
    this.modalshow = new Animated.Value(0);
    this.modalhide = new Animated.Value(0);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      current_user: nextProps.current_user ? nextProps.current_user : '',
      title: nextProps.navigation.state.params ? nextProps.navigation.state.params.stuff.title : '',
      description: nextProps.navigation.state.params ? nextProps.navigation.state.params.stuff.description : '',
      price: nextProps.navigation.state.params ? nextProps.navigation.state.params.stuff.price : '',
      savecategori: nextProps.navigation.state.params ? nextProps.navigation.state.params.stuff.categori : [],
      picture: nextProps.navigation.state.params ? nextProps.navigation.state.params.stuff.photos : [],
      stuffID: nextProps.navigation.state.params ? nextProps.navigation.state.params.stuff._id : '',
    })
  }

  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#f6f5f3');
    });
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
    firstlook(this.firstLook, this.state.opaciti);
  }

  componentWillUnmount = () => {
    this._navListener.remove();
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  fieldonchange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  usermerchantservice = async() => {
    try {
      var res = await this.props.usermerchant({
        variables: {
          userID: this.state.current_user._id
        }
      })
      var { status, error, merchant } = res.data.usermerchant;
      if(status === true) {
        this.setState({
          categories: merchant.niche ? merchant.niche.categori : [],
          merchantID: merchant ? merchant._id : '',
          screenstatus: true
        })
      }
    } catch (e) {
      this.props.navigation.navigate('OfflineScreen')
    }
  }

  setcategoriservice = (categori, index) => {
    this.state.categories[index].choose = true;
    var categorix = Object.assign({}, categori);
    categorix['indexID'] = index.toString();
    this.setState({setcategori: [...this.state.setcategori, categorix]})
  }

  unsetcategoriservice = (index) => {
    delete this.state.categories[index]['choose'];
    this.setState({ categories: this.state.categories });
    var indexe = this.state.setcategori.findIndex(categori => categori.indexID === index.toString());
    this.state.setcategori.splice(indexe, 1)
  }

  _keyboardDidShow = () => {
    this.setState({keystatus: false})
    absoluteform(this.formtoup, this.formtodown);
  }

  _keyboardDidHide = () => {
    this.setState({keystatus: true})
    absoluteform(this.formtodown, this.formtoup);
  }

  showmodalservice = () => {
    this.setState({modalstatus: false})
    absoluteform(this.modalshow, this.modalhide);
  }

  hidemodalservice = () => {
    this.setState({modalstatus: true})
    absoluteform(this.modalhide, this.modalshow);
  }

  handlebasestuff = async() => {
    var categori = [];
    this.state.setcategori.forEach((xoxo) => {
      categori.push({categoriID: xoxo._id})
    })
    var res = await this.props.madestuff({
      variables: {
        basestuff: {
          userID: this.state.current_user._id,
          merchantID: this.state.merchantID,
          title: this.state.title,
          description: this.state.description,
          price: this.state.price,
        },
        categori: categori
      }
    });
    var { status, error, stuff } = res.data.madestuff;
    if(status === true) {
      var passdata = {};
      passdata.current_user_id = this.state.current_user._id;
      passdata.merchantID = this.state.merchantID;
      passdata.stuffID = stuff._id;
      this.props.navigation.navigate('StuffUpload', {passdata: passdata})
    }
  }

  stuffpublishservice = async() => {
    var res = await this.props.stuffpublish({
      variables: {
        userID: this.state.current_user._id,
        stuffID: this.state.stuffID
      }
    });
    var { status } = res.data.stuffpublish;
    if(status === true) {
      this.setState({
        screenstatus: false,
        setcategori: [],
        stuffID: '',
        merchantID: '',
        picture: [],
        title: '',
        description: '',
        price: '',
        savecategori: []
      })
    }
  }

  emptyfield = (width, height) => {
    return (
      <View style={{width: width, height: height - 102, justifyContent: 'center', alignItems: 'center'}}>
        <Ionicons name="ios-repeat" size={32} color="#444" />
        <TouchableOpacity onPress={(e) => this.usermerchantservice()} style={{marginTop: 15, width: 90, height: 32, borderRadius: 4, backgroundColor: '#444', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[common.fontitle, {color: '#f6f5f3', fontSize: 12}]}>UPLOAD</Text>
        </TouchableOpacity>
      </View>
    )
  }

  mapsavecagori = (savecategori) => {
    return savecategori.map((categori, index) => {
      return (
        <View key={index} style={{marginRight: 6, marginBottom: 6}}>
          <TouchableOpacity>
            <Text style={[common.fontbody, {color: '#444',borderWidth: 1, borderColor: 'rgba(255,255,255,.7)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 4, backgroundColor: '#6c7e70', alignSelf: 'flex-start'}]}>{categori.child}</Text>
          </TouchableOpacity>
        </View>
      )
    })
  };

  mappicture = (picture) => {
    var {width, height} = Dimensions.get('window');
    return picture.map((res, index) => {
      return (
        <View key={index} style={{width: width - 40, height: height/3.3, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={{uri: res.secureUrl}} style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 4}}/>
        </View>
      )
    });
  }

  mapcategori = (categories) => {
    return categories.map((categori, index) => {
      return (
        <View key={index} style={{marginRight: 6, marginBottom: 6}}>
          {
            categori.choose === true ?
            <TouchableOpacity onPress={(e) => this.unsetcategoriservice(index)} >
              <Text style={[common.fontbody, {color: '#f6f5f3',borderWidth: 1, borderColor: 'rgba(255,255,255,.7)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 4, backgroundColor: '#6c7e70', alignSelf: 'flex-start'}]}>{categori.child}</Text>
            </TouchableOpacity>:
            <TouchableOpacity onPress={(e) => this.setcategoriservice(categori, index)}>
              <Text style={[common.fontbody, {color: '#444',borderWidth: 1, borderColor: 'rgba(255,255,255,.7)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,.5)', alignSelf: 'flex-start'}]}>{categori.child}</Text>
            </TouchableOpacity>
          }
        </View>
      )
    })
  }

  uploadform = (width, height) => {
    var toupsty = this.formtoup.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -height / 2.6, -height / 2.8]
    });
    var todownsty = this.formtodown.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [-height / 2.8, -height / 2.6, 0]
    });
    return (
      <View style={{width: width, height: height - 102, paddingHorizontal: 20, paddingVertical: 20}}>
        <View style={{width: '100%', height: height / 3.3, marginBottom: 20}}>
          {
            this.state.picture.length > 0 ?
            <View style={{flex: 1, flexDirection: 'row', borderStyle: 'dashed',borderWidth: 1, borderColor: '#7f8082', borderRadius: 4}}>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                {this.mappicture(this.state.picture)}
              </ScrollView>
            </View>
            :
            <View style={{borderStyle: 'dashed',borderWidth: 1, borderColor: '#7f8082',width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0efed', borderRadius: 4}}>
              <Ionicons name="ios-images" size={48} color="#444"/>
              <Text style={[common.fontbody, {color: '#444', fontSize: 12, marginTop: 10}]}>MAX FILE SIZE 1 MB</Text>
            </View>
          }
        </View>
        <Animated.View style={{transform: [{translateY: this.state.keystatus === false ? toupsty : todownsty}], width: '100%', height: 'auto', backgroundColor: '#f6f5f3'}}>
          <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#TITLE</Text>
          <TextInput onChangeText={(txt) => this.fieldonchange('title',txt)} autoCorrect={false} style={[common.fontbody, {borderStyle: 'dashed',borderWidth: 1, borderColor: '#7f8082', marginBottom: 15, color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
          <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#DESCRIPTION</Text>
          <TextInput onChangeText={(txt) => this.fieldonchange('description',txt)} autoCorrect={false} multiline={true} style={[common.fontbody, {borderStyle: 'dashed',borderWidth: 1, borderColor: '#7f8082', marginBottom: 15, color: '#444',textAlignVertical: 'top',width: '100%', height: 65, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10, paddingVertical: 10, lineHeight: 22}]}/>
          <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#PRICE</Text>
          <View style={{width: '100%', height: 38, marginBottom: 30}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: .6,paddingRight: 10}}>
                <TextInput onChangeText={(txt) => this.fieldonchange('price',txt)} autoCorrect={false} style={[common.fontbody, {borderStyle: 'dashed',borderWidth: 1, borderColor: '#7f8082', marginBottom: 15, color: '#444',width: '100%', height: 38, borderRadius: 4, backgroundColor: '#f0efed', paddingHorizontal: 10}]}/>
              </View>
              <View style={{flex: .4}}>
                <TouchableOpacity onPress={(e) => this.showmodalservice()} style={{width: '100%', height: 38, backgroundColor: '#444', justifyContent: 'center', alignItems: 'center', borderRadius: 4}}>
                  <Text style={[common.fontbody, {color: '#f6f5f3', fontSize: 12}]}>EXTRA FIELD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {
            this.state.title.length > 0 && this.state.price.length > 0 && this.state.picture.length > 0 && this.state.savecategori.length > 0 ?
            <TouchableOpacity onPress={(e) => this.stuffpublishservice()} style={{width: '100%', height: 38, borderRadius: 4, backgroundColor: '#444', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[common.fontbody, {color: '#f6f5f3', fontSize: 12}]}>PUBLISH</Text>
            </TouchableOpacity> :
            this.state.title.length > 0 && this.state.price.length > 0 && !_.isEmpty(this.state.setcategori) ?
            <TouchableOpacity onPress={(e) => this.handlebasestuff()} style={{width: '100%', height: 38, borderRadius: 4, backgroundColor: '#444', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[common.fontbody, {color: '#f6f5f3', fontSize: 12}]}>SET PICTURE</Text>
            </TouchableOpacity> :
            <TouchableOpacity style={{width: '100%', height: 38, borderRadius: 4, backgroundColor: '#7f8082', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[common.fontbody, {color: '#f6f5f3', fontSize: 12}]}>FILL FIELDS</Text>
            </TouchableOpacity>
          }
        </Animated.View>
      </View>
    )
  }

  render() {
    var {width, height} = Dimensions.get('window');
    var firstLookSty = this.firstLook.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0]
    });
    var modalshowsty = this.modalshow.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [height, -20, 0]
    });
    var modalhidesty = this.modalhide.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -20, height]
    });
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3'}]}>
        <Animated.View style={[common.container, { backgroundColor: '#f6f5f3', transform:[{translateY: firstLookSty}], opacity: this.state.opaciti}]}>
          <View style={{height: 50, width: width, paddingHorizontal: 20}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: .7, alignItems: 'flex-start', justifyContent: 'center'}}>
                <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginBottom: 3}]}>UPLOAD STUFF</Text>
              </View>
              <View style={{flex: .3}}>
                {
                  this.state.screenstatus === true ?
                  <TouchableOpacity onPress={(e) => this.setState({screenstatus: false})} style={{width: '100%', height: '100%', alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Ionicons name="ios-repeat" size={24} color="#444"/>
                  </TouchableOpacity> : null
                }
              </View>
            </View>
          </View>
          { this.state.screenstatus === false ? this.emptyfield(width, height) : this.uploadform(width, height) }
          <Animated.View style={{paddingHorizontal: 20, justifyContent: 'flex-end',width: width, height: height, position: 'absolute', transform: [{translateY: this.state.modalstatus === false ? modalshowsty : modalhidesty}]}}>
            <View style={{width: '100%', height: height, backgroundColor: '#f6f5f3', borderRadius: 4}}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: .08, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: .7, justifyContent: 'center'}}>
                      <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#SET CATEGORI</Text>
                    </View>
                    <View style={{flex: .3, justifyContent: 'center', alignItems: 'flex-end'}}>
                      <TouchableOpacity onPress={(e) => this.hidemodalservice()} style={{width: '80%', height: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Ionicons name="ios-arrow-round-down" size={24} color="#444"/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{flex: .92}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row',width: '100%', height: 'auto', flexWrap: 'wrap', marginBottom: 30}}>
                      {this.mapcategori(this.state.categories)}
                    </View>
                    {
                      this.state.savecategori.length > 0 ?
                      <View style={{flexDirection: 'row',width: '100%', height: 'auto', flexWrap: 'wrap'}}>
                        <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#SAVED CATEGORI</Text>
                        {this.mapsavecagori(this.state.savecategori)}
                      </View> : null
                    }
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
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
    props: ({current_user: {current_user}}) => ({current_user})
  }),
  graphql(USERMERCHANT, {name: 'usermerchant'}),
  graphql(MADE_STUFF, {name: 'madestuff'}),
  graphql(STUFF_PUBLISH, {name: 'stuffpublish'})
)(Upload);
