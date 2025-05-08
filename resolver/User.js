const getUserId = require('../options/getUserId');

const User = {
  posts(parent, args, { prisma, request }, info) {
    return prisma.post.findMany({
      where: {
        id: parent.id
      }
    });
  },
}

module.exports = User;
