const express = require('express');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const router = express.Router();
const os = require("os");
const ua = require('universal-analytics');
const firebase = require("firebase");
const moment = require("moment");

let transporter = nodemailer.createTransport( smtpTransport({
    host : process.env.EMAIL_HOST,
    port : 587,
    auth : {
        user : process.env.EMAIL_USER, // メールアドレス
        pass : process.env.EMAIL_PASS // メールアドレスパスワード
    }
}));

let visitor = ua('UA-97242923-1');

// 申し込みメール送信
router.post('/', function (req, res) {
    // 改行コード取得
    var eol = os.EOL;
    var mes = req.body
    console.log(mes);
    let message = {
        from: 'fameal <' + process.env.EMAIL_USER + '>',
        to: mes.email,
        bcc: process.env.EMAIL_USER,
        subject: '【FAMEAL】お申し込みありがとうございます。',
        text:
            `${mes.name}様` + eol + eol +
            `この度は、FAMEALにお申し込みいただきありがとうございます。` + eol +
            `仮申し込みを受け付け致しました。` + eol + eol +
            `予約日時:${mes.date}${mes.time}` + eol + eol +
            `一度お客様についてヒヤリングさせていただぎ、` + eol +
            `当日に備えたいとおもっております。` + eol +
            `担当からご連絡させていただきますので` + eol +
            `少々お待ちください。` + eol + eol +
            `それでは何卒よろしくお願い致します。` + eol + eol +
            `FAMEAL一同` + eol + eol +
            `※本メールの送信元アドレスは、配信専用です。` + eol +
　          `ご返信いただいても対応ができませんので、ご了承ください。` + eol + eol +
            `※本メールは、FAMEALへ仮お申込みをして頂いた方に自動送信しています。` + eol +
            `お心当たりがない場合は、誠に恐れ入りますがメールを破棄して頂きますようお願い致します。`
    };

    // firebaseに保存
    send_apply_firebase(mes);
    res.contentType('application/json');
    transporter.sendMail(message, (error, info) => {
        // ToDo: エラーハンドリング
        if (error) {
            console.log('Error occurred');
            console.log(error);
            transporter.close();
            res.status(500).end();
        } else {
            console.log(info);
            console.log('Message sent successfully!');
            transporter.close();
            res.status(200).end();
        }
    });

    // GA実行
    visitor.event("申し込み", "申し込み").send();
});

function send_apply_firebase (mes) {
    var database = firebase.database();
    database.ref('applies/' + mes.name).push({
      username: mes.name,
      age: mes.age,
      address: mes.address,
      tel: mes.tel,
      email: mes.email,
      date: mes.date,
      time: mes.time,
      created_at: moment().format('YYYYMMMMDo,h:mm:ss a')
    });
}

module.exports = router;
