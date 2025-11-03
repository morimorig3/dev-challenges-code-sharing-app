# NoteCode - コード共有アプリ

[![DevChallenges](https://img.shields.io/badge/DevChallenges-Code%20Sharing%20App-blue)](https://devchallenges.io/challenge/code-sharing-app-note-code)

コードスニペットを保存し、一意のURLで共有できるフルスタックアプリケーションです。

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
- Shareボタンでスニペットを保存し、一意のURLを生成
- URLをクリップボードにコピー
- 共有URLから他のユーザーがコードにアクセス可能
- レスポンシブデザイン（デスクトップ・モバイル対応）

## 技術スタック

### フロントエンド
- **フレームワーク**: React 19 with TypeScript
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS
- **UIライブラリ**: shadcn/ui
- **コードエディタ**: Monaco Editor (@monaco-editor/react)
- **状態管理**: React Hooks
- **HTTPクライアント**: Axios
- **通知**: react-hot-toast

### バックエンド
- **フレームワーク**: NestJS 11 with TypeScript
- **ランタイム**: Node.js 20+ LTS
- **ORM**: TypeORM
- **ID生成**: nanoid
- **バリデーション**: class-validator + Zod

### データベース
- **RDBMS**: PostgreSQL 14+ (Neon)
- **ORM**: TypeORM

### デプロイ（完全無料）
- **フロントエンド**: Cloudflare Pages
- **バックエンド**: Render
- **データベース**: Neon (PostgreSQL)

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

TBD

## ライセンス

MIT

## 参考

- [DevChallenges - Code Sharing App](https://devchallenges.io/challenge/code-shraing-app-note-code)
- [DevChallenges - フルスタック学習パス](https://devchallenges.io/learn/5-fullstack)
