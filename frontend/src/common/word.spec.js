describe('word service', function () {

    var wordService;

    beforeEach(module('javascriptWordGame'));
    beforeEach(inject(['word', function (word) {
        wordService = word;
    }]));

    //noinspection SpellCheckingInspection
    var scenarios = [
        { word: 'bla', isValid: true },
        { word: 'BLA', isValid: true },
        { word: 'ble', isValid: false },
        { word: 'blLa', isValid: true },
        { word: 'blae', isValid: false },
        { word: 'lab', isValid: true },
        { word: 'labl', isValid: true },
        { word: ' bla ', isValid: true },
        { word: 'bbla', isValid: false },
    ];

    scenarios.forEach(function (scenario) {

        it('must detect the validity of a given word (' + scenario.word + ') ' +
        'according to the existing base string hash', function () {

            var baseStringHash, isValid;

            given:
                baseStringHash = { b: 1, l: 2, a: 1};

            when:
                isValid = wordService.checkSyntacticValidity(scenario.word, baseStringHash);

            then:
                expect(isValid).toBe(scenario.isValid);
        });
    });
});
