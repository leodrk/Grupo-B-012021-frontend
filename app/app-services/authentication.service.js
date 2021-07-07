(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', Service);

    function Service($http, $localStorage) {
        var service = {};
        var urlBase = 'https://grupo-b-012021-backend.herokuapp.com/';
        service.Login = Login;
        service.Logout = Logout;
        service.Register = Register;

        return service;

        function Login(username, password, callback) {
            $http.post(urlBase+'login', { username: username, password: password }, {responseType:'json'}).then(function onSuccess(response) {
                // login successful if there's a token in the response
                if (response.data.token) {
                    // store username and token in local storage to keep user logged in between page refreshes
                    $localStorage.currentUser = { username: username, token: response.data.token, platform: response.data.platform };
                    // add jwt token to auth header for all requests made by the $http service
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                    // execute callback with true to indicate successful login
                    callback(true);
                } else {
                    // execute callback with false to indicate failed login
                    callback(false);
                }
            });
        }

        function Register(username, password, platform, callback) {
            $http.post(urlBase+'register', { username: username, password: password , platform: platform}, {responseType:'json'}).then(function onSuccess(response) {
                callback(true);
            }).catch(function onError(response) {
                callback(false);
            });
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();