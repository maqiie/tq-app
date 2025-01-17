// components/Employees.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Employees = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employees Page</Text>
      <Text style={styles.content}>View and manage all employees here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
  },
  content: {
    fontSize: 16,
    color: '#495057',
  },
});

export default Employees;
