const Post = {
  postedUser(parent, args, { prisma, request }, info) {
    return prisma.user.findUnique({
      where: {
        id: parent.userId
      }
    });
  }
}

module.exports = Post;
