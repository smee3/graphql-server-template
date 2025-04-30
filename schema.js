const {gql} = require('apollo-server');

const typeDefs = gql`
type Query {
  posts(query: String): [Post!]!
  users(query: String): [User!]!
}

type Mutation {
  createPost(data: CreatePostInput!): Post!
  updatePost(id: ID!, data: UpdatePostInput!): Post!
  deletePost(id: ID!): Post!
  createUser(data: CreateUserInput!): AuthPayload!
  login(data: LoginUserInput!): AuthPayload!
}

type Subscription {
  post: PostSubscriptionPayload!
}

input CreatePostInput {
  title: String!
  author: String!
}

input UpdatePostInput {
  title: String
  author: String
}

type Post {
  id: ID!
  title: String!
  author: String!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

type PostSubscriptionPayload {
  mutation: MutationType!
  data: Post!
}

type AuthPayload {
  token: String!
  user: User!
}

input CreateUserInput {
  name: String!
  email: String!
  password: String!
}

input LoginUserInput {
  email: String!
  password: String!
}

type User {
  id: ID!
  name: String!
  email: String
  password: String!
}
`

module.exports = typeDefs;
