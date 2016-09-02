/**
 * Created by dalia on 01/09/16.
 * src: http://stackoverflow.com/questions/24039226/angularjs-format-text-return-from-json-to-title-case
 */

angular.module('Dashboard')
    .filter('titleCase', function() {
        return function(input) {
            input = input || '';
            return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        };
    });