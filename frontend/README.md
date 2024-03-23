# 開発環境構築手順 (Backend)
## 環境
| 言語・フレームワーク  | バージョン |
| --------------------- | ---------- |
| Python                | 3.9.18     |
| Django                | 3.1        |
| torch                 | 1.12.1     |


## ディレクトリ構成
```text
├── backend
│   ├── .gitignore
│   ├── api                 # APIの具体的な実装を担うディレクトリ
│   ├── japanese_quiz_api   # Djangoプロジェクトの設定やアプリケーションの起動に関連するコードを含むディレクトリ
│   ├── manage.py           # Djangoプロジェクトのコマンドラインユーティリティスクリプト
│   ├── media               # クライアントによりアップロードされた音声データや問題用資材を格納
│   ├── model
│   ├── requirements-dev.txt
│   └── requirements.txt
└── frontend
    ├── .firebase
    ├── .firebaserc
    ├── .gitignore
    ├── README.md
    ├── firebase.json
    ├── package-lock.json
    ├── package.json
    ├── public
    ├── src　　　　　　　　　# ReactコンポーネントやReduxのスライスなど、フロントエンドのソースコード
    └── tsconfig.json
└── README.md
```

### 環境変数の一覧(backend)
| 変数名                 | 役割                                       | DEV 環境での値                         |
| ---------------------- | ----------------------------------------- | ------------------------------------- |
| SECRET_KEY             | Django のシークレットキー                   | django                              　|
| DEBUG                  | デバッグモードの切り替え                    | False                              　 | 
| DATABASE_URL           | SQLiteの接続先                             | sqlite:///db.splite3                  |


### 環境変数の一覧(frontend)
| 変数名            　    | 役割                                      | DEV 環境での値                         |
| ---------------------- | ----------------------------------------- | ------------------------------------- |
| REACT_APP_API_URL      | FrontendのURL指定                         | http://127.0.0.1:8000                　|
| REACT_APP_GUEST_USER   | ゲストユーザのID                           | guest_user                           　|
| REACT_APP_GUEST_PASSWORD | ゲストユーザのパスワード                  | guest_password                　       |


## 開発環境構築 (backend)
１．仮想環境構築(minicondaを用いる場合)  
`conda create -n japanese_quiz_app python==3.9.18`  

２．仮想環境にて開発用の依存関係をインストール  
`cd backend/`  
`pip install -r requirements-dev.txt`

※エラーで止まってしまった場合は、
pytorch-lightning,torch,torchmetrics,torchvisionを別途手動でインストール  

※torchを別途インストールする際は、下記コマンドを用いる  
`pip --nocache-dir install torch`  

３．OSへffmpegをインストール (オーディオファイル操作に利用) 
`conda install -c conda-forge ffmpeg`

４．backendディレクトリ直下に.env ファイルを作成
```text
├── backend
︙  ├── .env     #新規作成
    ︙　　　︙
    ├── .gitignore
    └── requirements.txt
```

