import React, { Component } from 'react';
import {
  View, Text, TouchableHighlight,
  TouchableOpacity, Dimensions, TextInput
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
import { DISCOUNT_TYPE } from '../../queries/queryDiscountype';

class StuffFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      niches                : [],
      categori              : [],
      discountypes          : [],
      current_user          : '',
      choose_niche          : '',
      tmp_categori          : [],
      choose_categori       : [],
      choose_discountype    : []
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      niches              : nextProps.niches ? nextProps.niches : [],
      categori            : nextProps.categori ? nextProps.categori : [],
      current_user        : nextProps.current_user ? nextProps.current_user : '',
      discountypes        : nextProps.discountypes ? nextProps.discountypes : []
    })
  }

  componentDidMount = () => {
    var { choose_niche } = this.props.navigation.state.params;
    this.setState({
      choose_niche: choose_niche ? choose_niche : ''
    })
  }

  goBackClear = () => {
    _.map(this.state.choose_categori, (categori, index) => {
      var indexe = _.findIndex(this.state.tmp_categori, (tmp) => tmp.choose === true);
      delete this.state.tmp_categori[indexe]['choose']
    });
    _.map(this.state.choose_discountype, (discountype, index) => {
      var indexe = _.findIndex(this.state.discountypes, (disty) => disty.choose === true);
      delete this.state.discountypes[indexe]['choose']
    })
    this.setState({
      choose_categori: [],
      choose_discountype: [],
    });
    this.props.navigation.goBack();
  }

  chooseDiscountype = (index, discountype) => {
    if(discountype.choose === true) {
      delete this.state.discountypes[index]['choose'];
      var indexe = this.state.choose_discountype.indexOf(discountype._id);
      this.state.choose_discountype.splice(indexe, 1);
      this.setState({ discountypes: this.state.discountypes })
    } else {
      this.state.discountypes[index].choose = true;
      this.setState({ choose_discountype: [...this.state.choose_discountype, discountype._id] })
    }
  }

  chooseCategori = (index, categori) => {
    if(categori.choose === true) {
      delete this.state.tmp_categori[index]['choose'];
      var indexe = this.state.choose_categori.indexOf(categori._id)
      this.state.choose_categori.splice(indexe, 1);
      this.setState({
        tmp_categori: this.state.tmp_categori
      })
    } else {
      this.state.tmp_categori[index].choose = true;
      this.setState({
        choose_categori: [...this.state.choose_categori, categori._id],
      });
    }
  }

  chooseNiche = (nicheID) => {
    var categorix = Object.assign([], this.state.categori);
    var categori = _.filter(categorix, (categori) => categori.niche === nicheID);
    this.setState({
      choose_niche: this.state.choose_niche === nicheID ? '' : nicheID,
      tmp_categori: categori
    });
    if(this.state.choose_categori.length > 0) {
      _.map(this.state.choose_categori, (categori, index) => {
        var indexe = _.findIndex(this.state.tmp_categori, (tmp) => tmp.choose === true);
        delete this.state.tmp_categori[indexe]['choose']
      });
      this.setState({
        choose_categori: []
      })
    }
  }

  renderNiches = (niches) => {
    return _.map(niches, (niche, index) => {
      return (
        <TouchableOpacity onPress={(e) => this.chooseNiche(niche._id)} key={index} style={{marginRight: 5, marginTop: 5}}>
          <Text style={[common.fontbody, {borderRadius: 4, fontSize: 12, color: this.state.choose_niche === niche._id ? '#f6f5f3' : '#7f8082', alignSelf: 'flex-start', paddingHorizontal: 15, paddingTop: 7, paddingBottom: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,.8)', backgroundColor: this.state.choose_niche === niche._id ? '#ea4c89' :'rgba(255,255,255,.6)'}]}>{niche.child.toUpperCase()}</Text>
        </TouchableOpacity>
      )
    })
  };

  renderCategori = (categories) => {
    return _.map(categories, (categorix, index) => {
      return (
        <TouchableOpacity onPress={(e) => this.chooseCategori(index, categorix)} key={index} style={{marginRight: 5, marginTop: 5}}>
          <Text style={[common.fontbody, {borderRadius: 4, fontSize: 12, color: categorix.choose === true ? '#f6f5f3':'#7f8082', alignSelf: 'flex-start', paddingHorizontal: 15, paddingTop: 7, paddingBottom: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,.8)', backgroundColor: categorix.choose === true ? '#ea4c89' : 'rgba(255,255,255,.6)'}]}>{categorix.child.toUpperCase()}</Text>
        </TouchableOpacity>
      )
    })
  }

  renderDiscountype = (discountypes) => {
    return _.map(discountypes, (discountype, index) => {
      return (
        <TouchableOpacity onPress={(e) => this.chooseDiscountype(index, discountype)} key={index} style={{marginRight: 5, marginTop: 5}}>
          <Text style={[common.fontbody, {borderRadius: 4, fontSize: 12, color: discountype.choose === true ? '#f6f5f3':'#7f8082', alignSelf: 'flex-start', paddingHorizontal: 15, paddingTop: 7, paddingBottom: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,.8)', backgroundColor: discountype.choose === true ? '#ea4c89' : 'rgba(255,255,255,.6)'}]}>{discountype.child.toUpperCase()}</Text>
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
              <TouchableOpacity onPress={(e) => this.goBackClear()}>
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
          <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginTop: 25, marginBottom: 5}]}>SEARCH</Text>
          <TextInput placeholder="search by ingredients or brand.." style={[common.fontbody, {color: '#444',paddingLeft: 10, paddingVertical: 0, width: '100%', height: 34, borderRadius: 4, backgroundColor: 'rgba(255,255,255,.6)', borderWidth: 1, borderColor: 'rgba(255,255,255,.8)'}]}/>
          <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginTop: 25}]}>FILTER BY NICHE</Text>
          <View style={{width: '100%', height: 'auto', flexDirection: 'row'}}>
            {this.renderNiches(this.state.niches)}
          </View>
          {
            this.state.choose_niche.length > 0 ?
            <View>
              <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginTop: 25}]}>FILTER BY CATEGORI</Text>
              <View style={{width: '100%', height: 'auto', flexDirection: 'row', flexWrap: 'wrap'}}>
                {this.renderCategori(this.state.tmp_categori)}
              </View>
            </View> : null
          }
          <Text style={[common.fontitle, {fontSize: 12, color: '#444', marginTop: 25}]}>FILTER BY DISCOUNT TYPE</Text>
          <View style={{width: '100%', height: 'auto', flexDirection: 'row', flexWrap: 'wrap'}}>
            {this.renderDiscountype(this.state.discountypes)}
          </View>
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
  }),
  graphql(DISCOUNT_TYPE, {
    name: 'discountypes',
    options: (props) => ({
      fetchPolicy: 'network-only'
    }),
    props: ({discountypes: {discountypes}}) => ({ discountypes })
  })
)(StuffFilter);
