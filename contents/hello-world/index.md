---
title: JS のコードが実行されるまで
date: "2015-05-01"
description: "JS のコードが実行されるまで"
tags: ["blog"]
---

大きく分けて以下の 3 つのステップ経て、コードは実行される。

1. ソースコードを `AST` へパース
2. `AST` を `bytecode` へ変換
3. `bytecode` をランタイムが解釈

## 1. ソースコードを AST へパース

テキスト(文字列)であるソースコードを、 `AST` と呼ばれる構造化されたデータに変換する過程が最初のステップ。

> テキストは、コンパイラとよばれるプログラムによって `parse` = 品詞分解され、`abstract syntax tree` ( `AST` )に変換される

V8 では全てのコードを一度にパースするとかなり時間がかかることから、遅延パースの仕組みが実装されている。

## 2. AST を bytecode へ変換

ランタイムがコードを実行できるように、 コンパイラによって `AST` を `bytecode` に変換する過程が次のステップになる。
(V8 の紹介で「JS エンジン」という言葉よく聞くが、エンジン ＝ コンパイラ + ランタイムである。)

### bytecode とは?

- 仮想マシンのために最適化された中間言語のこと
  - バイナリなどの機械語ではないことに注意
- 現在の JS エンジンの多くは、`AST` から `bytecode` を生成する
  - V8 では `AST` を深さ優先で探索しながら変換を行う

## 3. bytecode をランタイムが解釈

生成した `bytecode` を実行エンジン(インタプリタやランタイムなど)が解釈して実行する。
現在の JS エンジンの多くは、それぞれ独自のパイプラインによって `bytecode` を実行させる。

一般的な JS エンジンの実行パイプライン : `bytecode` -> `baseline JIT` -> `optimized JIT`

`baseline JIT` ： 最適化がされていない機械語  
`optimized JIT` : 最適化がされた機械語

JIT = Just In Time であり、多くの JS エンジンは実行時に最適化を行うことで実行速度を改善している。

### アセンブラとは?

- アセンブリ言語を CPU が理解できる機械語の形に変換するプログラムのこと
- アセンブリ言語は、機械語と 1 対 1 の関係にある点が特徴

> アセンブリ言語とは、コンピュータ、マイクロコントローラ、その他のプログラム可能な機器を動作させるための機械語を人間にわかりやすい形で記述する、代表的な低水準言語である

引用：Wikipedia

## 2019 年に登場した JS エンジンについて

2019 年は、`hermes` と `quickjs` という 2 つの JS エンジンが公開された。

### hermes

- Facebook が React Native の高速化用に実装したエンジン
- TTI (Time To Interact)、メモリ消費の改善が売り
- AOT で `bytecode` に変換
- ES6 以降の機能はサポートされていないものがほとんど
  - ES6 がトランスパイルされるのを前提に書かれている

#### AOT (A head-Of-Time) とは?

実行時に最適化を行いながらコンパイルする JIT とは異なり、ビルド時 (実行時前) にコンパイルを実行する。
これによって、TTI の改善が可能になっている。(ちなみに V8 も JIT-less モードを持っている。)

### quickjs

- 個人で開発されている JS エンジン (全て C で書かれている)
- 実行サイズがかなり小さい
- パースしながら `bytecode` を直接出力する
- AST を経由しない
- ES2019 はほぼ完全にサポート

## 参考文献

- [How javascript works?](https://speakerdeck.com/brn/how-javascript-works)
- [Source to Binary - journey of V8 javascript engine](https://speakerdeck.com/brn/source-to-binary-journey-of-v8-javascript-engine)
- [2019 Javascript engine 俯瞰](http://abcdef.gets.b6n.ch/entry/2019/12/11/121840)
