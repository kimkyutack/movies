import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import Stack from './navigation/Stack';
import Root from './navigation/Root';
import { useColorScheme, View, Text  } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { darkTheme, lightTheme } from './styled';
const queryClient = new QueryClient();

export default function App() {

  const isDark = useColorScheme() === 'dark';

  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
  </ThemeProvider>
  </QueryClientProvider>
  );
}