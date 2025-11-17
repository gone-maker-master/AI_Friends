# AI Companion - AI彼氏彼女アプリ

Expo、React Native、Firebaseを使用した、スマートフォン向けAI彼氏彼女アプリです。GPT-4を使用して、自然な会話と相手の好みのプロファイリングを実現します。

## 主な機能

- 🎭 **4つの性格タイプ**: 明るく元気、落ち着いて優しい、遊び心のある、知的で大人っぽい
- 💬 **短文での自然な会話**: AIは短い文章で会話し、チャット感覚でコミュニケーション
- 📝 **ユーザープロファイリング**: 会話を通じてユーザーの好みや趣味を記憶
- 💾 **会話履歴の保存**: Firestoreで会話履歴とユーザー情報を保存
- 🔄 **リアルタイム同期**: 複数デバイスでの同期が可能
- 📱 **Expo Go対応**: 開発中はExpo Goアプリで簡単にテスト可能

## 技術スタック

- **Expo SDK 54**: React Native開発フレームワーク（最新版）
- **Expo Router 4**: ファイルベースのルーティング
- **React Native 0.76**: クロスプラットフォーム対応
- **TypeScript**: 型安全な開発
- **Firebase 11 (Web SDK)**: 認証とデータストレージ
  - Firebase Auth (匿名認証)
  - Cloud Firestore (データベース)
- **OpenAI GPT-4**: 自然言語処理とAI会話

## セットアップ手順

### 前提条件

- Node.js 18以上
- npm または yarn
- Expo Go アプリ (スマートフォンでテストする場合)

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd AI_Friends
```

### 2. 依存関係のインストール

```bash
npm install
# または
yarn install
```

### 3. Firebase設定

#### Firebaseプロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/)にアクセス
2. 新しいプロジェクトを作成
3. Authenticationを有効化し、**匿名ログイン**を有効にする
4. Cloud Firestoreを有効化（テストモードで開始可能）

#### Firebase Web設定

1. Firebase Consoleでプロジェクト設定を開く
2. **Webアプリ**を追加（</> アイコン）
3. アプリのニックネームを入力（例: "AI Companion"）
4. Firebase設定オブジェクトをコピー

#### Firebase設定の追加

`src/services/firebase.ts`ファイルの`firebaseConfig`オブジェクトを、Firebase Consoleから取得した設定に置き換えます:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
};
```

または、`.env`ファイルで環境変数として設定できます（推奨）。

### 4. OpenAI API設定

1. [OpenAI Platform](https://platform.openai.com/)でAPIキーを取得
2. プロジェクトルートに`.env`ファイルを作成:

```bash
cp .env.example .env
```

3. `.env`ファイルにAPIキーとFirebase設定を追加:

```
OPENAI_API_KEY=your_actual_openai_api_key_here
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
```

**重要**: プロダクション環境では、APIキーをクライアントに直接埋め込むのではなく、バックエンドプロキシを経由してAPIを呼び出すことを強く推奨します。

### 5. アプリの起動

#### 開発サーバーの起動

```bash
npm start
# または
npx expo start
```

#### Expo Goでテスト（最も簡単）

1. スマートフォンに[Expo Go](https://expo.dev/client)アプリをインストール
2. `npm start`実行後に表示されるQRコードをスキャン
3. アプリが起動します

#### Android/iOSエミュレータで実行

```bash
# Android
npm run android

# iOS (macOSのみ)
npm run ios
```

#### Webで実行

```bash
npm run web
```

## プロジェクト構造

```
AI_Friends/
├── app/
│   ├── _layout.tsx                         # Expo Routerレイアウト
│   └── index.tsx                           # メイン画面（エントリーポイント）
├── src/
│   ├── screens/
│   │   ├── PersonalitySelectionScreen.tsx  # 性格選択画面
│   │   └── ChatScreen.tsx                  # チャット画面
│   ├── services/
│   │   ├── firebase.ts                     # Firebase サービス (Web SDK)
│   │   └── openai.ts                       # OpenAI サービス
│   └── types/
│       └── index.ts                        # TypeScript型定義
├── assets/                                 # 画像などのアセット
├── app.json                                # Expo設定
└── package.json                            # 依存関係
```

## 使い方

1. アプリを起動すると性格選択画面が表示されます
2. 4つの性格タイプから好きなものを選択
3. チャット画面が開き、AIとの会話が始まります
4. AIはあなたの好みや趣味を自然に聞き出し、記憶します
5. 右上の「変更」ボタンで性格を変更できます

## AIの特徴

- **短文会話**: 1〜2文程度の短い返答で、自然な会話のリズムを実現
- **プロファイリング**: ユーザーの発言から好み、趣味、興味を抽出して記憶
- **コンテキスト保持**: 過去の会話を考慮した返答
- **性格反映**: 選択した性格に基づいた言葉遣いと態度

## カスタマイズ

### 新しい性格の追加

`src/types/index.ts`の`PERSONALITIES`配列に新しい性格オブジェクトを追加:

```typescript
{
  id: 'unique_id',
  name: '性格名',
  description: '説明文',
  emoji: '😊',
  systemPrompt: 'AIへの指示...'
}
```

### AIモデルの変更

`src/services/openai.ts`の`chat`メソッド内で、モデルを変更できます:

```typescript
model: 'gpt-4-turbo', // または 'gpt-4o-mini' でコスト削減
```

## セキュリティに関する注意

⚠️ **重要**: このサンプルコードではOpenAI APIキーをクライアントアプリに直接埋め込んでいますが、これはプロダクション環境では推奨されません。

プロダクション環境では:
1. バックエンドサーバーを構築
2. クライアントからバックエンドにリクエストを送信
3. バックエンドからOpenAI APIを呼び出す

この方法により、APIキーを安全に管理できます。

## トラブルシューティング

### Expo開発サーバーのリセット

```bash
npx expo start -c
# または
npm start -- -c
```

### キャッシュのクリア

```bash
npx expo start --clear
```

### Expoのアップデート

```bash
npm install expo@latest
npx expo install --fix
```

### Firebase接続エラー

1. Firebase設定が正しいか確認
2. Firebase Consoleで匿名認証が有効になっているか確認
3. Firestoreのルールが適切に設定されているか確認

### OpenAI APIエラー

1. APIキーが正しく設定されているか確認
2. OpenAIアカウントに十分なクレジットがあるか確認
3. API使用量の制限に達していないか確認

## ライセンス

このプロジェクトはサンプルコードです。商用利用する場合は適切なライセンスを設定してください。

## 免責事項

- OpenAI APIの使用には料金が発生します
- Firebase Firestoreの無料枠を超えると料金が発生します
- ユーザーのプライバシーとデータ保護に十分注意してください
- このアプリは教育目的のサンプルです

## サポート

問題が発生した場合は、GitHubのIssuesページで報告してください。

---

**Enjoy your AI Companion! 💕**
