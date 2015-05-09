app.controller('HomeCtrl', ['$scope', 'word', function ($scope, word) {

    $scope.word = '';
    $scope.msg = '';
    $scope.isWordValid = false;
    $scope.baseStringObj = word.generateBaseString();

    $scope.checkSyntacticValidity = function (typedWord) {
        $scope.msg = '';
        $scope.isWordValid = isWordValid(typedWord);
    };

    $scope.submitWord = function (typedWord) {
        word.submitWord(typedWord)
            .then(function (response) {
                $scope.msg = response.data.msg;
            }).catch(function (err) {
                $scope.isWordValid = false;
                $scope.msg = err.data.msg;
            });
    };

    $scope.getValidityClasses = function (isWordValid) {
        var validityClass = (isWordValid) ? 'valid' : 'invalid',
            validityClassObj = {};
        validityClassObj[validityClass] = true;
        return validityClassObj;
    };

    function isWordValid(typedWord) {
        return typedWord && word.checkSyntacticValidity(typedWord, $scope.baseStringObj.hash)
    }
}]);