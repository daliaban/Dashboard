/**
 * Created on 02/09/16.
 */
'use strict';

describe('filter:titleCase', function() {
    var filter;

    beforeEach(function () {
      module('Dashboard');

      inject(function (_$filter_) {
        filter = _$filter_;
      });
    });

  it('should make a string Title case', function () {
    var foo = 'hello world', result;  
    result = filter('titleCase')(foo);
    expect(result).toEqual('Hello World');
    result = filter('titleCase')('');
    expect(result).toEqual('');
  });    
});