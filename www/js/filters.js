angular.module('bankapp.filters', [])

    .filter("money", function (numberFilter) {
        function isNumeric(value) {
            return (!isNaN(parseFloat(value)) && isFinite(value));
        }

        return function (inputNumber, currencySymbol, decimalSeparator, thousandsSeparator, decimalDigits) {
            if (isNumeric(inputNumber)) {
                // Default values for the optional arguments
                currencySymbol = (typeof currencySymbol === "undefined") ? "£" : currencySymbol;
                decimalSeparator = (typeof decimalSeparator === "undefined") ? "." : decimalSeparator;
                thousandsSeparator = (typeof thousandsSeparator === "undefined") ? "," : thousandsSeparator;
                decimalDigits = (typeof decimalDigits === "undefined" || !isNumeric(decimalDigits)) ? 0 : decimalDigits;

                if (decimalDigits < 0) decimalDigits = 0;

                // Format the input number through the number filter
                // The resulting number will have "," as a thousands separator
                // and "." as a decimal separator.
                var formattedNumber = numberFilter(inputNumber, decimalDigits);

                // Extract the integral and the decimal parts
                var numberParts = formattedNumber.split(".");

                // Replace the "," symbol in the integral part
                // with the specified thousands separator.
                numberParts[0] = numberParts[0].split(",").join(thousandsSeparator);

                // Compose the final result
                var result = currencySymbol + numberParts[0];

                if (numberParts.length == 2) {
                    result += decimalSeparator + numberParts[1];
                }

                return result;
            }
            else {
                return inputNumber;
            }
        };
    })

    .filter('dateSuffix', function ($filter) {
        var suffixes = ["th", "st", "nd", "rd"];
        return function (input) {
            var dtfilter = $filter('date')(input, 'MMMM dd');
            var day = parseInt(dtfilter.slice(-2));
            var relevantDigits = (day < 30) ? day % 20 : day % 30;
            var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
            return dtfilter + suffix;
        };
    })

    .filter('dateCustom', function ($filter) {

        var getOrdinalSuffix = function (number) {
            var suffixes = ["'th'", "'st'", "'nd'", "'rd'"];
            var relevantDigits = (number < 30) ? number % 20 : number % 30;
            return (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
        }

        var getIndecesOfDayCharacter = function (format) {
            var dayRegex = /(?:'(?:[^']|'')*')|(?:d+)/g;
            var matchingIndices = [];
            var finishedLooking = false;

            while (!finishedLooking) {
                var matches = dayRegex.exec(format);
                if (matches) {
                    dayRegex.lastIndex = matches.index + matches[0].length;
                    if (matches[0] === 'd') {
                        matchingIndices.push(matches.index + 1);
                    }
                } else {
                    finishedLooking = true;
                }
            }
            return matchingIndices;
        };

        var insertAtIndex = function (inputString, index, stringToInsert) {
            var partBeforeIndex = inputString.substring(0, index);
            var partAfterIndex = inputString.substring(index, inputString.length);
            return partBeforeIndex + stringToInsert + partAfterIndex;
        };

        return function (timestamp, format) {
            var date = new Date(timestamp);
            var dayOfMonth = date.getDate();
            var suffix = getOrdinalSuffix(dayOfMonth);

            var matchingIndices = getIndecesOfDayCharacter(format);

            // now we to insert the suffix at the index(-ces) that we found
            for (var i = matchingIndices.length; i > 0; i--) {
                format = insertAtIndex(format, matchingIndices[i - 1], suffix);
            }

            return $filter('date')(new Date(timestamp), format);
        };
    })