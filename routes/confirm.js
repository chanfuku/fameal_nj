const express = require('express');
const router = express.Router();

// 確認画面へ
router.post('/confirm', function (req, res) {
    // sessionに入れる
    var sess = req.session
    sess.body = {message: req.body}
    // validation
    req.assert('word1', 'word1を入力してください').notEmpty();
    req.assert('word2', 'word2は数字で入力してください').isInt();
    var errors = req.validationErrors();
    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            console.log('validation error');
            res.render('index', { message: req.body, errors: result.array() });
        } else {
            res.render('confirm', { message: req.body });
        }
    });
});
