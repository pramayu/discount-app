import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StatusBar, TouchableHighlight,
  TextInput, Dimensions,
  Animated, Image, ScrollView
} from 'react-native';
import { graphql, compose, Query } from 'react-apollo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import {
  common
} from '../../../assets/stylesheets/common';
import {
  CURRENT_USER
} from '../../../queries/queryUser';
import {
  GET_STUFF
} from '../../../queries/queryStuff';
import StuffUpdateChild from './stuff.update.child';

class StuffUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stuffID: '',
      current_user: '',
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      current_user: nextProps.current_user ? nextProps.current_user : ''
    })
  }

  componentDidMount = () => {
    var { stuffID } = this.props.navigation.state.params;
    this.setState({ stuffID: stuffID ? stuffID : '' })
  }

  gobackservice = () => {
    this.props.navigation.goBack()
  }


  render() {
    var { width, height } = Dimensions.get('window');
    if(this.state.stuffID) {
      return (
        <Query query={GET_STUFF} variables={{stuffID: this.state.stuffID}}>
          {({loading, error, data}) => {
            if(loading || data.stuff.status === false) {
              return <View style={[common.container, { backgroundColor: '#f6f5f3' }]}></View>
            }
            return <StuffUpdateChild gobackservice={this.gobackservice.bind(this)} currentuser={this.state.current_user} stuff={data.stuff.stuff} />
          }}
        </Query>
      )
    } else {
      return <View style={[common.container, { backgroundColor: '#f6f5f3' }]}></View>
    }
  }
}


export default compose(
  graphql(CURRENT_USER, {
    name: 'current_user',
    options: (props) => ({
      fetchPolicy: 'network-only'
    }),
    props: ({ current_user: {current_user}}) => ({current_user})
  })
)(StuffUpdate);
