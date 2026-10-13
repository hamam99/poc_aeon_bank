import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from './types';
import DashboardScreen from '../screens/DashboardScreen';
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
