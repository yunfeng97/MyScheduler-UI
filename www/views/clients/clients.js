/**
 * Created by yunfeng on 02/07/15.
 */
angular.module('App')
    .controller('ClientsController', function ($scope, $http, $stateParams) {
        $scope.client = {phone:''};

        $scope.getAllClients = function () {
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
                console.log("get all clients: " + data);
                //return data;
            }).error(function (error) {
                $scope.error = error;
                console.log(error);
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete')
            });
        };

        $scope.editClient = function(clientId){
            console.log(clientId);
        };

        $scope.cancellAddNew = function(){
            window.history.back();
        };

        $scope.addNewClient  = function(){
            console.log("phone is: " + $scope.client.phone);

        };

        $scope.getAllClients();
    });