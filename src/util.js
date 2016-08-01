'use strict';

/***
 * @ngdoc service
 * @name tiUtil
 * @module ngTagsInput
 *
 * @description
 * Helper methods used internally by the directive. Should not be called directly from user code.
 */
import angular from 'angular';

class TiUtil {
  constructor($timeout, $q) {
    this.$timeout = $timeout;
    this.$q = $q;
  }

  debounce = (fn, delay) => {
    const { $timeout } = this;

    var timeoutId;
    return () => {
      var args = arguments;
      $timeout.cancel(timeoutId);
      timeoutId = $timeout(() => { fn.apply(null, args); }, delay);
    };
  };

  makeObjectArray = (array, key) => {
    if (!angular.isArray(array) || array.length === 0 || angular.isObject(array[0])) {
      return array;
    }

    var newArray = [];
    array.forEach(function(item) {
      var obj = {};
      obj[key] = item;
      newArray.push(obj);
    });
    return newArray;
  };

  findInObjectArray = (array, obj, key, comparer) => {
    var item = null;
    comparer = comparer || this.defaultComparer;

    array.some((element) => {
      if (comparer(element[key], obj[key])) {
        item = element;
        return true;
      }
    });

    return item;
  };

  defaultComparer = (a, b) => {
    // I'm aware of the internationalization issues regarding toLowerCase()
    // but I couldn't come up with a better solution right now
    return safeToString(a).toLowerCase() === safeToString(b).toLowerCase();
  };

  safeHighlight = (str, value) => {
    str = encodeHTML(str);
    value = encodeHTML(value);

    if (!value) {
      return str;
    }

    const escapeRegexChars = (str) => {
      return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    };

    var expression = new RegExp('&[^;]+;|' + escapeRegexChars(value), 'gi');
    return str.replace(expression, (match) => {
      return match.toLowerCase() === value.toLowerCase() ? '<em>' + match + '</em>' : match;
    });
  };

  safeToString = (value) => {
    return angular.isUndefined(value) || value == null ? '' : value.toString().trim();
  };

  encodeHTML = (value) => {
    return this.safeToString(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  handleUndefinedResult = (fn, valueIfUndefined) => {
    return () => {
      var result = fn.apply(null, arguments);
      return angular.isUndefined(result) ? valueIfUndefined : result;
    };
  };

  replaceSpacesWithDashes = (str) => {
    return this.safeToString(str).replace(/\s/g, '-');
  };

  isModifierOn = (event) => {
    return event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;
  };

  promisifyValue = (value) => {
    const { $q } = this;

    value = angular.isUndefined(value) ? true : value;
    return $q[value ? 'when' : 'reject']();
  };

  simplePubSub = () => {
    var events = {};
    return {
      on(names, handler, first) {
        names.split(' ').forEach(function(name) {
          if (!events[name]) {
            events[name] = [];
          }
          var method = first ? [].unshift : [].push;
          method.call(events[name], handler);
        });
        return this;
      },
      trigger(name, args) {
        var handlers = events[name] || [];
        handlers.every((handler) => {
          return this.handleUndefinedResult(handler, true)(args);
        });
        return this;
      }
    };
  };
}

export default TiUtil;