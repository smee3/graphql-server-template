# GraphQL Server テンプレート

このプロジェクトは、Apollo Serverを使用したシンプルなGraphQLサーバーのテンプレートです。Postエンティティを管理するためのAPIを提供しています。

## 機能

- **クエリ**: Postの取得（タイトルまたは著者でフィルタリング可能）
- **ミューテーション**: Postの作成、更新、削除
- **サブスクリプション**: Postの変更をリアルタイムで監視

## 技術スタック

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - GraphQLサーバー
- [GraphQL](https://graphql.org/) - APIクエリ言語
- [Node.js](https://nodejs.org/) - JavaScriptランタイム

## プロジェクト構造

```
graphql-server/
├── db.js                # インメモリデータベース
├── index.js             # サーバー起動ファイル
├── package.json         # プロジェクト設定
├── schema.js            # GraphQLスキーマ定義
└── resolver/            # リゾルバー
    ├── Mutation.js      # ミューテーションリゾルバー
    ├── Query.js         # クエリリゾルバー
    └── Subscription.js  # サブスクリプションリゾルバー
```

## セットアップ

### 前提条件

- Node.js (v12以上)
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/graphql-server.git
cd graphql-server

# 依存関係のインストール
npm install
# または
yarn install
```

### 起動方法

```bash
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

1. **データベース連携**: Prismaなどを使用して、実際のデータベースと連携
2. **認証機能**: JWT認証などを追加
3. **追加エンティティ**: 新しいエンティティとそれに関連するリゾルバーを追加

## ライセンス

ISC

## 貢献

プルリクエストや機能リクエストは歓迎します。大きな変更を加える前に、まずissueを開いて議論してください。
