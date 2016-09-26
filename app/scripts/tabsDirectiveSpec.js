/**
 * Created by dalia on 26/09/16.
 */

/**
 * Created on 02/09/16.
 */
'use strict';

describe('Directive: tabsDir', function() {

    var scope, direlement, element;
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

    beforeEach(module('Dashboard'));
    beforeEach(preloadTpl('views/tabs.html')); //preload the template

    beforeEach(inject(function ($compile, $rootScope) {
            scope = $rootScope.$new();
            direlement = angular.element('<div tabs-dir allfiles="allfiles" show-files="showFiles" limit="limit" users="users"></div>');
            scope.allfiles = files;
            scope.limit = {default: 5};
            scope.users = users;
            element = $compile(direlement)(scope);
            scope.$digest();
    }));

    it('should have limit defaults to 5', function(){
       expect(scope.limit.default).toBe(5);
    });

    it('should be return full name of a person given the id', function(){
        var isolated = element.isolateScope();
        var name = isolated.getName(1);
        expect(name).toEqual('Peter Capaldi');
    });

    it('should be able to see all data', function(){
        var isolated = element.isolateScope();
        isolated.viewAll();
        expect(isolated.limit.status).toBe(false);
        expect(isolated.limit.to).toBe(2);
    });

    it('should be able to see less data', function(){
        var isolated = element.isolateScope();
        isolated.viewLess();
        expect(scope.limit.status).toBe(true);
        expect(scope.limit.to).toBe(5);
    });
});