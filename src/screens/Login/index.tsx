import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../theme/colors';

function isEmailValid(email: string) {
  const re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  return re.test(String(email).toLowerCase());
}

interface LoginProps {
  onSignIn: (email: string, password: string) => void;
  loading?: boolean;
  authError?: string;
}

export default function LoginScreen({ onSignIn, loading = false, authError = '' }: LoginProps): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailError = useMemo(() => {
    if (!touched.email) {return '';}
    if (!email) {return 'Email is required';}
    if (!isEmailValid(email)) {return 'Enter a valid email address';}
    return '';
  }, [email, touched.email]);

  const passwordError = useMemo(() => {
    if (!touched.password) {return '';}
    if (!password) {return 'Password is required';}
    if (password.length < 6) {return 'At least 6 characters';}
    return '';
  }, [password, touched.password]);

  const canSubmit = isEmailValid(email) && password.length >= 6 && !loading;

  const onSubmit = () => {
    if (!canSubmit) return;
    onSignIn(email, password);
  };

  return (
    <SafeAreaView style={styles.root} testID="login-screen">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <View style={styles.header}>
          <View style={styles.logoCircle} testID="login-logo" />
          <Text style={styles.title} testID="login-title">Welcome back</Text>
          <Text style={styles.subtitle} testID="login-subtitle">Sign in to continue</Text>
        </View>

        <View style={styles.form}>
          <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor={colors.textDim}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
              returnKeyType="next"
              editable={!loading}
              testID="login-email-input"
            />
          </View>
          {!!emailError && <Text style={styles.errorText} testID="login-email-error">{emailError}</Text>}

          <View style={[styles.inputWrapper, passwordError ? styles.inputError : null]}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="••••••••"
                placeholderTextColor={colors.textDim}
                secureTextEntry={secure}
                value={password}
                onChangeText={setPassword}
                onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                returnKeyType="done"
                editable={!loading}
                testID="login-password-input"
              />
              <TouchableOpacity onPress={() => setSecure(s => !s)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} testID="login-password-toggle">
                <Text style={styles.toggle}>{secure ? 'Show' : 'Hide'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {!!passwordError && <Text style={styles.errorText} testID="login-password-error">{passwordError}</Text>}

          <TouchableOpacity style={styles.forgotBtn} testID="login-forgot-button">
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.primaryBtn, !canSubmit && styles.primaryBtnDisabled]}
            activeOpacity={0.8}
            disabled={!canSubmit}
            onPress={onSubmit}
            testID="login-signin-button"
          >
            <Text style={styles.primaryBtnText}>Sign In</Text>
          </TouchableOpacity>
          {!!authError && (
            <Text style={[styles.errorText, { textAlign: 'center' }]} testID="login-auth-error">{authError}</Text>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don’t have an account? <Text style={styles.footerLink} testID="login-signup-link">Sign up</Text></Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    paddingTop: 24,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 6,
    color: colors.textDim,
    fontSize: 14,
  },
  form: {
    gap: 12,
  } as any,
  inputWrapper: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputError: {
    borderColor: colors.danger,
  },
  inputLabel: {
    color: colors.textDim,
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    color: colors.text,
    fontSize: 16,
    paddingVertical: 6,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
    marginRight: 8,
  },
  toggle: {
    color: colors.primary,
    fontWeight: '600',
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: -6,
    marginBottom: 6,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    paddingVertical: 6,
  },
  forgotText: {
    color: colors.textDim,
    fontSize: 13,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryBtnDisabled: {
    opacity: 0.5,
  },
  primaryBtnText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    color: colors.textDim,
  },
  footerLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});
