---
title: "URL遷移やsession historyに関する挙動の整理"
date: "2021-07-17"
description: "URLの遷移の挙動に地味にハマった時のメモ"
tags: ["note"]
---

URL 遷移の挙動に地味にハマった時に調べた時のメモ

## session history / document の挙動の注意点

- 異なる URL に遷移する場合
  - session history
    - 新規に作成される
  - document
    - 新規に作成される
- 同じ URL に遷移する場合
  - session history
    - 現在の履歴を消して、新規に作成される
    - `location.state` や `history.scrollRestoration` は引き継がれる
      - この点に関しては、妥当かどうかの議論が issue 上でされている
  - document
    - URL Fragment を含まない場合 -> 新規に作成される
    - **URL Fragment を含む場合 -> 新規に作成されない**
      - hash change navigation と認識されるため

## History API

- `history.pushState`
  - session history を新しく追加する
  - document は新規に作成されないので、url だけが変わる感じになる
- `history.replaceState`
  - session history を置き換える
  - document は新規に作成されないので、url だけが変わる感じになる

## Location API

- `location.reload`
  - 現在の URL に再度遷移する
  - 同じ URL での移動なので、session history は置き換えになる
- `location.assign`
  - 任意の URL に遷移する
  - session history は、新しく追加される
    - 同じ URL 間の遷移でも追加される
- `location.replace`
  - 任意の URL に遷移する
  - session history は置き換える
    - 異なる URL 間の遷移でも 新しく追加されない
- `location.href = "https://xxxx.com"`
  - 任意の URL に遷移する
  - session history は、先述の仕様にしたがって対応が決まる

## 参考資料

- [Should navigating to the current URL preserve history.state?](https://github.com/whatwg/html/issues/6213#issuecomment-804615520)
- [Navigating to same url - replace or add?](https://github.com/whatwg/html/issues/6682)
- [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- [Location API](https://developer.mozilla.org/en-US/docs/Web/API/Location)
