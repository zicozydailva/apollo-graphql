const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    name: String!
    age: Int!
    married: Boolean!
  }

  #QUERY
  type Query {
    getAllUsers: [User!]!
  }

  #MUTATION
  type Mutation {
    createUser(name: String!, age: Int!, married: Boolean!): User
  }
`;

module.exports = { typeDefs };
