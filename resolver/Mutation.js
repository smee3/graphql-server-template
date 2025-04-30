const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutation = {
  createPost(parent, args, { db, pubsub }, info) {
    const postNumTotal = String(db.posts.length + 1)
    const post = {
      id: postNumTotal,
      ...args.data,
    }

    db.posts.push(post)
    pubsub.publish('post', {
      post: {
        mutation: 'CREATED',
        data: post,
      },
    })
    return post
  },

  updatePost(parent, args, { db, pubsub }, info) {
    const { id, data } = args
    const post = db.posts.find((post) => post.id === id)
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
    return post
  },

  deletePost(parent, args, { db, pubsub }, info) {
    const post = db.posts.find((post) => post.id === args.id)
    const postIndex = db.posts.findIndex((post) => post.id == args.id)

    if (postIndex === -1) {
      throw new Error('Post not found')
    }
    db.posts.splice(postIndex, 1)
    pubsub.publish('post', {
      post: {
        mutation: 'DELETED',
        data: post,
      },
    })
    return post
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
      token: jwt.sign(user.id, 'supersecret'),
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
      token: jwt.sign(user.id, 'supersecret'),
      user
    };
  },
}

module.exports = Mutation
