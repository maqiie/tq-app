// components/Debtors.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Debtors = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Debtors Page</Text>
      <Text style={styles.content}>Here, you can manage all debtors' details.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
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

export default Debtors;
