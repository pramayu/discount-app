import gql from 'graphql-tag';

export var ADD_TO_CART = gql`
  mutation($userID: ID!, $stuffID: ID!) {
    add_to_cart(userID: $userID, stuffID: $stuffID) {
      status
      error {
        path
        message
      }
      cart {
        _id
        stuffs {
          _id
          title
          photos {
            _id
            secureUrl
          }
        }
        user {
          _id
        }
      }
    }
  }
`;

export var GET_USER_CART = gql`
  query($usercartprop: usercartprop) {
    get_user_cart(usercartprop: $usercartprop) {
      status
    }
  }
`
