const express = require('express');
const moment = require("moment");
const router = express.Router();

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
for (var i = 1; i < 25; i++) {
    businessHours.push(i + '時~');
}

// デフォルトルーティング
router.get('/', function (req, res) {
    res.render('index', { dates: businessDays, times: businessHours });
});

module.exports = router;
