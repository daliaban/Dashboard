/**
 * Created on 01/09/16.
 * This is a service which returns the API data from
 * the API endpoints provided.
 */
'use strict';

angular.module('Dashboard')
    .factory('searchRepository', function($http){
        var baseUrl = 'http://localhost:3001/';
        return {
            findAllUsers: function(){
                return $http.get(baseUrl + 'users');
            },
            findAllTypes: function(){
                return $http.get(baseUrl + 'types');
            },
            findAllFiles: function(){
                return $http.get(baseUrl + 'files');
            }
        };
    });