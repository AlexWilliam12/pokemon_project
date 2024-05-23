import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Header from './src/components/Header';
import { DataProvider } from './src/context';
import DetailScreen from './src/screens/details';
import IntroScreen from './src/screens/intro';
import HomeScreen from './src/screens/home';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Intro'>
          <Stack.Screen
            name='Intro'
            component={IntroScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{
              headerTitle: (props) => <Header {...props} />,
            }}
          />
          <Stack.Screen
            name='Details'
            component={DetailScreen}
            options={{
              headerTitle: (props) => <Header {...props} />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flex: 0.1,
    backgroundColor: 'blue',
  },
});