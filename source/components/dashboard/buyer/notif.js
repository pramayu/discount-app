import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, ScrollView, Dimensions,
  Animated
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  common
} from '../../../assets/stylesheets/common';
import {
  absoluteform
} from '../../shared/sharedaction';

class Notif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menustatus: false
    }
    this.slideKanan = new Animated.Value(0);
    this.slideKiri  = new Animated.Value(0);
  }

  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#f6f5f3');
    })
  }

  componentWillUnmount = () => {
    this._navListener.remove();
  }

  slideKananService = () => {
    Animated.timing(this.slideKanan, {
      toValue: 2,
      duration: 600
    }).start((e) => {
      this.setState({ menustatus: false });
      this.slideKiri.setValue(0)
    })
  }

  slideKiriService = () => {
    Animated.timing(this.slideKiri, {
      toValue: 2,
      duration: 600
    }).start((e) => {
      this.setState({ menustatus: true });
      this.slideKanan.setValue(0)
    })
  }

  render() {
    var { width, height } = Dimensions.get('window');
    var slideKiriSty = this.slideKiri.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -width, 0]
    });
    var slideKananSty = this.slideKanan.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -width, 0]
    });
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3' }]}>
        <View style={{flex: .08, justifyContent: 'center', paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .7, justifyContent: 'center', alignItems: 'flex-start'}}>
              <Text style={[common.fontitle, {color: '#444', fontSize: 12}]}>NOTIFICATIONS</Text>
            </View>
            <View style={{flex: .3, justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity>
                <Ionicons name="ios-search" size={24} color="#444"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flex: .92, paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Animated.View style={{flex: .1, paddingTop: 10, transform: [{translateX: this.state.menustatus === false ? slideKiriSty : slideKananSty}]}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                {
                  this.state.menustatus === false ?
                  <TouchableOpacity style={{marginRight: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,.8)',width: '27%', height: 32, borderRadius: 4, justifyContent:'center', alignItems: 'center', backgroundColor: '#6c7e70'}}>
                    <Text style={[common.fontbody, {color: '#f6f5f3', fontSize: 12}]}>RECENT</Text>
                  </TouchableOpacity> : <TouchableOpacity onPress={(e) => this.slideKananService()} style={{marginRight: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,.8)',width: '15%', height: 32, borderRadius: 4, justifyContent:'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,.5)'}}>
                    <Ionicons name="ios-more" size={20} color="#444"/>
                  </TouchableOpacity>
                }
                <TouchableOpacity style={{marginRight: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,.8)',width: '27%', height: 32, borderRadius: 4, justifyContent:'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,.5)'}}>
                  <Text style={[common.fontbody, {color: '#444', fontSize: 12}]}>REVIEWS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginRight: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,.8)',width: '27%', height: 32, borderRadius: 4, justifyContent:'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,.5)'}}>
                  <Text style={[common.fontbody, {color: '#444', fontSize: 12}]}>SUBSCRIBER</Text>
                </TouchableOpacity>
                {
                  this.state.menustatus === false ?
                  <TouchableOpacity onPress={(e) => this.slideKiriService()} style={{borderWidth: 1, borderColor: 'rgba(255,255,255,.8)',width: '15%', height: 32, borderRadius: 4, justifyContent:'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,.5)'}}>
                    <Ionicons name="ios-more" size={20} color="#444"/>
                  </TouchableOpacity> : <TouchableOpacity style={{marginRight: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,.8)',width: '27%', height: 32, borderRadius: 4, justifyContent:'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,.5)'}}>
                    <Text style={[common.fontbody, {color: '#444', fontSize: 12}]}>TRANSACTION</Text>
                  </TouchableOpacity>
                }
              </View>
            </Animated.View>
            <View style={{flex: .9}}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={[common.fontbody, {color: '#7f8082', fontSize: 12, marginBottom: 10}]}>ALL NOTIFICATIONS</Text>
                <View style={{width: '100%', height: 32, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Text style={[common.fontbody, {color: '#444', fontSize: 12, paddingVertical: 4, paddingHorizontal: 15, borderRadius: 4, backgroundColor: '#f0f0f0'}]}>TODAY</Text>
                </View>
                <View style={{width: '100%', minHeight: height / 6,marginBottom: 20}}>
                  <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: 8}}></View>
                  <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: 9}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{width: '15%', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 10}}>
                        <Ionicons name="ios-chatbubbles" size={24} color="#dbd9d9"/>
                      </View>
                      <View style={{width: '85%', paddingTop: 10}}>
                        <Text style={[common.fontbody, {color: '#444'}]}>Haruki Takahasi <Text style={[common.fontbody, {color: '#7f8082'}]}>had review stuff</Text></Text>
                        <View style={{width: '100%', height: 32}}>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: .8}}>
                              <Text style={[common.fontbody, {color: '#7f8082', marginTop: 5}]}>Tortilla Zucchini Casserole...</Text>
                            </View>
                            <View style={{flex: .2, alignItems: 'flex-end'}}>
                              <TouchableOpacity>
                                <Text style={[common.fontbody, {color: '#444', marginTop: 5, fontSize: 12, marginTop: 8}]}>5h ago</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                        <View style={{width: '100%', paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#f0f0f0', borderRadius: 6}}>
                          <Text style={[common.fontbody, {color: '#7f8082', lineHeight: 21}]}>I cut back on the chiles and used red bell pepper. Added chicken ...</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{width: '100%', minHeight: height / 10}}>
                  <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: 8}}></View>
                  <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: 9}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{width: '15%', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 10}}>
                        <Ionicons name="ios-people" size={26} color="#dbd9d9"/>
                      </View>
                      <View style={{width: '85%', paddingTop: 10}}>
                        <Text style={[common.fontbody, {color: '#444'}]}>Anthony Lebarbenchon <Text style={[common.fontbody, {color: '#7f8082'}]}>had subscribe you</Text></Text>
                          <View style={{width: '100%', height: 32}}>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: .8}}>
                              <Text style={[common.fontbody, {color: '#7f8082', marginTop: 5}]}>Congratulation, you had new fans</Text>
                            </View>
                            <View style={{flex: .2, alignItems: 'flex-end'}}>
                              <Text style={[common.fontbody, {color: '#444', marginTop: 5, fontSize: 12, marginTop: 8}]}>20m ago</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{width: '100%', minHeight: height / 6,marginBottom: 20}}>
                  <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: 8}}></View>
                  <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: 9}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{width: '15%', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 10}}>
                        <Ionicons name="ios-pulse" size={24} color="#dbd9d9"/>
                      </View>
                      <View style={{width: '85%', paddingTop: 10}}>
                        <Text style={[common.fontbody, {color: '#444'}]}>Padam Boora <Text style={[common.fontbody, {color: '#7f8082'}]}>used the coupon for</Text></Text>
                        <View style={{width: '100%', height: 32}}>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: .8}}>
                              <Text style={[common.fontbody, {color: '#7f8082', marginTop: 5}]}>Garlic Shrimp Scampi...</Text>
                            </View>
                            <View style={{flex: .2, alignItems: 'flex-end'}}>
                              <Text style={[common.fontbody, {color: '#444', marginTop: 5, fontSize: 12, marginTop: 8}]}>5m ago</Text>
                            </View>
                          </View>
                        </View>
                        <View style={{width: '100%', paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#f0f0f0', borderRadius: 6}}>
                          <Text style={[common.fontbody, {color: '#7f8082', lineHeight: 21}]}>30% discount coupon with the coupon type purchase quantity</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Notif;
