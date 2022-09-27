---
title: "Microfrontend について勉強した時の流れ"
date: "2022-09-27T09:08:57.803Z"
description: "description"
tags: ["blog"]
---

Micro frontend について勉強する必要があったので、その勉強ログをざっくりと残していく。

Micro frontend の勉強のはじめるにあたっては、次の２つの Web 記事がよく引っかかった。

1. https://micro-frontends.org/
2. https://martinfowler.com/articles/micro-frontends.html

1 については日本語訳があり、2 については Zenn に[解説記事](https://zenn.dev/neko3cs/articles/introduction-to-micro-frontends)が出ている。
個人的には、まずはざっくりと概要をつかみたいのもあって、2 の記事を Zenn の解説記事 → 英語の元記事の順番で読んでいくことにした。

## 2 の記事のメモ

### Microfrontend の目的

- コードベースを分割し、認知負荷を軽減する
- デプロイプロセスを分割し、デプロイのコスト・リスクを軽減する
- チームを分割し、独立した顧客への価値提供活動を可能にする

ここで重要なポイントは、マイクロフロントエンドの分割のスコープには、コードベースだけではなくチームやデプロイプロセスなども含まれているという点。

### Microfrontend の実現方法

Microfrontend の実現方法には、大きく次の４つの方法がある。

### そのほかの注意点

- スタイリング
- 分割したパーツごとのデータのやり取り
- テスト

## 1 の記事のメモ
