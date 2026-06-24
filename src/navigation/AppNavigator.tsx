import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';

import DashboardScreen from '../screens/DashboardScreen';
import MenuManagementScreen from '../screens/MenuManagementScreen';
import OrderManagementScreen from '../screens/OrderManagementScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.text,
        }}
      >
        <Tab.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="view-dashboard" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen 
          name="Orders" 
          component={OrderManagementScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="clipboard-text" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen 
          name="Menu" 
          component={MenuManagementScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="food" color={color} size={size} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
