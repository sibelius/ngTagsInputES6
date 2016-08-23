'use strict';

/**
 * @ngdoc directive
 * @name tiTagItem
 * @module ngTagsInput
 *
 * @description
 * Represents a tag item. Used internally by the tagsInput directive.
 */
import template from './tag-item.html';

const tiTagItem = (tiUtil) => ({
  restrict: 'E',
  require: '^tagsInput',
  template,
  // template: '<ng-include src="$$template"></ng-include>',
  scope: {
    $scope: '=scope',
    data: '='
  },
  link(scope, element, attrs, tagsInputCtrl) {
    var tagsInput = tagsInputCtrl.registerTagItem(),
      options = tagsInput.getOptions();

    scope.$$template = options.template;
    scope.$$removeTagSymbol = options.removeTagSymbol;

    scope.$getDisplayText = () => {
      return tiUtil.safeToString(scope.data[options.displayProperty]);
    };
    scope.$removeTag = () => {
      tagsInput.removeTag(scope.$index);
    };

    scope.$watch('$parent.$index', (value) => {
      scope.$index = value;
    });
  }
});

export default tiTagItem;