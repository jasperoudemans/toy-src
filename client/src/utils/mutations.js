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

export const ADD_COMMENT = gql`
  mutation addComment($id: ID!, $comment: String!, $author: String!) {
    addComment(id: $id, comment: $comment, author: $author) {
      comment
      author
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($id: ID!, $index: Int!) {
    removeComment(id: $id, index: $index) {
      _id
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

export const REMOVE_TOY = gql `
mutation Mutation($id: ID!) {
  removeToy(_id: $id) {
    _id
  }
}`

export const EDIT_PROFILE =gql `
mutation editUser($username: String!, $location: String!) {
  editUser(username: $username, location: $location) {
    username
  }
}
`