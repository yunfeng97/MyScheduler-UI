angular.module('App')
    .controller('AppDetailsController', function ($scope, $http, $stateParams, $state) {
        // return the details of an appointment with appontmentId
        $scope.getAppDetails = function () {
            var appid = $stateParams.appid;
            console.log("app id is: " + $stateParams.appid);
            console.log("app id is: " + appid);
            $scope.appid = appid;
            $http.get('/api/dashboard/app/' + appid).success(function (data) {
                //$http.get('http://192.168.1.171:1337/api/dashboard/all').success(function (data) {
                $scope.appDetails = data;
                console.log("in app detail controller");
                //return data;
            }).error(function (error) {
                $scope.error = error;
                console.log(error);
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete')
            });
        };

        //$scope.getAppDetails();

        //if (angular.isUndefined($scope.appDetails)) {
        //if ($scope.appDetails == null ) {
        //    $state.go('dashboard.toay', {}, {reload: true});
        //};
    });
