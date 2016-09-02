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

            $httpBackend.expectGET(url + 'users').respond(200, users);
            $httpBackend.expectGET(url + 'types').respond(200, types);
            $httpBackend.expectGET(url + 'files').respond(200, files);
            $httpBackend.flush();
        });

    });

    it('should be able to show all users', function(){
        expect(scope.numOfUsers).toEqual(2);
        expect(scope.users).toEqual(users);
        expect(scope.users[0].givenName).toBe('Peter');
    });

    it('should be able to show all live files', function(){
        expect(scope.allfiles.length).toEqual(1);
        expect(scope.allfiles[0].title).toBe('Selwebu cu.');
        expect(scope.allfiles[0].live).toBe(true);
    });

    it('should be able to show all types', function(){
        expect(scope.alltypes.length).toEqual(2);
        expect(scope.alltypes[0].id).toBe('article');
    });

    it('should be return full name of a person given the id', function(){
        var name = scope.getName(1);
        expect(name).toEqual('Peter Capaldi');
    });

    it('should be able to show error message when users returns 500', inject(function($httpBackend,searchRepository){
        $httpBackend.expectGET(url + 'users').respond(500, []);
        searchRepository.findAllUsers().then(function(resp){
            expect(resp.length).toEqual(0);
            expect(scope.error).toBe("Looks like something went wrong in the backend. Please try again");
        });
        $httpBackend.flush();
    }));

    it('should be able to show All files', inject(function($httpBackend){
        $httpBackend.expectGET(url + 'files').respond(200, files);
        scope.limit.status = false;
        scope.showAllFiles();
        $httpBackend.flush();
        expect(scope.allfiles.length).toEqual(2);
        expect(scope.limit.to).toEqual(2);
    }));

    it('should be able to show Live files', inject(function($httpBackend){
        $httpBackend.expectGET(url + 'files').respond(200, files);
        scope.limit.status = false;
        scope.showLiveFiles();
        $httpBackend.flush();
        expect(scope.allfiles.length).toEqual(1);
        expect(scope.limit.to).toEqual(1);
    }));

    it('should be able to show Published files', inject(function($httpBackend){
        $httpBackend.expectGET(url + 'files').respond(200, files);
        scope.limit.status = false;
        scope.showPublishedFiles();
        $httpBackend.flush();
        expect(scope.allfiles.length).toEqual(1);
        expect(scope.limit.to).toEqual(1);
        expect(scope.allfiles[0].status).toBe('Published');
    }));

    it('should be able to see all data', function(){
        scope.viewAll();
        expect(scope.limit.status).toBe(false);
        expect(scope.limit.to).toBe(1);
    });

    it('should be able to see less data', function(){
        scope.viewLess();
        expect(scope.limit.status).toBe(true);
        expect(scope.limit.to).toBe(5);
    });
});