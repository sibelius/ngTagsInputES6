import angular from 'angular';
import AutoComplete from './auto-complete';
import AutoCompleteMatch from './auto-complete-match';
import AutoSize from './autosize';
import BindAttrs from './bind-attrs';
import TagItem from './tag-item';
import TagsInput from './tags-input';
import TranscludeAppend from './transclude-append';
import tiUtil from './util';
import tagsInputConfig from './configuration';

export default angular.module('ngTagsInput', [])
  .service('tiUtil', tiUtil)
  .provider('tagsInputConfig', tagsInputConfig)
  .directive('autoComplete', AutoComplete)
  .directive('tiAutocompleteMatch', AutoCompleteMatch)
  .directive('tiAutosize', AutoSize)
  .directive('tiBindAttrs', BindAttrs)
  .directive('tiTagItem', TagItem)
  .directive('tagsInput', TagsInput)
  .directive('tiTranscludeAppend', TranscludeAppend);

