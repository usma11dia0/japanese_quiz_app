## モデル学習用のimport ※それぞれpip install要
import os
import random
import numpy as np
import pandas as pd
from PIL import Image
import librosa
# import librosa.display //図示用
# import IPython.display as ipd 　//音源再生用
# import matplotlib.pyplot as plt //図示用
# import seaborn as sns  //図示用
from sklearn.model_selection import train_test_split
import torch
from torch.utils.data import Dataset, DataLoader
from torchvision import datasets, models, transforms
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
import pytorch_lightning as pl
import torchmetrics
from torchmetrics.functional import accuracy

# import torchsummary //学習ログ追記用
# from torchsummary import summary //学習ログ追記用
from pytorch_lightning.callbacks import EarlyStopping

# from pytorch_lightning.loggers import CSVLogger　//学習ログ追記用
from torchvision.models import resnet18
from torchvision.models import resnet18, ResNet18_Weights


## 各関数定義
# 音声データ→メルスペクトログラム変換用関数
def transform_audiofile(data_path):
    # 波形データとサンプルレート取得
    waveform, sample_rate = librosa.load(data_path)
    # メルスペクトログラムを取得
    feature_melspec = librosa.feature.melspectrogram(y=waveform, sr=sample_rate)
    # デジタルスケール変換後のメルスペクトログラムを取得
    feature_melspec_db = librosa.power_to_db(feature_melspec, ref=np.max)
    return feature_melspec_db


# 推論に使用するモデル
class Net(pl.LightningModule):
    def __init__(self):
        super().__init__()
        # #Resnetの場合
        # 特徴抽出機を指定
        self.feature = resnet18(weights=ResNet18_Weights.IMAGENET1K_V1)
        # #最初の畳み込みのチャネル3をチャネル1に変更する
        # self.conv1 = nn.Conv2d(1, 64, kernel_size=(7, 7), stride=(2, 2), padding=(3, 3), bias=False)
        # 最後の層の次元を今回のカテゴリ数に変更する
        self.fc = nn.Linear(1000, 2)

        # #EfficientNetV2の場合
        # #特徴抽出機を指定
        # self.feature = efficientnet_v2_s(weights = EfficientNet_V2_S_Weights.IMAGENET1K_V1)
        # # 最後の層の次元を今回のカテゴリ数に変更する
        # self.classifier = nn.Linear(1000,2)

    def forward(self, x):
        # Resnetの場合
        h = self.feature(x)
        h = self.fc(h)
        # #EfficientNetV2の場合
        # h = self.feature(x)
        # h = self.classifier(h)
        return h

    def training_step(self, batch, batch_idx):
        x, t = batch
        y = self(x)
        loss = F.cross_entropy(y, t)
        self.log("train_loss", loss, on_step=False, on_epoch=True)
        self.log(
            "train_acc", accuracy(y.softmax(dim=-1), t), on_step=False, on_epoch=True
        )
        return loss

    def validation_step(self, batch, batch_idx):
        x, t = batch
        y = self(x)
        loss = F.cross_entropy(y, t)
        self.log("val_loss", loss, on_step=False, on_epoch=True)
        self.log(
            "val_acc", accuracy(y.softmax(dim=-1), t), on_step=False, on_epoch=True
        )
        return loss

    def test_step(self, batch, batch_idx):
        x, t = batch
        y = self(x)
        loss = F.cross_entropy(y, t)
        self.log("test_loss", loss, on_step=False, on_epoch=True)
        self.log(
            "test_acc", accuracy(y.softmax(dim=-1), t), on_step=False, on_epoch=True
        )
        return loss

    def configure_optimizers(self):
        optimizer = torch.optim.Adam(self.parameters(), lr=2e-4)
        return optimizer


# 推論を実行する関数
def classify(img_url):

    # 音声データ→メルスペクトログラムへ変換
    target_img_melspec_db = transform_audiofile(img_url)

    # 推論前の前処理
    weights = ResNet18_Weights.DEFAULT
    preprocess = weights.transforms()
    transform = transform.Compose([preprocess])
    target_img = transform(Image.open(target_img_melspec_db).convert("RGB"))
    # 配列サイズ変換 (3,224,224)　→　(1,3,224,224)
    target_img = target_img.unsqueeze(0)

    # 推論実行
    # ネットワークの準備
    net = Net().cpu().eval()
    # 重みの読込
    net.load_state_dict(
        torch.load("model/japanese_classification.pt", map_location=torch.device("cpu"))
    )
    # 予測値の導出
    with torch.no_grad():
        result = net(target_img).float()

    # 結果表示用の変換
    # 推論結果(ラベル)
    result = torch.argmax(F.softmax(result, dim=1)).item()
    # 推論結果(確率)
    proba = (torch.max(F.softmax(result, dim=1)).item())*100

    return result, proba
