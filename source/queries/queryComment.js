import gql from 'graphql-tag';

export var COMMENT_TO_STUFF = gql`
  mutation($commentprop: commentprop) {
    comment_to_stuff(commentprop: $commentprop) {
      status
      error {
        path
        message
      }
      comment {
        _id
        child
        createAt
        user {
          _id
          username
          fullname
          photos {
            _id
            secureUrl
          }
        }
        stuff {
          _id
        }
      }
    }
  }
`;

export var EDIT_COMMENT_STUFF = gql`
  mutation($commentprop: commentprop) {
    edit_comment_stuff(commentprop: $commentprop) {
      status,
      error {
        path
        message
      }
    }
  }
`;

export var DELETE_COMMENT_STUFF = gql`
  mutation($commentprop: commentprop) {
    delete_comment_stuff(commentprop: $commentprop) {
      status,
      error {
        path
        message
      }
    }
  }
`

export var COMMENT_STUFF = gql`
  query($commentprop: commentprop) {
    comment_stuff(commentprop: $commentprop) {
      _id
      child
      createAt
      user {
        _id
        username
        fullname
        photos {
          _id
          secureUrl
        }
      }
      stuff {
        _id
      }
      rate {
        _id
        scale
      }
    }
  }
`;
