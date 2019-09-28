import React, { Component } from 'react';
import {
  View, Text, TouchableHighlight,
  TouchableOpacity, Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { compose, graphql } from 'react-apollo';
import _ from 'lodash';
import {
  common
} from '../../assets/stylesheets/common';
import { GET_NICHES } from '../../queries/queryNiche';
import { CURRENT_USER } from '../../queries/queryUser';
import { GET_CATEGORI } from '../../queries/queryCategori';

class StuffFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      niches            : [],
      categori          : [],
      current_user      : '',
      choose_niche      : ''
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      niches              : nextProps.niches ? nextProps.niches : [],
      categori            : nextProps.categori ? nextProps.categori : [],
      current_user        : nextProps.current_user ? nextProps.current_user : ''
    })
  }

  componentDidMount = () => {
    var { choose_niche } = this.props.navigation.state.params;
    this.setState({
      choose_niche: choose_niche ? choose_niche : ''
    })
  }

  renderNiches = (niches) => {
    return _.map(niches, (niche, index) => {
      return (
        <TouchableOpacity onPress={(e) => this.setState({choose_niche: niche._id})} key={index} style={{marginRight: 5, marginTop: 10}}>
          <Text style={[common.fontbody, {borderRadius: 4, fontSize: 12, color: '#7f8082', alignSelf: 'flex-start', paddingHorizontal: 15, paddingTop: 7, paddingBottom: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,.8)', backgroundColor: 'rgba(255,255,255,.6)'}]}>{niche.child.toUpperCase()}</Text>
        </TouchableOpacity>
      )
    })
  };

  renderCategori = (categories) => {
    var categori = _.filter(categories, (categori) => categori.niche === this.state.choose_niche);
    return _.map(categori, (categorix, index) => {
      return (
        <TouchableOpacity key={index} style={{marginRight: 5, marginTop: 10}}>
          <Text style={[common.fontbody, {borderRadius: 4, fontSize: 12, color: '#7f8082', alignSelf: 'flex-start', paddingHorizontal: 15, paddingTop: 7, paddingBottom: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,.8)', backgroundColor: 'rgba(255,255,255,.6)'}]}>{categorix.child.toUpperCase()}</Text>
        </TouchableOpacity>
      )
    })
  }

  render() {
    var { width, height } = Dimensions.get('window');
    return (
      <View style={[common.container, { backgroundColor: '#f6f5f3'}]}>
        <View style={{width: width, height: 50, paddingHorizontal: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: .2, justifyContent: 'center'}}>
              <TouchableOpacity onPress={(e) => this.props.navigation.goBack()}>
                <Ionicons name="ios-arrow-round-back" size={24} color="#444"/>
              </TouchableOpacity>
            </View>
            <View style={{flex: .6, justifyContent: 'center',alignItems: 'center'}}>
              <Text style={[common.fontbody, {color: '#444', fontSize: 14}]}>FILTER</Text>
            </View>
            <View style={{flex: .2, justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity>
                <Ionicons name="ios-color-wand" size={24} color="#444"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{width: width, height: height - 50, paddingHorizontal: 20}}>
          <Text style={[common.fontitle, {fontSize: 12, color: '#444'}]}>FILTER BY NICHE</Text>
          <View style={{width: '100%', height: 'auto', flexDirection: 'row'}}>
            {this.renderNiches(this.state.niches)}
          </View>
          {
            this.state.choose_niche.length > 0 ?
            <View>
              <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginTop: 25}]}>FILTER BY CATEGORI</Text>
              <View style={{width: '100%', height: 'auto', flexDirection: 'row', flexWrap: 'wrap'}}>
                {this.renderCategori(this.state.categori)}
              </View>
            </View> : null
          }
        </View>
      </View>
    )
  }
}

export default compose(
  graphql(GET_NICHES, {
    name: 'niches',
    options: (props) => ({
      fetchPolicy: 'network-only'
    }),
    props: ({niches: {niches}}) => ({niches})
  }),
  graphql(CURRENT_USER, {
    name: 'current_user',
    options: (props) => ({
      fetchPolicy: 'network-only'
    }),
    props: ({current_user: {current_user}}) => ({current_user})
  }),
  graphql(GET_CATEGORI, {
    name: 'categori',
    options: (props) => ({
      fetchPolicy: 'network-only'
    }),
    props: ({categori: {categori}}) => ({categori})
  })
)(StuffFilter);
