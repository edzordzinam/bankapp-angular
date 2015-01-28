/**
 * Created by Edzordzinam on 25/01/2015.
 * Bankapp Directives holder
 */
//Module name: bankapp.directives

angular.module('bankapp.directives', [])

    .directive('numberFormat', ['$filter', '$parse', function ($filter, $parse) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelController) {

                var decimals = $parse(attrs.decimals)(scope);

                ngModelController.$parsers.push(function (data) {
                    // Attempt to convert user input into a numeric type to store
                    // as the model value (otherwise it will be stored as a string)
                    // NOTE: Return undefined to indicate that a parse error has occurred
                    //       (i.e. bad user input)
                    var parsed = parseFloat(data);
                    return !isNaN(parsed) ? parsed : undefined;
                });

                ngModelController.$formatters.push(function (data) {
                    //convert data from model format to view format
                    return $filter('number')(data, decimals); //converted
                });

                element.bind('focus', function () {
                    element.val(ngModelController.$modelValue);
                });

                element.bind('blur', function () {
                    // Apply formatting on the stored model value for display
                    var formatted = $filter('number')(ngModelController.$modelValue, decimals);
                    element.val(formatted);
                });
            }
        }
    }])

    .directive('caret', function () {
        function setCaretPosition(elem, caretPos) {
            if (elem != null) {
                if (elem.createTextRange) {
                    var range = elem.createTextRange();
                    range.move('character', caretPos);
                    range.select();
                } else {
                    if (elem.selectionStart) {
                        elem.focus();
                        elem.setSelectionRange(caretPos, caretPos);
                    } else
                        elem.focus();
                }
            }
        }

        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelController) {

                ngModelController.$parsers.push(function (data) {
                    if (data != null) {
                        var length = 0;
                        if (isNaN(data)) {
                            length = data.length;
                        }
                        else {
                            length = data.toString().length
                        }

                        function getString(data, length) {
                            if (isNaN(data)) {
                                return data.substring(0, length);
                            } else {
                                return data.toString().substring(0, length);
                            }
                        }

                        if (length >= attrs.stop) {
                            var transformedInput = getString(data, attrs.stop);
                            ngModelController.$setViewValue(transformedInput);
                            ngModelController.$render();
                            setCaretPosition(element[0], attrs.caret);

                            if (length == (parseInt(attrs.stop) + 1)) {
                                var transformedInput = getString(data, 1);
                                ngModelController.$setViewValue(transformedInput);
                                ngModelController.$render();
                                return transformedInput;
                            }
                            return transformedInput;
                        }
                    }
                });
            }
        };
    });

