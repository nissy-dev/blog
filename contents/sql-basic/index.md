---
title: "SQLの基礎"
date: "2021-05-29"
description: "一度覚えなおした方が良いと感じて、SQLの基本文法を勉強した時のメモ"
tags: ["note", "sql"]
---

新卒研修では細かな SQL 操作については扱わなかったが、一度覚えなおした方が良いと感じて勉強した時のメモ。

## テーブル単位の操作

- データベースの作成
  - `CREATE DATABASE [データベース名];​`
- テーブル作成
  - `CREATE TABLE [テーブル名] ([テーブル定義]);​`
- テーブルのスキーマ変更
  - `ALTER TABLE [テーブル名] [変更内容];​`
- データの型
  - 数値型：TINYINT、INT、BIGINT など
  - 文字列型：VARCHAR(n) (n 文字の文字列)、TEXT など
  - 日付型：DATE、TIME、DATETIME など
- データの制約
  - `UNSIGNED`：負の値を許容しない
  - `NOT NULL`：NULL を許容しない (基本 DB では NULL は使わないようにする)
  - `PRIMARY KEY`：主キー
  - `FOREIGN KEY (column_name) REFERENCES`：参照先のカラムに存在しない値を入れることができない
  - `UNIQUE KEY (column_name)`：重複した値を登録できない
  - `KEY (column_name)​`：インデックスの追加

## レコード単位の操作

- レコードの取得
  - WHERE
    - 条件にマッチしたレコードを取り出す
    - LIKE：あいまい検索
      - `name LIKE '佐々木';` -> 完全一致
      - `name LIKE '%佐々木%';` -> 部分一致
      - `name LIKE '佐々木%';` -> 前方一致
      - `name LIKE '%佐々木';` -> 後方一致
    - IN：複数の選択肢の中に含まれるかどうか
    - NOT IN：複数の選択肢の中に含まれないかどうか
  - ORDER BY
    - 取り出すレコードのソート
    - `ORDER BY joined_at ASC;​` みたいに使う
    - ASC = 昇順、DESC = 降順
  - LIMIT
    - 取り出すレコードの制限
    - `ORDER BY joined_at ASC LIMIT 2;` みたいに使う
      - 上から順 (joined_at が早い順) に２つ取り出す
  - GROUP BY
    - レコードごとに、カラムが同じものをグループ分けして集計
    - `SELECT [集計方法] FROM [テーブル名] GROUP BY [カラム名];​`
    - **WHERE と GROUP BY の組み合わせは、先に WHERE が評価される**
    - **グルーピングした後のグループを絞り込むには、`HAVING` を使う**
  - INNER JOIN (内部結合)
    - ベースとなるテーブルから、条件にマッチするレコードがないものは削除される
  - OUTER JOIN (外部結合)
    - LEFT OUTER JOIN
      - JOIN 先のテーブルを軸に結合する
    - RIGHT OUTER JOIN
      - JOIN 元のテーブルを軸に結合する
- レコードの追加
  - `INSERT INTO [テーブル名] ([カラム名のリスト])​ VALUES ([登録する値]);`
- レコードの更新
  - `UPDATE [テーブル名]​ SET [更新するカラム名] = [更新する値]​ WHERE [条件];`
- レコードの削除
  - `DELETE FROM [テーブル名] WHERE [条件];​`

## クエリ例

```sql
# テーブル生成
CREATE TABLE employee (​
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,​
    name VARCHAR(10) NOT NULL,​
    joined_at DATE NOT NULL​
);

# スキーマ変更
# カラムの追加をするクエリ
ALTER TABLE belong_to ADD test_column VARCHAR(100);

# having の例
SELECT organization_id, COUNT(*) AS num​ FROM belong_to
GROUP BY organization_id​
HAVING num >= 2;

# クエリでとってきた値を使いながら、SQL を構築することも可能 (かっこの部分をサブクエリと呼ぶ)
# 最大値を除いた平均値を取得するクエリ
SELECT AVG(result) FROM grade​
WHERE result != (SELECT MAX(result) FROM grade);
```

## 参考資料

- [データベース (新人研修資料)](https://speakerdeck.com/cybozuinsideout/2018-11-database)
