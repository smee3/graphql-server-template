const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserId } = require('../options/getUserId');

const Mutation = {
  async createPost(parent, args, { pubsub, prisma, request }, info) {
    const userId = getUserId(request)
    const post = await prisma.post.create({
      data: {
        ...args.data,
        postedUser: {
          connect: {
            id: userId,
          },
        },
      },
    })

    pubsub.publish('post', {
      post: {
        mutation: 'CREATED',
        data: post,
      },
    })

    return post
  },

  async updatePost(parent, args, { pubsub, prisma, request }, info) {
    const { id: idString, data } = args
    const id = parseInt(idString, 10)
    const post = await prisma.post.findUnique({
      where: { id },
    })
    if (!post) {
      throw new Error('Post not found')
    }

    if (typeof data.title === 'string' && typeof data.author === 'string') {
      post.title = data.title
      post.author = data.author
      pubsub.publish('post', {
        post: {
          mutation: 'UPDATED',
          data: post,
        },
      })
    }

    return prisma.post.update({
      where: { id },
      data: {
        ...data,
      },
    })
  },

  async deletePost(parent, args, { pubsub, prisma, request }, info) {
    const { id: idString } = args
    const id = parseInt(idString, 10)
    const post = await prisma.post.findUnique({
      where: { id },
    })
    if (!post) {
      throw new Error('Post not found')
    }

    pubsub.publish('post', {
      post: {
        mutation: 'DELETED',
        data: post,
      },
    })

    return prisma.post.delete({
      where: { id },
    })
  },

  async createUser(parent, args, { prisma }, info) {
    const { data: { name, email, password } } = args;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      throw new Error(`ユーザーは既に存在します。メールアドレス: ${email}`);
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      }
    });

    return {
      token: jwt.sign(user.id, process.env.JWT_SECRET),
      user
    };
  },

  async login(parent, args, { prisma }, info) {
    const { data: { email, password } } = args;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new Error('User not found');
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
    return {
      token: jwt.sign(user.id, process.env.JWT_SECRET),
      user
    };
  },
}

module.exports = Mutation
