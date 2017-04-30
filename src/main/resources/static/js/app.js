/**
 * Created by shikhar on 29-04-2017.
 */
var chatApp = angular.module("chatApp", ['ui.router', 'ui.materialize', 'ui.select2' ]);
chatApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/temp");

    $stateProvider.state('tempView', {
        url: "/temp-comparison",
        templateUrl: "views/chatView.html",
        controller: 'seaLevelCtrl'
    }).state('seaOnlyView', {
        url: "/sea-level",
        templateUrl: "views/chatView.html",
        controller: 'seaLevelOnlyCtrl'
    }).state('tempOnlyView', {
        url: "/temperature-level",
        templateUrl: "views/chatView.html",
        controller: 'tempLevelCtrl'
    }).state('greenlandView', {
        url: "/greenland",
        templateUrl: "views/elevationView.html",
        controller: 'greenlandMassCtrl'
    }).state('antarcticaView', {
        url: "/antarctica",
        templateUrl: "views/elevationView.html",
        controller: 'antarcticaMassCtrl'
    }).state('elevationView', {
        url: "/elevation",
        templateUrl: "views/elevationView.html",
        controller: 'elevationCtrl'
    });
}).service('$toastService', function ($rootScope, $window) {
    var service = this;
    var defaultDuration = 4000;

    service.create = function (message, callback) {
        if ($window.Materialize) {
            Materialize.toast(message, defaultDuration);
            if(callback!=undefined){
                callback();
            }
        }
    };
}).service('$alertService', function ($rootScope, $window) {
    var service = this;
    var defaultDuration = 4000;

    service.alert = function (title,message, callback) {
        if ($window.materialAlert) {
            materialAlert(title,message,callback);
        }
    };

    service.confirm = function (title,message, callback) {
        if ($window.materialConfirm) {
            materialConfirm(title,message,callback);
        }
    };

    service.closeMaterialAlert = function(){
        if ($window.closeMaterialAlert) {
            closeMaterialAlert(e,result);
        }
    };

}).run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        console.log("inside run function");
        $rootScope.v = 1;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.showSpinner = false;
        $rootScope.showOverlay = false;
    }
]).directive('highchart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function (scope, element, attrs) {
            console.log(attrs);
            scope.$watch(function () {
                return attrs.chart;
            }, function () {
                if (!attrs.chart) {
                    return;
                }
                var chartOpts = JSON.parse(attrs.chart);
                console.log("Data changed",chartOpts);
                console.log(chartOpts);
                Highcharts.chart(element[0], chartOpts);
            });
        }
    };
});


