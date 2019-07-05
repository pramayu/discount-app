import gql from 'graphql-tag';


export var CREATE_USER = gql`
  mutation($username: String!, $email: String!, $phone: String!, $password: String!) {
    createuser(username: $username, email: $email, phone: $phone, password: $password) {
      status
      error {
        path
        message
      }
    }
  }
`
