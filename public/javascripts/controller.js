var app = angular.module('myApp')
app.controller('MyController', ['$scope', '$location', '$anchorScroll', 'UserRegisterService',
    function($scope, $location, $anchorScroll, UserRegisterService) {
        $scope.entryType="0";
        $scope.show_entry_type=true;
        $scope.show_input=true;
        $scope.show_input_question=false;
        $scope.changeEntryType = function() {
            UserRegisterService.change($scope);
            $scope.show_comp_success=false;
            $scope.show_comp_failure=false;
        }
        $scope.conf = function() {
            UserRegisterService.conf($scope);
            $location.hash('apply');
            $anchorScroll();
            $location.url($location.path());
        }
        $scope.back = function() {
            UserRegisterService.back($scope);
        }
        $scope.comp = function() {
            UserRegisterService.comp($scope);
            $location.hash('apply');
            $anchorScroll();
            $location.url($location.path());
            $scope.show_conf=false;
            $scope.show_entry_type=true;
        }
        $scope.jumpTo = function(id) {
            $location.hash(id);
            $anchorScroll();
            $location.url($location.path());
        }
        $scope.confQuestion = function() {
            UserRegisterService.confQuestion($scope);
            $location.hash('apply');
            $anchorScroll();
            $location.url($location.path());
        }
        $scope.backQuestion = function() {
            UserRegisterService.backQuestion($scope);
        }
        $scope.compQuestion = function() {
            UserRegisterService.compQuestion($scope);
            $location.hash('apply');
            $anchorScroll();
            $location.url($location.path());
            $scope.show_conf_question=false;
            $scope.show_entry_type=true;
        }
    }
]);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
