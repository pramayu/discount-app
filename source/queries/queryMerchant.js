import gql from 'graphql-tag';


export var BASIC_UPDATE_MERCHANT = gql`
  mutation($basicupdateprop: basicupdateprop) {
    basicupdatemerchant(basicupdateprop: $basicupdateprop) {
      status
      error {
        path
        message
      }
    }
  }
`
