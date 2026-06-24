import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Platform } from 'react-native';
import axios from 'axios';
import { colors } from '../theme/colors';

const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

const DashboardScreen = ({ navigation }: any) => {
  const [tables, setTables] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTables = async () => {
    try {
      const res = await axios.get(`${API_URL}/floorplan/tables`);
      setTables(res.data);
    } catch (err) {
      console.error('Failed to fetch tables:', err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTables();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return colors.success;
      case 'OCCUPIED': return colors.error;
      case 'RESERVED': return colors.warning;
      default: return colors.border;
    }
  };

  const renderTable = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.tableCard, { borderColor: getStatusColor(item.status) }]}
      onPress={() => {
        // Mock navigation to an Order Screen for this table.
        // We will build this fully in Phase B.
        navigation.navigate('Orders', { tableId: item.id });
      }}
    >
      <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
      <Text style={styles.tableNumber}>{item.tableNumber}</Text>
      <Text style={styles.tableCapacity}>{item.capacity} Seats</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {tables.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tables found. Ask your manager to add tables via the Admin Panel.</Text>
        </View>
      ) : (
        <FlatList
          data={tables}
          keyExtractor={(item) => item.id}
          renderItem={renderTable}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    padding: 16,
  },
  tableCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    top: 12,
    right: 12,
  },
  tableNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 4,
  },
  tableCapacity: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default DashboardScreen;
