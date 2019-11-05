import gql from 'graphql-tag';

export var ADD_VOTE_STUFF = gql`
  mutation($voteprop: voteprop) {
    add_vote_stuff(voteprop: $voteprop) {
      status
      error {
        path
        message
      }
    }
  }
`;

export var UNVOTE_STUFF = gql`
  mutation($voteprop: voteprop) {
    unvote_stuff(voteprop: $voteprop) {
      status
    }
  }
`
