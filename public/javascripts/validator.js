function check_name(data, error) {
    if(data == "" || data === undefined){
        error.push("名前を入力してください");
    }
    return error;
}

function check_age(data, error) {
    if (data == "" || data === undefined) {
        error.push("年齢を入力してください");
    }
    return error;
}

function check_address(data, error) {
    if (data == "" || data === undefined) {
        error.push("住所を入力してください");
    }
    return error;
}

function check_tel(data, error) {
    if (data == "" || data === undefined){
        error.push("電話番号を入力してください");
    }
    return error;
}

function check_email(data, error) {
    if (data == "" || data === undefined){
        error.push("メールアドレスを@を含めた形式で入力してください");
    }
    return error;
}

function check_date(data, error) {
    if (data == "" || data === undefined){
        error.push("希望日時を入力してください");
    }
    return error;
}

function check_time(data, error) {
    if (data == "" || data === undefined){
        error.push("時間を入力してください");
    }
    return error;
}

function check_attendNum(data, error) {
    if (data == "" || data === undefined){
        error.push("参加予定人数を入力してください");
    }
    return error;
}

function check_questionType(data, error) {
    if (data == "" || data === undefined){
        error.push("お問い合わせ内容を選択してください");
    }
    return error;
}

function check_detail(data, error) {
    if (data == "" || data === undefined){
        error.push("お問い合わせ詳細を入力してください");
    }
    return error;
}

function check_privacy(data, error) {
    if (data == "" || data != 1){
        error.push("「利用規約に同意する」にチェックしてください");
    }
    return error;
}

function clear_apply($scope) {
    $scope.name = '';
    $scope.age = '';
    $scope.address = '';
    $scope.tel = '';
    $scope.email = '';
    $scope.date = '';
    $scope.time = '';
    $scope.attendNum = '';
    $scope.privacy = '';
}

function clear_question($scope) {
    $scope.questionType = '';
    $scope.name = '';
    $scope.tel = '';
    $scope.email = '';
    $scope.detail = '';
    $scope.privacy = '';
}
