/**
 * Created by yunfeng on 02/07/15.
 */
angular.module('App')
    .controller('ClientsController', function ($scope, $http, $stateParams, $window, $state) {
        $scope.client = {};
        $scope.allClients = [];

        $scope.getAllClients = function () {
            console.log('in getAllClients');

            $http.get('/api/clients/allClients').success(function (data) {
                //$http.get('http://192.168.1.171:1337/api/clients/allClients').success(function (data) {
                var allClients = [];
                //var newInitial = true;
                var lastInitial = '';

                data.forEach(function(client){
                    if (client.name.substring(0,1) != lastInitial){
                        //newInitial = true;
                        lastInitial = client.name.substring(0,1);
                        allClients.push({name: lastInitial, id: -1, class: 'item-divider'});
                    }
                    allClients.push(client);
                });

                /*
                for (var ch='A'; ch<'Z'; ch++){
                    for(var i=0; i<data.size; i++){
                        var name = data[i].name;
                        if (name.indexOf(ch) == 0){
                            if (allClients[ch] == null){
                                allClients[ch] = [];
                            }

                            allClients[ch].add(data[i]);
                        }
                    }
                }
                */
                $scope.allClients = allClients;
                //console.log("get all clients: " + data);
                //return data;
            }).error(function (error) {
                $scope.error = error;
                console.log(error);
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete')
            });
        },

        $scope.editClient = function(clientId){
            console.log(clientId);
        };

        $scope.cancellAddNew = function(){
            window.history.back();
        };

        $scope.addNewClient  = function(){
            var reqdata = {
                method: 'POST',
                url: '/api/clients/newClient',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($scope.client)
            };
            $http(reqdata).
            //$http.post('/api/clients/newClient', $scope.client).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    //console.log(data.name);
                    $scope.allClients.push(data);
                    //$scope.getAllClients();
                    //console.log("number of clients: " + $scope.allClients);
                    //$state.go('clients', {}, {reload: true});
                    $state.go('clients');
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            //console.log("client firstname is: " + $scope.client.firstName);
            //console.log("client email is: " + $scope.client.email);

        };

        $scope.getAllClients();
    });