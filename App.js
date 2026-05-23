import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CadastroScreen from './components/CadastroScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' 
        component={LoginScreen} 
        options={{ headerLeft: () => null }} />
        <Stack.Screen name='Cadastrar' 
        component={CadastroScreen}/>
        <Stack.Screen name='Home' 
        component={HomeScreen} 
        options={{ headerLeft: () => null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}