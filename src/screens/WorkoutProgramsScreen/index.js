import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {programDelete} from '../../programSlice/programSlice';
import {useTranslation} from 'react-i18next';
import ModalWindow from '../../Components/Modal/Modal';
import BackgroundGradient from '../../assets/backgroundGradient';

const CustomWorkoutProgramsScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const {t, i18n} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalId, setModalId] = useState('');
  const language = useSelector(state => state.language.lng);
  const customProgram = useSelector(state =>
    language === 'uk' ? state.program.uk : state.program.en,
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const navigateToProgramExercises = program => {
    navigation.navigate('ProgramExercises', {program});
  };

  const openModal = id => {
    setModalVisible(true);
    setModalId(id);
  };

  const deleteProgram = () => {
    setModalVisible(false);
    dispatch(programDelete(modalId));
    setModalId('');
  };

  return (
    <BackgroundGradient>
      <View style={styles.container}>
        <Text style={[styles.text, styles.textWhite]}>
          {t('workoutPrograms.trainPrograms')}
        </Text>
        <ModalWindow
          deleteProgram={deleteProgram}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <View>
          <FlatList
            data={customProgram}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.buttonItem}
                onPress={() => navigateToProgramExercises(item)}>
                <View style={styles.buttonContainer}>
                  <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.text}>
                      {index + 1}
                      {'. '}
                      {item.title}
                    </Text>
                  </View>
                  <View style={styles.textContainerButton}>
                    {item.id.length > 3 ? (
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => openModal(item.id)}>
                        <Image
                          style={styles.iconDelete}
                          source={require('../../img/delete-icon.png')}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
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
    paddingHorizontal: 5,
    marginVertical: 50,
  },
  buttonItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 15,
    height: 60,
    marginBottom: 12,
    shadowColor: '#000',
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
    justifyContent: 'space-evenly',
    height: '100%',
    width: '100%',
    paddingHorizontal: 2,
  },
  textContainer: {
    flex: 9,
    marginHorizontal: 2,
  },
  textContainerButton: {
    flex: 1,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  textWhite: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {},
  iconDelete: {
    height: 30,
    width: 30,
  },
});

export default CustomWorkoutProgramsScreen;
