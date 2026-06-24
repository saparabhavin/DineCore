import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { colors } from '../theme/colors';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

// Phase 1 Screens
import DashboardScreen from '../screens/DashboardScreen';
import MenuManagementScreen from '../screens/MenuManagementScreen';
import OrderManagementScreen from '../screens/OrderManagementScreen';

// Phase 2 & 3 Screens
import MoreMenuScreen from '../screens/MoreMenuScreen';
import InventoryScreen from '../screens/InventoryScreen';
import EmployeeManagementScreen from '../screens/EmployeeManagementScreen';
import CustomerManagementScreen from '../screens/CustomerManagementScreen';
import QROrderingScreen from '../screens/QROrderingScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

const MoreStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.surface },
      headerTintColor: colors.text,
      headerBackTitleVisible: false,
    }}
  >
    <Stack.Screen name="MoreMenu" component={MoreMenuScreen} options={{ title: 'Settings & More' }} />
    <Stack.Screen name="Inventory" component={InventoryScreen} options={{ title: 'Inventory' }} />
    <Stack.Screen name="Employee" component={EmployeeManagementScreen} options={{ title: 'Employees' }} />
    <Stack.Screen name="Customer" component={CustomerManagementScreen} options={{ title: 'Customers' }} />
    <Stack.Screen name="QROrdering" component={QROrderingScreen} options={{ title: 'QR Ordering' }} />
    <Stack.Screen name="Analytics" component={AnalyticsScreen} options={{ title: 'Analytics' }} />
  </Stack.Navigator>
);

const MainApp = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
      headerStyle: { backgroundColor: colors.surface },
      headerTintColor: colors.text,
    }}
  >
    <Tab.Screen 
      name="Dashboard" 
      component={DashboardScreen} 
      options={{ tabBarIcon: ({ color, size }) => <Icon name="view-dashboard" color={color} size={size} /> }}
    />
    <Tab.Screen 
      name="Orders" 
      component={OrderManagementScreen} 
      options={{ tabBarIcon: ({ color, size }) => <Icon name="clipboard-text" color={color} size={size} /> }}
    />
    <Tab.Screen 
      name="Menu" 
      component={MenuManagementScreen} 
      options={{ tabBarIcon: ({ color, size }) => <Icon name="food" color={color} size={size} /> }}
    />
    <Tab.Screen 
      name="More" 
      component={MoreStack} 
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Icon name="dots-horizontal" color={color} size={size} />
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <NavigationContainer>
      {token == null ? <AuthStack /> : <MainApp />}
    </NavigationContainer>
  );
};

export default AppNavigator;
