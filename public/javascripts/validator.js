function check_name(data, error) {
    if(data == "" || data === undefined){
        error.push("名前が未入力です");
    }
    return error;
}

function check_age(data, error) {
    if (data == "" || data === undefined) {
        error.push("年齢が未入力です");
    }
    return error;
}

function check_address(data, error) {
    if (data == "" || data === undefined) {
        error.push("住所が未入力です");
    }
    return error;
}

function check_tel(data, error) {
    if (data == "" || data === undefined){
        error.push("電話番号が未入力です");
    }
    return error;
}

function check_email(data, error) {
    if (data == "" || data === undefined){
        error.push("メールアドレスが未入力です");
    }
    return error;
}

function check_date(data, error) {
    if (data == "" || data === undefined){
        error.push("希望日時が未入力です");
    }
    return error;
}

function check_time(data, error) {
    if (data == "" || data === undefined){
        error.push("時間が未入力です");
    }
    return error;
}

function check_attendNum(data, error) {
    if (data == "" || data === undefined){
        error.push("参加予定人数が未入力です");
    }
    return error;
}
