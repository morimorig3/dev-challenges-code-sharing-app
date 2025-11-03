# NoteCode - コード共有アプリ 要件定義書

## 1. プロジェクト概要

NoteCodeは、ユーザーがコードスニペットを保存し、一意のIDで共有できるフルスタックのコード共有アプリケーションです。

## 2. ユーザーストーリー

1. 提供されたデザインに従ってコード共有アプリを作成する
2. 初期読み込み時にデフォルトのHTMLスニペットを表示する
3. ユーザーが「Share」ボタンをクリックすると一意のIDを生成する
4. コードが保存された後、編集が行われるまで「Share」ボタンを無効化する
5. スニペットの言語とテーマを選択できるようにする
6. すべてのデバイスでレスポンシブデザインを確保する
7. リポジトリURLとデモURLを含むソリューションをデプロイする

## 3. 主要機能

### 3.1 共有機能

- **初期状態**: Shareボタンが有効
- **共有時**:
  - 一意のIDを生成
  - コードをデータベースに保存（手動保存）
  - Shareボタンを無効化
  - 「Copy Link」オプションを表示
  - 生成されたURLをクリップボードにコピー可能にする
- **編集時**: コードを編集するとShareボタンを再度有効化
- **アクセス**: 他のユーザーは一意のURL（例: `/snippet/:id`）を介してコードにアクセスし、閲覧・変更が可能

### 3.2 デフォルトコンテンツ

初期読み込み時に、以下のサンプルHTMLコードをエディタに表示：

```html
<html>
  <head>
    <title>HTML Sample</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
      h1 { color: #cca3a3; }
    </style>
    <script type="text/javascript">
      alert("I am a sample... visit devChallenges.io for more projects");
    </script>
  </head>
  <body>
    <h1>Heading No.1</h1>
    <input disabled type="button" value="Click me" />
  </body>
</html>
```

**含まれる要素：**
- JavaScriptアラート（サンプルメッセージを表示）
- スタイル付き見出し（`#cca3a3`カラーのh1要素）
- 無効化されたボタン（`disabled`属性付きのinput要素）

### 3.3 コードエディタ

- Monaco Editorまたは代替エディタ（CodeMirror、Ace Editorなど）を使用
- コードの編集機能を提供

### 3.4 言語とテーマの選択

- **言語選択**: 複数のプログラミング言語に対応（HTML, CSS, JavaScript, Python, Java等）
  - 使用するエディタライブラリ（Monaco Editor等）が提供する言語リストから選択
- **テーマ選択**: 複数のエディタテーマから選択可能（例: VS Dark, Light, High Contrast等）
  - 使用するエディタライブラリが提供するテーマから選択
- 選択した言語とテーマはスニペットとともに保存され、共有時も反映される

### 3.5 画面遷移とURL設計

本アプリケーションは**単一ページアプリケーション（SPA）**として実装し、クエリパラメータで状態を管理します。

**URL設計**:
- **新規スニペット作成**: `/`
  - デフォルトのHTMLコードを表示
  - Shareボタンは有効状態
- **既存スニペット表示**: `/?id={snippet_id}`
  - 例: `/?id=V1StGXR8_Z5jdHi6B-myT`
  - URLからスニペットIDを取得し、APIから該当スニペットを取得して表示
  - 他のユーザーが共有URLにアクセスした際の表示

**画面フロー**:
1. ユーザーがトップページ（`/`）にアクセス → デフォルトHTMLを表示
2. コードを編集 → Shareボタンが有効化
3. Shareボタンをクリック → API経由でスニペットを保存 → 一意のIDを取得
4. `/?id=xxx` 形式のURLを生成 → クリップボードにコピー
5. 他のユーザーが `/?id=xxx` にアクセス → APIからスニペットを取得して表示

**技術実装**:
- React Routerは使用しない
- `URLSearchParams` または `window.location.search` でクエリパラメータを取得
- `useEffect` でマウント時にクエリパラメータをチェックし、IDがあればAPIから取得

### 3.6 レスポンシブデザイン

- **対応デバイス**:
  - デスクトップ: 1350px 幅を基準
  - モバイル: 412px 幅を基準
- デザインモックアップが両ビューポートサイズで提供されている
- メディアクエリ、Flexbox、Gridを使用してレスポンシブ対応を実装

## 4. 技術要件

### 4.1 フロントエンド

