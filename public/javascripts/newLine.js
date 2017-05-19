$(function() {
  // 置換の対象とするclass属性。
  var $elem = $('#newLine');

  // 切り替えウィンドウサイズ。
  var replaceWidth = 1007;

  function newLine() {
    // ウィンドウサイズを取得する。
    var windowWidth = parseInt($(window).width());

    // ページ内にあるすべての`.js-image-switch`に適応される。
    $elem.each(function() {
      var $this = $(this);
      // ウィンドウサイズが1007px以上であれば改行を削除。
      if(windowWidth >= replaceWidth) {
        $this.html(' <p>"一緒"に作り、食事を楽しみませんか</p>');

      // ウィンドウサイズが1007px以下であれば改行を追加。
      } else {
        $this.html(' <p>"一緒"に作り、<br>食事を楽しみませんか</p>');
      }
    });
  }
  newLine();

  // 動的なリサイズは操作後0.2秒経ってから処理を実行する。
  var resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      newLine();
    }, 200);
  });
});
