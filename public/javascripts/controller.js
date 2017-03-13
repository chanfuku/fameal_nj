angular.module('myApp')
    .controller('MyController', ['$scope', '$location', '$anchorScroll', 'UserRegisterService',
        function($scope, $location, $anchorScroll, UserRegisterService) {
            $scope.show_input=true;
            $scope.conf = function() {
                UserRegisterService.conf($scope);
                $location.hash('apply');
                $anchorScroll();
            }
            $scope.back = function() {
                UserRegisterService.back($scope);
            }
            $scope.comp = function() {
                UserRegisterService.comp($scope);
                $scope.show_conf=false;
                $scope.show_comp=true;
            }
        }
    ]);
