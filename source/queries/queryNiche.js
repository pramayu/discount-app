import gql from 'graphql-tag';

export var FETCH_NICHE=gql`
  mutation($userID: ID!) {
    fetchniches(userID: $userID) {
      status
      error {
        path
        message
      }
      niches {
        _id
        child
      }
    }
  }
`;

export var GET_NICHES=gql`
  query {
    niches {
      _id
      child
      categori {
        _id
        child
      }
    }
  }
`
