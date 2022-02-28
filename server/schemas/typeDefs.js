const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    location: String!
    reputation: Int
    hasReview: Boolean,
    reviewedUsers: [String]
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

    removeComment(id: ID!, index: Int) : Toys
    addComment(id: ID!, comment: String!, author: String!) : Comments

    addUser(username: String!, email: String!, password: String! location: String!) : Auth
    login(email: String!, password: String!) : Auth

    addToy(name: String!, price: Int!, imageURL: String!, owner: String!, description: String!) : Toys
    removeToy(_id: ID!) : Toys

    lowerReputation(username: String!) : User
    increaseReputation(username: String!) : User
}
`;

module.exports = typeDefs;