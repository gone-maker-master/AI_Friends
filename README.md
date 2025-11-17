# AI Companion - AI彼氏彼女アプリ

React NativeとFirebaseを使用した、スマートフォン向けAI彼氏彼女アプリです。GPT-4を使用して、自然な会話と相手の好みのプロファイリングを実現します。

## 主な機能

- 🎭 **4つの性格タイプ**: 明るく元気、落ち着いて優しい、遊び心のある、知的で大人っぽい
- 💬 **短文での自然な会話**: AIは短い文章で会話し、チャット感覚でコミュニケーション
- 📝 **ユーザープロファイリング**: 会話を通じてユーザーの好みや趣味を記憶
- 💾 **会話履歴の保存**: Firestoreで会話履歴とユーザー情報を保存
- 🔄 **リアルタイム同期**: 複数デバイスでの同期が可能

## 技術スタック

- **React Native**: クロスプラットフォーム開発
- **TypeScript**: 型安全な開発
- **Firebase**: 認証とデータストレージ
  - Firebase Auth (匿名認証)
  - Cloud Firestore (データベース)
- **OpenAI GPT-4**: 自然言語処理とAI会話

## セットアップ手順

### 前提条件

- Node.js 18以上
- npm または yarn
- Android Studio (Android開発の場合)
- Xcode (iOS開発の場合、macOSのみ)

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
3. Authenticationを有効化し、匿名ログインを有効にする
4. Cloud Firestoreを有効化

#### Android用Firebase設定

1. Firebase Consoleでプロジェクト設定を開く
2. Androidアプリを追加
   - パッケージ名: `com.aicompanion`
3. `google-services.json`をダウンロード
4. `android/app/`ディレクトリに配置

#### iOS用Firebase設定

1. Firebase Consoleでプロジェクト設定を開く
2. iOSアプリを追加
   - バンドルID: `com.aicompanion`
3. `GoogleService-Info.plist`をダウンロード
4. `ios/AICompanion/`ディレクトリに配置

### 4. OpenAI API設定

1. [OpenAI Platform](https://platform.openai.com/)でAPIキーを取得
2. プロジェクトルートに`.env`ファイルを作成:

```bash
cp .env.example .env
```

3. `.env`ファイルにAPIキーを設定:

```
OPENAI_API_KEY=your_actual_api_key_here
```

**重要**: プロダクション環境では、APIキーをクライアントに直接埋め込むのではなく、バックエンドプロキシを経由してAPIを呼び出すことを強く推奨します。

### 5. iOSの追加設定 (macOSの場合)

```bash
cd ios
pod install
cd ..
```

### 6. アプリの起動

#### Android

```bash
npm run android
# または
yarn android
```

#### iOS

```bash
npm run ios
# または
yarn ios
```

#### Metro Bundlerの起動（別ターミナル）

```bash
npm start
# または
yarn start
```

## プロジェクト構造

```
AI_Friends/
├── src/
│   ├── screens/
│   │   ├── PersonalitySelectionScreen.tsx  # 性格選択画面
│   │   └── ChatScreen.tsx                  # チャット画面
│   ├── services/
│   │   ├── firebase.ts                     # Firebase サービス
│   │   └── openai.ts                       # OpenAI サービス
│   └── types/
│       └── index.ts                        # TypeScript型定義
├── android/                                # Android設定
├── ios/                                    # iOS設定
├── App.tsx                                 # メインアプリコンポーネント
├── index.js                                # エントリーポイント
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

### Android ビルドエラー

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS ビルドエラー

```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

### Metro Bundler のリセット

```bash
npm start -- --reset-cache
```

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
