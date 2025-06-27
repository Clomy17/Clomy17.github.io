# コントリビューションガイドライン
全てHTMLで書いており，数式もMathMLなので，HTML+MathMLで書くことが前提です．markdownなどの軽量マークアップ言語を用いる場合でも，必ずHTMLに変換したもののみのpushをお願いします．
HTMLやMathMLのタグや属性は，[W3C標準(WHATWGのHTML Living Standard)](https://html.spec.whatwg.org/multipage/)に従って丁寧に使ってください（自分も勉強中ですが……）．
グローバル属性[class](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Global_attributes/class)の使い方については，いつかマニュアルを作ります（[style.css](style.css)を見ればわかるとは思いますが...）．
新しい名前のclassを使う前にお声がけください．それが，意味論的な目的を表していることを確認するためです．
特に，&lt;div&gt;の多用やstyle付けのためだけのclassの使用は避けましょう．

## 参考
HTMLについては[MDNのドキュメント](https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Structuring_content)等を参考にしてください．
MathMLについては[MDNのドキュメント](https://developer.mozilla.org/ja/docs/Web/MathML)や過去に書いた[Qiitaの記事](https://qiita.com/Clomy17/items/083aa771a4f7c6eb12d7)を参考にしてください．
ちなみにスニペットなしではとても書けたもんではないので，[Qiitaの記事](https://qiita.com/Clomy17/items/4d389a61a471ca74ec77)などを参考に設定することを強く推奨します（LaTeX等からの変換でもいいですが，不可視の演算子の確認をするとなると二度手間かなと思います）．
