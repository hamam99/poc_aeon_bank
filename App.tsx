/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import './global.css';

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootNavigator />
      <Toast />
    </SafeAreaProvider>
  );
}

export default App;
