const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // 既存のデータを削除（オプション）
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('🌱 シードデータの投入を開始します...');

  // 初期ユーザーの作成
  const user1 = await prisma.user.create({
    data: {
      name: 'paul',
      email: 'paul@sample.com',
      password: await bcrypt.hash('hogebarfoo', 10),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'john',
      email: 'john@sample.com',
      password: await bcrypt.hash('hogebarfoo', 10),
    },
  });

  console.log(`👤 ユーザーを作成しました: ${user1.name}, ${user2.name}`);

  // 初期ポストの作成
  const post1 = await prisma.post.create({
    data: {
      title: '吾輩は猫である',
      author: '夏目漱石',
      userId: user1.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: '坊っちゃん',
      author: '夏目漱石',
      userId: user1.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: '人間失格',
      author: '太宰治',
      userId: user2.id,
    },
  });

  const post4 = await prisma.post.create({
    data: {
      title: '走れメロス',
      author: '太宰治',
      userId: user2.id,
    },
  });

  console.log(`📚 ポストを作成しました: ${post1.title}, ${post2.title}, ${post3.title}, ${post4.title}`);

  console.log('🌱 シードデータの投入が完了しました！');
}

main()
  .catch((e) => {
    console.error('シードデータの投入中にエラーが発生しました:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