chatApp.controller("antarcticaMassCtrl",function($rootScope,$scope,$http){

    $scope.chartOptions = {
        title: {
            text: 'Decrease in Antarctica Land Mass (in giga tonnes)'
        },
        xAxis: {
            categories: []
        },
        series: []
    };

    $scope.init = function(){
        $http({
            method:"GET",
            url:"https://192.172.7.31:8443/api/get-ocean-mass"
        }).then(function(response){
            var response = response.data;
            $scope.xAxes = response.map(function(datum){
                return datum.year;
            });
            var antarcticaMass = response.map(function(datum){
                return parseFloat(datum.antarticaMass);
            });

            $scope.xAxesData = [
                {name:"Antarctica Mass", data:antarcticaMass}
            ];

            $scope.chartOptions = {
                title: {
                    text: 'Decrease in Antarctica Land Mass (in gigatonnes)'
                },
                xAxis: {
                    categories: $scope.xAxes
                },
                series: $scope.xAxesData
            };

        });
    };

}).controller("greenlandMassCtrl",function($rootScope,$scope,$http){

    $scope.chartOptions = {
        title: {
            text: 'Decrease in Greenland Land Mass (in giga tonnes)'
        },
        xAxis: {
            categories: []
        },
        series: []
    };

    $scope.init = function(){
        $http({
            method:"GET",
            url:"https://192.172.7.31:8443/api/get-ocean-mass"
        }).then(function(response){
            var response = response.data;
            $scope.xAxes = response.map(function(datum){
                return datum.year;
            });
            var greenlandMass = response.map(function(datum){
                return parseFloat(datum.greenlandMass);
            });

            $scope.xAxesData = [
                {name:"Greenland Mass", data:greenlandMass}
            ];

            $scope.chartOptions = {
                title: {
                    text: 'Decrease in Greenland Land Mass (in gigatonnes)'
                },
                xAxis: {
                    categories: $scope.xAxes
                },
                series: $scope.xAxesData
            };

        });
    };

}).controller("elevationCtrl",function($rootScope,$scope,$http){

    $scope.chartOptions = {
        title: {
            text: 'Land Mass Comparison of Greenland and Antarctica'
        },
        xAxis: {
            categories: []
        },
        series: []
    };
    $scope.init = function(){
        $http({
            method:"GET",
            url:"https://192.172.7.31:8443/api/get-ocean-mass"
        }).then(function(response){
            var response = response.data;
            $scope.xAxes = response.map(function(datum){
                return datum.year;
            });
            var greenLandMass = response.map(function(datum){
                return parseFloat(datum.greenlandMass);
            });
            var antarcticaMass = response.map(function(datum){
                return parseFloat(datum.antarticaMass);
            });

            $scope.xAxesData = [
                {name:"Antarctica Mass",data:antarcticaMass},
                {name:"GreenLand Mass",data:greenLandMass}
            ];

            $scope.chartOptions = {
                title: {
                    text: 'Land Mass Comparison of Greenland and Antarctica'
                },
                xAxis: {
                    categories: $scope.xAxes
                },
                series: $scope.xAxesData
            };

        });
    };

}).controller("seaLevelCtrl",function($rootScope,$scope,$http){
    $scope.chartOptions = {
        title: {
            text: 'Sea Level to Temperature Rise Comparison'
        },
        xAxis: {
            categories: []
        },
        series: []
    };
    $scope.init = function(){
        $http({
            method:"GET",
            url:"https://192.172.7.31:8443/api/sea-to-temp-comp"
        }).then(function(response){
            var response = response.data;
            $scope.xAxes = response.map(function(datum){
                return datum.year;
            });
            var tempData = response.map(function(datum){
                return parseFloat(datum.temperatureMean*10);
            });
            var oceanMass = response.map(function(datum){
                return parseFloat(datum.seaLevel);
            });

            $scope.xAxesData = [
                {name:"Temperature Rise",data:tempData},
                {name:"Ocean Mass",data:oceanMass}
            ];

            $scope.chartOptions = {
                title: {
                    text: 'Sea Level to Temperature Rise Comparison'
                },
                xAxis: {
                    categories: $scope.xAxes
                },
                series: $scope.xAxesData
            };

        });
    };

}).controller("seaLevelOnlyCtrl",function($rootScope,$scope,$http){
    $scope.chartOptions = {
        title: {
            text: 'Increase in Sea Level (in mm)'
        },
        xAxis: {
            categories: []
        },
        series: []
    };
    $scope.init = function(){
        $http({
            method:"GET",
            url:"https://192.172.7.31:8443/api/sea-to-temp-comp"
        }).then(function(response){
            var response = response.data;
            $scope.xAxes = response.map(function(datum){
                return datum.year;
            });
            var tempData = response.map(function(datum){
                return parseFloat(datum.temperatureMean*10);
            });
            var oceanMass = response.map(function(datum){
                return parseFloat(datum.seaLevel);
            });

            $scope.xAxesData = [
                {name:"Ocean Mass",data:oceanMass}
            ];

            $scope.chartOptions = {
                title: {
                    text: 'Increase in Sea Level (in mm)'
                },
                xAxis: {
                    categories: $scope.xAxes
                },
                series: $scope.xAxesData
            };

        });
    };

}).controller("tempLevelCtrl",function($rootScope,$scope,$http){
    $scope.chartOptions = {
        title: {
            text: 'Mean Increase in Temperature (in degree Celsius)'
        },
        xAxis: {
            categories: []
        },
        series: []
    };
    $scope.init = function(){
        $http({
            method:"GET",
            url:"https://192.172.7.31:8443/api/get-temp-data"
        }).then(function(response){
            var response = response.data;
            $scope.xAxes = response.map(function(datum){
                return datum.year;
            });
            var tempData = response.map(function(datum){
                return parseFloat(datum.temperatureMean);
            });

            $scope.xAxesData = [
                {name:"Temperature Rise",data:tempData}
            ];

            $scope.chartOptions = {
                title: {
                    text: 'Mean Increase in Temperature (in degree Celsius)'
                },
                xAxis: {
                    categories: $scope.xAxes
                },
                series: $scope.xAxesData
            };

        });
    };

});