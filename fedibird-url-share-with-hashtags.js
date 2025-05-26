javascript: (function () {
    let title = document.title;
    const url = document.URL;
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
    let categorytag = '#nowreading';

    /* 以下のURLとハッシュタグのマッピングに従ってカテゴリタグを上書き */
    const taglist = {
        /* テンプレ
        '':'#',
        '':'#',
        '':'#',
        */
        'www.rugby-japan.jp':'#JapanRugby',
        'league-one.jp':'#リーグワン',
        'rugby-rp.com':'#JapanRugby #リーグワン',
        'news.jsports.co.jp/column/rugby':'#JapanRugby #リーグワン',
        'tobooks':'#本好きの下剋上',
        'ncode.syosetu.com/n4750dy':'#本好きの下剋上',
        'ncode.syosetu.com/n7835cj':'#本好きの下剋上',
        'mypage.syosetu.com/372556/':' #本好きの下剋上',
        'www.tbsradio.jp':'#ss954',
        'www.jaxa.jp':'#jaxa',
        'www.nicovideo.jp':'#nowwatching',
        'seiga.nicovideo.jp':'#nowwatching',
        'live.nicovideo.jp':'#nowwatching',
        'www.youtube.com':'#nowwatching',
        'music.youtube.com':'#nowplaying'
    };
    for (key in taglist){
        if (url.includes(key)){
            categorytag = taglist[key];
            break;
        }
    }

    /* タグ文字列 */
    let tags = categorytag + ' ' + servertag;

    /* タイトルに含まれるハッシュタグをタグ文字列に加える（hashtag-barに乗る形で編集） */
    if (title.match(hashtagsearch))
        tags = tags + ' ' + title.match(hashtagsearch).join('','').replace(',','').trim();

    /* タイトルのハッシュを置換してハッシュタグリンク化を回避 */
    title = title.replace(hashsearch,'＃');

    /* 本文 タグ文字列はhashtag-barに乗せるため、手前に空行を挟む */
    const text = ' ' + tags + ' /\n' + title + ' - ' + url;

    /* 投稿フォーム画面を開く（ポップアップ） */
    window.open(`https://${servername}/share?visibility=${visibility}&text=${encodeURIComponent(text)}`,'_blank','width=400,height=500');
})();
