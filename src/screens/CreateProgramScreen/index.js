/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Dropdown2 from './Dropdown2';
import BackgroundGradient from '../../Components/backgroundGradient';
import {useTranslation} from 'react-i18next';
import {addProgram} from '../../app/Slices/programSlice';

const CreateProgramScreen = () => {
  const language = useSelector(state => state.language.lng);
  const {t, i18n} = useTranslation();
  const data = useSelector(
    state => state.exercise[language] || state.exercise.uk,
  );
  const exerciseGroup = useSelector(state =>
    language === 'uk' ? state.exerciseGroup.uk : state.exerciseGroup.en,
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [programDays, setProgramDays] = useState([]);

  const handleAddDay = () => {
    setProgramDays(prev => [
      ...prev,
      {day: programDays.length + 1, exercises: []},
    ]);
  };

  const handleRemoveDay = () => {
    if (programDays.length > 1) {
      setProgramDays(programDays.slice(0, -1));
    }
  };

  const handleAddExerciseToDay = (day, exercises) => {
    setProgramDays(prevDays => {
      return prevDays.map(prevDay =>
        prevDay.day === day
          ? {
              ...prevDay,
              exercises: Array.isArray(prevDay.exercises)
                ? [...prevDay.exercises, exercises]
                : [exercises],
            }
          : prevDay,
      );
    });
  };

  const handleDeleteExercise = id => {
    setProgramDays(prevDays => {
      return prevDays.map(prevDay => {
        return {
          ...prevDay,
          exercises: prevDay.exercises.filter(item => item.numberId !== id),
        };
      });
    });
  };

  const handleCreateProgram = () => {
    const program = {
      id: uuid.v4(),
      title,
      description,
      days: programDays,
    };

    dispatch(addProgram(program));

    navigation.navigate('Home');
  };

  return (
    <BackgroundGradient>
      <ScrollView style={styles.container}>
        <Text style={styles.titleText}>
          {t('createProgram.createNewProgram')}
        </Text>
        <TextInput
          placeholderTextColor={'white'}
          style={styles.inputText}
          maxLength={50}
          placeholder={t('createProgram.programTitle')}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholderTextColor={'white'}
          style={styles.inputText}
          maxLength={300}
          placeholder={t('createProgram.programDescription')}
          value={description}
          onChangeText={setDescription}
        />
        {programDays.length < 5 && !!title.length && (
          <Button title={t('createProgram.addDay')} onPress={handleAddDay} />
        )}
        {programDays.length > 1 && (
          <Button
            title={t('createProgram.removeDay')}
            onPress={handleRemoveDay}
          />
        )}
        <View style={styles.containerDays}>
          <FlatList
            scrollEnabled={false}
            data={programDays}
            keyExtractor={item => item.day.toString()}
            renderItem={({item}) => (
              <View style={styles.containerDay}>
                <View style={styles.containerDaysText}>
                  <Text style={styles.textDay}>
                    {t('createProgram.day')} {item.day}
                  </Text>
                  <Text style={styles.textDay}>
                    {t('createProgram.approach')}{' '}
                    {t('createProgram.repetitions')}
                  </Text>
                </View>
                <Dropdown2
                  onSelect={exercises =>
                    handleAddExerciseToDay(item.day, exercises)
                  }
                  data={data}
                  exerciseGroup={exerciseGroup}
                  t={t}
                />
                <FlatList
                  scrollEnabled={false}
                  data={item.exercises}
                  renderItem={({item, index}) => (
                    <View style={styles.itemExercise}>
                      <Text numberOfLines={1} style={styles.textExercises}>
                        {index + 1}
                        {'. '}
                        {item.title} {item.approach}x{item.repetitions}
                      </Text>
                      <Pressable
                        style={styles.button}
                        onLongPress={() => handleDeleteExercise(item.numberId)}
                        onPress={() => handleDeleteExercise(item.numberId)}
                        delayLongPress={800}>
                        <Image
                          style={styles.iconDelete}
                          source={require('../../img/delete-icon.png')}
                        />
                      </Pressable>
                    </View>
                  )}
                  keyExtractor={item => item.numberId}
                />
              </View>
            )}
          />
        </View>

        {!!programDays[0]?.exercises.length && (
          <Button
            title={t('createProgram.createProgram')}
            onPress={handleCreateProgram}
          />
        )}
      </ScrollView>
    </BackgroundGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    paddingVertical: 5,
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
  inputText: {
    color: '#fff',
    textAlign: 'center',
    borderWidth: 0.5,
    marginBottom: 5,
    height: 40,
    borderRadius: 5,
    borderColor: '#fff',
    backgroundColor: 'rgba(112,128,144, 0.5)',
  },
  containerDays: {
    backgroundColor: 'rgba(112,128,144, 0.2)',
  },
  containerDay: {
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  textDay: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  itemExercise: {
    paddingHorizontal: 3,
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
    fontSize: 14,
    color: '#000',
    maxWidth: '94%',
  },
  button: {
    alignItems: 'center',
    minWidth: 20,
  },
  containerDaysText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  iconDelete: {
    width: 16,
    height: 16,
  },
});

export default CreateProgramScreen;
