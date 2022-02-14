// const { gql } = require("apollo-server-express");

// const typeDefs = gql`
//   type User {
//     name: String!
//     age: Int!
//     married: Boolean!
//   }

//   #QUERY
//   type Query {
//     getAllUsers: [User!]!
//   }

//   #MUTATION
//   type Mutation {
//     createUser(name: String!, age: Int!, married: Boolean!): User
//   }
// `;

// module.exports = { typeDefs };

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
    married: Boolean!
    nationality: Nationality!
    friends: [User]
    favoriteMovie: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
  }

  enum Nationality {
    GHANA
    SPAIN
    BRAZIL
    CANADA
    ITALY
  }

  type Query {
    # query for all users
    users: [User!]!

    # query to get a single user
    user(id: ID): User!

    # get all movies
    movies: [Movie!]!

    #get single movie
    movie(name: String!): Movie!
  }

  input CreateUserInput {
    name: String!
    age: Int!
    married: Boolean!
    nationality: Nationality
  }
  input UpdateUserInput {
    id: ID!
    name: String!
  }

  type Mutation {
    createUser(
      name: String!
      age: Int!
      married: Boolean
      nationality: Nationality
    ): User
    updateUserName(input: UpdateUserInput!): User
    deleteUser(id: ID!): User
  }

  # OR
  # type Mutation {
  #   createUser(input: CreateUserInput!): User!
  # }
`

module.exports = { typeDefs };
