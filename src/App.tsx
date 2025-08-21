import React from 'react';
import { StatusBar } from 'react-native';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import { colors } from './theme/colors';
import { useDemoAuth } from './hooks/useDemoAuth';

function App(): React.JSX.Element {
  const { isAuthenticated, user, loading, error, signIn, logout } = useDemoAuth();

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.background} />
      {isAuthenticated ? (
        <HomeScreen email={user?.email} onLogout={logout} />
      ) : (
        <LoginScreen onSignIn={signIn} loading={loading} authError={error} />
      )}
    </>
  );
}

export default App;
