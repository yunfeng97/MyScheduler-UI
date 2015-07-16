angular.module('App', ['ui.calendar'])
.controller('CalendarController', function($scope, $http){
        // ui-Calendar?
        $scope.eventSources = [];
        $scope.uiConfig = {
            calendar:{
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                height: 500,
                lang: 'ja',
                scrollTime: '10:00:00',
                buttonIcons: false,
                weekNumbers: false,
                editable: false,
                eventLimit: true,
                events: EventService.getCalendarInfo()
            }
        };
    });