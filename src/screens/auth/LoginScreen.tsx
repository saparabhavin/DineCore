import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { signIn } from '../../store/authSlice';
import { colors } from '../../theme/colors';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Basic stub: In real app we make an axios call here
    if (email && password) {
      dispatch(signIn({ token: 'dummy-jwt-token', user: { email } }));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DineCore POS</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>
      
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Email Address" 
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{ marginTop: 20 }}>
        <Text style={{ color: colors.primary }}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', padding: 24 },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.primary, textAlign: 'center' },
  subtitle: { fontSize: 16, color: colors.textSecondary, textAlign: 'center', marginBottom: 40 },
  inputContainer: { marginBottom: 20 },
  input: { backgroundColor: colors.surface, padding: 16, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
  button: { backgroundColor: colors.primary, padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: colors.surface, fontSize: 18, fontWeight: 'bold' }
});

export default LoginScreen;
