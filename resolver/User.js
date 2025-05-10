const getUserId = require('../options/getUserId');

const User = {
  posts(parent, args, { prisma, request }, info) {
    return prisma.post.findMany({
      where: {
        userId: parent.id
      }
    });
  },
}

module.exports = User;
