---
title: "Kaggle Google QUEST Q＆A Labeling 反省"
date: "2020-03-10"
description: "Kaggle Google QUEST Q＆A Labeling 反省"
tags: ["blog", "kaggle"]
---

初めて真面目に Kaggle に参加した (2 週間前チャレンジ...) ので、その備忘録です。

## コンペ振り返り

### やったこと

基本的に以下でやったことはほとんど全てうまくいかなかった。。。  
Bert なにもわからない。。。

- NLP での基本的な文章ベクトルによる回帰 → **Bert よりかなり精度が悪かった**
  - 全てのラベルについて、カーネルのコメントにあった Post Process も行ってみた
- 公開カーネルの Bert モデルのチューニング → **精度改善はしなかった**
  - 出力層に近い層での Dense 層を増やす
  - 全データ学習
  - focal loss (不均衡データに対する損失)
    - Twitter でもあまりうまくいくケースがないみたいな話をみた
  - multi task モデル
  - カテゴリを Embedding して、Concat する
- Bert のアンサンブル → **唯一効いた**
  - rank average ensemble

### やらなかったこと

- XLNET や Roberta などの大きなモデルの準備
  - Colab では Bert の学習の倍の時間がかかるため撤退
- Question のラベルと Answer のラベルを分けてモデリング
  - 時間がなかった...
  - 上位はモデルを工夫していると思っていた...

### 反省

