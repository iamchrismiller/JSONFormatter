# JSON -> HTML Formatter
================

A JSON to HTML formatter for use with AMD/Non-AMD

 Convert basic JSON datatypes (number, string, boolean, null, object, array) into an HTML fragments.

 Code Extracted and modified to be a more reusable following the (Universal Module Definition) pattern.

 Based On Firefox/Chrome Extension's :
  - Ben Hollis @bhollis (Firefox Extension - http://jsonview.com/)
  - Jamie Wilkinson @jamiew (Chrome Port - https://github.com/jamiew/jsonview-chrome)

## Usage

  `new JSONFormatter(options).toHtml(json);`

  Supported `options`
    - number
    - string
    - boolean
    - object
    - array

  Example `options` override

```javascript
   var formatterOptions = {
          'string' : function(key,val) {
            if (key === 'id') return '<a class="link" data-request="'+val+'">'+val+'</a>';
            return false;
          }
        };
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using grunt.

## Release History

- 0.1.1 Updated Build Dependencies
- 0.1.0 Initial release

## License

[MIT](http://opensource.org/licenses/mit-license.php)/[BSD](http://opensource.org/licenses/bsd-license.php)

## Author

Chris Miller