# 日本語同音異義語クイズアプリ:japan:
同音異義語(日本語)の”聞き取り”や"発声”が練習出来るブラウザアプリです。:warning: スマホ未対応

![image](https://user-images.githubusercontent.com/30208963/192075555-5fbde9f1-1e59-4fd5-a793-bf3d42d372d4.png)

URL: https://japanese-quiz-app.site

※推奨ブラウザ：Google Chrome

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


## 技術スタック詳細
### *Backend : Django REST Framework + Nginx + gunicorn*
#### :white_check_mark: 主要ライブラリ/モジュール
- ``djangorestframework-simplejwt``: JSON Web Token認証のプラグイン
- ``django-cors-headers``: CORS用の情報をHTTPレスポンスヘッダへ付加
- ``djoser``: ユーザ認証・登録をサポートするサード―パーティ製パッケージ
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