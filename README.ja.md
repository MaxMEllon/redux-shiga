# redux-shiga

*redux-sagaへのアンチテーゼとしての，非同期処理・副作用を解決するためのもう一つの手段*

<div align="center">
  <img src="./.github/logo.png" alt="logo">
</div>


なぜ [redux-saga](https://github.com/redux-saga/redux-saga) ではないのか
---

redux-sagaは，**effect model** を用いて，データ通信などの非同期処理，ブラウザキャッシュへのアクセスのようなピュアではない処理）をより簡単で優れたものにするためのライブラリです．

思想としては，それぞれの副作用を個別で実行する独立したスレッドのようなものが目指されています．
その手段として，[**Generator**](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Generator) が用いられています

### effect をユーザーが自由に追加できない

- WIP

### Generator は，iterable(反復可能)なプロトコルであり，**非同期処理だけ**のためのものではない．

- WIP

### Promiseを気軽にcallできない

- WIP

### なぜshiga(滋賀)？

日本に，saga(佐賀)という場所があり，似た発音でshiga(滋賀)という場所があるから．

そうこれはジョークです．
- saga(sägə): [Saga,_Saga](https://en.wikipedia.org/wiki/Saga,_Saga)
- shiga(SHēgə): [Kōka,_Shiga](https://en.wikipedia.org/wiki/Kōka,_Shiga)

日本には，この発音をテーマにした，次のようなコメディがあります．[youtube](https://www.youtube.com/watch?v=4mdsFIFlvNQ)

使い方
---

- WIP

### 使い方 (redux-actionと併用)

- WIP

導入方法
---

- WIP
