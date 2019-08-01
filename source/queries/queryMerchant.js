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
