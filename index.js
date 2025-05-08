require('dotenv').config();
const { ApolloServer, PubSub } = require('apollo-server');
const Query = require('./resolver/Query');
const Mutation = require('./resolver/Mutation');
const Subscription = require('./resolver/Subscription')
const User = require('./resolver/User');
const Post = require('./resolver/Post');
const typeDefs = require('./schema');

const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();
const pubsub = new PubSub()
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post
  },
  context: ({ req }) => {
    return {
      prisma,
      pubsub,
      request: { req }
    };
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`)
});
