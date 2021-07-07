(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller($http, $localStorage) {
        var vm = this;
        var urlBase = 'http://localhost:8080/';

        initController();

        function initController() {
            $http({
                method : "GET",
                url : urlBase+"api/review/getReviewsByMonth/"+$localStorage.currentUser.platform,
                headers:{'Authorization':$localStorage.currentUser.token} 
            }).then(function mySuccess(response) {
                Highcharts.chart('container', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'New Reviews by month'
                    },
                    xAxis: {
                        categories: response.data.months,
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Reviews'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: "Timeline",
                        data: response.data.reviewAmount
                    }]
                });
            }, function myError(response) {
                console.log("no aguante todo");
            });
        }
    }
})();

