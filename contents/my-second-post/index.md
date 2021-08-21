---
title: テストテスト
date: "2015-05-06"
tags: ["book"]
---

Web で支える技術で出てきたものを主に取リ扱う。

## 認証と認可の違い

認証 = ユーザが誰かを確認すること

> Determines whether users are who they claim to be

認可 = とある特定の条件に対して、リソースアクセスの権限を与えること

> Determines what users can and cannot access

認証せずに認可する例

- 「鍵の発行」 -> 鍵の持ち主が誰であろうと、施錠することができる
- 「チケットの発行」-> 持っている人が誰であろうと、電車には乗ることができる

## 認証

### HTTP 認証の基本

チャレンジ・レスポンス方式の流れ

- ① クライアント → サーバー
  - 必要なページをリクエストする
  - クライアントは、まだ認証が必要かどうか知らない
- ② サーバー → クライアント
  - 401 ステータスと `WWW-Authenticate` ヘッダーに認証に関する情報を含むレスポンスを返す
- ③ クライアント → サーバー
  - credentials を `Authorization` ヘッダーに含めて、再度必要なページをリクエストする
  - サーバーから送られてきた認証情報をもとに credentials を作成する
  - credentials に含まれる情報
    - **認証領域 (realm)、認証方式 (Basi、Digest)、リクエストごとに異なるデータ (challenge)** など
- ④ サーバー → クライアント
  - クライアントから送られてきた credentials がサーバーのデータと整合するか確認する
  - 問題なければクライアントに要求されたページのレスポンスを返す

### Basic 認証

- クライアント
  - ユーザー名とパスワードを「:」でつなげて Base64 でエンコードしたものを credentials とする
    - challenge を利用しないシンプルな方法
- サーバー
  - credentials を Base64 でデコードすることで、パスワードとユーザー名を取得し、DB のデータと照合する

クライアントのリクエストヘッダの例

```
Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
```

#### メモ

- **Base64 のエンコードは可逆なので、HTTPS を使わないとパスワードが漏洩する**
- ログアウトが厳密にサポートされていないため、セッション管理にはあまり向かない
- ログアウトは、任意の URI で「WWW-Authenticate」ヘッダを加えて 401 のレスポンスを返すと一応できる

```
WWW-Authenticate: Basic realm="Exmaple.co.jp"
```

### Digest 認証

- クライアント
  - ユーザー名、パスワード、ノンスなどの要素を「:」でつなげてハッシュ化したものを credentials とする
- サーバー
  - ノンスと呼ばれるランダムな文字列を challenge としてクライアントに返す
  - クライアントから送られてきた値を元に credentials を計算して、送られてきた credentials と照合する

credentials の作成方法

```
A1 = username ":" realm ":" password
A2 = HTTPのメソッド ":" コンテンツのURI (":" メッセージボディ)

credentials = MD5(
    MD5(A1) ":" サーバーノンス ":"
    クライアントがノンスを返した回数 ":"
    クラアントノンス ":" qop ":" MD5(A2)
)
```

```js
const result = await unified()
  .use(remarkParse)
  .use(slug)
  .use(remarkRehype)
  .use(shiki, { theme: "monokai" })
  .use(rehypeStringify)
  .process(markdown);
```

**qop (quality of protection)**

- `auth` または `auth-init`が指定される
- `auth` は、URI とメソッドから credentials を作成する
- `auth-init` は、URI とメソッド以外にメッセージボディも含めて credentials を作成する
  - POST や PUT でボディを送信するときに、メッセージ全体が改ざんされてないことを保証するため

#### メモ

- ハッシュ化は不可逆変換
  - MD5 の他には、より複雑な SHA1 などのハッシュ関数もある
- Basic 認証よりは安全
  - **ノンスが１度きりの値であること**と**ハッシュ化が不可逆である**ことによる
- パスワードそのものをサーバに預けなくてもよい
  - MD5 (A1) の値をそのまま DB に保存できる
