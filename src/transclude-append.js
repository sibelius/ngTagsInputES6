'use strict';

/**
 * @ngdoc directive
 * @name tiTranscludeAppend
 * @module ngTagsInput
 *
 * @description
 * Re-creates the old behavior of ng-transclude. Used internally by tagsInput directive.
 */
const tiTranscludeAppend = () => ({
  link(scope, element, attrs, ctrl, transcludeFn) {
    transcludeFn((clone) => {
      element.append(clone);
    });
  },
});

export default tiTranscludeAppend;