/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import jwtdecode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import { useScreens } from 'react-native-screens';
import { MainScreen } from './source/routers/index';

useScreens();

var authLink = setContext(async (_, {headers}) => {
  var token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

var httpLink = new HttpLink({
  uri: 'http://192.168.1.7:3000/graphql'
});

var cache = new InMemoryCache();

var client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {
    Query: {
      current_user: async(parent, args, {cache}) => {
        var token = await AsyncStorage.getItem('token');
        var cuser = jwtdecode(token);
        var data = {
          current_user: {
            __typename: 'current_user',
            _id: cuser._id,
            usertype: cuser.usertype,
            username: cuser.username
          }
        }
        cache.writeData({ data });
        return data.current_user
      }
    }
  }
});

var App = () => {
  return (
    <ApolloProvider client={client}>
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#f6f5f3'}}>
        <MainScreen />
      </View>
    </ApolloProvider>)
}

export default App;
