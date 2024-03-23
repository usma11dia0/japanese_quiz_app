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


## 環境構築手順 (backend)
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

※作成例 (詳細は[環境変数の一覧](#環境変数の一覧)を参照)  
DEBUG=True
SECRET_KEY=django
DATABASE_URL=sqlite:///db.splite3 #DjangoデフォルトのDB

４．DBをマイグレーション  
`python manage.py migrate`

５．Admin画面ログイン用にsuper userを作成  
`python manage.py createsuperuser`  
※作成例   
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

８．Admin画面にてゲスト用のユーザを登録 (ユーザ登録無しでログインする機能にて必要)  
http://127.0.0.1:8000/admin/auth/user/add/  
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

３．frontendディレクトリ直下に.env.local ファイルを作成  
```text
├── frontend
︙  ├── .env.local     #新規作成
    ︙　　　︙
    ├── README.md
    └── tsconfig.json
```

### 環境変数の一覧(frontend)
| 変数名            　    | 役割                                      | DEV 環境での値                         |
| ---------------------- | ----------------------------------------- | ------------------------------------- |
| REACT_APP_API_URL      | FrontendのURL指定                         | http://127.0.0.1:8000                　|
| REACT_APP_GUEST_USER   | ゲストユーザのID                           | guest_user                           　|
| REACT_APP_GUEST_PASSWORD | ゲストユーザのパスワード                  | guest_password                　       |


※作成例 (詳細は[環境変数の一覧](#環境変数の一覧)を参照)  
REACT_APP_API_URL=http://127.0.0.1:8000  
REACT_APP_GUEST_USER=guest_user  
REACT_APP_GUEST_PASSWORD=guest_p@ssword 

※本番環境の場合はFirebase設定の以下を追記する。(ファイル名は.env.production)  
REACT_APP_FIREBASE_APIKEY＝"xxxx"  
REACT_APP_FIREBASE_DOMEIN＝"xxxx"  
REACT_APP_FIREBASE_PROJECT_ID＝"xxxx"  
REACT_APP_FIREBASE_STORAGE_BUCKET＝"xxxx"  
REACT_APP_FIREBASE_SENDER_ID＝"xxxx"  
REACT_APP_FIREBASE_APP_ID＝"xxxx"  
REACT_APP_FIREBASE_MEASUREMENT_ID＝"xxxx"  


３．Reactを起動  
`npm run start`
