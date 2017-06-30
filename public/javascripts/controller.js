var app = angular.module('myApp')
app.controller('MyController', ['$scope', '$location', '$anchorScroll', 'UserRegisterService',
    function($scope, $location, $anchorScroll, UserRegisterService) {
        $scope.entry = { type: 'apply' };
        $scope.show_entry_type=true;
        $scope.show_input=true;
        $scope.show_input_question=false;
        $scope.button_disabled = false;
        $scope.changeEntryType = function() {
            UserRegisterService.change($scope);
            $scope.show_comp_success=false;
            $scope.show_comp_failure=false;
            $scope.show_conf=false;
            $scope.show_conf_question=false;
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
            $scope.button_disabled = true;
            UserRegisterService.comp($scope);
            $location.hash('apply');
            $anchorScroll();
            $location.url($location.path());
            $scope.show_entry_type=true;
        }
        $scope.jumpTo = function(id) {
            $location.hash(id);
            $anchorScroll();
            $location.url($location.path());
        }
        $scope.jumpToEntry = function(type) {
            $scope.entry = { type: type };
            UserRegisterService.change($scope);
            $scope.show_conf=false;
            $scope.show_conf_question=false;
            $location.hash('apply');
            $anchorScroll();
            $location.url($location.path());
        }
        $scope.linkTo = function($id) {
            location.pathname = $id;
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
            $scope.button_disabled = true;
            UserRegisterService.compQuestion($scope);
            $location.hash('apply');
            $anchorScroll();
            $location.url($location.path());
            $scope.show_entry_type=true;
        }
    }
]);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
