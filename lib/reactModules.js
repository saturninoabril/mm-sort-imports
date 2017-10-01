'use strict';

const reactDependencies = {
    "flux": "3.1.3",
    "prop-types": "15.5.10",
    "react": "15.6.1",
    "react-addons-pure-render-mixin": "15.6.0",
    "react-bootstrap": "0.31.3",
    "react-color": "2.13.8",
    "react-custom-scrollbars": "4.1.2",
    "react-dom": "15.6.1",
    "react-intl": "2.4.0",
    "react-redux": "5.0.6",
    "react-router": "2.8.1",
    "react-select": "1.0.0-rc.10",
    "redux": "3.7.2",
    "redux-batched-actions": "0.2.0",
    "redux-persist": "4.10.1",
    "redux-persist-transform-filter": "0.0.15",
  };

const dependencies = {};

Object.assign(dependencies, reactDependencies);

module.exports = { default: Object.keys(dependencies) };
