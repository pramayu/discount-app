import gql from 'graphql-tag';

export var REPLY_TO_COMMENT_STUFF = gql`
  mutation($subcommentprop: subcommentprop) {
    reply_to_comment_stuff(subcommentprop: $subcommentprop) {
      status
      error {
        path
        message
      }
    }
  }
`;

export var DELETE_REPLY_COMMENT = gql`
  mutation($subcommentprop: subcommentprop) {
    delete_reply_comment(subcommentprop: $subcommentprop) {
      status
      error {
        path
        message
      }
    }
  }
`
