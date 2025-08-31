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
    const servertag = '#fedibird';

    /* カテゴリタグ（以下をデフォルト値とする） */
    // let categorytag = '#nowreading';
    let categorytag = '';

    /* 以下のURLとハッシュタグのマッピングに従ってカテゴリタグを上書き */
    const taglist = {
        /* テンプレ
        '':'#',
        '':'#',
        '':'#',
        */
        'www.world.rugby/pacific-nations-cup/':'#PNC2025 #JapanRugby',  // PNC20xx
        'www.rugbyworldcup.com/2025/':'#RWC2025 #JapanRugby',   // RWC2025
        'www.rugby-japan.jp':'#JapanRugby', // 日本ラグビー協会
        'league-one.jp':'#リーグワン',        // リーグワン
        'kobesteelers.com':'#リーグワン',     // 神戸S
        'rugby-rp.com':'#JapanRugby #リーグワン',   // ラグビーリパブリック
        'news.jsports.co.jp/rugby':'#JapanRugby #リーグワン',   // J SPORTS ラグビー
        'news.jsports.co.jp/column/rugby':'#JapanRugby #リーグワン',    // J SPORTS ラグビーコラム
        'tobooks':'#本好きの下剋上',    // TOBOOKS、本好きの下剋上以外の作品に注意
        'booklove-anime.jp':'#本好きの下剋上', // 本好きの下剋上アニメ公式
        'ncode.syosetu.com/n4750dy':'#本好きの下剋上',  // なろう ハンネローレ
        'ncode.syosetu.com/n7835cj':'#本好きの下剋上',  // なろう 本好きのSS
        'mypage.syosetu.com/mypageblog/list/userid/372556':'#本好きの下剋上',   // 香月美夜先生活動報告（割烹）
        'mypage.syosetu.com/mypageblog/view/userid/372556':'#本好きの下剋上',   // 香月美夜先生活動報告（割烹）
        'mypage.syosetu.com/372556':' #本好きの下剋上',     // 香月美夜先生トップ
        'www.tbsradio.jp':'#ss954', // 荻上チキ・ Session
        'www.jaxa.jp':'#jaxa',  // JAXA
        'www.jma.go.jp':'#気象庁', // 気象庁
        'www.nicovideo.jp':'#nowwatching',  // ニコニコ動画
        'seiga.nicovideo.jp':'#nowwatching',    // ニコニコ静画
        'live.nicovideo.jp':'#nowwatching',   // ニコニコ生放送
        'www.youtube.com':'#nowwatching',   // YouTube
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
    title = title.replace(hashsearch,'＃');

    /* URLにクエリがある場合の処理 */
    /* 最初のクエリを取り除いてはいけないURL（いまのところYouTubeのみ） */
    const keepquerylist = [
        'www.youtube.com',
        'youtu.be'
    ];
    /* クエリにヒットする正規表現 */
    let urlsearch = /\?.*$/;
    for (const key of keepquerylist) {
        if (url.includes(key)) {
            /* 最初のクエリをスルーし、2つ目以後のクエリにヒットする正規表現 */
            urlsearch = /\&.*$/;
        }
    }
    /* URLのクエリを取り除く */
    if (url.match(urlsearch)) {
        url = url.replace(urlsearch, '');
    }

    /* 本文 自分好みの書式にする。r3.0でhashtag-barに対応 */
    /* _スラッシュ改行・タイトル・ハイフォン・URL・改行x2・タグ */
    const text = ' /\n' + title + ' - ' + url + '\n\n' + tags;

    /* 投稿フォーム画面を開く（ポップアップ） */
    window.open(`https://${servername}/share?visibility=${visibility}&text=${encodeURIComponent(text)}`,
                '_blank','width=400,height=500,left=100,top=100');
})();
