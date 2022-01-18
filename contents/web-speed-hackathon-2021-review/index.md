---
title: "Web Speed Hackathon 2021 mini での学び"
date: "2022-01-16T08:16:31.263Z"
description: "Web Speed Hackathon 2021 mini で学習できたことを振り返ります。"
tags: ["blog"]
---

Web Speed Hackathon 2021 mini に参加していたのですが、[こちら](https://trap.jp/post/1481/)のほぼ満点を出した人の記事を元に、自分でも色々やってみた時に学習したことをまとめます。

[こちらのスクラップ](https://zenn.dev/nissy_dev/scraps/ee4f104134e064)でまとめていたのですが、色々興味のある内容があって話が脱線することも多かったので、再度自分のためにまとめ直した記事です。

## 学んだこと

### CSS のプロパティ

#### object-fit

縦横比を維持、中央配置、トリミング、以上がすべて自動で行われる `object-fit: cover` をよく使う気がする。背景画像については、似たような設定が `background-size` でできることは知っていたが、画像については知らなかった。

https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit

#### aspect-ratio

名前の通り、要素の縦横のアスペクト比を定義できる。`aspect-ratio`は、レイアウトシフトを防ぐことにも効果を発揮することがある。

Flexbox の場合、要素のコンテンツによって幅や高さが決定することがあり、レイアウトシフトの原因になっている。予め、`aspect-ratio` で要素の幅と高さを決めることで、レイアウトシフトを防ぐことが可能。

https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio

### 画像のファイル形式

WebP にすべきかと思っていたけど、より高画質でサイズの小さい AVIF と呼ばれる形式が最近は開発されている。(サポートブラウザは、[こちら](https://caniuse.com/avif)を参考)

さらに、ユーザの UX を考えると、プログレッシブな画像のほうが好ましいい場合も多い。プログレッシブな画像というのは、徐々にレンダリングされる画像のこと。PNG や JPEG はプログレッシブだが、WebP はプログレッシブではない。このため、プログレッシブに対応した WebP2 も開発されている。以下のブログの内容は、非常に勉強になった。

https://zenn.dev/gunta/articles/64de0540bafb3d

### 動画のファイル形式

ブラウザでの再生なら WebM のフォーマットが良い。ソースはあまり見つけられなかったが、Google が積極的にブラウザに有利なフォーマットとして開発しているらしい。昨年夏に Safari が対応したので、Chrome、Safari、Firefox などの主要なブラウザでは扱う事ができる。

### Passive Event Listeners

スクロールに関するイベントに登録するリスナーは、以下のように第 3 引数に `passive: true` を渡すことで、パフォーマンスを改善できる。

```js
document.addEventListener("touchstart", onTouchStart, { passive: true });
```

jxck さんのブログに、この機能が解決する問題が細かく解説されている。

> Scroll Event にイベントリスナが登録された場合、そのイベントリスナの中で preventDefault() が呼ばれる場合は、スクロールを止めなくてはいけない。

> ところが、登録されたイベントリスナの中で preventDefault() が実行されるかどうかは、実際にイベントリスナを実行してみないとわからない。

> つまりブラウザは、 Scroll Event にイベントリスナが登録されている場合、ハンドラの実行が完了し preventDefault() が呼ばれなかったことを確認してからでないと、スクロールすることができない。

https://blog.jxck.io/entries/2016-06-09/passive-event-listeners.html

https://web.dev/uses-passive-event-listeners/

### JS でのバイナリデータの扱い方

#### ArrayBuffer と TypedArray

ArrayBuffer は、バイナリデータを扱うための基底クラスで、バイナリデータを格納する箱 (領域) のイメージ。TypedArray (Unit8Array, Uint16Array など) は、ArrayBuffer を操作するためのクラス。TypedArray からしかバイナリデータを追加、削除することはできない。どちらも ES2015 で標準化されたクラス。

```ts
const buf = new ArrayBuffer(8);
console.log(buf); // ArrayBuffer { byteLength: 8 }
buf[0] = 0; // エラーは出ないけど、値として反映されない

const ua = new Uint8Array(buf);
console.log(ua); // Uint8Array [ 0, 0, 0, 0, 0, 0, 0, 0 ]
ua[0] = 1;
console.log(ua); // Uint8Array [ 1, 0, 0, 0, 0, 0, 0, 0 ]
```

#### Buffer

Buffer は、ES2015 以前から Node.js が独自に実装していたバイナリデータを扱うためのクラス。 現在は、Unit8Array を継承したクラスとなっており、TypedArray に実装されているすべてのメソッドが利用可能である。

https://nodejs.org/api/buffer.html#buffers-and-typedarrays

以下のように、一部互換性がないところもある。

> Buffer#slice の実装は、既存の Buffer のコピーなしで作成するのに対し、TypedArray#slice の実装はコピーを作成するため、動作に違いが出ます。

https://techblog.yahoo.co.jp/advent-calendar-2016/node_new_buffer/

### font-display の設定

- `font-display: block`: フォントがダウンロードされるまでは何も画面に表示されない
- `font-display: swap`: フォントがダウンロードされるまでの間は代替フォントで表示される

読み込みを早くするには、`font-display: swap` の方が良い。

### Lazy loading

ファーストビューに表示されている画像まで Lazy loading してしまうと、LCP のスコアが悪くなるので注意する。

また画像だけではなく、画面外で要素の描画をスキップできる `content-visibility` も存在する。細かい使い方については、以下のブログが参考になる。

https://techblog.yahoo.co.jp/entry/2020090830016393/

### キャッシュのおさらい

#### キャッシュの流れ

1. レスポンスを保存する
2. 保存したレスポンスを再利用する

#### キャッシュの種類

- local (private) キャッシュ
  - 特定のユーザー専用のキャッシュ
  - ブラウザのキャッシュなどが該当する
- shared キャッシュ
  - 複数のユーザがレスポンスを再利用するためのキャッシュ
  - Proxy や CDN のキャッシュなどが該当する

#### キャッシュの設定

- public
  - レスポンスをどのキャッシュ (local、shared ともに) にも保存し、再利用できる
- private
  - レスポンスを local キャッシュのみに保存し、再利用できる
- no-cache
  - レスポンスをどのキャッシュ (local、shared ともに) にも保存できる
  - キャッシュが stale (有効期限が過ぎている) かどうかに関わらず、再利用時に必ずサーバーに確認を取る必要がある
- no-store
  - レスポンスをどのキャッシュ (local、shared ともに) にも保存させない

個人情報などを扱うページについては、local キャッシュのみを許可する `private` を設定する。どこにもキャッシュされたくない場合は、`no-store` を設定する。(`no-cache` ではない！！)

ちなみに、なにも Cache-Control を設定しない場合、レスポンスはどこかでキャッシュされる可能性があるので、キャッシュされたくない値を使うときは注意する。

#### キャッシュのライフサイクル周りの設定

- max-age
  - キャッシュの有効時間の設定 (local、shared キャッシュともに有効)
  - 1 ヶ月 (2592000) 、１年 (31536000) とかの値をセットすればよい
- s-maxage
  - shared キャッシュの有効時間の上書きに使う
- must-revalidate
  - キャッシュが stale (有効期限が過ぎている) の時に、再利用時に必ずサーバーに確認をとる必要がある

`max-age=0` は、キャッシュが無効にはならず、Request Collapsing の場合にキャッシュが返ってしまうことに注意する。

> CDN からオリジンへのリクエストの処理中に、同じ URL に対してリクエストが発生すると、最初のレスポンスを待って、2 つ目以降のリクエストにも同じレスポンスが返される仕様になっていました。

https://speakerdeck.com/kazeburo/cdn-in-mercari

`must-revalidate` は、一見 `no-cache` と似ているけど、キャッシュが stale かどうかで挙動が異なる。

#### stale-while-revalidate

キャッシュが stale になったら、指定された期間内は stale なキャッシュを返しつつ、バックグラウンドでキャッシュを更新する設定。

> 「キャッシュは効かせたいが、なるべく新鮮なリソースを提供したい。」などといった要望に対処する

https://blog.jxck.io/entries/2016-04-16/stale-while-revalidate.html

#### immutable

キャッシュが有効期限内であればリロード時もキャッシュを再利用させる設定。ブラウザがリロードする際は、キャッシュが fresh (有効期限内) か stale かどうかに関わらず、条件付きリクエストを発行し、キャッシュの検証を行う。

https://blog.jxck.io/entries/2016-07-12/cache-control-immutable.html

#### 条件付きリクエスト

`no-cache` や `must-revalidate` の設定のときに行われている、キャッシュの再利用時にサーバーにキャッシュの有効性を問い合わせるリクエストを条件付きリクエストと呼ぶ。

有効性の評価については、リソースが変更された最終時刻のタイムスタンプかリソースのハッシュ値を利用する。リソースが変更された最終時刻のタイムスタンプの場合は、最初のリソース取得のときにサーバーが `Last-Modified` でタイムスタンプをブラウザに返し、送られた `Last-Modified` を使って `If-Modified-Since` ヘッダを付与した条件付きリクエストをサーバーに送信する。サーバーでは、タイムスタンプの時刻をつかってキャッシュが有効がどうか判断する。リソースのハッシュ値の場合は、最初のリソース取得のときにサーバーが `Etag` でタイムスタンプをブラウザに返し、送られた `Etag` を使って `If-Non-Match` ヘッダを付与した条件付きリクエストをサーバーに送信する。サーバーでは、ハッシュ値をつかってキャッシュが有効がどうか判断する。

#### キャッシュ設定の基本

まとめると、以下のフローチャートを元に設定するのが良さそう。

https://web.dev/http-cache/#flowchart

### Cloudflare の基礎

Cloudflare の CDN を利用する場合は、対象サイトのドメインのネームサーバーを Cloudflare が管理するネームサーバに変更し、プロキシの設定を行うことで利用できる。

試しにこのブログを Cloudflare に乗せて見たところ、リダイレクトループが起こったりしたものの、CDN から配信することができた。コンテンツは、[こちらのドキュメント](https://support.cloudflare.com/hc/ja/articles/200168076-Cloudflare-HTTP-2%E3%81%A8HTTP-3%E3%81%AE%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)の理由から HTTP3 で配信されるようになった。

> ブラウザと Web サーバーが利用可能な最高位のプロトコルを自動的にネゴシエートします。そのため、HTTP/3 は HTTP/2 よりも優先されます。Cloudflare が HTTP/1.x を使うのは、オリジン Web サーバーと Cloudflare の間だけです。

キャシュヒットしているかどうかは、レスポンスヘッダの `CF-Cache-Status` の値などをみればいいらしい。デフォルトでキャッシュするファイルの一覧は以下のリンクから確認できる。HTML はデフォルトでキャッシュされない。

https://developers.cloudflare.com/cache/about/default-cache-behavior#h_a01982d4-d5b6-4744-bb9b-a71da62c160a

ちなみに、リダイレクトループが起きた原因は、**エッジサーバーからオリジンサーバーへのリクエストにはデフォルトで HTTP を利用し**、オリジンが HTTP を HTTPS にリダイレクトするためだった。(結局、[Vercel では Cloudflare を使うことが推奨されてなかった](https://vercel.com/support/articles/using-cloudflare-with-vercel)のですぐにやめた。)

Cloudflare はドメイン移管も行っていて、卸売価格でドメインを管理できる。(.dev は移管できなかった...)

### Google App Engine の基礎

Google App Engine でのデプロイは、デプロイに必要な `app.yaml` を作成し、基本的に以下の 3 ステップで行える。

```sh
// プロジェクトの作成
$ gcloud projects create test-project --set-as-default

// App Engine の作成
$ gcloud app create --project=test-project

// デプロイ
$ gcloud app deploy
```

App Engine は、Standard 環境と Flexible 環境を提供している。違いや注意すべき点については、以下のブログに丁寧に書かれている。特に、Standard 環境の自動スケーリングの設定については、小さくするのを忘れないようにしたい。

https://zenn.dev/catnose99/articles/f99ea2a8b985b2

今回は、Standard 環境で yarn コマンドを実行させることができずに 1 日位ハマってしまった... サンプルなどを見ても、基本的には Flexible が推奨されている感じがするので、もしデプロイするなら はじめは Flexible を試すのが良いかもしれない。

https://github.com/GoogleCloudPlatform/nodejs-docs-samples/tree/d0e24cecafa33174fe5ba56f1ffa12c746ff539e/appengine

## 感想

- preact の移行は以外とサクッとできる
  - webpack でエイリアス書くだけ
- Code Splitting の単位がよくわからない
  - Lazy import 単位、Webpack の管轄
  - コンペ中、[Route-based code splitting](https://reactjs.org/docs/code-splitting.html#route-based-code-splitting) でやろうとしたけどうまくいかなかった...
- GAE を使う場合、ルートドメインを登録しないと、Cloudflare の CDN は利用できない (?)
  - これはちゃんと理解できていない...
  - [こちらの方法](https://blog.kakakikikeke.com/2019/02/how-to-set-custom-domain-on-gae.html)で、サブドメインを GAE に登録したが、CDN は利用できなさそうだった
