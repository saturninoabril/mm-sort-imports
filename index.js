const Runner = require('jscodeshift/dist/Runner');
const resolve = require('path').resolve;
const omit  = require('./lib/omit');

module.exports = args => {
    const options = Object.assign({ quote: 'single', objectCurlySpacing: false, lineTerminator: '\n' }, omit(args, ['_', 'transform', 'path']));
    Runner.run(resolve(__dirname, `./transform.js`), args.path, options);
};
