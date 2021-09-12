---
title: "Google Summer of Code(GSoC) 2019に応募して、お祈りされました"
date: "2019-05-13"
description: "Google Summer of Code(GSoC) 2019 に応募して、お祈りされました"
tags: ["blog", "gsoc"]
---

残念ながら採択されなかったのですが、そもそも情報が少なかったので、来年応募する人のためにも自分の応募過程について残しておきます。

## Google Summer of Code

Google が認定した OSS(100 以上はあります)に対して、大学生・大学院生がメンターと一緒に開発する企画です。順当に開発できれば報酬ももらえて、今年は$5400 でした。

詳しくは、以下の公式ページから調べてみると良さそうです。 [https://summerofcode.withgoogle.com/](https://summerofcode.withgoogle.com/)

## 参加方法

1.  開発したい OSS を選ぶ ([https://summerofcode.withgoogle.com/organizations/](https://summerofcode.withgoogle.com/organizations/))
2.  Proposal を書く(Organization の idea list から選ぶのが一般的)
3.  Organization 内での選考の結果、Proposal が採択される

簡単にいえば、**Proposal を書くだけで参加できます。** なので、OSS 開発に興味のある人は、是非 Proposal 出しましょう！！OSS 開発経験ができて、報酬ももらえるなんて夢のようです。

## 応募のきっかけ

hiroppy さんが[ブログ](https://blog.hiroppy.me/entry/open-collective)で軽く紹介していたのをきっかけにして、知った気がします。元々 OSS の開発に興味があって、OSS 開発をしながら生活できるような世界が早く来て欲しいと hiroppy さんの活動を陰ながらに応援したのが、功を奏した感じです。

自分自身も、ドキュメント周りの簡単な contribute が多いですが、[js-primer](https://efcl.info/2018/05/25/js-primer-offline/)、[React Native](https://github.com/facebook/react-native/commits?author=nd-02110114) にはそれなりの contribute 経験があります。

## 応募・結果発表までの流れ

### Organization の選択 (3/18 ~ 3/20)

ブログの投稿が 3/18 だったので、まず自分が開発したいと思う OSS があるかどうか探しました。探したところ、以下の 2 つが候補に上がりました。

- [Webpack](https://summerofcode.withgoogle.com/organizations/6230025286713344/) (React 開発で、それなりの使用経験)
- [Open Chemistry](https://summerofcode.withgoogle.com/organizations/5998658210758656/) (大学での研究分野が化学)

現在やりたいのは IT 技術を用いた化学分野への貢献だったので、**Open Chemistry**へ Proposal を書くことに決めました。

### Project を決定 ＆ メンターへ連絡 (3/21 ~ 3/31)

Organization が決まったので、次に Proposal の準備に移ります。 今回は、なんと偶然にも昨年 Open Chemistry に参加した方のブログがあったので、それを参考にして準備を進めていくことにしました。

この時期にしたこと

- Idea List から取り組みたい課題 (Project)を見つける(自分で提案しても良い)
- メンター候補がいるので、課題の詳細を知りたい旨のメールを送る
- メンターとのやりとりを通じて、課題のイメージを膨らませる

ただ、この時期は卒業関連で予定がかなり埋まっていたので、GSoC にかける時間があまり取れなくて苦労しました。また、[僕が取り組もうとした課題](http://wiki.openchemistry.org/GSoC_Ideas_2019#Project:_OneMol:_Google_Docs_.26_YouTube_for_Molecules)が少し抽象的なものだったのもあって、メンターが期待している成果をイメージするのに時間がかかりました。

### Proposal の作成 (4/1 ~ 4/8)

4/1 は、一日自由な時間が取れたので、そこで Proposal を一気に書きました。Open Chemistry の場合は、[Proposal の書き方](http://wiki.openchemistry.org/Applying_to_GSoC) が丁寧に解説されていて、内容についてはほとんど困りませんでした。また、体裁は昨年参加した人の Proposal を参考にしました。

Proposal を完成版に仕上げるまでにしたこと

- ネイティブの人からの文法チェック
- メンターに下書きを送付して、feedback を受ける＆その修正

ただ、Proposal の下書きを提出 1 週間前に送ったところ、**メンターがちょうど国際学会に出席していて、feedback が 1 回しか受けられませんでした。**

### 参加の手続きを完了 (4/9)

GSoC へ参加登録をして、登録を完了しました。

参加登録に必要なもの

- Proposal ([自分が提出した PDF](https://drive.google.com/file/d/1FbDu1pc0tVsC9YqeLBbst2-G3bC7CxTB/view?usp=sharing))
- 学生であることの証明書 (英訳した学生証など)

### 結果を待つ (4/10 ~ 5/6)

大学から大学院へ進級する際に、研究分野が少し変わったことで研究面が忙しく、特に何もせずに過ごしました。

### 結果発表 (5/8)

お祈りされました。残念。。。

![お祈りメール](/images/posts/rejection-email.png)

## 反省

以下の 3 点が採択されなかった原因と推測しています。

- Proposal でより具体的な実装計画を示すべきだった  
  → Application に取り込む機能の説明をもう少し踏み込む
- 大きな Project に対して、自分の実装力を適切に伝えられなかった  
  → Web Application に関する成果物やポートフォリオを作る
- 開発にする OSS に関する使用経験 or Contribute 経験が全くなかった  
  → 参加登録後も Contribute や OSS へのキャッチアップの努力をする

**GSoC は事前準備がかなり推奨されています**が、今回はそれができていなかったのが大きな問題だったと思います。

## 感想

Open Chemistry への応募の際にかなり参考にさせてもらった & 参加しようと思わせてもらえた yoshikawa さんのブログには圧倒的感謝です。これがなかったら、途中で申請を投げ出していたかもしれません。。。 (ちなみに、今年も採択されていてすごいです！)

また、今回採択されなかった Project に関しては、設計までかなり自分で考えたので、Web Application を 1 から作るいい機会として１ヶ月間の期間を設けて作ってみようと思います。

最後に、来年もまだ学生みたいなので、来年こそは絶対採択を勝ち取りたいと思います。

## 参考にしたサイト

- [Google Summer of Code 2018 参加記 (1) 応募編](https://n-yoshikawa.hatenablog.com/entry/2018/04/26/015549)
- [What is Google Summer of Code?](https://google.github.io/gsocguides/student/)
