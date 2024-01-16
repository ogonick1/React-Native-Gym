import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExerciseGroupsScreen from './src/screens/ExerciseGroupScreen';
import ExercisesScreen from './src/screens/ExercisesScreen';
import WorkoutProgramsScreen from './src/screens/WorkoutProgramsScreen';
import ProgramExercisesScreen from './src/screens/ProgramExercisesScreen';
import ExerciseDetailScreen from './src/screens/ExerciseDetailScreen';
import HomeScreen from './src/screens/HomeScreen';
import {Provider} from 'react-redux';
import {store, persistor} from './src/app/store';
import {PersistGate} from 'redux-persist/integration/react';
import CreateProgramScreen from './src/screens/CreateProgramScreen';
import '../gym/src/plugins/i18n';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#0057B7'},
            }}
            initialRouteName="Home">
            <Stack.Screen
              options={{headerShown: false}}
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="CreateProgram"
              component={CreateProgramScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="ExerciseGroups"
              component={ExerciseGroupsScreen}
            />
            <Stack.Screen
              name="Exercises"
              component={ExercisesScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="WorkoutPrograms"
              component={WorkoutProgramsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="ProgramExercises"
              component={ProgramExercisesScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="ExerciseDetail"
              component={ExerciseDetailScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
