'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const basicAuth = require('basic-auth-connect');

// 環境変数読み込み
require('dotenv').config();
// express の実態 Application を生成
var app = express();
// basic認証
var username = process.env.BASIC_AUTH_USERNAME;
var password = process.env.BASIC_AUTH_PASSWORD;
if (username && password) {
  app.use(basicAuth(username, password));
}

// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(session({ secret: 'hogefuga', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}));

// テンプレートエンジンを ECT に設定
var ECT = require('ect');
var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

// 静的ファイルは無条件に公開
app.use('/public', express.static('public'));

// ルーティング設定
app.use('/', require('./routes/index.js'));

// サーバーをポート 3000 で起動(Herokuも対応)
app.listen(process.env.PORT || 3000);

// アプリケーション開始ログ
console.log('Server running at http://localhost:3000');
