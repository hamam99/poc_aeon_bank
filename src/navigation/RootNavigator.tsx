import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from './types';
import DashboardScreen from '../screens/DashboardScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import TransactionScreen from '../screens/TransactionScreen';
import ScreenName from './ScreenName';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenName.DashboardScreen}>
        <Stack.Screen
          name={ScreenName.DashboardScreen}
          component={DashboardScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={ScreenName.TransactionScreen}
          component={TransactionScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={ScreenName.TransactionDetailScreen}
          component={TransactionDetailScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
