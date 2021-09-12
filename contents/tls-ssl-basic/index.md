---
title: "TLS(SSL)の基礎"
date: "2021-07-03"
description: "新卒研修で扱ったTLS(SSL)のメモ"
tags: ["note", "network"]
---

新卒研修で扱った TLS (SSL) のメモ

- 安全に通信をするためのセキュリティプロトコル
- SSL: Secure Sockets Layer
- TLS: Transport Layer Security
  - TLS は SSL の次世代規格 (ほぼ同じと捉えて問題ない)
  - HTTP + TLS = HTTPS
- 守りたいもの → 守り方
  - **通信相手が本物であること → デジタル署名**
  - **通信内容が盗聴されないこと → 対称暗号**
  - **通信内容が改竄されないこと → メッセージ認証コード**

## デジタル署名

- 証明書署名要求 (CSR、Certificate Signing Request) を認証局 (CA) の秘密鍵で暗号化したもの
- 認証局からもらった公開鍵で復号できる = 署名された（秘密鍵で暗号化された）内容は認証局によって認められている
  - サーバーとクライアントの間に第三者を介した認証（暗号化）が入ってくるのがポイント？
- SSL 証明書とデジタル署名の流れ
  - 事前にやること
    - 秘密鍵を作成する
    - 証明書署名要求 (CSR、Certificate Signing Request) の作成
      - サーバーの公開鍵および被証明者の情報を含んでいる
    - VeriSign などの機関に送付して認証局 (CA) の秘密鍵で署名してもらう
      - CA が署名して発行された証明書 = SSL 証明書
    - SSL 証明書をサーバに配置
  - 通信でやっていること
    - 接続してきたクライアントに対して、サーバーは SSL 証明書を送信
    - クライアントは、証明書を発行した認証局の公開鍵を取得
    - クライアントは、認証局の公開鍵でデジタル署名の復号を試す
      - 復号できれば、サーバーは信頼できる → 公開鍵を使おう！

## 対称暗号

- SSL 通信の内容は、共通鍵によって暗号化されている
- 共通の鍵を利用した暗号化を「対称暗号化」という
- 共通鍵をどのように共有すればよいか？
  - 秘密鍵・公開鍵を使った暗号化を利用する
  - 「非対称暗号化」、「公開鍵暗号」という
- 共通鍵が生成されるまでの流れ
  - ① クライアント → サーバー
    - SSL 通信のリクエスト、ハンドシェイクの開始
    - 送られるデータの例
      - サポートする TLS バージョン
      - サポートしている暗号スイートの情報
        - 暗号スイート: 暗号化に必要な技術の組み合わせ
        - 例） 暗号化の方式、ハッシュ関数など
      - 「クライアントランダム」と呼ばれるランダムなバイト列
  - ② サーバー → クライアント
    - SSL の証明書をクラアントへ送付
    - 送られるデータの例
      - サーバーの SSL 証明書
      - サーバーが選択した暗号スイート
      - 「サーバーランダム」と呼ばれるランダムなバイト列
  - ③ クライアント
    - サーバーの SSL 証明書を発行した認証局の公開鍵で検証
      - サーバーが本人であることの確認
      - クライアントがドメインの実際の所有者と対話していることの確認
      - 主要なブラウザは、認証局の公開鍵を事前に持っている
  - ④ クライアント → サーバー
    - 「プリマスターシークレット」と呼ばれるランダムなバイト列をサーバーへ送付
      - SSL 証明書に含まれている公開鍵で暗号化して送る
      - サーバーは秘密鍵で復号化する
  - ⑤ ブラウザ/サーバー
    - SSL 通信を行うための共通鍵の共有
      - クライアントランダム、サーバーランダム、プリマスターシークレットから共通鍵を作成

![SSLのシーケンス図](/images/posts/ssl.svg)

## メッセージ認証コード

- ハッシュ関数の入力として、メッセージと共有鍵を与えた時のハッシュ値のこと
- メッセージだけのハッシュ値の比較より、改竄検知は強固になる
- ハッシュ関数が持つ以下の特徴を利用している
  - ハッシュ値からハッシュ関数の入力を探すことが事実上不可能
  - ハッシュ値が等しくなるような、異なる入力の組を見つけ出すことが事実上不可能

## 参考資料

- [ゼロからわかる SSL/TLS の解説を試みる](https://qiita.com/RyomaTaniyama/items/37d36a634a48516afc85)
- [SSL って何？意味や仕組みをわかりやすく解説！](https://ssl.sakura.ad.jp/column/ssl/)
- [TLS ハンドシェイクでは何が起こるのか？| SSL ハンドシェイク](https://www.cloudflare.com/ja-jp/learning/ssl/what-happens-in-a-tls-handshake)
- [OpenSSL で SSL 自己証明書を発行する手順](https://weblabo.oscasierra.net/openssl-gencert-1/)