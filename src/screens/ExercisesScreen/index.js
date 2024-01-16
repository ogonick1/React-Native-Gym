import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import BackgroundGradient from '../../assets/backgroundGradient';

const ExercisesScreen = () => {
  const language = useSelector(state => state.language.lng);
  const data = useSelector(state =>
    language === 'uk' ? state.exercise.uk : state.exercise.en,
  );

  const navigation = useNavigation();
  const route = useRoute();
  const {group} = route.params;

  const navigateToExerciseDetail = exercise => {
    navigation.navigate('ExerciseDetail', {exercise});
  };

  const filteredExercises = data.filter(
    exercise => exercise.group === group.group,
  );

  return (
    <BackgroundGradient>
      <View style={styles.container}>
        <Text style={styles.text}>{group.group}</Text>
        <View style={styles.containerExercise}>
          <FlatList
            data={filteredExercises}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => navigateToExerciseDetail(item)}>
                <View style={styles.textContainer}>
                  <Text style={styles.textExercises}>
                    {index + 1}. {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </BackgroundGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(112,128,144, 0.5)',
    paddingVertical: 20,
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    textTransform: 'capitalize',
    color: '#fff',
  },
  textContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  textExercises: {
    fontSize: 22,
    color: '#fff',
  },
  containerExercise: {
    flex: 1,
  },
});

export default ExercisesScreen;
