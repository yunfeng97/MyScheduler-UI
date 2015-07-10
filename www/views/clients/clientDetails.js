/**
 * Created by yunfeng on 10/07/15.
 */
angular.module('App')
    .controller('ClientDetailsController', function($scope, $http, $stateParams, $ionicPopover){

        $scope.showClient = function(){
            var clientId = $stateParams.clientid;
            console.log("in ShowClient with clientId: " + clientId);
            $http.get('/api/clients/client/:clientId' ).success(function (data) {
                //$http.get('http://192.168.1.171:1337/api/dashboard/todayApps').success(function (data) {

                //return data;
                //$window.location.href = '#/showclient';
                $scope.clientDetail = data;
            }).error(function (error) {
                $scope.error = error;
                console.log(error);
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete')
            });
        };

        $ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: $scope,
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $scope.showClient();
    });