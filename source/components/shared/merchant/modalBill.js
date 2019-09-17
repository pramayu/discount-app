import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, Dimensions, Animated,
  Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  titleCase
} from '../sharedaction';
import {
  common
} from '../../../assets/stylesheets/common';

class ModalBill extends Component {

  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true)
    });
  }

  componentWillUnmount = () => {
    this._navListener.remove();
  }

  render () {
    var {width, height} = Dimensions.get('window');
    return (
      <View style={[common.container, {backgroundColor: 'rgba(0,0,0,.2)', justifyContent: 'center', alignItems: 'center'}]}>
        <View style={{width: '80%', height: height / 1.75, backgroundColor: '#f6f5f3', borderRadius: 6}}>
          <View style={{width: '100%', height: 60}}>
            <View style={{flex: 1, flexDirection: 'row',borderStyle: 'dashed', borderWidth: 1, borderColor: '#c5c4c2', borderRadius: 6}}></View>
            <View style={{zIndex: 19,width: '100%', height: 60 -2, position: 'absolute', backgroundColor: '#f6f5f3', borderRadius: 6}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: .6, justifyContent: 'flex-end', alignItems: 'flex-start'}}>
                  <View style={{flex: 1, flexDirection: 'row',paddingLeft: 10}}>
                    <View style={{flex: .23, justifyContent: 'center'}}>
                      <View style={{width: 34, height: 34, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={{uri: 'https://cdn.dribbble.com/users/185856/screenshots/7142963/allelevens4_1x.png'}} style={{resizeMode: 'cover', width: '100%', height: '100%', borderRadius: 60}}/>
                      </View>
                    </View>
                    <View style={{flex: .77, justifyContent: 'center'}}>
                      <Text style={[common.fontbody, {color: '#444'}]}>Lisa Engler,</Text>
                      <Text style={[common.fontbody, {color: '#7f8082', marginTop: 2, fontSize: 12}]}>would paid the order.</Text>
                    </View>
                  </View>
                  <View style={{position: 'absolute', zIndex: 20, width: 12, height: 12, borderRadius: 20, backgroundColor: '#c5c4c2', transform: [{translateY: 7},{translateX: -5}]}}></View>
                </View>
                <View style={{flex: .4, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                  <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10}}>
                    <Text style={[common.fontbody, {color: '#444', fontSize: 14}]}>October,</Text>
                    <Text style={[common.fontbody, {color: '#7f8082', fontSize: 12}]}>12 2019</Text>
                  </View>
                  <View style={{position: 'absolute', zIndex: 20, width: 12, height: 12, borderRadius: 20, backgroundColor: '#c5c4c2', transform: [{translateY: 7},{translateX: 5}]}}></View>
                </View>
              </View>
            </View>
          </View>
          <View style={{width: '100%', height: height / 1.8 -60}}>
            <View style={{flex: 1, flexDirection: 'column', paddingHorizontal: 10, paddingTop: 10}}>
              <View style={{width: '100%', height: 40}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: .6, justifyContent: 'center'}}>
                    <Text style={[common.fontbody, {color: '#444', fontSize: 16}]}>Customer Bill</Text>
                    <Text style={[common.fontbody, {color: '#7f8082', fontSize: 12}]}>3 items should paid</Text>
                  </View>
                  <View style={{flex: .4, justifyContent: 'center', alignItems: 'flex-end'}}>
                  </View>
                </View>
              </View>
              <View style={{width: '100%', height: height / 1.8 - 220, marginTop: 10}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={{width: '100%', height: 55, marginBottom: 5}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{width: '24%', justifyContent: 'center'}}>
                        <View style={{width: 55, height: 55}}>
                          <Image source={{uri: 'https://cdn.dribbble.com/users/44338/screenshots/5980292/kosh_drib_1x.png'}} style={{width: '100%', height: '100%', borderRadius: 4, resizeMode: 'cover'}}/>
                        </View>
                      </View>
                      <View style={{width: '55%', justifyContent: 'center'}}>
                        <Text style={[common.fontbody, {color: '#444'}]}>{titleCase('Pumpkin Cheesecake...')}</Text>
                        <Text style={[common.fontitle, {color: '#444', fontSize: 12, marginTop: 5}]}>IDR40000 * 45% OFF</Text>
                      </View>
                      <View style={{width: '21%', justifyContent: 'center', alignItems: 'flex-end'}}>
                        <View style={{width: 30, height: 30, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#dbd9d9'}}>
                          <Text style={[common.fontbody, {color: '#444'}]}>x1</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{width: '100%', height: 28}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: .6, justifyContent: 'center'}}>
                    <Text style={[common.fontbody, {color: '#7f8082', fontSize: 12}]}>TOTAL PAYMENT:</Text>
                  </View>
                  <View style={{flex: .4, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Text style={[common.fontitle, {color: '#f6f5f3', fontSize: 12, alignSelf: 'flex-end',borderWidth: 1, borderColor: '#fff', paddingHorizontal: 15, paddingVertical: 4, paddingTop: 6, borderRadius: 6, backgroundColor: '#444'}]}>IDR22000</Text>
                  </View>
                </View>
              </View>
              <View style={{width: '100%', height: 'auto', paddingTop: 40}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: .5, justifyContent: 'center', paddingRight: 5}}>
                    <TouchableOpacity style={{width: '100%', height: 32, backgroundColor: '#444', borderRadius: 6, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={[common.fontitle, {fontSize: 12, color: '#f6f5f3'}]}>ANOTHER COUPON</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: .5, justifyContent: 'center', paddingLeft: 5}}>
                    <TouchableOpacity style={{width: '100%', height: 32, backgroundColor: '#6c7e70', borderRadius: 6, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={[common.fontitle, {fontSize: 12, color: '#f6f5f3'}]}>COMPLETE</Text>
                    </TouchableOpacity>
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

export default ModalBill;
