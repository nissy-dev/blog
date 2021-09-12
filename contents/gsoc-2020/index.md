---
title: "Google Summer of Code (GSoC) 2020 参加記"
date: "2020-09-18"
description: "Google Summer of Code (GSoC) 2020 参加記"
tags: ["blog", "gsoc"]
---

去年は参加できなかった GSoC に今年も引き続き応募したところ、[Open Chemistry](https://summerofcode.withgoogle.com/organizations/5518948855971840/)に所属する[DeepChem](https://github.com/deepchem/deepchem)という OSS に参加することができました。

自分自身の振り返りと今後参加する人のために、約 3 ヶ月間の流れをブログに残しておこうと思います。

## バックグラウンド

機械学習を化学分野へ応用する研究を行っている修士 2 年です。学部時代の 4 年間も化学系の学部に所属していて、プログラミングは独学とバイトでの Web 開発経験で身につけました。

ここで言いたいのは、**GSoC に参加しているプロジェクトは Open Astronomy, Open Robotics, Open Bioinformatics などなど本当に多様なので、非情報系出身の人でも自分の専攻にマッチする組織があれば参加するチャンスが大いにあるということです。** 複数人開発や OSS に興味がある人には、特におすすめです。

## 参加したプロジェクト

今回は、DeepChem と呼ばれる OSS に参加しました。DeepChem は、創薬や材料科学に特化した深層学習ライブラリです。分野の性質上、プログラミングに不慣れな人達でも使いやすいような高レベル API を提供しているのが特徴です。

[deepchem / deepchem: Democratizing Deep-Learning for Drug Discovery, Quantum Chemistry, Materials Science and Biology](https://github.com/deepchem/deepchem)

DeepChem 自体は、応募当初は開発があまり頻繁でなかったり、多くのコードがレガシー(2~3 年前から更新されていない)かつ可読性が低いなどの問題を抱えている印象でした。一方で、研究での取り込みと OSS の内容が一致していることもあって、応募することに決めました。

## 取り組んだこと

主に、以下の 5 点に取り組みました。

- 化学分野を対象とした JAX [1] (footnote を参照) による深層学習ライブラリの構築
- 無機結晶データに関する深層学習モデルの実装
- PyTorch ベースの GNN ライブラリ [2] (footnote を参照) を使ったサンプルモデルの実装 (WIP)
- ドキュメントの更新
- CI や CD の更新

作ったライブラリ  
[deepchem / jaxchem: JAXChem is a JAX-based deep learning library for complex and versatile chemical modeling](https://github.com/deepchem/jaxchem)

DeepChem への PR  
[https://github.com/deepchem/deepchem/pulls/nd-02110114](https://github.com/deepchem/deepchem/pulls/nd-02110114)

GSoC 応募時の Proposal では、Google が開発している自動微分ライブラリの JAX でのモデリングを DeepChem でも可能にする活動をする予定でした。(GSoC 応募時は、TensorFlow でのモデリングしかサポートしていませんでした。) **しかし、JAX での実装はいくつかの課題があり、結局は PyTorch 周りのサポートをコアメンバーと進めていくことにしました。なので、Proposal の通りに実装していたのは最初の 1 ヶ月間のみで、残りの 2 ヶ月間は自分なりに見つけた課題についてコアメンバー協力しつつ実装していく感じとなりました。** また、PyPI パッケージや Docker イメージの配布などがあまり自動化されていなかったので、それらの修正も行っていました。

細かい内容については、以下の投稿から確認できます。

[Summary of 2020 GSoC](https://forum.deepchem.io/t/summary-of-2020-gsoc/249)

## 時系列での振り返り

時系列でどんなことをやっていたのか振り返って行きます。

### 〜GSoC 応募まで (2~3 月)

去年の反省を踏まえて、今年は 2 月末くらいから GSoC のタスクリスト [3] (footnote を参照)を眺め始めました。そして、締め切り 1 週間前には Proposal は書き終えて、OSS のメンテナーにレビューをしてもらいました。自分が参加した Open Chsmistry は、Proposal の内容について細かく指示してくれていたので、執筆についてはほとんど困りませんでした。他のプロジェクトでも役立つことがあるかもしれないので、Proposal のガイドラインのリンクをおいて置きます。

[Applying to GSoC - wiki.openchemistry.org](https://wiki.openchemistry.org/Applying_to_GSoC)

また、今年はメンテナーがどのタスクに一番興味をもっているのかを確認することを心掛けました。PR を送るなどの技術的なコミュニケーションによってメンテナーとの信頼関係を気づくのも大事ですが、メンテナーがどの課題に一番関心があるのか、需要と供給が一致しているのか、この点についても意識しました。

### GSoC 応募後〜採択発表 (4 月〜5 月初旬)

修論の中間発表の準備が忙しく、特に活動はしませんでした。 一方で、PR を送るなどしたほうが採択される可能性は高まると思います。

### 採択発表〜GSoC 開始 (5 月初旬〜5 月末)

採択がされたら、Proposal のレビューを行ってくれたメンテナーが当日中に早速チャット [4] (footnote を参照) をしてくれて、今後のメンターとなる旨を伝えてくれました。そして、1 週間後には 1 時間程度のテレビ会議をして、お互いの自己紹介と今後の方針について軽く決めました。このとき、自分の英語力不足もあってチャットも適宜使用しながらのコミュニケーションとなってしまいましたが、メンターがとても優しく丁寧に議論を進めてくれたので、英語でのコミュニケーションの精神的な不安がかなり取り除かれました。

その他にやったこととしては、以下の通りです。

- 週一回で行っているテレビ会議に参加
- DeepChem のコードリーディング

この時期は、修論の中間発表もあって作業はほとんどしていなかったです。

### 1st Evaluation 期間 (6 月)

メンテナへの初めの印象が大事だと感じていたので、この期間はかなり GSoC に時間を割いていました。週に 30 時間くらいは GSoC 関連のことをしていたと思います。(この期間は研究の進捗が無でした。。。)取り組むことも、ほとんど Proposal 通りだったので、ひたすら実装してレビューしてもらってという感じでした。0 → 1 の作業だったので、CI や Linter のセットアップも自分の使い慣れたものを採用できたりして、かなりやりやすかったです。

メンターとのコミュニケーションは、予め指示されていたチャットベースでの日報と他のメンテナーを交えた週 1 のテレビ会議でした。この時期の作業内容はかなり決まっていたので、あまり複雑な議論もなくそこまで苦労はしませんでした。

そして、あっと言う間に 1st Evaluation がやってきて、無事通過しました。Evaluation は、選択式と記述式の質問に答える形式です。ほとんどの質問が選択式かつアンケートのようなものなので、1 時間もかからず終えることができました。**GSoC に参加する人は、締め切りとメンターとのコミュニケーションを忘れさえしなければ、Evaluation の心配はほとんどしなくても良いと思います。**

ちなみに、**GSoC の作業時間は週 30 時間が目安となっているようですが、プロジェクトやメンターによってかなり変わるようです。** GSoC2020 の Discord では、週 1 で 10 時間程度作業している人から週 6 で 40 時間以上作業している人までいました。自分の場合は、メンターはそこまで稼働時間は気にしていないようで、報告とアウトプットさえすればかなり自由に稼働してよい感じでした。

### 2nd Evaluation 期間 (7 月)

この期間は、Proposal の段階では気づけていなかった実装上の問題点の共有と Proposal からの方針転換の議論をメインで行っていました。自分の場合は、英語での口頭議論が難しかったので、なるべく GitHub の Issue 上で議論しました。また、1st Evaluation の期間で DeepChem にもコミットしていたところ、いくつかの PR のレビューも頼まれるようになりました。7 月末は授業の期末レポートもいくつか提出する必要があり、コードはそこまで書いていなかったように思います。稼働時間も、週 15 時間くらいになっていたと思います。

そして、あまり稼働しないまま 2nd Evaluation を迎えましたが、無事通過しました。Evaluation は、1st Evaluation より簡素なものになっていて 5 分ほどで終わった気がします。

一方で、6 月中にはあまり感じていなかったのですが、**この頃から週１のビデオ会議の時差が少し負担に感じることもありました。** ビデオ会議は参加者の都合上で土曜日の朝 7 時から始まるのですが、土日の普段の生活リズムが崩れ自由な時間をうまく確保できなかったのことが良くなかったように思います。

### Final Evaluation 期間 (8 月)

この期間は、2nd Evaluation 期間で決まった PyTorch や無機結晶データに関する実装をメインで行っていました。今まで使用経験の無いライブラリなどを使った実装を行う必要があったので、週 25 時間くらい稼働していたと思います。また、この頃になると DeepChem のコードについてはある程度理解していたので、PR や Issue 上において新規機能の API 設計などの議論に参加したり、ユーザーからの Issue にもなるべくコメントするようになりました。

そして、Final Evaluation を迎えましたが、無事通過しました。最後の Evaluation は、選択式と記述式の質問と自分の作業をまとめたリンク(ブログ、PR、リポジトリなど)を提出する必要がありました。 **3 ヶ月間の作業を英語でまとめるのはなかなか大変だったので、これから参加する人には Evaluation ごとに作業をまとめておくことをおすすめします。**

## 感想

全体を通してとても良い経験だったと思います。 今まで 1 つの OSS にここまで集中して参加した経験はなかったので、OSS のメンテナーの視点や考えをより深くでき実感できたのが良かったです。ただ、今年は報酬以外のアイテム [5] (footnote を参照)をもらえなかったのは残念でした。以下、特に印象に残った点についてまとめます。

### レビュー経験

いくつかの PR をレビューする経験をして、身を持ってコードレビューの大変さを実感しました。特に、以下の記事に書いてある「diff として見えていない問題の指摘」は、あまり意識してなかったことなので勉強になりました。あとは、自分は割とリーダビリティが気になる傾向があったので、そのような指摘はなるべく Linter にやらせてロジックやテストのレビューをもっと緻密に行うことを意識するようになりました。

[コードレビューの際に気をつけること - Qiita](https://qiita.com/awakia/items/8344ba751426e386e0f5)

### 研究者とのつながり

GSoC が終わったあと、メンターが修論の内容を気にかけてくれて、自分の研究に近い研究者を紹介してくれました。その人とは、メンターが仲介人となって共同研究の話が進もうとしています。また、「英語論文を書く際は気軽に相談して！」と言ってくれたのも嬉しかったです。

### 英語力の不足

OSS に深くコミットすればするほど、英語をもっとに自由自在に扱える必要があるなと感じました。今回の GSoC ではテキストベースのコミュニケーションを主に行いましたが、日本語だと数分で記述できる内容が英語だとその何倍もの時間がかかることもあり、実装の時間が削られる焦燥感から自分自身を責めることも何度かありました。今後も OSS 活動を積極的にしていきたいと思っているので、9 月からはもう一度英語を学び直し始めました。DeepL も GSoC 中は非常にお世話になりましたが、英語に対する瞬発力がかなり衰えている実感があるので、しばらくはできるだけ使わないようにしていきたいです。

### 研究者がオーナーの OSS

DeepChem は、ある論文のためのライブラリとして開発されたので、リポジトリのオーナーは研究者でした。先日の IIBMP2020 というバイオインフォマティクスの学会での議論でたまたま見かけたのですが、研究者が行う開発は研究と同様の感覚で進めてしまうことで、以下のようなことが起きる傾向にあるようです。

- リリース日が何度も変更される
- ある機能が完了しないまま、新たな機能開発の話を始める
- 仕様策定が大雑把

これは、研究が新規性を追求する側面が強いので、今まで開発していたものを維持するより新しい検証を行うことのほうが重要視されるためです。今回の GSoC 期間における DeepChem でも、最初の 2 点は頻繁におきていました。今まで Web 開発に関する OSS ばかりを見てきた自分は、驚かされたと同時に自分は開発のほうが好きな人間なのかなと思ったりしました。

---

1. TensorFlow や PyTorch に次いで注目されている自動微分ライブラリ。[https://github.com/google/jax](https://github.com/google/jax)

2. 化学分野では、分子構造や結晶構造をグラフに変換して物性を予測する Graph Neural Network (GNN) と呼ばれる手法が人気です。このような GNN のモデルを構築する際は、[Deep Graph Library](https://www.dgl.ai/)や[PyTorch Geometric](https://pytorch-geometric.readthedocs.io/en/latest/)を利用するのが一般的です。

3. Open Chsmistry の場合は、取り組んでほしいタスクを OSS 側がいくつか挙げていて、参加者はそれらの 1 つを選んで Proposal を書くのが一般的です。

4. メンテナーとのやり取りは、Gitter と Google Meet を使っていました。

5. 今年の報酬は$5400 でした。一昨年は、T シャツの他にもサンフランシスコの Google のオフィスを見学する権利などももらえたそうです。[https://n-yoshikawa.hatenablog.com/entry/2018/08/25/175142](https://n-yoshikawa.hatenablog.com/entry/2018/08/25/175142)