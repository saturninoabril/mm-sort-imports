'use strict';

const mattermostDependencies = {
    "marked": "mattermost/marked#70eba71f18ab4d2e2bae6b3490a855ac6021a21f",
    "mattermost-redux": "mattermost/mattermost-redux#master",
  };

const dependencies = {};

Object.assign(dependencies, mattermostDependencies);

module.exports = { default: Object.keys(dependencies) };
