import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // Dummy login logic; replace with real authentication
    if (isLogin) {
      navigation.navigate('Dashboard');
    }
  };

  const handleRegister = () => {
    // Dummy registration logic; replace with real backend API
    navigation.navigate('Dashboard');
  };

  const handleVerifyOtp = () => {
    if (otp === '1234') {
      alert('OTP Verified!');
      setOtpSent(false);
      navigation.navigate('Dashboard');
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              {isLogin ? 'Admin Login' : 'Admin Registration'}
            </Text>
          </View>

          {otpSent ? (
            // OTP Verification Screen
            <View style={styles.formContainer}>
              <Text style={styles.otpText}>Enter the OTP sent to your registered email</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Enter OTP"
                keyboardType="numeric"
                maxLength={4}
                value={otp}
                onChangeText={setOtp}
              />
              <TouchableOpacity onPress={handleVerifyOtp} style={styles.otpButton}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Login or Registration Form
            <View style={styles.formContainer}>
              {!isLogin && (
                <TextInput
                  style={styles.inputField}
                  placeholder="Full Name"
                  placeholderTextColor="#8E8E8E"
                />
              )}
              <TextInput
                style={styles.inputField}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor="#8E8E8E"
              />
              <TextInput
                style={styles.inputField}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#8E8E8E"
              />
              {!isLogin && (
                <TextInput
                  style={styles.inputField}
                  placeholder="Confirm Password"
                  secureTextEntry
                  placeholderTextColor="#8E8E8E"
                />
              )}
              <TouchableOpacity
                onPress={isLogin ? handleLogin : handleRegister}
                style={styles.submitButton}
              >
                <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={styles.toggleButton}>
                <Text style={styles.toggleText}>
                  {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 25,
  },
  headerContainer: {
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4C4C4C',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 25,
    width: '100%',
    alignItems: 'center',
  },
  inputField: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 18,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  otpText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#6D6D6D',
    marginBottom: 20,
  },
  otpButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 45,
    borderRadius: 10,
    marginTop: 15,
  },
  submitButton: {
    backgroundColor: '#0066FF',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 25,
  },
  logoutButton: {
    backgroundColor: '#FF4D4D',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 15,
  },
  toggleButton: {
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleText: {
    textAlign: 'center',
    color: '#0066FF',
    fontSize: 14,
  },
});
