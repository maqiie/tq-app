import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; // Import stack navigator
import Dashboard from './components/Dashboard'; // Your Dashboard component
import LoginScreen from './components/LoginForm'; 

// Create a Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName="Login">
        {/* Define the login screen */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }} 
        />
        {/* Define the dashboard screen */}
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{ title: 'Dashboard' }} 
        />
      </Stack.Navigator>
  );
};

export default App;
