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
`;

export var CHOOSE_CATEGORI = gql`
  mutation($categoriprop: categoriprop) {
    choosecategori(categoriprop: $categoriprop) {
      status
      error {
        path
        message
      }
    }
  }
`;

export var ADD_RULE = gql`
  mutation($userID: ID!, $merchantID: ID!, $ruleprop: [ruleprop]) {
    addrules(userID: $userID, merchantID: $merchantID, ruleprop: $ruleprop) {
      status
      error {
        path
        message
      }
      rules {
        _id
        child
      }
    }
  }
`;

export var DELETE_RULE = gql`
  mutation($ruledeleteprop: ruledeleteprop) {
    ruledelete(ruledeleteprop: $ruledeleteprop) {
      status
      error {
        path
        message
      }
    }
  }
`;

export var ADD_FACILITI = gql`
  mutation($userID: ID!, $merchantID: ID!, $facilitiprop:[facilitiprop]) {
    addfaciliti(userID: $userID, merchantID: $merchantID, facilitiprop: $facilitiprop) {
      status
      error {
        path
        message
      }
      facilities {
        _id
        child
      }
    }
  }
`;

export var DELETE_FACILITI = gql`
  mutation($facilitideleteprop: facilitideleteprop) {
    deletefaciliti(facilitideleteprop: $facilitideleteprop) {
      status
      error {
        path
        message
      }
    }
  }
`
