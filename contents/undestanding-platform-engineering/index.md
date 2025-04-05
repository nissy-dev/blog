---
title: "Platform Engineering とそれをとり巻く用語を理解する"
date: "2025-04-05"
description: "Platform Engineering とそれをとり巻く用語を理解する"
tags: ["blog", "career"]
---

最近自分の役職を聞かれると、バックエンドをメインで1年くらいやっているものの、バックエンドエンジニアを名乗る勇気はなかったので、フルスタックのソフトウェアエンジニアと答えていた。これは、データベースの設計やクエリのパフォーマンス改善などの経験がなく、サーバー周りの専門性を持ってないと思っていることが理由にある。

フルスタックのソフトウェアエンジニアと聞くと、一般的にはチームトポロジーの Stream Aligned Team に所属していると思われそうである。ただ、それは自分の今までの経歴から少し違うなと感じていて、自分は一体何エンジニアなのだろうかと思うようになった。

色々調べていると、「Platform Engineering」が自分の今までやってきたことに近そうだった。[「Platform Engineering」の定義は、ガートナーによると次のようになっている。](https://www.gartner.co.jp/ja/articles/what-is-platform-engineering)

> プラットフォーム・エンジニアリングとは、ソフトウェアの開発とデリバリを目的とした、セルフサービス型の開発者プラットフォームの構築と運用に関する専門分野です。
> プラットフォーム・エンジニアリングは、セルフサービス機能とインフラストラクチャ・オペレーションの自動化により、開発者のエクスペリエンスと生産性を向上させます。

これに該当しそうな活動をあげてみると、サービスという単位のものを作った経験はあまりないが、開発者の生産性向上に対して意識が高そうである。あまり最近は聞かないけど、もしかしたら DevOps エンジニアの方が適切かもしれない。

- 生産性向上チームへのチーム体験
- カスタムリントルールの整備
- レガシーコードを置換するトランスパイラープラグインの作成
- フロントエンドの CI / CD の最適化
  - PR の差分に関係のあるテストだけを実行させることで CI の時間を削減
  - デプロイ作業を Github Actions で自動化
  - PR に関連するプレビュー環境の自動構築
- Web パフォーマンスの監視基盤の整備と改善活動
- Biome のような開発者向けツールの OSS 開発

このことを踏まえて、自分は 「Platform Engineering」をやってきた or やってきたい人と名乗って良いのか、というところを調べ始めた。界隈では 「SRE」との棲み分けが難しいようだったが、次のメルカリの人のツイートのまとめがわかりやすかった。

https://x.com/deeeet/status/1700352312542478598

まとめるとこうである。

- SRE は Stream Aligned Team のサービス運用を支える Enabling Team と捉える
  - KPI として SLO や SLI などのサービスの信頼性重視する
  - コラボレーションを通じた障害の原因特定の速さなどのスキルが大事になる
- Platform Engineering は DevOps の体験を浸透させるサービスを提供する Platform Team と捉える
  - KPI として [SPACE](https://queue.acm.org/detail.cfm?id=3454124) などの開発者体験や生産性を重視する
  - X-as-a-Service として使いやすい CI/CD などをデザインするスキルなどが大事になる
- ここまで明確にチームが分けられるのは稀で、多くは SRE/Enabling Team の中に Platform Engineering/Platform Team があるというパターンが多くなる

SRE を Enabling Team と捉えるのはとてもしっくりはきていて、似たようなことは最近読んだ 「[SRE サイトリライアビリティエンジニアリング](https://www.oreilly.co.jp/books/9784873117911/)」にも書いてあった。

次のスライドで解説されている SRE と Platform Engineering のモチベーションの違いもしっくりきた。自分はスクラムでソフトウェア開発していたので、Platform Engineering と同じ向きにモチベーションが向いていそう。

https://speakerdeck.com/jacopen/anatanoxing-wei-haxin-lai-xing-soretomosheng-chan-xing-sretositenokiyarianinao-muminasamanichuan-etaixuan-ze-zhi?slide=43

ただ、世の中の SRE として募集されているポジションは Enabling Team なのか？そうではなくない？という疑問を持つんだけど、SRE チームがたどるフェーズがあることを知った。

https://paper2.hatenablog.com/entry/2022/12/03/151552

つまり、理想は Enabling Team なんだけど、SRE チーム導入の初期の頃はそうはなっていなくて、サービスの運用を自分たちでなんとかする期間があるという感じ。ベンチャーとかだと人が少ないので、enabling っぽくならないのは想像できる。

で、結局自分は今それから今後何エンジニアになりたいの？という話だけど、こんな感じの感触になった。

- 自分は DevOps (開発者体験・生産性の向上) に近いところに熱量がありそう
  - なので Platform Engineering や Platform Team での活動をしていけると良さそうだが、そういうポジションは少なそう
  - メルカリや楽天、外資などのかなり大きな組織でないと Platform Engineering 専任チームはなさそう
  - 社内の Neco チームや SDK 開発チームは Platform Team な気がするけど、似たようなポジションは社外に少なそう
- 比較的需要のある enabling / SRE の役割をこなせると活躍できる場所は広がりそう
  - enabling をまずはできるのが良いのではないかと思い始めた
    - その中で Platform Engineering っぽいこともできていけると良い、基盤整備とか
  - SLO / SLI の運用やインシデント対応の経験はしていけると良さそう
  - GCP or AWS を使った経験が少ないので、そこらへんのスキルもつけれると良さそう
