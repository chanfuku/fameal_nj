var gulp = require('gulp');
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    rev  = require('gulp-rev'),
    revReplace = require('gulp-rev-replace');
    watcher = require('gulp-watch');
    htmlreplace = require('gulp-html-replace');

// 変数を定義する
var topDir = '../public/';
var cssFiles = topDir + 'stylesheets/*.css';
var jsFiles = topDir + 'javascripts/*.js';
var targetCssFile = topDir + 'stylesheets/site.min.css';
var targetJsFile = topDir + 'javascripts/site.min.js';
var targetHtml1 = '../views/index.ect';
var targetHtml2 = '../views/confirm.ect';
var jsManifestFile = 'js-rev-manifest.json';
var cssManifestFile = 'css-rev-manifest.json';

// default(angularjsをminifyすると動作しないので一旦cssだけで。追加する場合はjs.replaceを追記すること)
gulp.task('default', ['css.replace']);

// JS圧縮
gulp.task('minify-js', () => {
    return gulp.src(jsFiles)
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
        //.pipe(gulp.dest('js')); 上書きする場合
});

//CSS圧縮
gulp.task('minify-css', () => {
    return gulp.src(cssFiles)
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css/'));
        //.pipe(gulp.dest('css')); 上書きする場合
});

// js結合
gulp.task('js.concat', ['minify-js'], () => {
  return gulp.src('dist/js/*.js')
    .pipe(concat('site.min.js'))
    .pipe(gulp.dest('../public/javascripts/'));
});

// css結合
gulp.task('css.concat', ['minify-css'], () => {
  return gulp.src('dist/css/*.css')
    .pipe(concat('site.min.css'))
    .pipe(gulp.dest('../public/stylesheets/'));
});

// jsファイルにHash付与
gulp.task('js.addHash', ['js.concat'], () => {
  return gulp.src([targetJsFile])
    .pipe(gulp.dest('dist/copy/'))
    .pipe(rev())
    .pipe(gulp.dest('../public/javascripts/'))
    .pipe(rev.manifest(jsManifestFile))
    .pipe(gulp.dest('.'));
});

// cssファイルにHash付与
gulp.task('css.addHash', ['css.concat'], () => {
  return gulp.src([targetCssFile])
    .pipe(gulp.dest('dist/copy/'))
    .pipe(rev())
    .pipe(gulp.dest('../public/stylesheets/'))
    .pipe(rev.manifest(cssManifestFile))
    .pipe(gulp.dest('.'));
});

// ect内のjsファイル名を置換する
gulp.task('js.replace', ['js.addHash'], () => {
  var manifest = gulp.src(jsManifestFile);
  return gulp.src([targetHtml1])
    .pipe(htmlreplace({
        'js': targetJsFile
    }))
    .pipe(gulp.dest('dist/copy/'))
    .pipe(revReplace({manifest: manifest, replaceInExtensions: ['.ect']}))
    .pipe(gulp.dest('../views/'));
});

// ect内のcssファイル名を置換する
gulp.task('css.replace', ['css.addHash'], () => {
  var manifest = gulp.src(cssManifestFile);
  return gulp.src([targetHtml1])
    .pipe(htmlreplace({
        // 'css': '../public/stylesheets/site.min.css'
        'css': targetCssFile
    }))
    .pipe(gulp.dest('dist/copy/'))
    .pipe(revReplace({manifest: manifest, replaceInExtensions: ['.ect']}))
    .pipe(gulp.dest('../views/'));
});

// js,cssが編集されたらdefaultタスクを実行する
gulp.task('watch', () => {
  var watcher = gulp.watch([cssFiles, jsFiles], ['js.concat', 'css.concat'])
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type);
  });
});
