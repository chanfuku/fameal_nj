angular.module('myApp', []);
angular.module('myApp')
    .service('UserRegisterService', ['$log', '$http',
        function($log, $http) {
            this.change = function($scope){
                $scope.error_messages = "";
                if($scope.entryType == 1) {
                    $scope.show_input=false;
                    $scope.show_input_question=true;
                } else {
                    $scope.show_input=true;
                    $scope.show_input_question=false;
                }
            }
            this.conf = function($scope){
                // 入力チェック
                var error = new Array();
                error = check_name($scope.name, error);
                error = check_age($scope.age, error);
                error = check_address($scope.address, error);
                error = check_tel($scope.tel, error);
                error = check_email($scope.email, error);
                error = check_date($scope.date, error);
                error = check_time($scope.time, error);
                error = check_attendNum($scope.attendNum, error);
                error = check_privacy($scope.privacy, error);
                if(error.length == 0){
                    $scope.name_conf = $scope.name;
                    $scope.age_conf = $scope.age;
                    $scope.address_conf = $scope.address;
                    $scope.tel_conf = $scope.tel;
                    $scope.email_conf = $scope.email;
                    $scope.date_conf = $scope.date;
                    $scope.time_conf = $scope.time;
                    $scope.attendNum_conf = $scope.attendNum;
                    $scope.show_conf=true;
                    $scope.show_input=false;
                    $scope.show_entry_type=false;
                } else {
                    $scope.error_messages = error;
                }
            }
            this.confQuestion = function($scope){
                // 入力チェック
                var error = new Array();
                error = check_questionType($scope.questionType, error);
                error = check_name($scope.name, error);
                error = check_email($scope.email, error);
                error = check_detail($scope.detail, error);
                error = check_privacy($scope.privacy, error);
                if(error.length == 0){
                    $scope.name_conf = $scope.name;
                    $scope.tel_conf = $scope.tel;
                    $scope.email_conf = $scope.email;
                    $scope.detail_conf = $scope.detail;
                    $scope.show_conf_question=true;
                    $scope.show_input_question=false;
                    $scope.show_entry_type=false;
                } else {
                    $scope.error_messages = error;
                }
            }

            this.back = function($scope){
                $scope.error_messages = "";
                $scope.show_input=true;
                $scope.show_conf=false;
                $scope.show_entry_type=true;
            }
            this.backQuestion = function($scope){
                $scope.error_messages = "";
                $scope.show_input_question=true;
                $scope.show_conf_question=false;
                $scope.show_entry_type=true;
            }

            this.comp = function($scope){
                $scope.show_progress = true;
                $result = $http({
                    method: 'POST',
                    url: '/submit',
                    data: {
                        name: $scope.name,
                        age: $scope.age,
                        address: $scope.address,
                        tel: $scope.tel,
                        email: $scope.email,
                        date: $scope.date,
                        time: $scope.time,
                        attendNum: $scope.attendNum
                    }
                }).
                then(function successCallback(response) {
                    $scope.show_progress = false;
                    $scope.result = "送信されました。担当者からご連絡致します。";
                }, function errorCallback(response) {
                    //通信に失敗
                    $scope.show_progress = false;
                    $scope.result = '送信エラーが発生しました。';
                });
            }
            this.compQuestion = function($scope){
                $scope.show_progress = true;
                $result = $http({
                    method: 'POST',
                    url: '/submitQuestion',
                    data: {
                        questionType: $scope.questionType,
                        name: $scope.name,
                        tel: $scope.tel,
                        email: $scope.email,
                        detail: $scope.detail
                    }
                }).
                then(function successCallback(response) {
                    $scope.show_progress = false;
                    $scope.result = "送信されました。担当者からご連絡致します。";
                }, function errorCallback(response) {
                    //通信に失敗
                    $scope.show_progress = false;
                    $scope.result = '送信エラーが発生しました。';
                });
            }
        }
    ]);
