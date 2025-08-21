import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';

interface HomeProps {
  email?: string;
  onLogout: () => void;
}

export default function HomeScreen({ email, onLogout }: HomeProps): React.JSX.Element {
  return (
    <SafeAreaView style={styles.root} testID="home-screen">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title} testID="home-title">Home</Text>
          {!!email && (
            <Text style={styles.subtitle} testID="home-subtitle">Signed in as {email}</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          activeOpacity={0.85}
          onPress={onLogout}
          testID="home-logout-button"
        >
          <Text style={styles.primaryBtnText}>Log out</Text>
        </TouchableOpacity>
      </View>
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
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 32,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 8,
    color: colors.textDim,
    fontSize: 14,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
