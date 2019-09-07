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
`;

export var STUFF_PUBLISH = gql`
  mutation($userID: ID!, $stuffID: ID!) {
    stuffpublish(userID: $userID, stuffID: $stuffID) {
      status
      error {
        path
        message
      }
    }
  }
`;

export var GET_STUFFS = gql`
  query($userID: ID!) {
    getstuffs(userID: $userID) {
      status
      stuffs {
        _id
        title
        description
        price
        discountstatus
        stuffstatus
        photos {
          _id
          secureUrl
        }
        merchant {
          _id
          name
          photos {
            _id
            secureUrl
          }
          rules {
            _id
            child
          }
          facilities {
            _id
            child
          }
        }
        manager {
          _id
          username
          photos {
            _id
            secureUrl
          }
        }
        categori {
          _id
          child
        }
        discounts {
          _id
          discount
          enddate
          status
        }
      }
    }
  }
`;

export var GET_STUFF = gql`
  query($stuffID: ID!) {
    stuff(stuffID: $stuffID) {
      status
      stuff {
        _id
        title
        description
        price
        discountstatus
        stuffstatus
        photos {
          _id
          secureUrl
          publicId
          imgType
        }
        categori {
          _id
          child
        }
        manager {
          _id
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
  }
`;

export var UNSET_CATEGORI = gql`
  mutation($userID: ID!, $stuffID: ID!, $categoriID: ID!) {
    unsetcategori(userID: $userID, stuffID: $stuffID, categoriID: $categoriID) {
      status
    }
  }
`

export var UNUSED_PICTURE = gql`
  mutation($userID: ID!, $stuffID: ID, $picture: [picture]) {
    unusedpicture(userID: $userID, stuffID: $stuffID, picture: $picture) {
      status
    }
  }
`
