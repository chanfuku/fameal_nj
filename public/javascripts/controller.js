var app = angular.module('myApp')
app.controller('MyController', ['$scope', '$location', '$anchorScroll', 'UserRegisterService',
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
         $scope.jumpTo = function(id) {
             $location.hash(id);
             $anchorScroll();
             $location.url($location.path());
         }
     }
]);

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);
