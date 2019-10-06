import gql from 'graphql-tag';


export var GET_TIMELINE = gql`
  query($timelineProp: timelineProp) {
    timeline(timelineProp: $timelineProp) {
      status
      stuffs {
        _id
        photos {
          _id
          secureUrl
        }
        discounts {
          _id
          discount
          status
        }
      }
      merchant {
        _id
        name
        photos {
          _id
          secureUrl
        }
      }
    }
  }
`
