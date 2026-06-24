import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';

const menuItems = [
  { id: 'Inventory', title: 'Inventory Management', icon: 'package-variant' },
  { id: 'Employee', title: 'Staff & Shifts', icon: 'account-group' },
  { id: 'Customer', title: 'Customer Loyalty', icon: 'star-circle-outline' },
  { id: 'QROrdering', title: 'QR Ordering', icon: 'qrcode-scan' },
  { id: 'Analytics', title: 'Advanced Analytics', icon: 'chart-line' },
];

const MoreMenuScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container}>
      {menuItems.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.menuItem}
          onPress={() => navigation.navigate(item.id)}
        >
          <Icon name={item.icon} size={24} color={colors.primary} />
          <Text style={styles.menuText}>{item.title}</Text>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    marginBottom: 1, // acts as border bottom
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
  },
});

export default MoreMenuScreen;
