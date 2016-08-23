'use strict';

/**
 * @ngdoc directive
 * @name tiAutosize
 * @module ngTagsInput
 *
 * @description
 * Automatically sets the input's width so its content is always visible. Used internally by tagsInput directive.
 */
const tiAutosize = (tagsInputConfig) => ({
  restrict: 'A',
  require: 'ngModel',
  link(scope, element, attrs, ctrl) {
    var threshold = tagsInputConfig.getTextAutosizeThreshold(),
      span, resize;

    span = angular.element('<span class="input"></span>');
    span.css('display', 'none')
      .css('visibility', 'hidden')
      .css('width', 'auto')
      .css('white-space', 'pre');

    element.parent().append(span);

    resize = (originalValue) => {
      var value = originalValue, width;

      if (angular.isString(value) && value.length === 0) {
        value = attrs.placeholder;
      }

      if (value) {
        span.text(value);
        span.css('display', '');
        width = span.prop('offsetWidth');
        span.css('display', 'none');
      }

      element.css('width', width ? width + threshold + 'px' : '');

      return originalValue;
    };

    ctrl.$parsers.unshift(resize);
    ctrl.$formatters.unshift(resize);

    attrs.$observe('placeholder', (value) => {
      if (!ctrl.$modelValue) {
        resize(value);
      }
    });
  }
});

export default tiAutosize;