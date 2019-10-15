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

export var CHANGE_PASSWORD = gql`
  mutation($userID: ID!, $oldpassword: String!, $newpassword: String!, $confirmpassword: String!) {
    changepassword(userID: $userID, oldpassword: $oldpassword, newpassword: $newpassword, confirmpassword: $confirmpassword) {
      status
      error {
        path
        message
      }
    }
  }
`

export var CHANGE_USER_TYPE = gql`
  mutation($userID: ID!, $usertype: String!) {
    changeusertype(userID: $userID, usertype: $usertype) {
      status
      token
      error {
        path
        message
      }
    }
  }
`

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
        merchant {
          _id
          name
          description
          foodtype
          sosmed
          phone
          photos {
            _id
            publicId
            secureUrl
            imgType
          }
          niche {
            _id
            child
          }
          rules {
            _id
            child
          }
          facilities {
            _id
            child
          }
          location {
            _id
            address
            distric
            province
          }
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
`;
