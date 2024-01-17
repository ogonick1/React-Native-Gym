import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useSelector} from 'react-redux';
import BackgroundGradient from '../../Components/backgroundGradient';

const ExerciseGroupsScreen = () => {
  const language = useSelector(state => state.language.lng);
  const data = useSelector(
    state => state.exerciseGroup[language] || state.exerciseGroup.uk,
  );

  const navigation = useNavigation();

  const navigateToExercises = group => {
    navigation.navigate('Exercises', {group});
  };

  return (
    <BackgroundGradient>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigateToExercises(item)}>
              <View style={styles.buttonContainer}>
                <Text style={styles.text}>{item.group}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </BackgroundGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 50,
    backgroundColor: '#rgba(112,128,144, 0.5)',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    height: 80,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    textTransform: 'capitalize',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ExerciseGroupsScreen;
