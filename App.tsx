import { NavigationContainer,  } from '@react-navigation/native';
import { StyleSheet, Text, View,  } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detalhes from './app/screens/Detalhes';
import Lista from './app/screens/Lista';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista" component={Lista}/>
        <Stack.Screen name="Detalhes" component={Detalhes}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
