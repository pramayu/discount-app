import gql from 'graphql-tag';

export var DISCOUNT_TYPE = gql`
  query {
    discountypes {
      _id
      child
    }
  }
`
