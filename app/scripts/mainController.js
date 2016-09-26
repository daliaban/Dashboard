/**
 * Created on 01/09/16.
 * This is the controller for the main view.
 */
'use strict';

angular.module('Dashboard')
    .controller('mainCtrl', function($scope, searchRepository){
        $scope.error = '';
        $scope.users = [];
        $scope.alltypes = [];
        $scope.limit = {default: 5}; //Default limit is 5 files

        var resetLimit = function(){
            $scope.limit.status = true;
            $scope.limit.to = $scope.limit.default;
        };
        
        //Find all users from API
        searchRepository.findAllUsers().then(
            function(users){
                //If success, get types and files
                $scope.numOfUsers = users.data.length;
                $scope.users = users.data;
                showTypes();
                $scope.showFiles("live");
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

        $scope.showFiles = function(type){
            resetLimit();
            searchRepository.findAllFiles().then(
                function(files){
                    if(type==="all"){
                        $scope.allfiles = files.data;
                    }else {
                        $scope.allfiles = files.data.filter(function(file){
                            if(type==="published") {
                                if (file.status === "Published") return file;
                            }
                            if (type==="live"){
                                if (file.live === true) return file;
                            }
                        });
                    }
                    $scope.limit.to = Math.min($scope.allfiles.length, $scope.limit.to);
                }
            );
        };

    });