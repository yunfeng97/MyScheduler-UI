angular.module('App')
    .controller('DashboardController', function ($scope, $http, $stateParams) {
        //$scope.model = {term: ''};

        $scope.search = function () {
            $http.get('https://maps.googleapis.com/maps/api/geocode/json', {params: {address: $scope.model.term}}).success(function (response) {
                $scope.results = response.results;
            });
        };

        $scope.getTodayApps = function (userId) {

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
            //$http.get(ApiEndpoint.url + '/dashboard/all').success(function (data) {
            $http.get('/api/dashboard/todayApps').success(function (data) {
            //$http.get('http://192.168.1.171:1337/api/dashboard/todayApps').success(function (data) {
                $scope.todayApps = data;
                console.log(data);
                //return data;
            }).error(function (error) {
                $scope.error = error;
                console.log(error);
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete')
            });

        };


        $scope.getNewAppointments = function () {
        };

        $scope.getCancelledAppointments = function () {

        };

        $scope.getChangedAppointments = function () {
        };

        // accept an appointment
        $scope.acceptApp = function (appontmentId) {
            // set the status of the appointment to ACT
        };

        // cancel an appointment
        $scope.cancelApp = function (appontmentId) {
            // set the status of the appointment to CAN

        };

        // reschedule an appointment
        $scope.cancelApp = function (appontmentId, appointment) {

        };

        // create new or update appointment
        $scope.saveAppointment = function (appointment) {

        };

        // return the details of an appointment with appontmentId
        //$scope.getAppDetails = function (appid) {
        //    //console.log("app id is: " + $stateParams.appid);
        //    console.log("app id is: " + appid);
        //    $scope.appid = appid;
        //    //$http.get('/api/dashboard/app/' + appid).success(function (data) {
        //    $http.get('http://192.168.1.171:1337/api/dashboard/app/2').success(function (data) {
        //
        //        $scope.appid = appid;
        //        console.log("in app details");
        //        //return data;
        //    }).error(function (error) {
        //        $scope.error = error;
        //        console.log(error);
        //    }).finally(function () {
        //        $scope.$broadcast('scroll.refreshComplete')
        //    });
        //};

        $scope.getTodayApps("");
    });
