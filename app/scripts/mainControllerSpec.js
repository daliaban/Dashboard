/**
 * Created by dalia on 02/09/16.
 */
'use strict';

describe('controller:mainCtrl', function() {

    var scope, controller;
    var url = 'http://localhost:3001/';
    var users = [{
            "id": 1,
            "givenName": "Peter",
            "familyName": "Capaldi"
        },
        {
            "id": 2,
            "givenName": "Matt",
            "familyName": "Smith"
        }
    ];

    var types = [{
            "creationDateTime": "2016-08-17T13:07:19.800Z",
            "id": "article",
            "documentsCount": 5,
            "description": "Articles about the programme",
            "name": "Article Page",
            "colourId": "golden"
        },
        {
            "creationDateTime": "2016-08-13T15:00:44.200Z",
            "id": "profile",
            "documentsCount": 6,
            "description": "Actor/Actress profiles",
            "name": "Profile Page",
            "colourId": "spray"
        }
    ];

    var files = [
        {
            "creationDateTime": "2015-12-02T23:16:59.205Z",
            "status": "Published",
            "modifiedBy": 4,
            "type": "profile",
            "uri": "/project/test/content/d00790b6-bf2a-57a3-88f4-cc0ecefc226c",
            "version": 1,
            "id": "d00790b6-bf2a-57a3-88f4-cc0ecefc226c",
            "fileId": "Selwebu-cu.",
            "scheduled": false,
            "title": "Selwebu cu.",
            "createdBy": 8,
            "modifiedDateTime": "2015-12-03T04:16:59.205Z",
            "live": true
        },
        {
            "creationDateTime": "2015-07-02T14:30:51.939Z",
            "status": "In progress",
            "modifiedBy": 4,
            "type": "profile",
            "uri": "/project/test/content/7ed530d0-be39-58bf-a604-3888c447ac5f",
            "version": 1,
            "id": "7ed530d0-be39-58bf-a604-3888c447ac5f",
            "fileId": "Ravzodif-koh.",
            "scheduled": false,
            "title": "Ravzodif koh.",
            "createdBy": 1,
            "modifiedDateTime": "2015-07-02T17:30:51.939Z",
            "live": false
        }
    ];

    beforeEach(function () {
        module('Dashboard');

        inject(function ($controller, $rootScope, $filter, $httpBackend) {
            scope = $rootScope.$new();
            controller = $controller('mainCtrl', {
                $scope: scope
            });

            $httpBackend.expectGET(url + 'users').respond(200, {data: users});
            $httpBackend.expectGET(url + 'types').respond(200, {data: types});
            $httpBackend.expectGET(url + 'files').respond(200, {data: files});
        });

    });

    it('should be able to show all users', inject(function($httpBackend,searchRepository){
        $httpBackend.expectGET(url + 'users').respond(200, {data: users});
        searchRepository.findAllUsers().then(function(resp){
            expect(resp).toEqual(users);
            expect(scope.numOfUsers).toEqual(2);
            expect(scope.users).toEqual(users);
        });
        $httpBackend.flush();
    }));

    it('should be able to show error message when users returns 500', inject(function($httpBackend,searchRepository){
        $httpBackend.expectGET(url + 'users').respond(500, {data: []});
        searchRepository.findAllUsers().then(function(resp){
            expect(resp.length).toEqual(0);
        });
        $httpBackend.flush();
    }));

});