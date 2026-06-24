import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState, AppDispatch } from '../../store';
import { fetchMenu, toggleAvailabilityAPI, toggleItemAvailabilityLocal } from '../../store/menuSlice';
import { colors } from '../../theme/colors';

const MenuManagementScreen = () => {
  const { categories, items, loading } = useSelector((state: RootState) => state.menu);
  const dispatch = useDispatch<AppDispatch>();
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  useEffect(() => {
    // Set the first category as active by default once loaded
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories]);

  const filteredItems = items.filter(item => item.categoryId === activeCategory);

  const renderCategory = ({ item }: { item: any }) => {
    const isActive = item.id === activeCategory;
    return (
      <TouchableOpacity 
        style={[styles.categoryPill, isActive && styles.categoryPillActive]}
        onPress={() => setActiveCategory(item.id)}
      >
        <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderMenuItem = ({ item }: { item: any }) => (
    <View style={styles.menuItemCard}>
      <View style={styles.menuItemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
      </View>
      <View style={styles.menuItemActions}>
        <Text style={[styles.availabilityText, !item.isAvailable && { color: colors.error }]}>
          {item.isAvailable ? 'Available' : 'Sold Out'}
        </Text>
        <Switch
          value={item.isAvailable}
          onValueChange={() => {
            // Optimistic update locally
            dispatch(toggleItemAvailabilityLocal(item.id));
            // Send to backend
            dispatch(toggleAvailabilityAPI(item.id));
          }}
          trackColor={{ false: '#D1D5DB', true: colors.primary }}
        />
        <TouchableOpacity style={styles.editButton}>
          <Icon name="pencil" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manage Menu</Text>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" size={20} color={colors.surface} />
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderCategory}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderMenuItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items in this category.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surface,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: colors.surface,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  categoriesContainer: {
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.background,
    marginRight: 8,
  },
  categoryPillActive: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: colors.surface,
  },
  listContainer: {
    padding: 16,
  },
  menuItemCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  menuItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 12,
    color: colors.success,
    marginRight: 8,
  },
  editButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
  },
});

export default MenuManagementScreen;
