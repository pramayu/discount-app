import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Image,
  Animated, TextInput, TouchableHighlight
} from 'react-native';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {
  common
} from '../../../assets/stylesheets/common';



class DiscoverBuyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choose_niche: ''
    }
  }

  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#f6f5f3');
    });
  }

  componentWillUnmount = () => {
    this._navListener.remove();
  }

  render() {
    var {width, height} = Dimensions.get('window');
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3'}]}>
        <View style={{width: '100%', height: 50, paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .7, justifyContent: 'center'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableHighlight style={{marginRight: 30, justifyContent: 'center'}}>
                  <Text style={[common.fontbody, {color: '#444', fontSize: 12}]}>ALL STUFF</Text>
                </TouchableHighlight>
                <TouchableHighlight style={{marginRight: 30, justifyContent: 'center'}}>
                  <Text style={[common.fontbody, {color: '#7f8082', fontSize: 12}]}>FOODS</Text>
                </TouchableHighlight>
                <TouchableHighlight style={{marginRight: 30, justifyContent: 'center'}}>
                  <Text style={[common.fontbody, {color: '#7f8082', fontSize: 12}]}>APPAREL</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flex: .15, justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity>
                <Ionicons name="ios-repeat" size={24} color="#444"/>
              </TouchableOpacity>
            </View>
            <View style={{flex: .15, justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={(e) => this.props.navigation.navigate('StuffFilter', {choose_niche: this.state.choose_niche})}>
                <Ionicons name="ios-options" size={20} color='#444'/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{width: width, height: height - 110, paddingHorizontal: 20, paddingTop: 10}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .5, flexDirection: 'column', paddingRight: 10}}>
              <Text style={[{fontFamily:'Oswald',color: '#444', fontSize: 18, lineHeight: 30, marginBottom: 30}]}>WE DISCOVER 41 STUFF NEAR YOU</Text>
              <View style={{width: '100%', height: height / 3.2, marginBottom: 20}}>
                <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 6}} source={{uri: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'}}/>
                <View style={{backgroundColor: 'rgba(0,0,0,.1)',position: 'absolute', width: '100%', height: '100%', borderRadius: 6, padding: 10}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: .5, justifyContent: 'flex-start'}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: .23}}>
                          <View style={{width: 22, height: 22}}>
                            <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 20}} source={{uri: 'https://cdn.dribbble.com/users/2996009/screenshots/5798857/dribbble_nike_blazer_mid_2x.png'}}/>
                          </View>
                        </View>
                        <View style={{flex: .77, paddingTop: 5}}>
                          <Text style={[common.fontbody, {color: '#fff', fontSize: 12}]}>Nike Official Store</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{flex: .5, justifyContent: 'flex-end'}}>
                      <Text style={[common.fontbody, {fontSize: 12, color: '#f6f5f3',alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 5, borderRadius: 4, backgroundColor: '#ea4c89'}]}>30% OFF</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{width: '100%', height: height / 3.2, marginBottom: 20}}>
                <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 6}} source={{uri: 'https://images.unsplash.com/photo-1513379733131-47fc74b45fc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'}}/>
                <View style={{backgroundColor: 'rgba(0,0,0,.1)',position: 'absolute', width: '100%', height: '100%', borderRadius: 6, padding: 10}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: .5, justifyContent: 'flex-start'}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: .23}}>
                          <View style={{width: 22, height: 22}}>
                            <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 20}} source={{uri: 'https://cdn.dribbble.com/users/1351038/screenshots/5939136/shot-cropped-1548922468110.png'}}/>
                          </View>
                        </View>
                        <View style={{flex: .77, paddingTop: 5}}>
                          <Text style={[common.fontbody, {color: '#fff', fontSize: 12}]}>ZARA Official Store</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{flex: .5, justifyContent: 'flex-end'}}>
                      <Text style={[common.fontbody, {fontSize: 12, color: '#f6f5f3',alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 5, borderRadius: 4, backgroundColor: '#ea4c89'}]}>30% OFF</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{flex: .5, flexDirection: 'column', paddingLeft: 10, paddingTop: 10}}>
              <View style={{width: '100%', height: height / 3.2, marginBottom: 20}}>
                <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 6}} source={{uri: 'https://images.unsplash.com/photo-1523371054106-bbf80586c38c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'}}/>
                <View style={{backgroundColor: 'rgba(0,0,0,.1)',position: 'absolute', width: '100%', height: '100%', borderRadius: 6, padding: 10}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: .5, justifyContent: 'flex-start'}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: .23}}>
                          <View style={{width: 22, height: 22}}>
                            <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 20}} source={{uri: 'https://cdn.dribbble.com/users/47222/screenshots/6062957/coasters_2x.jpg'}}/>
                          </View>
                        </View>
                        <View style={{flex: .77, paddingTop: 5}}>
                          <Text style={[common.fontbody, {color: '#fff', fontSize: 12}]}>Men Cobek</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{flex: .5, justifyContent: 'flex-end'}}>
                      <Text style={[common.fontbody, {fontSize: 12, color: '#f6f5f3',alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 5, borderRadius: 4, backgroundColor: '#ea4c89'}]}>30% OFF</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{width: '100%', height: height / 3.2, marginBottom: 20}}>
                <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 6}} source={{uri: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}}/>
                <View style={{backgroundColor: 'rgba(0,0,0,.1)',position: 'absolute', width: '100%', height: '100%', borderRadius: 6, padding: 10}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: .5, justifyContent: 'flex-start'}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: .23}}>
                          <View style={{width: 22, height: 22}}>
                            <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 20}} source={{uri: 'https://cdn.dribbble.com/users/113499/screenshots/2762616/boil-boil-ramen.png'}}/>
                          </View>
                        </View>
                        <View style={{flex: .77, paddingTop: 5}}>
                          <Text style={[common.fontbody, {color: '#fff', fontSize: 12}]}>BUFFA Resto</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{flex: .5, justifyContent: 'flex-end'}}>
                      <Text style={[common.fontbody, {fontSize: 12, color: '#f6f5f3',alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 5, borderRadius: 4, backgroundColor: '#ea4c89'}]}>30% OFF</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{width: '100%', height: height / 3.2, marginBottom: 20}}>
                <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 6}} source={{uri: 'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'}}/>
                <View style={{backgroundColor: 'rgba(0,0,0,.1)',position: 'absolute', width: '100%', height: '100%', borderRadius: 6, padding: 10}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: .5, justifyContent: 'flex-start'}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: .23}}>
                          <View style={{width: 22, height: 22}}>
                            <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 20}} source={{uri: 'https://cdn.dribbble.com/users/2996009/screenshots/5798857/dribbble_nike_blazer_mid_2x.png'}}/>
                          </View>
                        </View>
                        <View style={{flex: .77, paddingTop: 5}}>
                          <Text style={[common.fontbody, {color: '#fff', fontSize: 12}]}>Nike Official Store</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{flex: .5, justifyContent: 'flex-end'}}>
                      <Text style={[common.fontbody, {fontSize: 12, color: '#f6f5f3',alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 5, borderRadius: 4, backgroundColor: '#ea4c89'}]}>30% OFF</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{position: 'absolute', width: width, height: 60, bottom: 0}}>
          <LinearGradient style={{width: '100%', height: '100%'}} colors={['rgba(246,245,243,.0)', 'rgba(246,245,243,.5)', '#f6f5f3']}></LinearGradient>
        </View>
      </View>
    )
  }
}

export default DiscoverBuyer;
