/**
 * Created by dalia on 01/09/16.
 */
'use strict';

angular.module('Dashboard')
    .controller('mainCtrl', function($scope, searchRepository){
        $scope.error = '';
        $scope.limit = {status: true, to: 5};
        $scope.users = [];
        $scope.alltypes = [];

        searchRepository.findAllUsers().then(
            function(users){
                $scope.numOfUsers = users.data.length;
                $scope.users = users.data;
            },
            function(data) {
                if (data.status === 500){
                    $scope.error = "Looks like something went wrong in the backend. Please try again"
                }
            }
        );

        searchRepository.findAllTypes().then(
            function(types){
                $scope.alltypes = types.data;
            }
        );

        $scope.showAllFiles = function(){
            searchRepository.findAllFiles().then(
                function(files){
                    $scope.allfiles = files.data;
                    if ($scope.limit.status === false)
                        $scope.limit.to = $scope.allfiles.length;
                }
            );
        };

        $scope.showPublishedFiles = function(){
            searchRepository.findAllFiles().then(
                function(files){
                    $scope.allfiles = files.data.filter(function(file){
                        if (file.status === "Published")
                            return file;
                    });
                    if ($scope.limit.status === false)
                        $scope.limit.to = $scope.allfiles.length;
                }
            );
        };

        $scope.showLiveFiles = function(){
            searchRepository.findAllFiles().then(
                function(files){
                    $scope.allfiles = files.data.filter(function(file){
                        if (file.live === true)
                            return file;
                    });
                    if ($scope.limit.status === false)
                        $scope.limit.to = $scope.allfiles.length;
                }
            );
        };

        $scope.getName = function(id){
            var fullName = '';
            $scope.users.filter(function(user){
                if (user.id === id){
                    fullName = user.givenName + " " + user.familyName;
                }
            });
            return fullName;
        };

        $scope.viewAll = function(){
            $scope.limit.status = false;
            $scope.limit.to = $scope.allfiles.length;
        };
        $scope.viewLess = function(){
            $scope.limit.status = true;
            $scope.limit.to = 5;
        };

        $scope.showLiveFiles(); //Call it by default

    });