'use strict';

const packageDependencies = {
    "autolinker": "1.4.4",
    "bootstrap": "3.3.7",
    "bootstrap-colorpicker": "2.5.2",
    "chart.js": "2.7.0",
    "compass-mixins": "0.12.10",
    "exif2css": "1.2.0",
    "fastclick": "1.0.6",
    "font-awesome": "4.7.0",
    "highlight.js": "9.12.0",
    "html-to-react": "1.3.0",
    "inobounce": "0.1.5",
    "intl": "1.2.5",
    "jasny-bootstrap": "3.1.3",
    "key-mirror": "1.0.1",
    "localforage": "1.5.0",
    "match-at": "0.1.1",
    "object-assign": "4.1.1",
    "pdfjs-dist": "1.9.607",
    "perfect-scrollbar": "0.8.1",
    "superagent": "3.6.1",
    "twemoji": "2.5.0",
    "velocity-animate": "1.5.0",
    "webrtc-adapter": "5.0.4",
    "whatwg-fetch": "2.0.3",
    "xregexp": "3.2.0"
  };

const dependencies = {};

Object.assign(dependencies, packageDependencies);

module.exports = { default: Object.keys(dependencies) };
