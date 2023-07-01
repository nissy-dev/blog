---
title: "Rome の contributor からみた Oxc の印象"
date: "2023-06-25T07:51:40.672Z"
description: "description"
tags: ["blog"]
---

最近、Boschen さんが開発している Oxc に注目しています。現時点では、parser がほぼ完成していて、linter や minifier のコア部分の実装に集中している段階です。

https://github.com/Boshen/oxc

社内で Oxc の近況を slack に投稿していたところ、「Oxc は Rome で話題になっていますか？」「Oxc はうまくいくと思いますか？」
と聞かれたことで Rome の現状や自分のモチベーションを整理するいいきっかけになったので、個人ブログに残しておこうかなと思います。

## Rome と Oxc の違い

Rome と Oxc はどちらも linter、formatter、transpiler などを提供するつもりではあるので、ユーザーからみた違いは分かりにくいかなとは思います。現時点での大きな違いは、次の２点だと思っています。

- プロジェクトのスコープ
  - Rome: JS/TS に限らず Web 開発に関連する言語全般にツールを提供することを試みている
  - Oxc: JS/TS に関するツールにフォーカスしている
- 提供するツールの拡張性に対する考え方
  - Rome: 設定できるパラメータは極力減らし、良いデフォルト値を提供する
  - Oxc: ユーザーによる拡張や独自ツールの作成を前提とした API を設計する

Rome は、近年の Web 開発に必要なツールチェーンの設定の多さや複雑さを解消したいというモチベーションから始まったプロジェクトです。このため、Rome のスコープは広く、提供されるツールは非常に opinionated なものになっています。

一方で、Oxc はプロジェクトのゴールに次の観点を掲げている通り、非常に拡張性を意識していることがわかります。

> Provide the basic building blocks for creating your own tools by having good API designs

## Rome の現状

Oxc がうまくいくかどうかの話の前に、そもそも Rome について振り返ってみます。

結論から言うと、Rome の core contributor ではありますが、このまま開発していっても当初の掲げた目標を達成するのはかなり厳しいと思っています。npm の weekly download をみてもらえばわかりますが、昨年の 10 月のリリース以降はなかなかユーザーも増やせていません。

https://www.npmjs.com/package/rome

Web 開発に必要なツールを統一するという目標に関しては、開発体制の変化とライブラリの増加が大きな障壁になっていそうです。

開発体制が完全なボランティアベースになってしまったので、Web 開発に必須な CSS と HTML に関する開発に着手する余裕がありません。また、近年 Astro や Qwik などの独自のパーサーが必要なのフレームワークが公開されることが多く、これらの対応についても着手できていないです。このような現状に対して開発者を増やしていきたいところなのですが、ボランティアベースということもあり増えるのを期待するのはなかなか厳しいです。

ユーザーへの導入が進んでない大きな原因としては、Rome が ESLint からの移行パスを提供できてない点が挙げられると思います。

ESLint は非常に大きなプラグインのコミュニティを持っていますが、Rome は linter に関するプラグインの仕組みを提供しておらず、プラグインの仕組みを提供するのも簡単ではありません。移行しやすいように JS でかけるような仕組みにすると SWC のプラグイン作成時に議論されていたパフォーマンスの問題が生じる可能性があります。[^1] 一方で、Rust でかけるような仕組みにすると、既存のプラグインを Rust で書き直す必要があります。

[^1]: https://github.com/swc-project/swc/issues/18#issuecomment-482805616

実際に SWC は Rust でのプラグインの仕組みを提供しましたが、コミュニティー主体でのプラグインの実装はあまり進まず、作者自身が多くのプラグインを実装することになっていたように見えます。[^2] Rome の場合には、実装した方が良い ESLint ルールの数が SWC の時の比ではないので、もし Rust での仕組みを提供したとしても移行の障壁は非常に高いことが予想されます。

[^2]: https://github.com/swc-project/swc/discussions/4768 を見る限り、多くのプラグインをコアメンバーが実装しているように見えます。

また、Rome は現在よく使われる ESLint のルールを中心に 150 以上のルールを実装していますが、それらが実際の ESLint のどのルールと対応し、どれほどカバーできているのかという情報にすぐにアクセスできない状況にもなっています。

次のような ESLint の設定がよく使われていると思うのですが、このような設定で導入されるルールの 9 割以上は Rome でも実装されていると思います。この点については、自分も次のメジャーバージョンが出た後にドキュメントを書こうかなとは思っています。

```js
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint", "jsx-a11y", "import"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "prettier",
  ],
  ...
}
```

## Oxc はうまくいくのか？

このように元々のプロジェクトの勢いを失っているように見える Rome とは対象的に、Oxc の開発は非常に活発です。Oxc はうまくいくのでしょうか？

まず、Oxc はスコープを JS/TS に絞っているので、複数言語や複数フレームワークの対応に関しては自分たちで実装するというよりは、コミュニティーにやってもらうことになりそうです。この場合、コミュニティーの形成が非常に重要ですが、Twitter みている限り Boschen さんはそこらへんが非常に上手だと感じます。

