---
title: "DNSの基礎"
date: "2021-06-11"
description: "新卒研修で扱った DNS のメモ"
tags: ["note", "network"]
---

DNS (Domain Name System) ＝ ドメインから IP アドレスを割り出すシステム

- 問い合わせの流れ
  - ドメイン → Recursive DNS → ルート DNS → 権威 DNS → ・・・ → 権威 DNS → IP アドレス
  - `hoge.cybozu.com` の場合
    - ルート DNS： `com` は `192.XX.XX.XX` (権威 DNS1) に聞いて
    - 権威 DNS1： `cybozu.com` は `216.XX.XX.XX` (権威 DNS2) に聞いて
    - 権威 DNS2： `hoge.cybozu.com` は `103.XX.XX.XX` です
- Recursive DNS の役割
  - 基本的にユーザーに近い距離にあるので、問い合わせが早くなる
  - キャッシュ機能を使うと、別の社員が先に問い合わせた内容を自分も使いまわせる
- ゾーンファイル
  - **ドメインと IP アドレスを紐づけるファイル**
    - このファイルの情報をもとに、DNS サーバーはレスポンスする
  - 書き方は「権威情報 -> 権威サーバーの割り当て -> IP の割り当て」の流れが一般的になる
- レコードの種類
  - `A`： IPv4 でホスト名と IP アドレスの関連づけを定義する
  - `CNAME`： ドメイン名の別名 (エイリアス) を定義する
  - `NS`： 対象ドメインの権威サーバーを定義する (複数)
  - `SOA`： 権威情報を定義する、ファイルの先頭に書く
    - 権威情報 = ドメインの DNS サーバ名、ドメイン管理者のメールアドレス、シリアル番号、更新間隔など

## 参考資料

- [HTTP と DNS (研修資料)](https://speakerdeck.com/cybozuinsideout/http-dns-2020)
- [名前解決の仕組みとゾーンファイルの設定](https://www.atmarkit.co.jp/ait/articles/0101/12/news003.html)
- [ゾーンファイルの書き方について教えてください](https://www.atmarkit.co.jp/fnetwork/dnstips/031.html) ＝
