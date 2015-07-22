angular.module('App', ['ionic', 'ui.calendar'])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('clients', {
                url: '/clients',
                controller: 'ClientsController',
                templateUrl: 'views/clients/clients.html'
            })
            .state('clientnew', {
                url: '/clientnew',
                templateUrl: 'views/clients/newClient.html'
            })
            .state('showclient', {
                cache: false,
                url: '/showclient/:clientid',
                //controller: 'ClientDetailsController',
                templateUrl: 'views/clients/clientDetail.html'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'views/settings/settings.html'
            })
            .state('calendar', {
                url: 'calendar',
                controller: 'CalendarController',
                templateUrl: 'views/calendar/Calendar.html'
            })
            .state('dashboard', {
                url: '/dashboard',
                abstract: true,
                templateUrl: 'views/dashboard/dashboard.html'
            })
            .state('dashboard.today', {
                //cache: false,
                url: '/todayApps',
                views: {
                    'dashboard-today': {
                        controller: 'DashboardController',
                        templateUrl: 'views/dashboard/todayApps.html'
                    }
                }
            })
            .state('dashboard.new', {
                //cache: false,
                url: '/newApps',
                views: {
                    'dashboard-new': {
                        controller: 'DashboardController',
                        templateUrl: 'views/dashboard/newApps.html'
                    }
                }
            })
            .state('dashboard.cancelled', {
                url: '/cancelledApps',
                views: {
                    'dashboard-cancelled': {
                        controller: 'DashboardController',
                        templateUrl: 'views/dashboard/cancelledApps.html'
                    }
                }
            })
            .state('dashboard.rescheduled', {
                url: '/rescheduledApps',
                views: {
                    'dashboard-rescheduled': {
                        controller: 'DashboardController',
                        templateUrl: 'views/dashboard/rescheduledApps.html'
                    }
                }
            })
            .state('dashboard.appdetail', {
                cache: false,
                url: '/appDetails/:appid',
                views: {
                    'dashboard-today': {
                        controller: 'AppDetailsController',
                        templateUrl: 'views/dashboard/appDetail.html'
                    }
                }
            })
            .state('services', {
                url: '/services',
                controller: 'ServicesController',
                templateUrl: 'views/services/services.html'
            });

        $urlRouterProvider.otherwise('/dashboard/todayApps');
    })

    .constant('ApiEndpoint', {
        url: 'http://192.168.1.171:1337/api'
    })

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .controller('LeftMenuController', function ($scope, Locations) {
        $scope.locations = Locations.data;
    })

    .filter('timezone', function () {
        return function (input, timezone) {
            if (input && timezone) {
                var time = moment.tz(input * 1000, timezone);
                return time.format('LT');
            }
            return '';
        };
    })

    .filter('chance', function () {
        return function (chance) {
            if (chance) {
                var value = Math.round(chance * 10);
                return value * 10;
            }
            return 0;
        };
    })

    .filter('startsWith', function() {
        return function(array, search) {
            var matches = [];
            for(var i = 0; i < array.length; i++) {
                if (array[i].indexOf(search) === 0 &&
                    search.length < array[i].length) {
                    matches.push(array[i]);
                }
            }
            return matches;
        };
    })

    .filter('icons', function () {
        var map = {
            'clear-day': 'ion-ios-sunny',
            'clear-night': 'ion-ios-moon',
            rain: 'ion-ios-rainy',
            snow: 'ion-ios-snowy',
            sleet: 'ion-ios-rainy',
            wind: 'ion-ios-flag',
            fog: 'ion-ios-cloud',
            cloudy: 'ion-ios-cloudy',
            'partly-cloudy-day': 'ion-ios-partlysunny',
            'partly-cloudy-night': 'ion-ios-cloudy-night'
        };
        return function (icon) {
            return map[icon] || '';
        }
    })

    .factory('Settings', function () {
        var Settings = {
            units: 'us',
            days: 8
        };
        return Settings;
    })

    .factory('Locations', function ($ionicPopup) {
        var Locations = {
            data: [{
                city: 'Chicago, IL, USA',
                lat: 41.8781136,
                lng: -87.6297982
            }],
            getIndex: function (item) {
                var index = -1;
                angular.forEach(Locations.data, function (location, i) {
                    if (item.lat == location.lat && item.lng == location.lng) {
                        index = i;
                    }
                });
                return index;
            },
            toggle: function (item) {
                var index = Locations.getIndex(item);
                if (index >= 0) {
                    $ionicPopup.confirm({
                        title: 'Are you sure?',
                        template: 'This will remove ' + Locations.data[index].city
                    }).then(function (res) {
                        if (res) {
                            Locations.data.splice(index, 1);
                        }
                    });
                } else {
                    Locations.data.push(item);
                    $ionicPopup.alert({
                        title: 'Location saved'
                    });
                }
            },
            primary: function (item) {
                var index = Locations.getIndex(item);
                if (index >= 0) {
                    Locations.data.splice(index, 1);
                    Locations.data.splice(0, 0, item);
                } else {
                    Locations.data.unshift(item);
                }
            }
        };

        return Locations;
    });
