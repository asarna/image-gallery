const {injectBabelPlugin} = require('react-app-rewired');

module.exports = function override(config, env) {
  config = injectBabelPlugin('transform-object-rest-spread', config);
  return config;
}