- **フレームワーク**: React 19
- **ビルドツール**: Vite
- **言語**: TypeScript
- **UIライブラリ**: shadcn/ui
- **スタイリング**: Tailwind CSS
- **コードエディタ**: Monaco Editor（@monaco-editor/react）
- **状態管理**: React Hooks（useState, useEffect）
- **HTTPクライアント**: Axios または Fetch API
- **バリデーション**: Zod
- **クリップボード操作**: Clipboard API
- **通知**: react-hot-toast または shadcn/ui Toast コンポーネント

**URL設計**:
- **新規スニペット作成**: `/`
- **既存スニペット表示**: `/?id={snippet_id}`
  - 例: `/?id=V1StGXR8_Z5jdHi6B-myT`
- クエリパラメータの取得: `URLSearchParams` または `window.location.search`
- React Routerは使用せず、単一ページで完結

**必須機能**:
- Monaco Editorの統合と設定
- 言語・テーマ選択UI（ドロップダウン）
- Shareボタンの状態管理（有効/無効）
- URLの生成とクリップボードへのコピー
- クエリパラメータからスニペットIDを取得し、存在する場合はAPIから取得して表示
- ローディング状態の表示
- エラーハンドリングとユーザーへのフィードバック

### 4.2 バックエンド

- **フレームワーク**: NestJS 11
- **言語**: TypeScript
- **ランタイム**: Node.js 20+ LTS
- **ORM**: TypeORM
- **バリデーション**: Zod + class-validator（NestJSパイプと併用）
- **環境変数管理**: @nestjs/config
- **ID生成**: nanoid（21文字のURL-safeなID）
- **CORS**: @nestjs/platform-express（組み込み）
- **APIドキュメント**: @nestjs/swagger（オプション）

**アーキテクチャ**:
- モジュラー構造（Snippets Module等）
- DTOパターンによる入出力の型定義
- Repository パターン（TypeORM）
- Exception Filter によるエラーハンドリング

**必須機能**:
- スニペット保存エンドポイント（POST /api/snippets）
- スニペット取得エンドポイント（GET /api/snippets/:id）
- バリデーションパイプによる入力検証
- エラーレスポンスの統一

### 4.3 データベース

- **RDBMS**: PostgreSQL 14+
- **ORM**: TypeORM
- **マイグレーション**: TypeORM CLI

**スキーマ設計**:

**Snippets テーブル**:
```sql
CREATE TABLE snippets (
  id VARCHAR(21) PRIMARY KEY,           -- nanoid生成のID
  code TEXT NOT NULL,                    -- コード本体（最大100KB）
  language VARCHAR(50) NOT NULL,         -- プログラミング言語（例: html, javascript）
  theme VARCHAR(50) NOT NULL,            -- エディタテーマ（例: vs-dark）
  created_at TIMESTAMP DEFAULT NOW(),    -- 作成日時
  updated_at TIMESTAMP DEFAULT NOW()     -- 更新日時
);

CREATE INDEX idx_snippets_id ON snippets(id);
```

**カラム詳細**:
- `id`: nanoid（21文字）、主キー、一意制約
- `code`: TEXT型、最大100KB
- `language`: VARCHAR(50)、Monaco Editorの言語名
- `theme`: VARCHAR(50)、Monaco Editorのテーマ名
- `created_at`, `updated_at`: タイムスタンプ

### 4.4 API仕様

**ベースURL**: `/api`

#### 1. スニペット作成

```
POST /api/snippets
```

**リクエストボディ**:
```json
{
  "code": "string",      // 必須、最大100KB
  "language": "string",  // 必須、例: "html", "javascript"
  "theme": "string"      // 必須、例: "vs-dark", "light"
}
```

**レスポンス（201 Created）**:
```json
{
  "id": "V1StGXR8_Z5jdHi6B-myT",
  "code": "...",
  "language": "html",
  "theme": "vs-dark",
  "createdAt": "2025-11-02T12:00:00.000Z",
  "updatedAt": "2025-11-02T12:00:00.000Z"
}
```

**エラーレスポンス**:
- `400 Bad Request`: バリデーションエラー
- `500 Internal Server Error`: サーバーエラー

#### 2. スニペット取得

```
GET /api/snippets/:id
```

**パスパラメータ**:
- `id`: スニペットID（nanoid、21文字）

