(function () {
    'use strict';

    angular
        .module('app')
        .controller('Login.IndexController', Controller);

    function Controller($location, AuthenticationService) {
        var vm = this;

        vm.login = login;
        vm.register = register;

        initController();

        function initController() {
            // reset login status
            AuthenticationService.Logout();
        }
        function register() {
            vm.loading = true;
            AuthenticationService.Register(vm.username, vm.password, vm.platform, function (result) {
                if (result === true) {
                    $location.path('/');
                } else {
                    vm.error = 'Username or password is incorrect';
                    vm.loading = false;
                }
            });
        }
        function login() {
            vm.loading = true;
            AuthenticationService.Register(vm.username, vm.password, function (result) {
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