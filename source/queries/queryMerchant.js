import gql from 'graphql-tag';


export var BASIC_UPDATE_MERCHANT = gql`
  mutation($basicupdateprop: basicupdateprop, $imageupload: [imageupload]) {
    basicupdatemerchant(basicupdateprop: $basicupdateprop, imageupload: $imageupload) {
      status
      error {
        path
        message
      }
    }
  }
`

export var ADDRESS_UPDATE_MERCHANT = gql`
  mutation($addressupdateprop: addressupdateprop) {
    addressupdatemerchant(addressupdateprop: $addressupdateprop) {
      status
      error {
        path
        message
      }
    }
  }
`
