// import React from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import LoginScreen from './components/LoginScreen';

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <LoginScreen />
//     </SafeAreaProvider>
//   );
// }

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import AuthScreen from './components/LoginForm';
// import Dashboard from './components/Dashboard';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Auth">
//         <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Dashboard" component={Dashboard} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


// App.js
import React from 'react';
import Navigation from './Navigation';

export default function App() {
  return <Navigation />;
}
