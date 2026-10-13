module.exports = {
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
  },
  // `transform` replaces the preset's map, so the asset transformer is repeated here.
  // `.mjs` is listed because ESM-only packages such as lucide-react-native resolve to
  // it under the `react-native` export condition and would otherwise load untransformed.
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
    '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$':
      '@react-native/jest-preset/jest/assetFileTransformer.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-native-screens|react-native-safe-area-context|react-native-reanimated|react-native-worklets|nativewind|react-native-css-interop|lucide-react-native)/)',
  ],
};
