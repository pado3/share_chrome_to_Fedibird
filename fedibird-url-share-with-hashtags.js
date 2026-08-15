javascript: (function () {
    let title = document.title;
    let url = document.URL; // 現在のページのURL,クエリ除去処理を入れたのでletで宣言
    const hashtagsearch = /\s*#\S+/g;
    const hashsearch = /#/g;

    /*
     * 投稿先サーバFQDN
     * 利用されているサーバに合わせて書き換えてください
     */
    const servername = 'fedibird.com';

    /*
     * デフォルト公開範囲 public/unlisted/private/direct
     * 投稿フォーム画面を開いた後にも変更可能です
     */
    const visibility = 'public';

    /* サーバタグ （デフォルト付与） */
    const servertag = '#fedibird ';

    /* カテゴリタグ（以下をデフォルト値とする） */
    // let categorytag = '#nowreading';
    let categorytag = '';

    /* サーバーURLがx.comだった場合は、twitter.comに置換する */
    if (url.includes('x.com')) {
        url = url.replace('x.com', 'twitter.com');
    }

    /* 以下のURLとハッシュタグのマッピングに従ってカテゴリタグを上書き */
    const taglist = {
        /* テンプレ
        '':'#'
        '':'#',
        '':'#',
        */
        'biwako-otsu.keizai.biz':'#滋賀県', // びわ湖大津経済新聞
        'svns.com':'#JapanRugby',   // サクラセブンズ
        'world.rugby/pacific-nations-cup/':'#PNC2025 #JapanRugby',  // PNC20xx
        'rugbyworldcup.com/2027/':'#RWC2027 #JapanRugby',   // RWC2027
        'rugby-japan.jp':'#JapanRugby #リーグワン #LeagueOne', // 日本ラグビー協会
        'league-one.jp':'#リーグワン #LeagueOne',        // リーグワン
        'kobesteelers.com':'#リーグワン #LeagueOne',     // 神戸S
        'rugby-rp.com':'#JapanRugby #リーグワン #LeagueOne',   // ラグビーリパブリック
        'news.jsports.co.jp/rugby':'#JapanRugby #リーグワン #LeagueOne',   // J SPORTS ラグビー
        'news.jsports.co.jp/column/rugby':'#JapanRugby #リーグワン #LeagueOne',    // J SPORTS ラグビーコラム
        'justrugby.jp':'#JapanRugby #リーグワン #LeagueOne', // ジャストラグビー
        'tobooks':'#本好きの下剋上',    // TOBOOKS、本好きの下剋上以外の作品に注意
        'booklove-anime.jp':'#本好きの下剋上', // 本好きの下剋上アニメ公式
        'ncode.syosetu.com/n4750dy':'#本好きの下剋上',  // なろう ハンネローレ
        'ncode.syosetu.com/n7835cj':'#本好きの下剋上',  // なろう 本好きのSS
        'mypage.syosetu.com/mypageblog/list/userid/372556':'#本好きの下剋上',   // 香月美夜先生活動報告（割烹）
        'mypage.syosetu.com/mypageblog/view/userid/372556':'#本好きの下剋上',   // 香月美夜先生活動報告（割烹）
        'mypage.syosetu.com/372556':' #本好きの下剋上',     // 香月美夜先生トップ
        'tbsradio.jp':'#ss954', // 荻上チキ・ Session
        'jaxa.jp':'#JAXA',  // JAXA
        'jma.go.jp':'#気象庁', // 気象庁
        'seiga.nicovideo.jp':'#ニコニコ漫画',   // ニコニコ静画=ニコニコ漫画
        'nicovideo.jp':'#nowwatching',  // ニコニコ動画
        'live.nicovideo.jp':'#nowwatching',   // ニコニコ生放送
        'youtube.com':'#nowwatching',   // YouTube
        'music.youtube.com':'#nowplaying'   // YouTube Music
    };
    for (key in taglist){
        if (url.includes(key)){
            categorytag = taglist[key] + ' ';   // デフォルトを空にした影響でスペースの入れどころを変更した
            break;
        }
    }

    /* タグ文字列 */
    let tags = categorytag + servertag;

    /* タイトルに含まれるハッシュタグをタグ文字列に加える（hashtag-barに乗る形で編集） */
    if (title.match(hashtagsearch))
        tags = tags + ' ' + title.match(hashtagsearch).join('','').replace(',','').trim();

    /* タイトルのハッシュを置換してハッシュタグリンク化を回避 */
    title = title.replace(hashsearch,'(シャープ)');

    /* URLにクエリがある場合の処理 */
    /* テキストフラグメントも維持しようと考えたが、JavascriptでURLから取得できないのでボツ */
    /* クエリを取り除かないURL（YouTube, Radiko, リーグワン, rugbypass.com, Bリーグ, NDL, BBCニュース, Google play） */
    const keepquerylist = [
        'youtube.com',
        'youtu.be',
        'radiko.jp',
        'league-one.jp',
        'rugbypass.com',
        'www.bleague.jp',
        'ndl.go.jp',
        'bbc-tv.co.jp',
        'play.google.com'
    ];
    /* クエリにヒットする正規表現 */
    let urlsearch = /\?.*$/;
    for (const key of keepquerylist) {
        if (url.includes(key)) {
            /* 最初のクエリをスルーし、2つ目以後のクエリにヒットする正規表現（メモ用に残す） */
            /* urlsearch = /\&.*$/; */
            urlsearch = ""; // クエリを取り除かない（YouTubeの開始時間などが消えるとマズイ）
        }
    }
    /* URLのクエリを取り除く */
    if (url.match(urlsearch)) {
        url = url.replace(urlsearch, '');
    }

    /* 本文 自分好みの書式にする。r3.0でhashtag-barに対応 */
    /* _スラッシュ改行・タイトル・ハイフォン・URL・改行x2・タグ */
    const text = ' /\n' + title + ' - ' + url + '\n\n' + tags;

    /* 投稿フォーム画面を開く（ポップアップ） 自分限定投稿のために、高さを500→610に変更 */
    window.open(`https://${servername}/share?visibility=${visibility}&text=${encodeURIComponent(text)}`,
                '_blank','width=400,height=610,left=100,top=100');
})();
