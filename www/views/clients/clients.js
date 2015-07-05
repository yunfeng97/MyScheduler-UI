/**
 * Created by yunfeng on 02/07/15.
 */
angular.module('App')
    .controller('ClientsController', function ($scope, $http, $stateParams) {

        $scope.getAllClients = function () {
            $http.get('/api/clients/allClients').success(function (data) {
                //$http.get('http://192.168.1.171:1337/api/clients/allClients').success(function (data) {
                $scope.allClients = data;
                //console.log(data);
                //return data;
            }).error(function (error) {
                $scope.error = error;
                console.log(error);
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete')
            });
        };

    });