※作成例： 詳細は[環境変数の一覧](#環境変数の一覧)を参照
DEBUG=True
SECRET_KEY=django
DATABASE_URL=sqlite:///db.splite3 #DjangoデフォルトのDB

４．DBをマイグレーション
`python manage.py migrate`

５．Admin画面ログイン用にsuper userを作成
`python manage.py createsuperuser`
※作成例：
ユーザー名：superuser
Password japanesequizappadmin

６．Djangoを起動
`python manage.py runserver`

７．Admin画面(http://127.0.0.1:8000/admin/api/choices/)にてクイズ用のデータを生成
### Quizzes
| Question text   |  
| --------------- |  
| Daigosan        |  
| Itsuka          |  
| Kiseityu        |

### Choices
| Quiz        | Choice text              | choice alphabet   | Answer explanation               | 選択肢画像ファイル                                                    　|　選択肢音声ファイル                                              |  
| ------------| ------------------------ | ----------------- | -------------------------------- |---------------------------------------------------------------------- |--------------------------------------------------------------- |
| Daigosan    | 大誤算                   | daigosan_hugemisundarstanding  | 大誤算は”i”を一番強く発音します。  | backend\media\images\choices\daigosan_hugemisundarstanding.jpg | backend\media\audios\choices\daigosan_hugemisundarstanding.mp3 |
| Daigosan    | ダイゴさん(人名)         | daigosan_person | 人名のダイゴさんの場合、”Dai”を強調して発音します。  | backend\media\images\choices\daigosan_person.jpg | backend\media\audios\choices\daigosan_person.mp3 |
| Itsuka　    | 何時か                   | itsuka_sometime | 何時かのアクセントは先頭の”i”になります。 | backend\media\images\choices\itsuka_sometime.jpg | backend\media\audios\choices\itsuka_sometime_O86jYzE.mp3 |
| Itsuka      | 五日                    | itsuka_fivedays | 五日は"tsu"を強めに発音します。  | backend\media\images\choices\itsuka_fivedays.jpg | backend\media\audios\choices\itsuka_fivedays.mp3 |
| Kiseityu    | 寄生虫                  | kiseityu_parasite | 寄生虫は”Sei"が強調されます。  | backend\media\images\choices\kiseityu_parasite.jpg | backend\media\audios\choices\kiseityu_parasite.mp3 |
| Kiseityu    | 帰省中                  | kiseityu_homecoming | 帰省中は全体的に抑揚をつけずに発音します。 | backend\media\images\choices\kiseityu_homecoming.jpg | backend\media\audios\choices\kiseityu_homecoming.mp3 |

８．Admin画面(http://127.0.0.1:8000/admin/auth/user/add/)にてゲスト用のユーザを登録 (ユーザ登録無しでログインする機能用)
### ユーザ
| ユーザ名         |  パスワード    　| 
| --------------- | --------------- |   
| guest_user      | guest_p@ssword  | 


# 開発環境構築手順 (Frontend)
１．Node.jsのversionを指定 
`nvm use 17.9.1`

２．開発用の依存関係をインストール
`cd frontend/`
`npm install` 

３．frontendディレクトリ直下に.env ファイルを作成
```text
├── frontend
︙  ├── .env.local     #新規作成
    ︙　　　︙
    ├── README.md
    └── tsconfig.json

※作成例： 詳細は[環境変数の一覧](#環境変数の一覧)を参照
REACT_APP_API_URL=http://127.0.0.1:8000
REACT_APP_GUEST_USER=guest_user
REACT_APP_GUEST_PASSWORD=guest_p@ssword


３．Reactを起動
`npm run start`


Todo対応
・新規登録しないでログインが上手くいかない
・発声練習が動かない














ーーーーーー以下参考ーーーーーーーーーーーー

## 目次
1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)
5. [トラブルシューティング](#トラブルシューティング)

<!-- READMEの作成方法のドキュメントのリンク -->
<br />
<div align="right">
    <a href="READMEの作成方法のリンク"><strong>READMEの作成方法 »</strong></a>
</div>
<br />
<!-- Dockerfileのドキュメントのリンク -->
<div align="right">
    <a href="Dockerfileの詳細リンク"><strong>Dockerfileの詳細 »</strong></a>
</div>
<br />
<!-- プロジェクト名を記載 -->

## プロジェクト名

React、DRF、Terraform のテンプレートリポジトリ

<!-- プロジェクトについて -->

## プロジェクトについて

React、DRF、Terraform を勉強する際に使用できるテンプレート

<!-- プロジェクトの概要を記載 -->

  <p align="left">
    <br />
    <!-- プロジェクト詳細にBacklogのWikiのリンク -->
    <a href="Backlogのwikiリンク"><strong>プロジェクト詳細 »</strong></a>
    <br />
    <br />

<p align="right">(<a href="#top">トップへ</a>)</p>

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク  | バージョン |
| --------------------- | ---------- |
| Python                | 3.11.4     |
| Django                | 4.2.1      |
| Django Rest Framework | 3.14.0     |
| MySQL                 | 8.0        |
| Node.js               | 16.17.0    |
| React                 | 18.2.0     |
| Next.js               | 13.4.6     |
| Terraform             | 1.3.6      |

その他のパッケージのバージョンは pyproject.toml と package.json を参照してください

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->

❯ tree -a -I "node_modules|.next|.git|.pytest_cache|static" -L 2
.
├── .devcontainer
│   └── devcontainer.json
├── .env
├── .github
│   ├── action
│   ├── release-drafter.yml
│   └── workflows
├── .gitignore
├── Makefile
├── README.md
├── backend
│   ├── .vscode
│   ├── application
│   ├── docs
│   ├── manage.py
│   ├── output
│   ├── poetry.lock
│   ├── project
│   └── pyproject.toml
├── containers
│   ├── django
│   ├── front
│   ├── mysql
│   └── nginx
├── docker-compose.yml
├── frontend
│   ├── .gitignore
│   ├── README.md
│   ├── __test__
│   ├── components
│   ├── features
│   ├── next-env.d.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── pages
│   ├── postcss.config.js
│   ├── public
│   ├── styles
│   ├── tailwind.config.js
│   └── tsconfig.json
└── infra
    ├── .gitignore
    ├── docker-compose.yml
    ├── main.tf
    ├── network.tf
    └── variables.tf

<p align="right">(<a href="#top">トップへ</a>)</p>

## 開発環境構築

<!-- コンテナの作成方法、パッケージのインストール方法など、開発環境構築に必要な情報を記載 -->

### コンテナの作成と起動

.env ファイルを以下の環境変数例と[環境変数の一覧](#環境変数の一覧)を元に作成

.env
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=django-db
MYSQL_USER=django
MYSQL_PASSWORD=django
MYSQL_HOST=db
MYSQL_PORT=3306
SECRET_KEY=django
DJANGO_SETTINGS_MODULE=project.settings.local


.env ファイルを作成後、以下のコマンドで開発環境を構築

make prepare

### 動作確認

http://127.0.0.1:8000 にアクセスできるか確認
アクセスできたら成功

### コンテナの停止

以下のコマンドでコンテナを停止することができます

make down

### 環境変数の一覧

| 変数名                 | 役割                                      | デフォルト値                       | DEV 環境での値                           |
| ---------------------- | ----------------------------------------- | ---------------------------------- | ---------------------------------------- |
| MYSQL_ROOT_PASSWORD    | MySQL のルートパスワード（Docker で使用） | root                               |                                          |
| MYSQL_DATABASE         | MySQL のデータベース名（Docker で使用）   | django-db                          |                                          |
| MYSQL_USER             | MySQL のユーザ名（Docker で使用）         | django                             |                                          |
| MYSQL_PASSWORD         | MySQL のパスワード（Docker で使用）       | django                             |                                          |
| MYSQL_HOST             | MySQL のホスト名（Docker で使用）         | db                                 |                                          |
| MYSQL_PORT             | MySQL のポート番号（Docker で使用）       | 3306                               |                                          |
| SECRET_KEY             | Django のシークレットキー                 | secretkey                          | 他者に推測されないランダムな値にすること |
| ALLOWED_HOSTS          | リクエストを許可するホスト名              | localhost 127.0.0.1 [::1] back web | フロントのホスト名                       |
| DEBUG                  | デバッグモードの切り替え                  | True                               | False                                    |
| TRUSTED_ORIGINS        | CORS で許可するオリジン                   | http://localhost                   |                                          |
| DJANGO_SETTINGS_MODULE | Django アプリケーションの設定モジュール   | project.settings.local             | project.settings.dev                     |

### コマンド一覧

| Make                | 実行する処理                                                            | 元のコマンド                                                                               |
| ------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| make prepare        | node_modules のインストール、イメージのビルド、コンテナの起動を順に行う | docker-compose run --rm front npm install<br>docker-compose up -d --build                  |
| make up             | コンテナの起動                                                          | docker-compose up -d                                                                       |
| make build          | イメージのビルド                                                        | docker-compose build                                                                       |
| make down           | コンテナの停止                                                          | docker-compose down                                                                        |
| make loaddata       | テストデータの投入                                                      | docker-compose exec app poetry run python manage.py loaddata crm.json                      |
| make makemigrations | マイグレーションファイルの作成                                          | docker-compose exec app poetry run python manage.py makemigrations                         |
| make migrate        | マイグレーションを行う                                                  | docker-compose exec app poetry run python manage.py migrate                                |
| make show_urls      | エンドポイントをターミナル上で一覧表示                                  | docker-compose exec app poetry run python manage.py show_urls                              |
| make shell          | テストデータの投入                                                      | docker-compose exec app poetry run python manage.py debugsqlshell                          |
| make superuser      | スーパーユーザの作成                                                    | docker-compose exec app poetry run python manage.py createsuperuser                        |
| make test           | テストを実行                                                            | docker-compose exec app poetry run pytest                                                  |
| make test-cov       | カバレッジを表示させた上でテストを実行                                  | docker-compose exec app poetry run pytest --cov                                            |
| make format         | black と isort を使ってコードを整形                                     | docker-compose exec app poetry run black . <br> docker-compose exec app poetry run isort . |
| make update         | Poetry 内のパッケージの更新                                             | docker-compose exec app poetry update                                                      |
| make app            | アプリケーション のコンテナへ入る                                       | docker exec -it app bash                                                                   |
| make db             | データベースのコンテナへ入る                                            | docker exec -it db bash                                                                    |
| make pdoc           | pdoc ドキュメントの作成                                                 | docker-compose exec app env CI_MAKING_DOCS=1 poetry run pdoc -o docs application           |
| make init           | Terraform の初期化                                                      | docker-compose -f infra/docker-compose.yml run --rm terraform init                         |
| make fmt            | Terraform の設定ファイルをフォーマット                                  | docker-compose -f infra/docker-compose.yml run --rm terraform fmt                          |
| make validate       | Terraform の構成ファイルが正常であることを確認                          | docker-compose -f infra/docker-compose.yml run --rm terraform validate                     |
| make show           | 現在のリソースの状態を参照                                              | docker-compose -f infra/docker-compose.yml run --rm terraform show                         |
| make apply          | Terraform の内容を適用                                                  | docker-compose -f infra/docker-compose.yml run --rm terraform apply                        |
| make destroy        | Terraform で構成されたリソースを削除                                    | docker-compose -f infra/docker-compose.yml run --rm terraform destroy                      |




### リモートデバッグの方法

リモートデバッグ を使用する際は以下の url を参考に設定してください<br>
[Django のコンテナへリモートデバッグしよう！](https://qiita.com/shun198/items/9e4fcb4479385217c323)

## トラブルシューティング

### .env: no such file or directory

.env ファイルがないので環境変数の一覧を参考に作成しましょう

### docker daemon is not running

Docker Desktop が起動できていないので起動させましょう

### Ports are not available: address already in use

別のコンテナもしくはローカル上ですでに使っているポートがある可能性があります
<br>
下記記事を参考にしてください
<br>
[コンテナ起動時に Ports are not available: address already in use が出た時の対処法について](https://qiita.com/shun198/items/ab6eca4bbe4d065abb8f)

### Module not found

make build

を実行して Docker image を更新してください

<p align="right">(<a href="#top">トップへ</a>)</p>
