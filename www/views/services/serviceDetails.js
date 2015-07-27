/**
 * Created by xg02342 on 27/07/2015.
 */

angular.module('App')
    .controller('ServiceDetailsController', function () {
        $scope.showService = function () {
            var serviceId = $stateParams.serviceId;
            console.log("in showService with serviceId: " + serviceId);
            $http.get('/api/services/service/' + serviceId).success(function (data) {
                //$http.get('http://localhost:1337/api/services/service/' + serviceId).success(function (data) {
                $scope.serviceDetail = data;
            }).error(function (error) {
                $scope.error = error;
                console.log(error);
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete')
            });

        };

        $ionicPopover.fromTemplateUrl('services/popover-details.html', {
            scope: $scope,
        }).then(function (popover) {
            $scope.popover = popover;
        });

        $scope.confirmDelete = function () {
            console.log("in confirmdelete");
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete Service',
                template: 'Are you sure you want to delete the service?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        };

        $scope.showService();
    })