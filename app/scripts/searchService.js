/**
 * Created by dalia on 01/09/16.
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
        }
    });