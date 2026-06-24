import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const AnalyticsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Advanced Analytics</Text>
      <Text style={styles.subtitle}>AI Sales Forecasting & Multi-Branch Data</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
  },
});

export default AnalyticsScreen;
