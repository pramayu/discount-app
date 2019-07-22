import gql from 'graphql-tag';


export var CREATE_USER = gql`
  mutation($username: String!, $email: String!, $phone: String!, $password: String!) {
    createuser(username: $username, email: $email, phone: $phone, password: $password) {
      status
      error {
        path
        message
      }
    }
  }
`;

export var COMPARE_PIN = gql`
  mutation($uniquepin: String!) {
    comparepin(uniquepin: $uniquepin) {
      status
      error {
        path
        message
      }
      token
    }
  }
`;

export var AUTHORIZATION = gql`
  mutation($usertoken: String) {
    authorization(usertoken: $usertoken) {
      status
      usertype
    }
  }
`;

export var USER_LOGIN = gql`
  mutation($identifier: String!, $password: String!) {
    loginuser(identifier: $identifier, password: $password) {
      status
      token
      error {
        path
        message
      }
    }
  }
`;

export var UPDATE_USER = gql`
  mutation($userID: ID!, $username: String, $email: String, $phone: String, $fullname: String, $address: String, $pprofile: [pprofile]) {
    updateuser(userID: $userID, username: $username, email: $email, phone: $phone, fullname: $fullname, address: $address, pprofile: $pprofile) {
      status
      error {
        path
        message
      }
    }
  }
`;

export var FETCH_USER = gql`
  query($userID: ID!) {
    user(userID: $userID) {
      status
      error {
        path
        message
      }
      user {
        _id
        username
        email
        phone
        fullname
        address
        photos {
          _id
          publicId
          secureUrl
          imgType
        }
      }
    }
  }
`;

export var CURRENT_USER = gql`
  query {
    current_user @client {
      _id
      username
      usertype
    }
  }
`
