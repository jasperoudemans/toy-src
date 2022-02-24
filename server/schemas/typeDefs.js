const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    location: String!
    listings: [Toys]
}

type Auth {
    token: ID!
    profile: Profile
}

type Toys {
    _id: ID
    name: String!
    price: Int!
    imageURL: String!
    owner: String!
    description: String!
}

type Comments {
    _id: ID
    comment: String!
    owner: String!
    date: String
}

type Query {
    me: User
    users: [User]
    toys: [Toys]
    comments: [Comments]
}

type Mutation {
    addUser(username: String!, email: String!, password: String!) : Auth
    login(email: String!, password: String!) : Auth

    addToy(name: String!, price: Int!, imageURL: String!, owner: String!, description: String!) : Toys
    removeToy(toyID: ID!) : Toys

    addComment(comment: String!, owner: String!, date: String!): Comments
}
`;

module.exports = typeDefs;