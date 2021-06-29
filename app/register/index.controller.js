(function () {
    'use strict';

    angular
        .module('app')
        .controller('Register.IndexController', Controller);

    function Controller($location, AuthenticationService) {

        var vm = this;

        vm.register = register;
        vm.login = login;

        initController();

        function initController() {
            // reset login status
            AuthenticationService.Logout();
        }

        function login() {
            $location.path('/login');
        }

        function register() {
            vm.loading = true;
            AuthenticationService.Register(vm.username, vm.password, vm.platform, function (result) {
                if (result === true) {
                    $location.path('/login');
                } else {
                    vm.error = 'Ah ocurrido un error registrando un nuevo usuario';
                    vm.loading = false;
                }
            });
        }
    }

})();