const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.alias = {
  '@': './',
  '@app': './app',
  '@assets': './assets',
  '@components': './components',
  '@constants': './constants',
  '@hooks': './hooks',
  '@scripts': './scripts',
};

module.exports = defaultConfig;
