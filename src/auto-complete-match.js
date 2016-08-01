'use strict';

/**
 * @ngdoc directive
 * @name tiAutocompleteMatch
 * @module ngTagsInput
 *
 * @description
 * Represents an autocomplete match. Used internally by the autoComplete directive.
 */
const tiAutocompleteMatch = ($sce, tiUtil) => ({
  restrict: 'E',
  require: '^autoComplete',
  template: '<ng-include src="$$template"></ng-include>',
  scope: {
    $scope: '=scope',
    data: '='
  },
  link(scope, element, attrs, autoCompleteCtrl) {
    var autoComplete = autoCompleteCtrl.registerAutocompleteMatch(),
      options = autoComplete.getOptions();

    scope.$$template = options.template;
    scope.$index = scope.$parent.$index;

    scope.$highlight = function(text) {
      if (options.highlightMatchedText) {
        text = tiUtil.safeHighlight(text, autoComplete.getQuery());
      }
      return $sce.trustAsHtml(text);
    };
    scope.$getDisplayText =  function() {
      return tiUtil.safeToString(scope.data[options.displayProperty || options.tagsInput.displayProperty]);
    };
  }
});

export default tiAutocompleteMatch;
