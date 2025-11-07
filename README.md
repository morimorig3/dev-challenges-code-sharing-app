# NoteCode - コード共有アプリ

[![DevChallenges](https://img.shields.io/badge/DevChallenges-Code%20Sharing%20App-blue)](https://devchallenges.io/challenge/code-sharing-app-note-code)

コードスニペットを保存し、一意の URL で共有できるフルスタックアプリケーションです。

## デザイン

### デスクトップビュー (1350px)

![Desktop Design](./design/Desktop_1350px.jpg)

### モバイルビュー (412px)

![Mobile Design](./design/Mobile_412px.jpg)

## ドキュメント

- **[要件定義書](./docs/requirements.md)** - 詳細な機能要件、技術要件、非機能要件

## 主な機能

- コードエディタ（Monaco Editor）でコードを編集
- 言語とテーマの選択
- Share ボタンでスニペットを保存し、一意の URL を生成
- URL をクリップボードにコピー
- 共有 URL から他のユーザーがコードにアクセス可能
- レスポンシブデザイン（デスクトップ・モバイル対応）

## 技術スタック

### フロントエンド

- **フレームワーク**: React 19.1 with TypeScript
- **ビルドツール**: Vite 7 (rolldown-vite)
- **スタイリング**: Tailwind CSS 4.1
- **UI コンポーネント**: Radix UI + shadcn/ui パターン
- **コードエディタ**: Monaco Editor (@monaco-editor/react 4.7)
- **状態管理**: React Hooks
- **HTTP クライアント**: Axios 1.13
- **アイコン**: Lucide React

### バックエンド

- **フレームワーク**: NestJS 11 with TypeScript
- **ランタイム**: Node.js 20+ LTS
- **ORM**: TypeORM 0.3.27
- **データベースドライバ**: pg 8.16
- **ID 生成**: nanoid 5.1
- **バリデーション**: class-validator 0.14 + class-transformer 0.5
- **環境変数管理**: @nestjs/config 4.0

### データベース

- **RDBMS**: PostgreSQL 16 (開発: Docker / 本番: Neon)
- **ORM**: TypeORM
- **マイグレーション**: TypeORM CLI

### デプロイ（完全無料）

- **フロントエンド**: Cloudflare Pages
- **バックエンド**: Render (Free Tier)
- **データベース**: Neon (Free Tier)

## アーキテクチャ

```
Cloudflare Pages (フロントエンド)
    ↓ HTTPS
Render (NestJS API)
    ↓ PostgreSQL接続
Neon (PostgreSQL)
```

## セットアップ

TBD

## 開発

TBD

## デモ

- **フロントエンド**: https://dev-challenges-code-sharing-app.pages.dev/
- **バックエンド**: TBD (Render にデプロイ予定)

## ライセンス

MIT

## 参考

- [DevChallenges - Code Sharing App](https://devchallenges.io/challenge/code-shraing-app-note-code)
- [DevChallenges - フルスタック学習パス](https://devchallenges.io/learn/5-fullstack)
