$(function () {
    var $body = $('body');

    //開閉用ボタンをクリックでクラスの切替え
    $('#menuBtn').on('click', function () {
        $body.toggleClass('open');
    	$(this).toggleClass('active');
        return false;
    });

    //メニュー名以外の部分をクリックで閉じる
    $('#js__nav').on('click', function () {
        $body.removeClass('open');
        $('#menuBtn').removeClass('active');
    });
});
