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
    }
  }
`
