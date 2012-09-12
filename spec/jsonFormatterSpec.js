/*global $, it, expect, JSONFormatter */

describe('Base Functionality Suite', function(){
  "use strict";

  it('Should Be An Instance Of JSONFormatter', function(){
    var formatter = new JSONFormatter();
    expect(formatter instanceof JSONFormatter).toBeTruthy();
  });

  it('Should return html string with one prop and string span', function(){
    var json = { id : '1234' };
    var html = new JSONFormatter().toHtml(json);

    //@todo Finish Writing Test Cases

  });

});