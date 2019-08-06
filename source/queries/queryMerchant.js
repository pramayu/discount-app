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
`;

export var ADDRESS_UPDATE_MERCHANT = gql`
  mutation($addressupdateprop: addressupdateprop) {
    addressupdatemerchant(addressupdateprop: $addressupdateprop) {
      status
      error {
        path
        message
      }
      location {
        _id
        address
        province
        distric
        coordinate {
          _id
          latitude
          longitude
        }
      }
    }
  }
`;


export var DELETE_ADDRESS = gql`
  mutation($addressdeleteprop: addressdeleteprop) {
    addressdelete(addressdeleteprop: $addressdeleteprop) {
      status
      error {
        path
        message
      }
    }
  }
`
