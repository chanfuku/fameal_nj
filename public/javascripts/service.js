angular.module('myApp', []);
angular.module('myApp')
    .service('UserRegisterService', ['$log', '$http',
        function($log, $http) {
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
                } else {
                    $scope.error_messages = error;
                }
            }

            this.back = function($scope){
                $scope.error_messages = "";
                $scope.show_input=true;
                $scope.show_conf=false;
            }

            this.comp = function($scope){
                $scope.result = "送信中・・・";
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
                        hour: $scope.hour,
                        attendNum: $scope.attendNum
                    }
                }).
                then(function successCallback(response) {
                    $scope.result = "送信されました。担当者からご連絡致します。";
                }, function errorCallback(response) {
                    //通信に失敗
                    $scope.result = '送信エラーが発生しました。';
                });
            }
        }
    ]);
