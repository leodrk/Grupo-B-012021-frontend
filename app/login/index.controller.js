(function () {
    'use strict';

    angular
        .module('app')
        .controller('Login.IndexController', Controller);

    function Controller($location, AuthenticationService, $translate) {
        var vm = this;

        vm.login = login;
        vm.changeLanguage = changeLanguage;
        initController();

        function initController() {
            // reset login status
            AuthenticationService.Logout();
        }

        function changeLanguage(lang){
            console.log(lang);
            $translate.use(lang);
        }
        
        function login() {
            vm.loading = true;
            AuthenticationService.Login(vm.username, vm.password, function (result) {
                if (result === true) {
                    $location.path('/');
                } else {
                    vm.error = 'Username or password is incorrect';
                    vm.loading = false;
                }
            });
        }
    }

})();