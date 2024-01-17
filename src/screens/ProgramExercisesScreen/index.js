import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import BackgroundGradient from '../../Components/backgroundGradient';
import {useTranslation} from 'react-i18next';

const ProgramExercisesScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const {t, i18n} = useTranslation();
  const language = useSelector(state => state.language.lng);
  const data = useSelector(
    state => state.exercise[language] || state.exercise.en,
  );
  const navigation = useNavigation();
  const route = useRoute();
  const {program} = route.params;

  const navigateToExerciseDetail = exercise => {
    navigation.navigate('ExerciseDetail', {exercise});
  };

  const findExercises = id => {
    const exercisesFind = data.find(exercise => exercise.id === id);
    return exercisesFind;
  };

  return (
    <BackgroundGradient>
      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        <Text style={styles.textTitle}>{program.title}</Text>
        {program.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{program.description}</Text>
          </View>
        )}
        <View style={styles.daysContainer}>
          <FlatList
            scrollEnabled={false}
            data={program.days}
            keyExtractor={item => item.day}
            renderItem={({item}) => (
              <View style={styles.dayContainer}>
                <Text style={styles.textDay}>
                  {t('createProgram.day')}
                  {':'}
                  {item.day}
                </Text>
                <FlatList
                  scrollEnabled={false}
                  data={item.exercises}
                  // eslint-disable-next-line no-shadow
                  keyExtractor={item => String(item.id)}
                  // eslint-disable-next-line no-shadow
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      style={styles.itemExercises}
                      onPress={() =>
                        navigateToExerciseDetail(findExercises(item.id))
                      }>
                      <Text numberOfLines={1} style={styles.textExercises}>
                        {index + 1}
                        {'.'}
                        {item.title}
                      </Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="middle"
                        style={styles.textExercisesApproach}>
                        {item.approach}
                        {'x'}
                        {item.repetitions}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          />
        </View>
      </ScrollView>
    </BackgroundGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 5,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
    backgroundColor: '#rgba(112,128,144, 0.5)',
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
    textTransform: 'uppercase',
  },
  descriptionContainer: {
    borderRadius: 10,
    backgroundColor: '#rgba(112,128,144, 0.3)',
  },
  descriptionText: {
    fontSize: 16,
    color: '#fff',
  },
  daysContainer: {
    backgroundColor: '#rgba(112,128,144, 0.2)',
    borderRadius: 10,
    marginVertical: 5,
  },
  dayContainer: {
    marginTop: 5,
    paddingBottom: 5,
  },
  textDay: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
  },
  itemExercises: {
    flex: 1,
    paddingHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 5,
    height: 30,
    marginBottom: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.25,
    shadowRadius: 18.46,
    elevation: 22,
  },
  textExercises: {
    fontSize: 15,
    color: '#000',
    marginHorizontal: 1,
    flex: 14,
    //maxWidth: '85%',
  },
  textExercisesApproach: {
    fontSize: 15,
    color: '#000',
    flex: 2,
  },
});

export default ProgramExercisesScreen;
