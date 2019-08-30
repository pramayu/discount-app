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
} from '../../../assets/stylesheets/common';
import {
  setpicture, absoluteform, setcategoriservice
} from '../sharedaction';
import UploadImage from '../upload';
import {
  MADE_STUFF, UNSET_CATEGORI, GET_STUFF
} from '../../../queries/queryStuff';


class StuffUpdateChild extends Component {
  constructor(props) {
    super(props)
    this.state = {
      picture: [],
      title: '',
      price: '',
      description: '',
      categori: [],
      categories: [],
      stuffID: '',
      merchantID: '',
      updatestatus: false,
      current_user: '',
      modalstatus: false,
      upicture: [],
      fetchstatus: false,
      ucategori: [],
      categorimodal: false
    }
    this.modalshow = new Animated.Value(0);
    this.modalhide = new Animated.Value(0);
    this.categorishow = new Animated.Value(0);
    this.categorihide = new Animated.Value(0);
  }

  modalshowservice = () => {
    absoluteform(this.modalshow, this.modalhide);
    this.setState({ modalstatus: true })
  }

  modalhideservice = () => {
    absoluteform(this.modalhide, this.modalshow);
    this.setState({ modalstatus: false })
  }

  categorishowservice = () => {
    this.setState({ categorimodal: false });
    absoluteform(this.categorishow, this.categorihide);
  }

  categorihideservice = () => {
    this.setState({ categorimodal: true });
    absoluteform(this.categorihide, this.categorishow);
  }

