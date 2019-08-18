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
`;


export var MADE_STUFF = gql`
  mutation($basestuff: basestuff, $picture: [picture], $categori: [categori]) {
    madestuff(basestuff: $basestuff, picture: $picture, categori: $categori) {
      status
      error {
        path
        message
      }
      stuff {
        _id
        title
        description
        price
        manager {
          _id
          username
        }
        merchant {
          _id
        }
        categori {
          _id
          child
        }
        photos {
          _id
          publicId
          secureUrl
          imgType
        }
      }
    }
  }
`
