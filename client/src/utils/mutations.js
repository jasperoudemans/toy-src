import gql from "graphql-tag";

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!, $location: String!) {
    addUser(username: $username, password: $password, email: $email, location: $location) {
      token
      user {
        username
        _id
        email
        location
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOWER_REPUTATION = gql`
mutation lowerReputation($username: String!) {
  lowerReputation(username: $username) {
    username
    reputation
  }
}
`;

export const INCREASE_REPUTATION = gql`
mutation increaseReputation($username: String!) {
  increaseReputation(username: $username) {
    username
    reputation
  }
}
`;

export const ADD_TOY = gql`
mutation addToy($name: String!, $price: Int!, $imageURL: String!, $owner: String!, $description: String!) {
  addToy(name: $name, price: $price, imageURL: $imageURL, owner: $owner, description: $description) {
    name
    price
    imageURL
    owner
    description
  }
}
`;

