process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = (config) => {
    config.set({
        autoWatch: false,
        basePath: '',
        browsers: ['ChromeHeadless'],
        colors: true,
        exclude: [],
        failOnEmptyTestSuite: false,
        files: [
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/long-stack-trace-zone.js',
            'node_modules/zone.js/dist/proxy.js',
            'node_modules/zone.js/dist/sync-test.js',
            'node_modules/zone.js/dist/mocha-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',
            'test/test-shim.ts',
            {
                pattern: 'src/**/*spec.ts',
            },
        ],
        frameworks: [
            'jasmine',
            'karma-typescript',
        ],
        logLevel: config.LOG_ERROR,
        plugins: [
            'karma-spec-reporter',
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-typescript',
        ],
        preprocessors: {
            '**/*.ts': 'karma-typescript'
        },
        karmaTypescriptConfig: {
            tsconfig: './tsconfig.json',
        },
        port: 9876,
        reporters: ['spec', 'karma-typescript'],
        singleRun: true,
    });
};