// components/Revenue.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Revenue = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revenue Page</Text>
      <Text style={styles.content}>Manage and view revenue data here.</Text>
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

export default Revenue;
