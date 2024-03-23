# 日本語同音異義語クイズアプリ🗾
同音異義語(日本語)の”聞き取り”や"発声”が練習出来るブラウザアプリです。⚠️ スマホ未対応 ⚠️: 現在停止中 

![image](https://user-images.githubusercontent.com/30208963/192075555-5fbde9f1-1e59-4fd5-a793-bf3d42d372d4.png)

URL: https://japanese-quiz-app.site

※推奨ブラウザ：Google Chrome

## デモ動画
![demo_japanese_quiz_app](https://user-images.githubusercontent.com/30208963/192776306-37bb3e9f-31af-4a4e-bb04-457e62ca2ebf.gif)

## 作成に至った背景
![background_japanese_quiz_app](https://user-images.githubusercontent.com/30208963/194481603-0b096094-f815-4a01-80b9-775e2007dfaf.png)

## アーキテクチャ図
![image](https://user-images.githubusercontent.com/30208963/191673281-c1bc36a0-1703-411a-9deb-e6c649ab057c.png)


## 機械学習(音声分類)フロー
![image](https://user-images.githubusercontent.com/30208963/192074880-716fb273-d6ba-4f17-9329-729bfdac1bf3.png)

### ※モデルの学習結果
![image](https://user-images.githubusercontent.com/30208963/192075323-7c7ade9c-a1e9-4c04-b4f1-2c1b256d6262.png)


## 技術スタック一覧
- **Backend:** Django REST Framework + Nginx + gunicorn
- **Frontend:** React (RTK / MUI ※一部SCSS) + TypeScript
- **machine learning**: Pytorch Lightning
- **Infra:** AWS (EC2 / RDS / ALB / Route53 / ACM ), Firebase


## 技術スタック選定理由
- **Backend** 

機械学習モデル構築にpythonを用いるため、pythonのWebアプリフレームワークであるDjango REST Frameworkを採用。
- **Frontend**

現在フロントエンド界隈で人気のあるTypeScriptを学んでみたいと思い、TypeScriptの利用を決定。それに伴いTypeScriptと相性が良く、TypeScriptとの連携手法が書かれた参考記事・動画が多いReactを採用。
- **machine learning**

事前学習されたResNetが利用可能で、ファインチューニングの実施が容易なPytorch Lightningを採用。
- **Infra**

実務レベルのインフラ構築経験のため、個人開発アプリではあるがロードバランサーを介したWebサーバー×2/DBサーバー×2構成を採用。DBについても実務レベルを想定してPostgreSQLを採用。ホスティングサービスについては採用企業が近年増えてきており、参考資料も豊富なFirebase Hostingを採用。
         

## 技術スタック詳細
### *Backend : Django REST Framework + Nginx + gunicorn*
#### :white_check_mark: 主要ライブラリ/モジュール
- ``djangorestframework-simplejwt``: JSON Web Token認証のプラグイン
- ``django-cors-headers``: CORS用の情報をHTTPレスポンスヘッダへ付加
- ``djoser``: ユーザ認証・登録をサポートするサードパーティ製パッケージ
- ``Black``：PEP8に準拠するPythonのコードフォーマッター


### *Frontend : React (Redux Toolkit + Material-UI ※一部SCSS) + TypeScript*
#### :white_check_mark:主要ライブラリ/モジュール
- ``Redux Toolkit``: Stateの一元管理を担うReduxを効率よく記述するためのライブラリ
- ``Material-UI``: React用のGoogle製UIコンポーネントライブラリ
- ``react-media-recoder``: MediaRecorderAPIを用いたReact用コンポーネントライブラリ
- ``eslint``: JavaScript用の静的コード分析ツール ※主に構文チェックを担当
- ``prettier``: JavaScript用のコードフォーマッター ※主にコード整形を担当

### *Machine learning : Pytorch Lightning*
#### :white_check_mark:主要ライブラリ/モジュール
- ``librosa``: 音声処理・解析用のPythonライブラリ
- ``pydub`` : 音声処理用のPythonモジュール ※wav→mp3変換に利用
- ``Pillow`` : 画像処理用のPythonライブラリ
- ``torchvision``：学習済みモデルやデータセットなど機械学習用フレームワークを提供


### *Infra : AWS, Firebase*
#### :white_check_mark:利用サービス一覧
#### AWS: Backendのデプロイで利用
- ``EC2``: AWSクラウド上の仮想サーバー ※インスタンスタイプ：t3.small
- ``RDS(PostgreSQL)``: AWSによるフルマネージドRDSサービス 
- ``Route53``: AWSのDNSサービス ※独自ドメインの設定に利用
- ``ALB``: AWSクラウド上のロードバランサー ※負荷分散と冗長化に利用
- ``ACM``: AWSのSSL証明書発行サービス ※HTTPS化に利用
- ``AWS Compute Optimizer``: ユーザー環境に応じて最適なAWSリソースを提案するサービス
#### Firebase: Frontendのホスティングで利用


## 開発環境構築手順
下記を参照  
https://github.com/usma11dia0/japanese_quiz_app/blob/master/frontend/README.md
