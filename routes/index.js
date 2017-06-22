const express = require('express');
const moment = require("moment");
const router = express.Router();
const firebase = require("firebase");

// 営業日取得
moment.locale('ja', {weekdays: ["日","月","火","水","木","金","土"]});
let targetWeekday = ['土', '日'];
var businessDays = [];
for (var i = 1; i < 90; i++) {
    var date = moment().add(i, 'days');
    var weekday = date.format('dddd');
    if (targetWeekday.indexOf(weekday) > -1) {
        businessDays.push(date.format('MM月DD日dddd曜日'));
    }
}
var businessHours = [];
for (var i = 10; i < 21; i++) {
    businessHours.push(i + '時~');
}

firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    messagingSenderId: process.env.FIREBASE_SENDER_ID
});

// デフォルトルーティング
router.get('/', function (req, res) {
    res.render('index', { dates: businessDays, times: businessHours });
});
router.get('/transactionLaw', function (req, res) {
    res.render('transactionLaw');
});

module.exports = router;