  componentDidMount = () => {
    this.setState({
      picture: this.props.stuff ? this.props.stuff.photos : [],
      title: this.props.stuff ? this.props.stuff.title : '',
      price: this.props.stuff ? this.props.stuff.price : '',
      description: this.props.stuff ? this.props.stuff.description : '',
      categori: this.props.stuff ? this.props.stuff.categori : [],
      stuffID: this.props.stuff ? this.props.stuff._id : '',
      merchantID: this.props.stuff ? this.props.stuff.merchant._id : '',
      categories: this.props.stuff.merchant.niche ? this.props.stuff.merchant.niche.categori : [],
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

  setcategori = (categori, indexID) => {
    this.state.categories[indexID].choose = true;
    this.categorix = setcategoriservice(categori, indexID);
    this.setState({
      ucategori: [...this.state.ucategori, this.categorix]
    });
  }

  unsetcategori = (index) => {
    delete this.state.categories[index]['choose'];
    this.setState({ categories: this.state.categories });
    var indexe = this.state.ucategori.findIndex(categori => categori.indexID === index.toString());
    this.state.ucategori.splice(indexe, 1)
  }

  removecategori = async(categoriID) => {
    var res = await this.props.unsetcategori({
      variables: {
        userID: this.state.current_user._id,
        stuffID: this.state.stuffID,
        categoriID: categoriID
      },
      refetchQueries: [{
        query: GET_STUFF,
        variables: { stuffID: this.state.stuffID }
      }]
    });
    var { status } = res.data.unsetcategori;
    if(status === true) {
      var indexe = this.state.categori.findIndex(categori => categori._id === categoriID);
      this.state.categori.splice(indexe, 1);
      this.setState({ categori: this.state.categori })
    }
  }

  mapcategori = (categories, categori) => {
    var lookup = _.keyBy(categori, (categorix) => categorix._id);
    // var filtercategories = _.filter(categories, (categorix) => !lookup[categorix._id])
    return categories.map((categorix, index) => {
      return (
        <View key={index} style={{marginRight: 6, marginBottom: 6}}>
          {
            lookup[categorix._id] ?
            <TouchableOpacity onPress={(e) => this.removecategori(categorix._id)}>
              <Text style={[common.fontbody, {color: '#f6f5f3',borderWidth: 1, borderColor: 'rgba(255,255,255,.7)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 4, backgroundColor: '#7f8082', alignSelf: 'flex-start'}]}>{categorix.child}</Text>
            </TouchableOpacity> : categorix.choose === true ?
            <TouchableOpacity onPress={(e) => this.unsetcategori(index)}>
              <Text style={[common.fontbody, {color: '#f6f5f3',borderWidth: 1, borderColor: 'rgba(255,255,255,.7)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 4, backgroundColor: '#6c7e70', alignSelf: 'flex-start'}]}>{categorix.child}</Text>
            </TouchableOpacity> :
            <TouchableOpacity onPress={(e) => this.setcategori(categorix, index)}>
              <Text style={[common.fontbody, {color: '#444',borderWidth: 1, borderColor: 'rgba(255,255,255,.7)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,.5)', alignSelf: 'flex-start'}]}>{categorix.child}</Text>
            </TouchableOpacity>
          }
        </View>
      )
    })
  }

//disabled
  mapsavecagori = (savecategori) => {
    return savecategori.map((categori, index) => {
      return (
        <View key={index} style={{marginRight: 6, marginBottom: 6}}>
          <TouchableOpacity>
            <Text style={[common.fontbody, {color: '#f6f5f3',borderWidth: 1, borderColor: 'rgba(255,255,255,.7)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 4, backgroundColor: '#6c7e70', alignSelf: 'flex-start'}]}>{categori.child}</Text>
          </TouchableOpacity>
        </View>
      )
    })
  };

  setupload = async(data) => {
    this.setState({ fetchstatus: true })
    var upicture = [];
    this.setpicture = await setpicture(data);
    if(this.setpicture) {
      upicture.push({
        secureUrl: this.setpicture.result.data.secure_url,
        publicId: this.setpicture.result.data.public_id,
        imgType: this.setpicture.result.data.format
      });
      this.setState({
        upicture: upicture,
        fetchstatus: false
      })
    }
  }



  handleupdate = async() => {
    var response = await this.props.madestuff({
      variables: {
        basestuff: {
          userID: this.state.current_user._id,
          merchantID: this.state.merchantID,
          stuffID: this.state.stuffID,
          title: this.state.title,
          description: this.state.description,
          price: this.state.price,
        },
        picture: this.state.upicture,
        categori: this.state.ucategori
      }
    })
  }

  render() {
    var { width, height } = Dimensions.get('window');
    var modalshowsty = this.modalshow.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [height, -20, 0]
    });
    var modalhidesty = this.modalhide.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -20, height]
    });
    var categorishowsty = this.categorishow.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [height, -20, 0]
    });
    var categorihidesty = this.categorihide.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -20, height]
    });
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
                <View style={{width: '100%', height: '100%', borderRadius: 4}}>
                  {
                    this.state.upicture.length > 0 ?
                    <View style={{width: '100%', height: 'auto', justifyContent: 'center', alignItems: 'center'}}>
                      <Image source={{uri: this.state.upicture[0].secureUrl}} style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10}}/>
                      <View style={{paddingHorizontal: 10, width: '100%', height: '100%', position: 'absolute', borderRadius: 10, backgroundColor: 'rgba(0,0,0,.1)'}}>
                        <View style={{width: '100%', height: '15%', justifyContent: 'center', alignItems: 'flex-end'}}>
                          <TouchableHighlight onPress={(e) => this.setState({ setpicture: []})} style={{width: 22, height: 22, borderRadius: 40, backgroundColor: 'rgba(0,0,0,.3)', justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name="ios-close" size={24} color="#ffffff"/>
                          </TouchableHighlight>
                        </View>
                      </View>
                    </View> :
                    <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0efed', width: '100%', height: '100%'}}>
                      <Ionicons name="ios-images" size={48} color="#444"/>
                      <Text style={[common.fontbody, {color: '#444', fontSize: 12, marginTop: 10}]}>{this.state.fetchstatus === false ? 'MAX FILE SIZE 1 MB' : 'PLEASE WAIT..'}</Text>
                      <TouchableHighlight onPress={(e) => this.modalshowservice()} style={{width: '100%', height: '100%', position: 'absolute', borderRadius: 4}}>
                        <Text></Text>
                      </TouchableHighlight>
                    </View>
                  }
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
                    <TouchableOpacity onPress={(e) => this.categorishowservice()} style={{width: '100%', height: 38, backgroundColor: '#444', justifyContent: 'center', alignItems: 'center', borderRadius: 4}}>
                      <Text style={[common.fontbody, {color: '#f6f5f3', fontSize: 12}]}>EXTRA FIELD</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Animated.View style={{transform: [{translateY: this.state.modalstatus === false ? modalshowsty : modalhidesty}],width: width, height: height, position: 'absolute', backgroundColor: 'rgba(255,255,255,.4)'}}>
          {
            this.state.modalstatus === true ?
            <UploadImage setupload={this.setupload.bind(this)} hidefetchservice={this.modalhideservice.bind(this)} /> : null
          }
        </Animated.View>
        <Animated.View style={{transform: [{translateY: this.state.categorimodal === false ? categorishowsty : categorihidesty}],paddingHorizontal: 20, justifyContent: 'flex-end',width: width, height: height, position: 'absolute'}}>
          <View style={{width: '100%', height: height, backgroundColor: '#f6f5f3', borderRadius: 4}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{flex: .08, justifyContent: 'center', alignItems: 'flex-end'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: .7, justifyContent: 'center'}}>
                    <Text style={[common.fontitle, {fontSize: 12,color: '#444', marginBottom: 7}]}>#SET CATEGORI</Text>
                  </View>
                  <View style={{flex: .3, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <TouchableOpacity onPress={(e) => this.categorihideservice()} style={{width: '80%', height: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
                      <Ionicons name="ios-arrow-round-down" size={24} color="#444"/>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{flex: .92}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row',width: '100%', height: 'auto', flexWrap: 'wrap', marginBottom: 30}}>
                    {this.mapcategori(this.state.categories, this.state.categori)}
                  </View>
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
  graphql(MADE_STUFF, {name: 'madestuff'}),
  graphql(UNSET_CATEGORI, {name: 'unsetcategori'})
)(StuffUpdateChild);
