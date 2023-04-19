---
title: "Rome の core contributor になった"
date: "2023-04-19"
description: "Rome の core contributor になったので、なるまでの振り返りと現在の Rome の状況について少し書きたいと思います"
tags: ["blog"]
---

ちょっと時間が経ってしまったのですが Rome の core contributor になったので、なるまでの振り返りと現在の Rome の状況について少し書きたいと思います。

## Rome とは

Rome は、増え続けている JavaScript の開発に必要なツールチェーンを統一し、開発者体験を改善しようということで始まった OSS です。現在は、JS (JSX)・TS・JSON に対する formatter と linter を提供しています。

https://github.com/rome/tools

Babel の生みの親である [Sebastian McKenzie](https://twitter.com/sebmck) さんが 2017 年頃からプライベートで開発を始め、2020 年頃からは OSS として開発が進められています。2021 年の 7 月ごろまでは、3rd party の npm パッケージを極力利用せずに TypeScript で実装されていました。[^1] 2021 年の 7 月以降は Rust への書き換えが行われ、現在のコア機能は全て Rust で実装されています。

[^1]: [archive-js](https://github.com/rome/tools/tree/archived-js) ブランチにコードが残っています。

Rust で書き直す決断に至った理由については、Rust の型システムやモジュールシステムによって安全性や正確性が保証された 3rd party crate を利用できることなどを挙げています。[^2] また、Rust で書き直すタイミングで、AST ではなく [Rowan](https://github.com/rust-analyzer/rowan) ベースの CST を採用しました。より詳細な内容については、[Rome will be written in Rust](https://rome.tools/blog/2021/09/21/rome-will-be-rewritten-in-rust/) というブログでも解説されているので参考にしてもらえればと思います。

[^2]: Jamie Kyle さんの [ツイート](https://twitter.com/buildsghost/status/1422628909376442371) で解説されていました。

## Rome Tools, Inc と開発の変遷

Rome はこのように OSS として始まり、開発初期の頃は 10 名程度のメンバーが開発に参加していました。[^3]

[^3]: ドキュメントの [Team Alumni](https://docs.rome.tools/credits/#team-alumni) は、初期の開発メンバーにあたります。

2021 年の 3 月には複数の VC から 4.5 million USD の資金調達を受けて、 Babel や Yarn を共に開発した [Jamie Kyle](https://twitter.com/buildsghost) さんを共同創始者として迎え入れた Rome Tools, Inc を立ち上げました。

以降はこの会社の元で開発が行われるようになり、メンバーは報酬をもらいながらフルタイムで開発していました。

https://rome.tools/blog/2021/05/04/announcing-rome-tools-inc

2022 年になると、[4 月に formatter の発表](https://rome.tools/blog/2022/04/05/rome-formatter-release/)、[11 月に linter と stable リリースの発表](https://rome.tools/blog/2022/11/08/rome-10/)を行い、少し時間がかかりつつも着実に開発が進んでいるようにみえました。
一方で、 Sebastian さんが [Pitch をする時に使ったと思われる資料 (2021 年 3 月のもの)](https://drive.google.com/file/d/1gOUJshwbJpxmrqLjOmrpTCKjBWT6dp7Y/view)を見つけたのですが、この資料で説明されている Timeline とは大きく異なっていました。
会社のマネタイズでは、40,000 USD をクラウドファンディングで獲得することやセキュリティチェック、エラーレポートなどのコード品質に関わる多くのツールを盛り込んだサービスを提供することなどを考えていたようですが、2022 年の年末の時点ではいずれも実現できていなかったように見えます。

そして、2023 年の 1 月になってから開発が止まり始め、2022 年の大きなリリースを支えていた 2 人のコアメンバーが同時に Rome Tools, Inc からの退職を発表しました。

- [Micha Reiser さんの退職](https://twitter.com/MichaReiser/status/1613474278808162304) [^4]
- [Emanuele Stoppa さんの退職](https://twitter.com/ematipico/status/1614980505018982402) [^5]

[^4]: 現在は [Ruff](https://github.com/charliermarsh/ruff) という Python の Linter の開発をしているようです。
[^5]: 現在は [Astro の コアメンバーになった](https://twitter.com/ematipico/status/1627756599757402132)ようです。

退職の理由についてツイートでは説明されていませんでしたが、Emanuele さんは discord で Rome Tools, Inc の資金がショートし、給与が払われなくなったためと説明しています。[^6]

[^6]: Discord のリンクになりますが、[こちら](https://discord.com/channels/678763474494423051/678763474930761739/1068580995219083346)で言及しています。

## Core contributor になるまでの経緯

ということで、2023 年の 1 月時点では Rome の開発の存続はかなり厳しい状況でした。[^7]
こんな状態の Rome にどうして自分が core contributor として招待されたのかというところについて書きたいと思います。

[^7]: 実際に３週間以上コードが main ブランチにマージされない状況が続きました。

自分は、GSoC に参加するなどして OSS 開発が好きだったことや [The Rust Programming Language](https://doc.rust-lang.org/book/) をやってみた時の Rust の開発体験の良さに惹かれ、2022 年の夏ごろから Rust で書かれているフロントエンド関連のライブラリにコントリビューションしたいなと思っていました。

まずはじめに興味を持ったのが Next.js にも導入された SWC でした。
SWC plugin を作るところから始めていったのですが、自分のスキルレベルに合った issue やコントリビューションネタを見つけることに苦労し、最終的には継続的なコントリビューションにつながりませんでした。
そして、次に興味を持ったプロジェクトが Rome でした。

しばらく Rust を書いていて思ったことなのですが、test runner が組み込まれていたり、zero config の linter や formatter が整っている状態での開発は非常に快適で、Rome の掲げる理想にとても共感しました。
さらに、GitHub の [Project](https://github.com/rome/tools/projects) を使った透明性のある開発体制[^8]や丁寧なドキュメントの存在 ([linter](https://rustdocs.rome.tools/rome_analyze/index.html)・[formatter](https://rustdocs.rome.tools/rome_js_formatter/index.html)) などに惹かれて、good first issue にチャレンジすることにしました。
実際に取り掛かってみると、SWC のときと比べて簡単に PR を出すことができました。
いくつか good first issue に取り組んだ後は、TypeScript の新しい構文 (satisfies 構文など) の対応をメインに、少しずつ継続的にコントリビューションしていました。

[^8]: この点は[ドキュメントの Philosophy](https://docs.rome.tools/internals/philosophy/) でも明記されており、Rome の開発メンバーが意識していたことがわかります。

こうして Rome の 12 月のリリースでは [Acknowledgments](https://rome.tools/blog/2022/12/06/rome11/#acknowledgments) で紹介してもらい、今後もコントリビューションしていくぞと思っていた矢先に Rome の開発が止まってしまいました。

Emanuele さんは、「Rome Tools, Inc をやめた後もコントリビュートを続けていきたい一方で、Rome 自体は Rome Tools, Inc が所有しているプロジェクトなので 自分が outside contributor として開発を進めていいかはっきりしていない」と discord で述べていました。
その発言から２週間後、Emanuele さんが PR のレビューやマージを再開し、これをきっかけに OSS としての開発も再開し始めました。[^9]
自分もこのタイミングで「If you need more, I also can give a hand for maintaining the project」と discord でコメントしたところ、過去のコントリビューションも鑑みて core contributor に招待してもらいました。

[^9]: Emanuele さんが PR のレビューやマージを再開し始めた具体的な理由についてはよくわかってないのですが、何かしらの Sebastian とのコミュニケーションが思われます。

## Rome の今後

このような感じで、明確な説明もなくふわっと再開した Rome の OSS として開発ですが、多くの皆さんが気になるのは今後の開発の行方だと思います。

現在の開発は、元コアメンバーである Emanuele さんを中心とした有志が集まって進めているという状態になっています。
そのため、チームでの開発体制や明確なマイルストーンなどはなく、次のリリースもいつ、どのような内容で行うのかという点についてはあまり議論していません。[^10]
最近だと、formatter や linter の不具合や ECMAScript decorator などの対応を行っています。

[^10]: Discord 内でスレッドは立ちましたが、これをまとめていく動きも現在はできていません。

個人としても、しばらくは formatter や linter 周りの対応をメインですることになりそうです。
またこれはあくまで自分の感覚にはなりますが、他のメンバーに関してもフルタイムメンバーではないので、元々掲げていた bundler や test runner などのツールチェーンを統一する勢いは現在のところないと思います。

## 最後に

JavaScript の開発に必要なツールチェーンが増え続けている課題感にはすごい共感しているので、Rome に限らずできる限りその問題を解消するような活動には今後も貢献していきたいと思います。
また、Rome にコントリビューションすることで、JavaScript だけではなく CSS や HTML のパーサーも実装している SWC は本当にすごいと再認識しました。
いろんなツールが SWC に依存していく一方でコントリビューターが増えていないので、自分にも何かできることがないかなあと思ったりしています。

あとは、最近の勢いのある OSS は Twitter などでうまくいろんな人を巻き込んでいるなと感じます。
ブログを投稿する直前に、Rust で Python の linter や formatter を書き換えている [Ruff が資金調達した](https://twitter.com/charliermarsh/status/1648358440450834432)ニュースを見ました。
Ruff の作者も非常に Twitter でアクティブに活動し、開発メンバーは少ないものの多くの人の意見などを取り入れてプロジェクトを進めているように見えました。
また、Rspack の開発もしていた [Boshen](https://twitter.com/boshen_c) さんが自分の学習のために最近開発している [OXC](https://github.com/Boshen/oxc) も開発が活発です。
Discord では、Rust で TypeScript checker を実装している [enzo](https://github.com/kaleidawave/ezno) の作者と協力するような動きも見られ、周りの人を巻き込んで開発を進めていくのが上手いなと感じます。[^11]

[^11]: Discord のコメントは[こちら](https://discord.com/channels/1079625926024900739/1080723403595591700/1091005139776700527)です。Rspack も Webpack や Nx のチームをうまく巻き込みながら進めていたのが印象的でした。
