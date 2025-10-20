// screens/OwnerSignup.tsx
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const OwnerSignup: React.FC = () => {
  const navigation = useNavigation<any>();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): { valid: boolean; message?: string } => {
    if (!fullName.trim()) return { valid: false, message: 'Enter full name.' };
    if (!email.trim() || !emailRegex.test(email)) return { valid: false, message: 'Enter a valid email.' };
    if (phone && !/^\+?[0-9]{7,15}$/.test(phone)) return { valid: false, message: 'Enter a valid phone number.' };
    if (password.length < 6) return { valid: false, message: 'Password must be at least 6 characters.' };
    if (password !== confirmPassword) return { valid: false, message: 'Passwords do not match.' };
    return { valid: true };
  };

  const handleSignup = async () => {
    const { valid, message } = validate();
    if (!valid) {
      Alert.alert('Validation error', message);
      return;
    }

    try {
      setSubmitting(true);
      // TODO: Replace with your signup API call
      console.log('Signing up owner:', { fullName, email, phone });

      // Simulate API delay
      setTimeout(() => {
        setSubmitting(false);
        Alert.alert('Success', 'Account created.');
        // Navigate to the Owner screen after signup
        navigation.navigate('owner');
      }, 800);
    } catch (err) {
      setSubmitting(false);
      console.error('Signup error', err);
      Alert.alert('Signup failed', 'Something went wrong — try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={22} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Owner Sign up</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor="#999"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Phone (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="+94 7x xxx xxxx"
              placeholderTextColor="#999"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Create password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#999" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              placeholderTextColor="#999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={[styles.signupButton, submitting && styles.disabledButton]}
              onPress={handleSignup}
              disabled={submitting}
            >
              <Text style={styles.signupButtonText}>{submitting ? 'Creating...' : 'Create account'}</Text>
            </TouchableOpacity>

            <View style={styles.row}>
              <Text style={styles.smallText}>Already have an account?</Text>
              {/* This now goes to the Owner screen as requested */}
              <TouchableOpacity onPress={() => navigation.navigate('owner')}>
                <Text style={[styles.smallText, styles.linkText]}> Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OwnerSignup;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  keyboardView: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backButton: { padding: 6, marginRight: 10 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#1a1a1a' },
  formContainer: { marginTop: 6 },
  label: { fontSize: 13, color: '#666', marginBottom: 6 },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1a1a1a',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 12,
  },
  passwordInput: { flex: 1, borderWidth: 0, marginBottom: 0, paddingVertical: 12 },
  eyeIcon: { paddingHorizontal: 12, paddingVertical: 10 },
  signupButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  disabledButton: { opacity: 0.7 },
  signupButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  smallText: { fontSize: 13, color: '#666' },
  linkText: { color: '#2196F3', fontWeight: '600' },
});
