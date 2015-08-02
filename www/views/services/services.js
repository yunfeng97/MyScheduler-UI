/**
 * Created by yunfeng on 13/07/2015.
 */

angular.module('App')
    .controller('ServicesController', function($scope, $http, $ionicPopover, $state){

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
            var reqdata = {
                method: 'POST',
                url: '/api/services/registerNew',
                headers: {
                    'Content-Type': undefined
                },
                data: $.param($scope.service)// $scope.service
            };
            $http(reqdata).
            //$http.post('/api/services/registerNew', $scope.service).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            $state.go('services');

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
