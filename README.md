# share_chrome_to_Fedibird
A private Chrome extension for sharing web pages on Fedibird.
<p></p>
Chromeで閲覧しているwebページをFedibirdにシェアするための機能拡張です。個々にカスタマイズしたいだろうと思うので、ウェブストアに登録せず私家版にします。 fedibird-url-share-with-hashtags.js を改造すればFedibird以外のSNSにも対応でき、ハッシュタグや書式も自由にできると思います。
<p></p>
元々のJavaScriptは「ひこ」さん https://fedibird.com/@hiko_p が作成された次のブックマークレットです：<br />
閲覧中のWebページをmastodonに共有するためのブックマークレット。デフォルト付与するハッシュタグを決めておいたり、タイトルに含まれるハッシュタグなんかもカバーします。<br />
https://gist.github.com/hiko-p/6aab32b10807bdd742808ff6f5d416f0
<p></p>
これを私が使いやすいように改造したのですが、さらに機能拡張としてボタン1発で動かしたくなって、本作になりました。
<p></p>
開発方法およびインストールの仕方は、下記のFeloAI回答を参考にしました（参考になさって下さい）：<br />
Chromeでブックマークレットを拡張機能のようなボタンにする方法はありますか。マニフェストバージョンは3でお願いします。<br />
https://felo.ai/search/kMhT9dXTvVmwskNYr6VYVN?invite=v4nD838dGej9G
<p></p>
アップデート情報：<br />
release 1.1<br />
1. タブとスペースが混在していたのを、スペースに統一しました。<br />
2. タグをいくつか追加しました。<br />
3. マニフェストのバージョン表記を合わせました。<br />
<br />
release 2.0<br />
1. URLのクエリを投稿前に除去するようにしました。<br />
2. タグをいくつか追加し、注釈をコメントしました。<br />
3. マニフェストのバージョン表記を合わせました。<br />
<p></p>
release 3.0<br />
1. ハッシュタグをボタン状に配置して見せる hashtag-bar に対応しました。但し、使えるサーバーは限定されます（2025/08/31現在、 mastodon.social と mastodon-japan.net は対応、 fedibird.com は非対応）。書式例は test_of_hashtag-bar.png をご覧ください。<br />
2. タグをいくつか追加し、注釈をコメントしました。<br />
3. マニフェストのバージョン表記を合わせました。<br />
<p></p>
