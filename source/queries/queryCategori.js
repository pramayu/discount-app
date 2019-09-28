import gql from 'graphql-tag';


export var GET_CATEGORI = gql`
  query {
    categori {
      _id
      child
      niche
    }
  }
`