- **Bert はモデルを工夫しても精度はあまり上がらなかった**
  - そういう報告もある...
    - [https://web.stanford.edu/class/cs224n/reports/custom/15785631.pdf](https://web.stanford.edu/class/cs224n/reports/custom/15785631.pdf)
  - Bert や Transformer のカスタマイズは難しいらしい...
- どの検証ももう少し丁寧にやるとよかった
  - Post Process についても各カラムについてやる
    - 全てのカラムにやってうまくいかないと決めつけてしまっていた...
  - Bert のモデルのカスタマイズについては、順序立ててやる
- 上位陣の解法
  - Post Process がポイントだった
    - これをするだけで、銅メダルは行けた... (わかってはいたのに...)
    - OptimizedRounder を使う人が多かった
    - Bert のカスタマイズはあまりうまくいってない人が多い印象
  - 異なる種類のモデルでアンサンブルしている人が強い
    - Distillbert や USE の Embedding を LSTM に突っ込むモデルが人気だった
  - カラム別にモデルを作る人も多かった
    - これは時間がもう少し必要...
    - やっぱり 1 ヶ月前からは参加する必要あり
- 日本人 Kaggler の解説
  - [https://yukoishizaki.hatenablog.com/entry/2020/02/11/090908](https://yukoishizaki.hatenablog.com/entry/2020/02/11/090908)
  - [https://www.ai-shift.jp/techblog/635](https://www.ai-shift.jp/techblog/635)
  - [https://www.kaggle.com/c/google-quest-challenge/discussion/129927](https://www.kaggle.com/c/google-quest-challenge/discussion/129927)
  - [https://guchio3.hatenablog.com/entry/2020/02/27/100505](https://guchio3.hatenablog.com/entry/2020/02/27/100505)
  - [https://www.slideshare.net/matsukenbook/kaggle-google-quest-qa-labeling-lt-47th-place-solution](https://www.slideshare.net/matsukenbook/kaggle-google-quest-qa-labeling-lt-47th-place-solution)
- その他の復習用の資料
  - Ensemble Guide
    - voting, rank average, weight average がよく使われている
    - [https://mlwave.com/kaggle-ensembling-guide/](https://mlwave.com/kaggle-ensembling-guide/)
    - [http://higepon.hatenablog.com/entry/2019/02/20/191900](http://higepon.hatenablog.com/entry/2019/02/20/191900)
  - 特徴量エンジニアリングのまとめ
    - [https://qiita.com/squash/items/667f8cda16c76448b0f4](https://qiita.com/squash/items/667f8cda16c76448b0f4)
    - 特に良いやつ : [https://www.slideshare.net/mlm_kansai/kaggle-138546659](https://www.slideshare.net/mlm_kansai/kaggle-138546659)
  - OptimizedRounder
    - [https://qiita.com/kaggle_master-arai-san/items/d59b2fb7142ec7e270a5#optimizedrounder](https://qiita.com/kaggle_master-arai-san/items/d59b2fb7142ec7e270a5#optimizedrounder)

## NLP の基本

### 文章の前処理 (英語、分割前)

以下のカーネルがかなり参考になる  
[https://www.kaggle.com/theoviel/improve-your-score-with-some-text-preprocessing](https://www.kaggle.com/theoviel/improve-your-score-with-some-text-preprocessing)  
[https://www.kaggle.com/sudalairajkumar/getting-started-with-text-preprocessing](https://www.kaggle.com/sudalairajkumar/getting-started-with-text-preprocessing)

1. **HTML の除去**
2. **URL の除去**
3. **数字の除去** (基本的に数字は役に立たないことが多いので省く)
4. **大文字を小文字へ** (Embedding 側も同じ変換をしてあげる)
5. **短縮系への変換**
6. **特殊文字を消す** (もしくは変換する)
7. **スペルミスの変換**

以下はタスクによって考える  
特に、文章の分散表現を得る場合はやらないことが多かった (文が不自然になるから...?)

1. stopwords の除去
2. Lemmatization, Stemming (活用形を統一する, running, run, ran などを統一)
3. 絵文字の変換
4. 頻出単語やレアな単語の削除 (7 である程度行なっている & タスクによっては除かない方がいいケースも)

日本語はかなりブログが出てくるので割愛

### 文章と単語のベクトル化

参考資料：[https://www.ogis-ri.co.jp/otc/hiroba/technical/similar-document-search/part1.html](https://www.ogis-ri.co.jp/otc/hiroba/technical/similar-document-search/part1.html)

#### 文章のベクトル化 (古典的な手法)

基礎は単語の出現回数によってベクトル化する手法。表現力にはかなり限界がある。  
**またかなり次元が大きくなるので、Kaggle などでは SVD などで次元圧縮する人が多い**

- **Bag of Words (BOW)**
  - 一番基礎
  - 形態素解析と呼ばれる処理で単語単位に分割を行い、文章毎に各単語が何回出現したかを数え上げ
  - 長さが語彙数となるベクトル
  - 化学で言う部分構造数え上げみたいなもの
- **TF-IDF**
  - ここら辺から実際使われる
  - TF と IDF の積
  - TF：ある単語(t)がある文書(d)中で何回出現したか
  - IDF：ある単語(t)が全文書集合(D)中のどれだけの文書で出現したかの逆数

#### 単語のベクトル化

数え上げだけではなく、ここからは単語の持つ意味的な情報を用いる手法が出てくる。  
単語の分散表現の取得。**基本的には、fasttext で良い気がする。**

- **Word2Vec**
  - CBOW, Skip-gram の 2 つのアーキテクチャが存在
  - 学習した重みを単語の分散表現として利用
  - Skip-gram：[https://qiita.com/Hironsan/items/11b388575a058dc8a46a](https://qiita.com/Hironsan/items/11b388575a058dc8a46a)
    - 単語を入力し、その周辺単語を予測する
    - CBOW はその逆 (周辺単語を入力し、単語の予測)
  - よく使われる学習済みモデル
    - Google の学習済みモデル (20 分くらい読み込みにかかる...)
    - [https://s3.amazonaws.com/dl4j-distribution/GoogleNews-vectors-negative300.bin.gz](https://s3.amazonaws.com/dl4j-distribution/GoogleNews-vectors-negative300.bin.gz)
- **fasttext**
  - Word2Vec の進化版 (精度も良い)
  - 「活用形」をまとめられるようなモデル
  - facebook が開発し、word2vec より高速な学習が可能
  - よく使われる学習済みモデル
    - [https://fasttext.cc/docs/en/english-vectors.html](https://fasttext.cc/docs/en/english-vectors.html)

#### 文章のベクトル化

基本的には以下の 4 つが順当な予感。SWEM が一番楽だし、ベースラインとして利用できそう。

- **Word2Vec(fasttext) と TF-IDF**
  - TF-IDF を重みとする単語ベクトルの加重平均
  - [https://qiita.com/hrappuccino/items/19bcdc097246865bea86](https://qiita.com/hrappuccino/items/19bcdc097246865bea86)
- **Doc2Vec**
  - 名前の通り、Word2Vec を文書に応用したもの
- **SCDV**
  - Doc2Vec などよりかなりいい表現らしい
  - 1 から実装する必要がある...
- **SWEM**
  - Word2Vec(fasttext)の平均値や最大値などを使う方法
  - [https://yag-ays.github.io/project/swem/](https://yag-ays.github.io/project/swem/)
- **Universal Sentence Encoder**
  - 文章をベクトルへ直す手法のデファクトになりつつある
  - 簡単に試すことができ、多言語も解釈できる
  - [https://qiita.com/kenta1984/items/9613da23766a2578a27a](https://qiita.com/kenta1984/items/9613da23766a2578a27a)

検証している人：  
[https://qiita.com/nekoumei/items/1f5ec09e422a4be99810](https://qiita.com/nekoumei/items/1f5ec09e422a4be99810)  
[文書分散表現 SCDV と他の分散表現を比較してみた](http://www.ie110704.net/2018/10/12/%E6%96%87%E6%9B%B8%E5%88%86%E6%95%A3%E8%A1%A8%E7%8F%BEscdv%E3%81%A8%E4%BB%96%E3%81%AE%E5%88%86%E6%95%A3%E8%A1%A8%E7%8F%BE%E3%82%92%E6%AF%94%E8%BC%83%E3%81%97%E3%81%A6%E3%81%BF%E3%81%9F/)

### Bert

Bert 入門記事  
[https://qiita.com/Kosuke-Szk/items/4b74b5cce84f423b7125](https://qiita.com/Kosuke-Szk/items/4b74b5cce84f423b7125)  
[https://www.slideshare.net/matsukenbook/bert-217710964](https://www.slideshare.net/matsukenbook/bert-217710964)  
[https://www.ogis-ri.co.jp/otc/hiroba/technical/similar-document-search/part3.html](https://www.ogis-ri.co.jp/otc/hiroba/technical/similar-document-search/part3.html)

論文  
[https://arxiv.org/pdf/1810.04805](https://arxiv.org/pdf/1810.04805)

- モデル
  - 双方向 Transformer とよく言われる
  - Transformer について : [http://deeplearning.hatenablog.com/entry/transformer](http://deeplearning.hatenablog.com/entry/transformer)
- 学習方法
  - データは大規模コーパス (Wikipedia)
  - 教師なし学習で事前学習
    - 文の単語の穴埋めタスクと文が連続するかを予測するタスク
  - 各タスクで Fine Tuning
    - 各タスクのモデルも少しづつ異なる
      - Q&A のタスクだと入力の最後の数単語の Embedding を使う
    - ほとんどのタスクで SOTA
- FineTuning
  - 実装は huggingface/transformers を使う
    - [https://github.com/huggingface/transformers](https://github.com/huggingface/transformers)
  - 前処理はあんまり必要ではない
    - html タグを除くくらいで十分らしい
  - 主に 「入力の作り方」、「モデルの構造」の 2 つのポイントで改良できる
    - モデルの方はあんまり精度に影響は与えないかも...
