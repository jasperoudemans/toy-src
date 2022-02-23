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

type Query {
    me: User
    users: [User]
    toys: [Toys]
}

type Mutation {
    addUser(username: String!, email: String!, password: String!) : Auth
    login(email: String!, password: String!) : Auth

    addToy(name: String!, price: Int!, imageURL: String!, owner: String!, description: String!) : Toy
    removeToy(toyID: ID!) : Toy
}
`;

module.exports = typeDefs;