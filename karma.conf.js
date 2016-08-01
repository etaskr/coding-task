module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'public/lib/spin.js/spin.js',
            'public/lib/angular/angular.js',
            'public/lib/angular-route/angular-route.js',
            'public/lib/angular-spinner/angular-spinner.js',
            'public/lib/angular-mocks/angular-mocks.js',
            'public/application.js',
            'public/*[!lib]*/*.js',
            'public/tests/unit/*.js'
        ],
        reporters: ['progress'],
        browsers: ['PhantomJS'],
        captureTimeout: 60000,
        singleRun: true
    });
};