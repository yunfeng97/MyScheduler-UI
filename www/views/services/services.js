/**
 * Created by yunfeng on 13/07/2015.
 */

angular.module('App')
    .controller('ServicesController', function($scope, $http, $ionicPopover){

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

        $ionicPopover.fromTemplateUrl('services/popover.html', {
            scope: $scope,
        }).then(function(popover) {
            $scope.popover = popover;
        });
});
