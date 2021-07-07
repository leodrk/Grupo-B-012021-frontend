(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngMessages', 'ngStorage', 'pascalprecht.translate'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider, $translateProvider) {
        // default route
        $urlRouterProvider.otherwise("/");
        var en_translations = {
            "name"      : "Name",
            "password"  : "Password",
            "login"     : "Login",
            "Urequired" : "Username is Required",
            "Prequired" : "Password is Required",
        };

        var sp_translations = {
            "name"      : "Nombre",
            "password"  : "Contraseña",
            "login"     : "Ingresar",
            "Urequired" : "Nombre de usuario Requerido",
            "Prequired" : "Contraseña Requerida",
        };

        $translateProvider.translations('en',en_translations);

        $translateProvider.translations('sp',sp_translations);

        $translateProvider.preferredLanguage('en');
        // app routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.view.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/index.view.html',
                controller: 'Login.IndexController',
                controllerAs: 'vm'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'register/index.view.html',
                controller: 'Register.IndexController',
                controllerAs: 'vm'
            });

    }

    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to register page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/register', '/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/register');
            }
        });
    }
})();