**レスポンス（200 OK）**:
```json
{
  "id": "V1StGXR8_Z5jdHi6B-myT",
  "code": "...",
  "language": "html",
  "theme": "vs-dark",
  "createdAt": "2025-11-02T12:00:00.000Z",
  "updatedAt": "2025-11-02T12:00:00.000Z"
}
```

**エラーレスポンス**:
- `404 Not Found`: スニペットが見つからない
  ```json
  {
    "statusCode": 404,
    "message": "スニペットが見つかりません",
    "error": "Not Found"
  }
  ```
- `500 Internal Server Error`: サーバーエラー

**CORS設定**:
- フロントエンドのオリジンを許可
- メソッド: GET, POST
- ヘッダー: Content-Type, Authorization（将来的な拡張用）

### 4.5 デプロイメント

**プロジェクト構成**: モノレポまたは分離リポジトリ
- フロントエンド: `/frontend` または独立リポジトリ
- バックエンド: `/backend` または独立リポジトリ
- 共通型定義: `/shared`（オプション）

**採用構成**（完全無料デプロイ）:

```
Cloudflare Pages (フロントエンド)
    ↓ HTTPS
Render (NestJS API)
    ↓ PostgreSQL接続
Neon (PostgreSQL)
```

**各サービスの設定**:

#### **Cloudflare Pages** (フロントエンド)
- **ビルドコマンド**: `npm run build`
- **ビルド出力ディレクトリ**: `dist`
- **Node.js バージョン**: 20+
- **環境変数**:
  - `VITE_API_URL`: Renderのバックエンド URL（例: `https://your-app.onrender.com/api`）
- **機能**:
  - GitHub連携で自動デプロイ
  - 無制限の帯域幅
  - グローバルCDN
  - カスタムドメイン対応

#### **Render** (バックエンド)
- **サービスタイプ**: Web Service
- **ビルドコマンド**: `npm install && npm run build`
- **起動コマンド**: `npm run start:prod`
- **Node.js バージョン**: 20+
- **無料プラン制約**:
  - 15分間非アクティブでスリープ
  - 初回リクエスト時に起動（数十秒）
  - 月750時間まで
- **環境変数**:
  - `NODE_ENV=production`
  - `PORT`: Renderが自動設定
  - `DATABASE_URL`: Neonの接続文字列
  - `FRONTEND_URL`: Cloudflare PagesのURL（CORS設定用）

#### **Neon** (PostgreSQL)
- **プラン**: 無料プラン
- **リージョン**: 最寄りのリージョン（レイテンシ削減）
- **機能**:
  - 0.5 GB ストレージ
  - 自動スリープ（非アクティブ時）
  - サーバーレスPostgreSQL
- **接続情報**: ダッシュボードから接続文字列を取得

**環境変数**:

フロントエンド（`.env`）:
```bash
# 開発環境
VITE_API_URL=http://localhost:3001/api

# 本番環境（Cloudflare Pagesに設定）
# VITE_API_URL=https://your-app.onrender.com/api
```

バックエンド（`.env`）:
```bash
# 開発環境
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/notecode
FRONTEND_URL=http://localhost:5173

# 本番環境（Renderに設定）
# NODE_ENV=production
# PORT=<Renderが自動設定>
# DATABASE_URL=<Neonの接続文字列>
# FRONTEND_URL=https://your-app.pages.dev
```

**CI/CD**:
- GitHub Actions（オプション）
- デプロイサービスの自動デプロイ機能を利用

**本番環境の考慮事項**:
- 環境変数の適切な設定
- データベース接続プールの設定
- ログ管理
- エラー監視（オプション: Sentry等）

## 5. 非機能要件

### 5.1 パフォーマンス

- **初期読み込み時間**: 3秒以内（通常のネットワーク環境下）
- **コードの保存**: 1秒以内にレスポンスを返す
- **コードの取得**: 共有URLアクセス時、2秒以内にエディタに表示
- **エディタの起動**: ページ読み込み後、1秒以内にエディタが操作可能になる

### 5.2 セキュリティ

- **一意のID生成**:
  - UUIDv4 または nanoid（21文字）を使用
  - 推測・列挙攻撃に対して耐性のあるランダムなIDを生成
  - 例: `7a3f9c2b-e5d1-4a8c-9b6f-2e4d8c1a5b7c` (UUID) または `V1StGXR8_Z5jdHi6B-myT` (nanoid)
