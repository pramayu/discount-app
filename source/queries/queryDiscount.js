import gql from 'graphql-tag';


export var MADE_DISCOUNT=gql`
  mutation($reqdiscount: reqdiscount) {
    madediskon(reqdiscount: $reqdiscount) {
      status
      error {
        path
        message
      }
      discount {
        _id
        enddate
        startdate
        discount
        quantity
        status
        discountype {
          _id
          child
        }
      }
    }
  }
`

export var TERMINATE_DISCOUNT=gql`
  mutation($userID: ID!, $stuffID: ID!, $discountID: ID!) {
    terminatediscount(userID: $userID, stuffID: $stuffID, discountID: $discountID) {
      status
      error {
        path
        message
      }
    }
  }
`
