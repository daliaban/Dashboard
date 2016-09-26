/**
 * Created by dalia on 20/09/16.
 */
'use strict';

angular.module('Dashboard')
    .directive('tabsDir', function(){

        var tabsLink = function(scope){

            //View all files while clicked on the 'View all content' button
            scope.viewAll = function(){
                scope.limit.status = false;
                scope.limit.to = scope.allfiles.length;
            };

            //View less files while clicked on the 'View less content' button
            scope.viewLess = function(){
                scope.limit.status = true;
                scope.limit.to = scope.limit.default;
            };

            //Get the Full Name from user objects
            scope.getName = function(id){
                var fullName = '';
                scope.users.filter(function(user){
                    if (user.id === id){
                        fullName = user.givenName + " " + user.familyName;
                    }
                });
                return fullName;
            };

        };

        return {
            restrict: 'EA',
            link:tabsLink,
            templateUrl: 'views/tabs.html',
            scope: {
                limit: '=',
                users: '=',
                allfiles: '=',
                showFiles: '&'
            }
        }
    });