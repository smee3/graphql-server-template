const { getUserId } = require('../options/getUserId');
const Query = {
  users: async (root, args, { prisma, request }, info) => {
    try {
      const userId = getUserId(request, false);
      if (!userId) {
        throw new Error('Authentication required.');
      }

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

  posts(parent, args, { prisma, request }, info) {
    try  {
      const userId = getUserId(request, false);
      if (!userId) {
        throw new Error('Authentication required.');
      }

      if (!args.query) {
        return prisma.post.findMany();
      } else {
        return prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: args.query, mode: 'insensitive' } },
              { author: { contains: args.query, mode: 'insensitive' } }
            ]
          }
        });
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Query
