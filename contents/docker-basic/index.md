---
title: "Dockerの基礎"
date: "2021-05-30"
description: "新卒研修で扱ったDockerのメモ"
tags: ["note", "docker"]
---

新卒研修でやった内容を軽くまとめたもの

## コンテナ

- VM とコンテナの違い
  - VM：OS (カーネル、OS のコア機能) から仮想化
    - オーバーヘッドが大きい
    - イメージサイズも大きい、起動も遅い
  - コンテナ：プロセス (1 つの処理単位) から仮想化
    - ホスト OS とカーネルを共有する、起動は早い
    - OS 機能も含めて完全に同じ環境を再現することはしていない
- コンテナの実現するための技術
  - **Linux のカーネルには互換性があるため、カーネルを共有できる**
  - Linux namespace
    - プロセスに対して、PID、ネットワーク、ユーザー、ホスト名などのリソースを分離する
  - cgroups
    - プロセスに対して、CPU やメモリなどのリソースを制限・隔離する
  - Linux capability
    - スーパーユーザーとしての機能を制限するための機能
      - Docker コンテナへホスト OS の root ユーザーの権限を制限するなど
  - Mac や Win はどうしている...?
    - **Mac や Win の場合は、`HyperKit` などを使って 軽量な Linux VM をたてて動かしている**

## Docker の各要素

- image
  - 環境のスナップショット
- container
  - スナップショットを元に起動したプロセス
  - コンテナ内のプロセスは、ホストマシンや他のコンテナと隔離されている
  - `CMD` で定義されたプロセスは、どのコンテナ内でもプロセス ID に 1 が割り当てられる (PID=1)
    - PID=1 は、init プロセスと呼ばれ、他の全てのプロセスの親となっている
    - `kill -s TERM 1` しても落とせない場合があるので注意
      - シグナルを送ることは制限されている
      - Node.js とかが良い例 (参考記事が詳しい)
- volume
  - コンテナが利用するデータを永続化する仕組み
  - コンテナを終了しても volume は消えない
  - ロギングをしたい場合などでよく使う
  - -v VOLUME_NAME:CONTAINER_PATH
    - `docker volume ls` で永続化されている volume を確認できる
  - -v HOST_PATH:CONTAINER_PATH
    - こっちの方がよく使う
    - ホストのファイルをコンテナに同期させる
- network
  - 複数プロセスを協調して動かす必要がある時は、ネットワークで通信する
  - プロセス間のやりとりのための bridge を作るのが一般的

## Docker ベストプラクティス

- Root ユーザーは使わない
  - 一般ユーザーの作り方は、参考記事を見ると良い
- 野良イメージは使わない
  - Docker Official Images は安全
- `.dockerignore` をちゃんと使う
  - `.env`、`.git`、`node_modules` などは、ちゃんと ignore するべき
- 小さいベースイメージを使う
  - `distroless` や `XXXX-slim` みたいなのが良い
- レイヤーを作りすぎない
  - レイヤーが少ないほど、イメージサイズも小さくなる
- ADD・COPY の使い分け
  - COPY が推奨、ADD は予期せぬ挙動をすることがある
- ENTRYPOINT/CMD の使い分け
  - ENTRYPOINT
    - コンテナ起動時のコマンドを変更する必要がない場合に使う
  - CMD
    - コンテナ起動時のコマンドを色々変更したい場合に使う
    - `docker run` 時の引数で上書きできる
- multi stage build を使う
  - ビルド用と実行用のステージで分離して記述できる
  - 実行用のステージでは、ビルド用のツールなどがいらなくなり、イメージサイズが小さくなる
  - Python や Node.js でもできる
    - [Python の場合](https://github.com/GoogleContainerTools/distroless/tree/master/examples/python3-requirements)
    - [Node.js の場合](https://github.com/GoogleContainerTools/distroless/blob/master/examples/nodejs)
- Dockerfile には Lint ツールを使う
  - [Haskell Dockerfile Linter (hadolint)](https://github.com/hadolint/hadolint)
- ヘルスチェックの仕組みを用意する
  - コンテナの死活管理ができる
  - Web API を用意するのが一般的、`HEALTHCHECK` も使える ([Docker HEALTHCHECK](https://docs.docker.com/engine/reference/builder/#healthcheck))
- ログは標準出力 or 標準エラー出力に出す
  - `docker logs -f` で確認できる

## 参考資料

- [Docker 入門](https://y-ohgi.com/introduction-docker/)
- [なぜ Docker ではホスト OS と違う OS ベースのコンテナイメージが動くのか](https://qiita.com/kirikunix/items/33414240b4cacee362da)
- [Docker で node.js を動かすときは PID 1 にしてはいけない](https://ngzm.hateblo.jp/entry/2017/08/22/185224)
- [Docker コンテナ内に一般ユーザーを作成する](https://zukucode.com/2019/06/docker-user.html)