具体的には、次に実装する機能を Twitter の投票機能を使ってきめたり[^3]、リリースは頻繁に行って開発の勢いを見せたりしています。また、Vue の Evan You からコメントをもらって以降は Vue 関連の人と積極的にコミュニケーション取ったり、プラグインや TS の type checker 周りでのコラボレーションも非常に積極的です[^4] [^5]。

[^3]: https://twitter.com/boshen_c/status/1670662562634158082?s=20
[^4]: https://twitter.com/boshen_c/status/1671000640645120001?s=20
[^5]: https://twitter.com/kaleidawave/status/1672210943533633543?s=20

そして、もう１つの ESLint からの移行パスについてですが、こちらに関してはつい先日 Oxc が linter のロードマップを公開しました。

https://github.com/Boshen/oxc/issues/481

こちらをみてみると、やはり ESLint と完全に互換性を保った移行は不可能なので、次の方針で linter を実装していくようです。

- コードの correctness のみにフォーカスしてルールを実装する
  - bike-shedding になりがちな スタイルや慣習に関するルールは提供しない
  - 有名な 10 個ほどのプラグインのレコメンドのルールも実装する
- プラグインでは、DSL として GraphQL のサブセットを利用することを検討中

Rome の開発者としては、やはりプラグインを Rust という形ではなく GraphQL like な DSL で提供するところに着目したいです。個人的には、これがうまくコミュニティで受け入れられるかどうかが linter として成功するかどうかの鍵を握っていると思います。個人的には、Rust での仕組みを提供するよりはユーザーも馴染みやすそうで非常に面白いと思っていますが、複雑な linter のロジックをどこまで再現できるのかは未知数だなと思います。

また、コードの correctness のみにフォーカスしてルールを実装する点も、プラグインがうまく機能しない限りはうまくいかないと思います。ルールを絞ってもユーザーの多くは ESLint からなるべく互換性を持って移行したいと思うので、プラグインが提供されていない間は実装の依頼が来てしまうと思います。Rome はプラグインの機能を提供していないので、やはりルールが足りないことを理由に置き換えができないと言われることが多いです。

ということで、Oxc に関してもいくつか障壁はあると思うのですが、それらに対して新しいアプローチを取り入れながら乗り越えていこうとしているのが印象的です。個人的にはうまくいってほしいと思っていますし、プラグインに関して何もアクションが取れていない Rome よりも期待が持てるかなと思います。

ちなみに、Rome の開発を支えていた [Emanuele さん](https://twitter.com/ematipico)と [Micha さん](https://twitter.com/MichaReiser)は開発初期の頃から Oxc にアーキテクチャのアドバイスを頻繁に行なっています。また、Rome も Oxc から Rust の細かい Tips を導入することもあります。そのため、Rome と Oxc はお互いにより良いツールチェーンを提供するために切磋琢磨する関係になっています。

## 最後に

ざっくりと Rome と Oxc について個人的に振り返ってみました。

このタイミングで自分が Rome にコミットし始めた理由を振り返ると、やっぱり新しい構文などが JS/TS に追加されたときの各ツールのコントリビューターの負担を減らしたいというところにあったかなと思っています。やはり、あれだけ使われるようになった SWC がほぼ 1 人でメンテをされているの見るのはなかなか辛いなーと感じます。

そして、そこによりアプローチをしているのは Rome ではなく Oxc なのかなとも感じています。Rome は、JS / TS にフォーカスして色々なツールを実装するというよりも、ある程度基盤ができている linter や formatter の実装を JSON や CSS の複数の言語に広げていくようなマイルストーンを考えています。

https://github.com/rome/tools/milestone/11

個人的には、最近の新しいフレームワークの誕生を見るに、やはり複数の言語、フレームワークを完全にサポートしていくのは厳しいかなと思います。それよりも、まずは JS/TS にフォーカスした統一したツールチェーンを提供する方がよいと思っています。特に、CSS などに関しては Lightning CSS で同様な動きが進んでおり、新しく Rome がそのような動きを一からやり始める必要性も少ないのかなとは感じています。

https://github.com/parcel-bundler/lightningcss

現在 Turborepo の開発をしており、以前は Rome にもこのトリビュートしていた Nicholas さんは、Twiiter で次のような[コメント](https://twitter.com/NicholasLYang/status/1642330243942809600?s=20)をしていました。

> Maybe this is naive, but I still think we haven't made a good enough parser framework. I want something that has good error messages, a high fidelity CST, an AST facade, decent recovery, and compiles down to multiple languages (Rust, C, JS)

Rome で全てを作っていくというよりは、Rome でのベストプラクティス部分を切り出して、ツールチェーンを作成するためのより汎用的なフレームワークを提供するのは良さそうです。そうすることで、 Lightning CSS のような動きもコミュニティで起きやすくなるかもしれません。次のブログも自分の知らない視点での話が多く面白かったです。

https://uptointerpretation.com/posts/tooling-for-tooling/

ということで、7 月は Rome に加えて Oxc にもコミットしつつ、Rome と Oxc の内部的な違いについて理解できるようになれたらと思います。また、Boschen さんに認知される程度までコミットできたら、JSConf JP への登壇にも誘ってみたいです。
