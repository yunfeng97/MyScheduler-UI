/**
 * Created by yunfeng on 13/07/2015.
 */

angular.module('App')
    .controller('ServicesController', function($scope, $http, $ionicPopover){

        $scope.service = {};

        $scope.getAllServicesByUser = function(){
            $http.get('/api/services/allServicesByUser/2').success(function (data) {
                //$http.get('http://192.168.1.171:1337/api/clients/allServices').success(function (data) {
                var allServices = [];

                data.forEach(function(service){
                    allServices.push(service);
                });

                $scope.allServices = allServices;
                //console.log("get all services: " + data);
                //return data;
            }).error(function (error) {
                $scope.error = error;
                console.log(error);
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete')
            });

        };

        $scope.generateHours = function(){
            //console.log("Service name: " + $scope.service.name);
            $scope.showDetails = true;
        };

        $scope.findServices = function(){

        };

        $scope.createNewService = function(){

        };

        $scope.deleteService = function(){

        };

        $scope.updateService = function(){

        };

        $scope.newService = function(){

        };

        /*
        activate();
        function activate(){
            $ionicPopover.fromTemplateUrl('popover2.html', {
                scope: $scope,
            }).then(function (popover) {
                $scope.popover2 = popover;
            });
        };
        */
        $scope.getAllServicesByUser();

});
