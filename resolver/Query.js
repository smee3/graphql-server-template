const Query = {
  users: async (root, args, { prisma }, info) => {
    try {
      if (!args.query) {
        return prisma.user.findMany();
      } else {
        return prisma.user.findMany({
          where: {
            OR: [
              { name: { contains: args.query, mode: 'insensitive' } },
              { email: { contains: args.query, mode: 'insensitive' } }
            ]
          }
        });
      }
    } catch (error) {
      throw error;
    }
  },

  posts(parent, args, { db, pubsub }, info) {
    if (!args.query) {
      return db.posts
    } else {
      return db.posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isAuthorMatch = post.author.toLowerCase().includes(args.query.toLowerCase())
        return isTitleMatch || isAuthorMatch
      })
    }
  }
}

module.exports = Query
