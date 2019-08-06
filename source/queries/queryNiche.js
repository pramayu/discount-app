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