- **入力検証**:
  - コードの最大文字数制限（例: 100KB）
  - 言語とテーマの選択肢を検証
- **エラーハンドリング**:
  - 不正なスニペットIDへのアクセス時: 404エラーと「スニペットが見つかりません」メッセージ
  - データベース接続エラー時: 500エラーと「サーバーエラーが発生しました」メッセージ
  - 保存失敗時: 適切なエラーメッセージをユーザーに表示
- **CORS設定**: 必要に応じて適切なCORS設定を実装

### 5.3 ユーザビリティ

- **ユーザーインターフェース**:
  - 提供されたデザインモックアップに忠実に実装
  - コードエディタは画面の大部分を占め、コードの視認性を確保
  - 言語・テーマ選択はドロップダウンまたは選択可能なUI要素で提供
  - Shareボタンは目立つ位置に配置し、状態（有効/無効）が視覚的に分かりやすい
- **フィードバック**:
  - 保存成功時: 「スニペットを保存しました」等のメッセージ表示
  - URLコピー成功時: 「URLをコピーしました」等のトースト通知
  - エラー発生時: 具体的なエラー内容をユーザーに表示
  - ローディング状態: 保存中・読み込み中はローディングインジケーターを表示
- **保存動作**: 手動保存（Shareボタンクリック時）
  - 自動保存機能は不要
  - コード編集中はShareボタンが有効化され、保存可能な状態を示す
  - 保存後は再度編集するまでShareボタンを無効化

### 5.4 スケーラビリティ

- **想定規模**:
  - 同時アクセス: 100ユーザー程度に対応（個人プロジェクトレベル）
  - スニペット数: 10,000件程度のデータを効率的に管理
- **データベース設計**:
  - 適切なインデックス設定（スニペットIDでの高速検索）
  - 必要に応じてページネーションを実装（将来的な拡張）

## 6. 制約事項

- 提供されたデザインに従う必要がある
- レスポンシブデザインが必須
- デプロイ可能な状態でソリューションを提供する必要がある

## 7. 成果物

- ソースコードリポジトリ（GitHub等）
- デプロイされたアプリケーションのデモURL
- README.md（セットアップ手順、使用技術の説明を含む）

## 8. 参考情報

### 8.1 チャレンジ情報
- チャレンジURL: https://devchallenges.io/challenge/code-shraing-app-note-code
- フルスタック学習パス: https://devchallenges.io/learn/5-fullstack

### 8.2 採用デプロイサービス（完全無料構成）

本プロジェクトでは、**完全無料**でフルスタックアプリケーションをデプロイするため、以下の構成を採用します。

#### 採用構成

```
Cloudflare Pages (フロントエンド)
    ↓
Render (バックエンド)
    ↓
Neon (データベース)
```

#### 各サービスの詳細

**Cloudflare Pages** (フロントエンド)
- **無料プラン**: 無制限のサイト、帯域幅、リクエスト
- **特徴**:
  - 世界最速のCDN（Cloudflareのエッジネットワーク）
  - ビルド時間: 月500回まで
  - GitHub連携で自動デプロイ
  - カスタムドメイン対応
  - React/Vite に完全対応

**Render** (バックエンド)
- **無料プラン**: あり
- **制約**:
  - 15分間非アクティブでスリープ
  - 初回リクエスト時に起動（数十秒）
  - 月750時間まで
- **特徴**:
  - NestJS に完全対応
  - GitHubと連携
  - 環境変数管理が簡単
  - 自動HTTPS

**Neon** (データベース)
- **無料プラン**: あり
- **制約**:
  - 0.5 GB ストレージ
  - 3つのプロジェクトまで
  - 非アクティブ時に自動スリープ
- **特徴**:
  - サーバーレスPostgreSQL
  - 無制限のデータベース
  - 自動バックアップ
  - TypeORM完全対応

#### 代替案（参考）

他の無料デプロイオプション：

**フロントエンド**:
- **Vercel**: Next.js に最適、100GB転送/月
- **Netlify**: 100GB帯域幅/月、UIが優秀

**バックエンド**:
- **Fly.io**: スリープなし、3つのVM無料
- **Railway**: $5の初期クレジット（使い切ったら有料）

**データベース**:
- **Supabase**: PostgreSQL + 認証機能、500MB無料
- **Vercel Postgres**: 256MB（小規模向け）
