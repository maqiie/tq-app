import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Debtors from './components/Debtors';
import Settings from './components/Settings';
import Employees from './components/Employees';
import Revenue from './components/Revenue';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Debtors" component={Debtors} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Employees" component={Employees} />
        <Stack.Screen name="Revenue" component={Revenue} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
