---
title: "React Hooksについて 個人的感想"
date: "2020-05-06"
description: "React Hooksについて 個人的感想"
tags: ["blog", "react"]
---

最近は、研究の都合上キャッチアップの中心が機械学習の論文がメインになっていました。

- React をやっていると言いながらちゃんと咀嚼してなかった
- 面接等で聞かれることもちょくちょくある

以上の理由から、自分の思考を整理するために感想を書いていきます。

## Hooks を一言で

Hooks は、**Redux より自由にロジックを書くことができる API**として理解しました 。
個人的な印象は**easy よりの jQuery みたいな API**だと捉えています。

## より詳細に

### 嬉しい点

1.  簡単なデータフロー・副作用を実現するための記述量が減る (useState, useReducer, useEffect とか)  
    → ライブラリを導入する必要がなくなり bundle size にも効くと思う
2.  Class method の再利用が簡単になり、型推論が効くようになる  
    → TypeScript の需要が高まっているので嬉しい
3.  Wrapper Hell を防ぐことができる  
    → props 渡しが深くなることが防げる、デバッグがしやすくなる

まとめると、HOC が抱えていた問題点を解消し、ロジック周りの記述が簡潔になったということです。

Redux では**簡単なデータ操作でもアプリケーション全体のデータフローに集約させる方向性(single source of true)がある**一方で、 Hooks では**副作用なども含めたデータの管理を Component 単位に集中させる方向性**を感じました。

single source of true: 一つの state がアプリケーション全体の状態を表現する

### 疑問点

1.  Component とデータフローやロジックがそれなりに密結合する可能性が生まれるのでは...?  
    → useEffect, useReducer, useMemo, useCallback などがその役割を担っている

2.  副作用を注入する useEffect の扱い方が難しい。。。(第二引数の挙動)

まとめると、easy な API によって簡単にデータ操作を Component に行わせることが可能になったけど、**関心の分離が疎かになる可能性が高まったのでは...?**ということです。

## Redux がもたらしていたスケーラビリティ

Redux はよくスケールするから大規模開発に向いていると言われますが、その理由をもう一度考えてみました。

### スケールする理由

個人的には、**データフローが一方方向なことによってそれぞれの責務を明確化できる**という点がスケールに効いていると考えています。

例えば、

1.  platform 依存の処理は middleware に逃す  
    → Usecase の再利用性を高める
2.  Top Level component(Container)でのデータの受け渡しをする  
    → Component の再利用性を高める

以上のような**再利用性の面でのメリット**が出てくると考えています。あとは、**どこに何を書けば良いのかがほとんど決まる**という点も、開発者が入れ替わるような長期プロジェクトでは有効だと思います。

また、2 については Hooks が解決する**props 渡しが辛い問題**を引き起こしますが、

- TS の型推論
- renderProps

これらによって個人的にはそこまで問題として考えていません。renderProps については、Dan さんも効果的に使おうねなんて言っています。

> I think this is one of the biggest misunderstandings about React. It would be great to highlight this pattern more. Note how by making <Nav> and <Body> accept any elements as children, I removed the need to pass the "user" prop down through them. [pic.twitter.com/IlBecFn8Ao](https://t.co/IlBecFn8Ao)
>
> — Dan Abramov (@dan_abramov) [2018 年 7 月 24 日](https://twitter.com/dan_abramov/status/1021850499618955272?ref_src=twsrc%5Etfw)

## まとめ

簡潔な API を使って実装の速度を求めるか、それとも関心を分離して再利用性の高いコードを書いていくかによって hooks の使い方は変わりそうです。

個人的には useEffect の使い方が難しいので、Life cycle method 周りは Class 構文を使いたくなってしまうなあ...という感じです。(早く慣れるべきという話ではありますが...) また Redux のデータフローのデバッグに慣れてしまっているので、hooks を使うにしても redux と併用することがほとんどになるだろうという感じがしています。