- メッセージ自体は暗号化されないので、基本的には HTTPS を利用する

## 認可

### OAuth 2.0

OAuth 2.0 = アクセストークンの発行方法を標準化したもの

OAuth のフローは以下の通り

- ① クライアントは、リソースオーナー (Facebook とか) に認可を要求する
  - よく見るサービス連携のポップアップが出るところ
- ② リソースオーナーは、Authorization Grant という証明証をクライアントに返す
  - ユーザーが連携を許可した後の処理
- ③ クライアントは、認可サーバーに Authorization Grant を送ることでアクセストークンを要求する
- ④ 認可サーバーは、Authorization Grant が正しい場合にはアクセストークンをクライアントに返す
- ⑤ クライアントは、アクセストークンと共に保護されたリソースを要求する
- ⑥ リソースサーバーは、アクセストークンが正しい場合はリソースをクライアントに返す

![](./uml/oauth.svg)

アクセストークンの発行手順

- 認可コード (一番メジャー)
  - 認可エンドポイントから短命の認可コードを発行する
  - トークンエンドポイントにて、発行した認可コードと引き換えでアクセストークンを発行する
- クライアントクレデンシャル
  - トークンエンドポイントにて、クライアント認証に必要な情報と引き換えでアクセストークンを発行する
  - クライアントとリソースオーナーが同一の場合に使われる
- リフレッシュトークン
  - リフレッシュトークンを提示し、アクセストークンを**再発行**する
- インプリシット (非推奨)
  - 認可エンドポイントからアクセストークンを直接発行する
- リソースオーナーパスワードクレデンシャル (非推奨)
  - ユーザー ID とパスワードを受け取り、アクセストークンを発行する

#### メモ

- サービス間の連携の際にパスワードとユーザ名を共有しなくてすむ
- クライアントアプリに与える権限を制限できる (読み取りだけなど)
- クライアントアプリに与える権限を事前に確認できる
- OAuth を間違って認証に使うとセキュリティ的に危険なので注意
  - アクセストークンを持っている人が本当にリソースのユーザーかどうかは気にしない
  - 認証もちゃんとやりましょう → OpenID Connect

## 認可 + 認証

### OpenID Connect

OpenID Connect = ID トークン発行とユーザーのプロフィール情報 (End-User Claim) の取得手順を標準化したもの

OpenID Connect のフローは以下の通り (OAuth と似ているので、シーケンスは書かない)

- ① クライアントは、OpenID Provider にリクエストを送る
- ② OpenID Provider は、エンドユーザーを認証・認可する (**ここで本人情報を確認する**)
- ③ OpenID Provider は、クライアントへアクセストークンと ID トークンを返す
- ④ クライアントは、アクセストークンと共に OpenID Provider にユーザーのクレーム (情報)を要求する
- ⑤ OpenID Provider は、クライアントへユーザーのクレームを返す

#### メモ

- OpenID Provider は、認可サーバーの役割も担っている
- ID トークンでユーザーを区別する
- SSO (シングルサインオン、1 度のログインにより複数のサービスにアクセスするための仕組み) ができる

## 参考資料

- [認証と認可 (Auth0)](https://auth0.com/docs/flows)
- [HTTP 認証 (MDN)](https://developer.mozilla.org/ja/docs/Web/HTTP/Authentication)
- [HTTP Authentication: Basic and Digest Access Authentication (RFC 2617)](https://tools.ietf.org/html/rfc2617)
- [The OAuth 2.0 Authorization Framework (RFC 6749)](https://tools.ietf.org/html/rfc6749)
- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html#:~:text=Abstract,interoperable%20and%20REST%2Dlike%20manner)
- [多分わかりやすい OAuth](https://tech-lab.sios.jp/archives/8026)
- [OAuth & OIDC 勉強会 【入門編】](https://www.authlete.com/ja/resources/videos/20200317/)
