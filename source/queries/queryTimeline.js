import gql from 'graphql-tag';

export var USERTIMELINE = gql`
  query($userID: ID!) {
    usertimeline(userID: $userID) {
      _id
      username
      fullname
      photos {
        _id
        secureUrl
      }
    }
  }
`

export var GET_TIMELINE = gql`
  query($timelineProp: timelineProp) {
    timeline(timelineProp: $timelineProp) {
      status
      stuffs {
        _id
        photos {
          _id
          secureUrl
        }
        discounts {
          _id
          discount
          status
        }
      }
      merchant {
        _id
        name
        photos {
          _id
          secureUrl
        }
        stuffs {
          _id
          photos {
            _id
            secureUrl
          }
        }
      }
    }
  }
`
