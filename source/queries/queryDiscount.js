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
