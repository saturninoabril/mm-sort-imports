'use strict';

const packageDevDependencies = {
    "babel-cli": "6.26.0",
    "babel-core": "6.26.0",
    "babel-eslint": "7.2.3",
    "babel-jest": "21.2.0",
    "babel-loader": "7.1.2",
    "babel-plugin-module-resolver": "2.7.1",
    "babel-plugin-transform-runtime": "6.23.0",
    "babel-polyfill": "6.26.0",
    "babel-preset-es2015": "6.24.1",
    "babel-preset-react": "6.24.1",
    "babel-preset-stage-0": "6.24.1",
    "copy-webpack-plugin": "4.0.1",
    "cross-env": "5.0.5",
    "css-loader": "0.28.7",
    "enzyme": "3.0.0",
    "enzyme-to-json": "3.0.1",
    "eslint": "3.17.1",
    "eslint-plugin-react": "6.10.0",
    "exports-loader": "0.6.4",
    "extract-text-webpack-plugin": "3.0.0",
    "file-loader": "0.11.2",
    "html-loader": "0.5.1",
    "html-webpack-plugin": "2.30.1",
    "identity-obj-proxy": "3.0.0",
    "image-webpack-loader": "3.4.2",
    "imports-loader": "0.7.1",
    "jest": "21.2.1",
    "jest-cli": "21.2.1",
    "jquery-deferred": "0.3.1",
    "jsdom": "11.2.0",
    "jsdom-global": "3.0.2",
    "json-loader": "0.5.7",
    "nightwatch": "0.9.16",
    "node-sass": "4.5.3",
    "raw-loader": "0.5.1",
    "react-addons-test-utils": "15.6.2",
    "remote-redux-devtools": "0.5.12",
    "remote-redux-devtools-on-debugger": "0.8.2",
    "sass-loader": "6.0.6",
    "selenium-standalone": "6.9.0",
    "style-loader": "0.18.2",
    "url-loader": "0.5.9",
    "webpack": "3.6.0",
    "webpack-node-externals": "1.6.0"
  };

const dependencies = {};

Object.assign(dependencies, packageDevDependencies);

module.exports = { default: Object.keys(dependencies) };
