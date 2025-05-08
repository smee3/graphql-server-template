# GraphQL Server テンプレート

このプロジェクトは、Apollo ServerとPrismaを使用したGraphQLサーバーのテンプレートです。PostとUserエンティティを管理するためのAPIを提供しています。ユーザー認証とリレーショナルデータモデルを実装しています。

## 機能

- **クエリ**:
  - Postの取得（タイトルまたは著者でフィルタリング可能）
  - Userの取得（名前またはメールアドレスでフィルタリング可能）
  - リレーションを通じたデータ取得（ユーザーの投稿、投稿のユーザー）
- **ミューテーション**:
  - Postの作成、更新、削除（認証必須）
  - Userの登録、ログイン
- **サブスクリプション**: Postの変更をリアルタイムで監視
- **認証**: JWTを使用したユーザー認証（環境変数による秘密鍵管理）
- **リレーション**: UserとPostの間に1対多のリレーションを実装

## 技術スタック

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - GraphQLサーバー
- [GraphQL](https://graphql.org/) - APIクエリ言語
- [Node.js](https://nodejs.org/) - JavaScriptランタイム
- [Prisma](https://www.prisma.io/) - Node.js/TypeScript用ORM
- [PostgreSQL](https://www.postgresql.org/) - リレーショナルデータベース
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - パスワードハッシュ化
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - JWT認証

## プロジェクト構造

```
graphql-server/
├── .env                 # 環境変数設定ファイル
├── index.js             # サーバー起動ファイル
├── package.json         # プロジェクト設定
├── schema.js            # GraphQLスキーマ定義
├── options/             # ユーティリティ関数
│   └── getUserId.js     # ユーザー認証ユーティリティ
├── prisma/              # Prisma設定
│   └── schema.prisma    # Prismaスキーマ
├── generated/           # Prisma生成ファイル
│   └── prisma/          # Prismaクライアント
└── resolver/            # リゾルバー
    ├── Mutation.js      # ミューテーションリゾルバー
    ├── Query.js         # クエリリゾルバー
    ├── Subscription.js  # サブスクリプションリゾルバー
    ├── User.js          # Userタイプリゾルバー
    └── Post.js          # Postタイプリゾルバー
```

## セットアップ

### 前提条件

- Node.js (v12以上)
- npm または yarn
- PostgreSQL

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/graphql-server.git
cd graphql-server

# 依存関係のインストール
npm install
# または
yarn install

# 環境変数の設定
# .envファイルを作成し、以下の内容を追加
# DATABASE_URL="postgresql://username:password@localhost:5432/graphql_server?schema=public"
# JWT_SECRET="your-secret-key-for-jwt"

# データベースのセットアップ
npx prisma db push
```

### 起動方法

```bash
npm start
# または
node index.js
```

サーバーが起動すると、以下のURLでGraphQLプレイグラウンドにアクセスできます：
- GraphQL Playground: http://localhost:4000

## 使用例

### クエリ例

```graphql
# すべてのPostを取得
query {
  posts {
    id
    title
    author
    postedUser {
      id
      name
    }
    createdAt
    updatedAt
  }
}

# タイトルまたは著者で検索
query {
  posts(query: "夏目") {
    id
    title
    author
  }
}

# すべてのUserを取得
query {
  users {
    id
    name
    email
    posts {
      id
      title
    }
    createdAt
    updatedAt
  }
}

# 名前またはメールアドレスで検索
query {
  users(query: "test") {
    id
    name
    email
  }
}
```

### ミューテーション例

```graphql
# 新しいPostを作成（認証が必要）
mutation {
  createPost(data: {
    title: "走れメロス"
    author: "太宰治"
  }) {
    id
    title
    author
    postedUser {
      id
      name
    }
    createdAt
    updatedAt
  }
}

# 認証ヘッダーの例
# {
#   "Authorization": "Bearer YOUR_JWT_TOKEN"
# }

# Postを更新
mutation {
  updatePost(
    id: "1"
    data: {
      title: "坊っちゃん"
      author: "夏目漱石"
    }
  ) {
    id
    title
    author
  }
}

# Postを削除
mutation {
  deletePost(id: "1") {
    id
    title
    author
  }
}

# ユーザー登録
mutation {
  createUser(data: {
    name: "テストユーザー"
    email: "test@example.com"
    password: "password123"
  }) {
    token
    user {
      id
      name
      email
    }
  }
}

# ログイン
mutation {
  login(data: {
    email: "test@example.com"
    password: "password123"
  }) {
    token
    user {
      id
      name
      email
    }
  }
}
```

### サブスクリプション例

```graphql
# Postの変更をリアルタイムで監視
subscription {
  post {
    mutation
    data {
      id
      title
      author
    }
  }
}
```

## 拡張方法

このテンプレートは、以下のような方法で拡張できます：

1. **リレーションの活用**: 既存のPostとUserの間のリレーションを活用した機能拡張
2. **権限管理**: ロールベースのアクセス制御を実装
3. **ファイルアップロード**: 画像などのファイルアップロード機能を追加
4. **テスト**: 単体テストや統合テストの追加

