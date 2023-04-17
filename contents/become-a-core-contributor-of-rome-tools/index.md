---
title: "Rome の core contributor になった"
date: "2023-03-13T14:16:26.854Z"
description: "description"
tags: ["blog"]
---

ちょっと時間が経ってしまったのですが Rome の core contributor になったので、なるまでの振り返りと現在の Rome の状況について少し書きたいと思います。

## Rome とは

Rome は、増え続けている JavaScript の開発に必要なツールチェーンを統一し、開発者体験を改善しようということで始まった OSS です。現在は、JS (JSX)・TS・JSON に対する formatter と linter を提供しています。

https://github.com/rome/tools

Babel の生みの親である [Sebastian McKenzie](https://twitter.com/sebmck) が 2017 年頃からプライベートで開発を始め、2020 年頃からは OSS として開発が進められています。2021 年の 7 月ごろまでは、3rd party の npm パッケージを極力利用せずに TypeScript で実装されていました。[^1] 2021 年の 7 月以降は Rust への書き換えが行われ、現在のコア機能は全て Rust で実装されています。

[^1]: [`archive-js`](https://github.com/rome/tools/tree/archived-js) ブランチにコードが残っています。

Rust で書き直す決断に至った理由については、Rust の型システムやモジュールシステムによって安全性や正確性が保証された 3rd party crate を利用できることなどを挙げています。[^2] また、Rust で書き直すタイミングで、AST ではなく CST を採用しました。より詳細な内容については、[Rome will be written in Rust](https://rome.tools/blog/2021/09/21/rome-will-be-rewritten-in-rust/) というブログでも解説されているので参考にしてもらえればと思います。

[^2]: Jamie Kyle さんの [ツイート](https://twitter.com/buildsghost/status/1422628909376442371?s=20) で解説されていました。

## Rome Tools, Inc と開発体制の変遷

Rome はこのように OSS として始まり、開発初期の頃は 10 名程度のメンバーが開発に参加していました。[^3]

[^3]: ドキュメントの [Team Alumni](https://docs.rome.tools/credits/#team-alumni) は、初期の開発メンバーにあたります。

2021 年の 3 月には複数の VC から 4.5 million USD の融資を受けて、 Babel や Yarn を共に開発した [Jamie Kyle](https://twitter.com/buildsghost) を共同創始者として迎え入れた Rome Tools, Inc を立ち上げました。

以降はこの会社の元で開発が行われるようになり、メンバーは報酬をもらいながらフルタイムで開発していました。

https://rome.tools/blog/2021/05/04/announcing-rome-tools-inc

2022 年になると、[4 月に formatter の発表](https://rome.tools/blog/2022/04/05/rome-formatter-release/)、[11 月に linter と stable リリースの発表](https://rome.tools/blog/2022/11/08/rome-10/)を行い、少し時間がかかりつつも着実に開発が進んでいるように見えました。
一方で、 Sebastian が [Pitch をする時に使ったと思われる資料](https://drive.google.com/file/d/1gOUJshwbJpxmrqLjOmrpTCKjBWT6dp7Y/view)を見つけたのですが、この資料で説明されている Timeline とは大きく異なっていました。

そして、2023 年の 1 月になってから開発が止まり始め、2022 年の大きなリリースを支えていた 2 人のコアメンバーが同時に Rome Tools, Inc からの退職を発表しました。

- [Micha Reiser の退職](https://twitter.com/MichaReiser/status/1613474278808162304)
- [Emanuele Stoppa の退職](https://twitter.com/ematipico/status/1614980505018982402)

退職の理由についてツイートでは 2 人は説明していませんでしたが、Emanuele さんは Discord で Rome Tools, Inc の資金がショートし、給与が払われなくなったためと説明しています。[^4]

[^4]: Discord のリンクになりますが、[こちら](https://discord.com/channels/678763474494423051/678763474930761739/1068580995219083346)で言及しています

## core contributor になるまでの経緯

ということで、2023 年の 1 月時点では Rome の開発の存続はかなり厳しい状況でした。[^5]

[^5]: 実際に３週間以上コードが main ブランチにマージされない状況が続きました。

その一方で、自分は 2022 年の 10 月ごろから Rome にコントリビュートし始めていました。
元々 GSoC に参加するなどして OSS 開発が好きだったことと [The Rust Programming Language](https://doc.rust-lang.org/book/) をやった時の Rust の開発体験の良さに惹かれ、2022 年の夏ごろから Rust で書かれているフロントエンド関連のライブラリにコントリビューションしたいなと思っていました。

そこではじめに興味を持ったのが Next.js にも入った SWC だったのですが、なかなか SWC へのコントリビューションが進みませんでした。
SWC plugin を作ったりなどもしてみたりしたのですが、自分のスキルレベルに合った issue やコントリビューションネタを見つけることに苦労してしまったこともあって挫折してしまいました。
そんな中で次に興味を持った OSS が Rome でした。

Rome は GitHub でマイルストーンを管理したり、good first issue も多く登録されており、非常に透明性の高い開発をしているなと思っていました。いくつかの good first issue をやった後は、TypScript 周りの新しい構文のサポートを実装しました。

## Rome の今後
