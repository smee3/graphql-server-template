# GraphQL Server テンプレート

このプロジェクトは、Apollo ServerとPrismaを使用したGraphQLサーバーのテンプレートです。PostとUserエンティティを管理するためのAPIを提供しています。

## 機能

- **クエリ**:
  - Postの取得（タイトルまたは著者でフィルタリング可能）
  - Userの取得（名前またはメールアドレスでフィルタリング可能）
- **ミューテーション**:
  - Postの作成、更新、削除
  - Userの登録、ログイン
- **サブスクリプション**: Postの変更をリアルタイムで監視
- **認証**: JWTを使用したユーザー認証

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
├── db.js                # インメモリデータベース（レガシー）
├── index.js             # サーバー起動ファイル
├── package.json         # プロジェクト設定
├── schema.js            # GraphQLスキーマ定義
├── create_tables.sql    # データベーステーブル作成SQL
├── prisma/              # Prisma設定
│   └── schema.prisma    # Prismaスキーマ
├── generated/           # Prisma生成ファイル
│   └── prisma/          # Prismaクライアント
└── resolver/            # リゾルバー
    ├── Mutation.js      # ミューテーションリゾルバー
    ├── Query.js         # クエリリゾルバー
    └── Subscription.js  # サブスクリプションリゾルバー
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

# データベースのセットアップ
npx prisma db push
# または
psql -U username -d graphql_server -f create_tables.sql
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
# 新しいPostを作成
mutation {
  createPost(data: {
    title: "走れメロス"
    author: "太宰治"
  }) {
    id
    title
    author
  }
}

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

1. **リレーション追加**: PostとUserの間にリレーションを追加（例：投稿者情報）
2. **権限管理**: ロールベースのアクセス制御を実装
3. **ファイルアップロード**: 画像などのファイルアップロード機能を追加
4. **テスト**: 単体テストや統合テストの追加

## ライセンス

ISC

## 貢献

プルリクエストや機能リクエストは歓迎します。大きな変更を加える前に、まずissueを開いて議論してください。
