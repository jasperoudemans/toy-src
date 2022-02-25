const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    location: String!
    listings: [Toys]
    reputation: Int
    hasReview: Boolean
}

type Auth {
    token: ID!
    user: User
}

type Toys {
    _id: ID
    name: String!
    price: Int!
    imageURL: String!
    owner: String!
    description: String!
    comments: [Comments]
}

type Comments {
    _id: ID
    comment: String!
    author: String!
}

type Query {
    me: User
    users: [User]
    toys: [Toys]
    comments: [Comments]
}

type Mutation {
    addUser(username: String!, email: String!, password: String! location: String!) : Auth
    login(email: String!, password: String!) : Auth

    addToy(name: String!, price: Int!, imageURL: String!, owner: String!, description: String!) : Toys
    removeToy(toyID: ID!) : Toys
}
`;

module.exports = typeDefs;