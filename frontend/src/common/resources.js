var less;
(function () {
    'use strict';

    function getScript(url) {
        document.write('<script type="text/javascript" src="' + url + '"></script>');
    }

    function getStyleSheet(url) {
        var fileExtension = url.split('.').pop(), rel = (fileExtension === 'less') ? '/less' : '';
        document.write('<link type="text/css" href="' + url + '" rel="stylesheet' + rel + '" />');
    }

    var srcPath = '../../src', vendorPath = '../../vendor/';

    //External libraries
    getScript(vendorPath + '/angularJs/angular.js');
    getScript(vendorPath + '/angularJs/angular-ui-router.js');

    //Common src resources
    getScript(srcPath + '/common/app.js');
    getScript(srcPath + '/common/word.js');
    getStyleSheet(srcPath + '/common/main.less');

    //Business logic src resources
    //Home
    getScript(srcPath + '/app/home/HomeCtrl.js');

    //Less vendor library (has to be loaded at the end of the stylesheet chain
    getScript(vendorPath + '/less/less.js');
})();