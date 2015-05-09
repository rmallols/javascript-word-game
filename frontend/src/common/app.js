var app = angular.module('javascriptWordGame', ['ui.router']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {

    //Avoid using hashes on the URL, whenever the browser supports this feature
    $locationProvider.html5Mode(true);

    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "src/app/home/home.html",
            controller: 'HomeCtrl'
        });

    // For any unmatched url, redirect to the home page
    $urlRouterProvider.otherwise("/");
});