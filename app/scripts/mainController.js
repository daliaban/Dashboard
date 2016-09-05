/**
 * Created on 01/09/16.
 * This is the controller for the main view.
 */
'use strict';

angular.module('Dashboard')
    .controller('mainCtrl', function($scope, searchRepository){
        $scope.error = '';
        var limit = 5;
        $scope.limit = {};
        $scope.users = [];
        $scope.alltypes = [];
        
        //Find all users from API
        searchRepository.findAllUsers().then(
            function(users){
                //If success, get types and files
                $scope.numOfUsers = users.data.length;
                $scope.users = users.data;
                showTypes();
                $scope.showLiveFiles();
            },
            function(data) {
                //If error, show message. Can show different messages based on data.status
                $scope.error = "Looks like something went wrong in the backend. Please try again";
            }
        );

        //Find all types
        var showTypes = function(){
            searchRepository.findAllTypes().then(
                function(types){
                    $scope.alltypes = types.data;
                }
            );
        };
        
            
        var resetLimit = function(){
            $scope.limit.status = true;
            $scope.limit.to = limit;
        };

        //Find all files
        $scope.showAllFiles = function(){
            resetLimit();
            searchRepository.findAllFiles().then(
                function(files){
                    $scope.allfiles = files.data;
                    $scope.limit.to = Math.min($scope.allfiles.length, $scope.limit.to);
                }
            );
        };

        //Find all 'Published' files
        $scope.showPublishedFiles = function(){
            resetLimit();
            searchRepository.findAllFiles().then(
                function(files){
                    $scope.allfiles = files.data.filter(function(file){
                        if (file.status === "Published")
                            return file;
                    });
                    $scope.limit.to = Math.min($scope.allfiles.length, $scope.limit.to);  
                }
            );
        };

        //Find all 'Live' files
        $scope.showLiveFiles = function(){
            resetLimit();
            searchRepository.findAllFiles().then(
                function(files){
                    $scope.allfiles = files.data.filter(function(file){
                        if (file.live === true)
                            return file;
                    });
                    $scope.limit.to = Math.min($scope.allfiles.length, $scope.limit.to);  
                }
            );
        };

        //Get the Full Name from user objects
        $scope.getName = function(id){
            var fullName = '';
            $scope.users.filter(function(user){
                if (user.id === id){
                    fullName = user.givenName + " " + user.familyName;
                }
            });
            return fullName;
        };

        //View all files while clicked on the 'View all content' button
        $scope.viewAll = function(){
            $scope.limit.status = false;
            $scope.limit.to = $scope.allfiles.length;
        };

        //View less files while clicked on the 'View less content' button
        //Default limit is 5 files
        $scope.viewLess = function(){
            $scope.limit.status = true;
            $scope.limit.to = limit;
        };

    });