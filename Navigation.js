import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Debtors from './components/Debtors';
import Settings from './components/Settings';
import Employees from './components/Employees';
import Revenue from './components/Revenue';
import { Button } from 'react-native';

// Create a Stack Navigator
const Stack = createStackNavigator();

// The navigation configuration
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        {/* Auth screen */}
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{
            headerShown: false, // Hide header for login screen
          }}
        />
        
        {/* Dashboard screen */}
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Dashboard', // Set custom title
            headerStyle: {
              backgroundColor: '#4CAF50', // Custom header color
            },
            headerTintColor: '#fff', // Color of the title
            headerRight: () => (
              <Button
                onPress={() => alert('Logout functionality can be implemented here')}
                title="Logout"
                color="#fff"
              />
            ),
          }}
        />

        {/* Debtors screen */}
        <Stack.Screen
          name="Debtors"
          component={Debtors}
          options={{
            title: 'Debtors',
            headerStyle: {
              backgroundColor: '#F44336', // Custom header color for Debtors screen
            },
            headerTintColor: '#fff', // Set text color
          }}
        />

        {/* Settings screen */}
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: 'Settings',
            headerStyle: {
              backgroundColor: '#3F51B5', // Custom header color
            },
            headerTintColor: '#fff', // Set text color
          }}
        />

        {/* Employees screen */}
        <Stack.Screen
          name="Employees"
          component={Employees}
          options={{
            title: 'Employees',
            headerStyle: {
              backgroundColor: '#9C27B0', // Custom header color for Employees screen
            },
            headerTintColor: '#fff', // Set text color
          }}
        />

        {/* Revenue screen */}
        <Stack.Screen
          name="Revenue"
          component={Revenue}
          options={{
            title: 'Revenue',
            headerStyle: {
              backgroundColor: '#FFC107', // Custom header color for Revenue screen
            },
            headerTintColor: '#fff', // Set text color
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
