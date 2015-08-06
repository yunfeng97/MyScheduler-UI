/**
 * Created by yunfeng on 10/07/15.
 */
angular.module('App')
    .controller('ClientDetailsController', function($scope, $http, $stateParams, $ionicPopover, $ionicPopup){

        $scope.showClient = function(){
            var clientId = $stateParams.clientid;
            console.log("in ShowClient with clientId: " + clientId);
            $http.get('/api/clients/client/' + clientId).success(function (data) {
            //$http.get('http://localhost:1337/api/clients/client/' + clientId).success(function (data) {
                $scope.clientDetail = data;
                console.log('client name: ' + $scope.clientDetail.name);
            }).error(function (error) {
                $scope.error = error;
                console.log(error);
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete')
            });
        };

        $ionicPopover.fromTemplateUrl('clients/popover.html', {
            scope: $scope,
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $scope.confirmDelete = function() {
            console.log("in confirmdelete");
            var confirmPopup = $ionicPopup.confirm({
                title: 'Consume Ice Cream',
                template: 'Are you sure you want to eat this ice cream?'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        };

        $scope.deleteClient = function(){
            console.log("delete client");
        };

        $scope.showClient();
    });