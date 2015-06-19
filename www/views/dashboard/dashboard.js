angular.module('App')
    .controller('DashboardController', function ($scope, $http, $timeout) {
        $scope.currencies = [
            {
                name: "value"
            },
            {
                name: "value"
            },
            {
                name: "value"
            }];

        $scope.model = {term: ''};

        $scope.search = function () {
            $http.get('https://maps.googleapis.com/maps/api/geocode/json', {params: {address: $scope.model.term}}).success(function (response) {
                $scope.results = response.results;
            });
        };

        $scope.all = function (userId) {
            console.log("all");
            /*
            $scope.allNotification = [
                {
                    eventDate:  "2015-06-01",
                    customer:   "Mr. Chen",
                    details:    "Cancelled appointment on June 12, 2015"
                },
                {
                    eventDate:   "2015-06-02",
                    customer:   "Miss Zhou",
                    details:    "Make new appointment on June 16 2015 for body check"
                }

            ];
            */
            //$http.get('/api/dashboard/all', {params: {userId: userId}}).success(function (data) {
            $http.get('/api/dashboard/all').success(function (data) {
                $scope.allNotification = data;
                $scope.$broadcast('scroll.refreshComplete');
                //console.log(data);
                //return data;
            }).error(function(error){
                $scope.error = error;
            });

            //$timeout(function() {
            //    $scope.$broadcast('scroll.refreshComplete');
            //    $scope.$broadcast('scroll.refreshComplete');
            //}, 1250);

        };

        $scope.newAppointment = function () {
        };

        $scope.cancelledAppointment = function () {
        };

        $scope.changedAppointment = function () {
        };

        $scope.all("");
    });