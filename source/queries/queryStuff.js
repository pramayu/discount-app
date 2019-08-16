import gql from 'graphql-tag';

export var USERMERCHANT = gql`
  mutation($userID: ID!) {
    usermerchant(userID: $userID) {
      status
      error {
        path
        message
      }
      merchant {
        _id
        niche {
          _id
          categori {
            _id
            child
          }
        }
      }
    }
  }
`
