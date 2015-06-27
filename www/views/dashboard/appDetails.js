angular.module('App')
    .controller('AppDetailsController', function ($scope, $http, $stateParams, $state) {
        // return the details of an appointment with appontmentId
        $scope.getAppDetails = function () {
            var appid = $stateParams.appid;
            //console.log("app id is: " + $stateParams.appid);
            console.log("app id is: " + appid);
            $scope.appid = appid;
            $http.get('/api/dashboard/app/' + appid).success(function (data) {
            //$http.get('http://192.168.1.171:1337/api/dashboard/app/2').success(function (data) {
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

        $scope.accept = function(appid){
            //console.log("in accept");
            $http.put('/api/dashboard/app/accept/:id' + appid).success(function (data) {
            //$http.put('http://192.168.1.171:1337/api/dashboard/app/accept/2').success(function (data) {
                $scope.appDetails = data;
                console.log("data: " + data);
                console.log("in app detail controller");
                //return data;
                //}).error(function (error) {
                //    $scope.error = error;
                //    console.log(error);
            }).error(function (data, status, headers, config) {
                console.log("Error occurred.  Status:" + status);
                console.log("Error occurred.  Data:" + data);
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete')
            });
        };

        $scope.reschedule = function(){

        };

        $scope.getAppDetails();

        //if (angular.isUndefined($scope.appDetails)) {
        //if ($scope.appDetails == null ) {
        //    $state.go('dashboard.toay', {}, {reload: true});
        //};
    });
