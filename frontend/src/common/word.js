(function() {
    app.service('word', ['$http', function ($http) {
        'use strict';

        /**
         * Generates a random string
         *
         * @returns {object}    The generated random string containing [a-z] chars
         *                      It contains the token (plain string) and a hash on char occurrences
         *                      to be able to calculate the validity of the submissions afterwards
         */
        function generateBaseString() {
            var baseStringObj = { token: '', hash: {}},
                length = 10 + Math.round(Math.random() * 10),
                chars = 'aabcdeefghiijklmnoopqrstuuvwxyz', //duplicate vowels to decrease difficulty
                selectedChar,
                totalCharOcurrences;
            for (var i = 0; i < length; i++) {
                selectedChar = chars[Math.round(Math.random() * (chars.length - 1))];
                baseStringObj.token += selectedChar;
                totalCharOcurrences = baseStringObj.hash[selectedChar] || 0;
                baseStringObj.hash[selectedChar] = ++totalCharOcurrences;
            }
            return baseStringObj;
        }

        /**
         * Analyses the validity of the typed word based on the previously generated base string
         *
         * @param {string}      word            The string that the user has typed
         * @param {object}      baseStringHash  The hash with the number of occurrences
         *                                      of each string from the base one
         *
         * @returns {boolean}                   True if the typed word is valid (that means,
         *                                      the chars appear on the base string
         *                                      with a valid number of occurrences
         *                                      False otherwise
         */
        function checkSyntacticValidity(word, baseStringHash) {
            var analyzedStringHash = angular.extend({}, baseStringHash),
                currentChar,
                isValid = true;
            word = word.toLowerCase().trim();
            for(var i = 0; i < word.length; i++) {
                currentChar = word[i];
                if(!analyzedStringHash[currentChar]) {
                    isValid = false;
                    break;
                } else {
                    analyzedStringHash[currentChar]--;
                }
            }
            return isValid;
        }

        /**
         * Sends the typed word to the server in order to check its validity
         * according to a stablished word list
         *
         * @param {string}      word    The string that the user has typed
         *
         * @returns {object}            A promise containing the result of the request
         *                              If the word is found, the promise is expected to be resolved
         *                              being rejected otherwise
         */
        function submitWord(word) {
            return $http.post('/submit-word', { word: word })
        }

        return  {
            generateBaseString: generateBaseString,
            checkSyntacticValidity: checkSyntacticValidity,
            submitWord: submitWord
        };
    }]);
})();
