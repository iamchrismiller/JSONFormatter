/*global define */

/**
 * JSON -> HTML Formatter
 * A JSON to HTML formatter for use with AMD/Non-AMD
 * Convert basic JSON datatypes (number, string, boolean, null, object, array) into an HTML fragments.
 *
 * Based On Firefox/Chrome Extension's :
 *  - Ben Hollis @bhollis (Firefox Extension - http://jsonview.com/)
 *  - Jamie Wilkinson @jamiew (Chrome Port - https://github.com/jamiew/jsonview-chrome)
 *
 * Code Extracted and modified to be a more reusable following the (Universal Module Definition) pattern.
 *
 *  Usage :
 *    var html = new JSONFormatter().toHtml(json);
 *
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root.JSONFormatter = factory(root);
  }
}(this, function () {

  var JSONFormatter = function (options) {
    if (options) this.options = options;
  };

  JSONFormatter.prototype = {
    htmlEncode : function (t) {
      return t != null ? t.toString().replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';
    },

    decorateWithSpan : function (value, dataType) {
      if (dataType === 'string' && /^(http|https):\/\/[^\s]+$/.test(value)) {
        return '<a href="' + value + '">' + this.htmlEncode(value) + '</a>';
      }
      return '<span class="' + dataType + '">' + this.htmlEncode(value) + '</span>';
    },

    valueToHTML : function (key,value) {
      var valueType = typeof value,
        output = '';

      if (value == null) {
        output += this.decorateWithSpan('null', 'null');
      } else {
        switch (valueType) {
          case 'string' :
          case 'number':
          case 'boolean' :
            output += this.callDataTypeMethod(valueType, this.decorateWithSpan, key, value);
            break;

          //Recursive Methods
          case 'object':
            output += this.callDataTypeMethod(valueType, this.objectToHTML, key, value);
            break;
          case 'array' :
            if (value.constructor === Array) {
              output += this.callDataTypeMethod(valueType, this.arrayToHTML, key, value);
            }
            break;
        }
      }
      return output;
    },

    callDataTypeMethod : function (type, defaultMethod, key, value) {
      var overrideMethod = this.options && this.options[type] ? this.options[type] : false;
      if (overrideMethod && typeof overrideMethod === 'function') {
        var overrideHTML = overrideMethod.call(this, key, value);
        //false from override call default
        if (!overrideHTML) return defaultMethod.call(this, value, type);
        return overrideHTML;
      } else {
        return defaultMethod.call(this, value, type);
      }
    },

    // Convert an array into an HTML fragment
    arrayToHTML    : function (json) {
      var output = '[<ul class="array">',
        hasContents = false;
      for (var prop in json) {
        hasContents = true;
        output += '<li>';
        output += this.valueToHTML(prop, json[prop]);
        output += '</li>';
      }
      output += '</ul>]';
      if (!hasContents) output = "[ ]";
      return output;
    },

    // Convert a JSON object to an HTML fragment
    objectToHTML   : function (json) {
      var output = '{<ul class="obj">',
        hasContents = false;
      for (var prop in json) {
        hasContents = true;
        output += '<li>';
        output += '<span class="prop">' + this.htmlEncode(prop) + '</span>: ';
        output += this.valueToHTML(prop, json[prop]);
        output += '</li>';
      }
      output += '</ul>}';
      if (!hasContents) output = "{ }";
      return output;
    },

    toHtml : function (json) {
      var output = '<div id="json">';
      //null key because its fresh json
      output += this.valueToHTML(null, json);
      output += '</div>';
      return output;
    }
  };

  return JSONFormatter;
}));