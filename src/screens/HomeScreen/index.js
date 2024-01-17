import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BackgroundGradient from '../../Components/backgroundGradient';
import {useTranslation} from 'react-i18next';
import SelectDropdown from 'react-native-select-dropdown';
import {useDispatch} from 'react-redux';
import {setLanguage} from '../../app/Slices/languageSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  const navigation = useNavigation();

  const navigateToWorkoutPrograms = () => {
    navigation.navigate('WorkoutPrograms');
  };

  const navigateToExerciseGroups = () => {
    navigation.navigate('ExerciseGroups');
  };
  const navigateToCreateProgram = () => {
    navigation.navigate('CreateProgram');
  };

  const lng = ['uk', 'en'];

  const url = 'http://t.me/ogonick';
  const urlBank = 'https://send.monobank.ua/jar/4UqRWZh3CL';

  return (
    <BackgroundGradient>
      <SelectDropdown
        data={lng}
        onSelect={(selectedItem, index) => {
          changeLanguage(selectedItem);
          dispatch(setLanguage(selectedItem));
        }}
        defaultButtonText={'uk'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={styles.buttonStyle}
        buttonTextStyle={styles.buttonTextStyle}
        dropdownStyle={styles.dropdownStyle}
        rowTextStyle={styles.rowTextStyle}
        selectedRowTextStyle={styles.selectedRowTextStyle}
      />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={navigateToWorkoutPrograms}
          style={styles.button}>
          <View style={styles.buttonContainer}>
            <Text style={styles.text}>{t('home.trainPrograms')}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToExerciseGroups}
          style={styles.button}>
          <View style={styles.buttonContainer}>
            <Text style={styles.text}>{t('home.exerciseGroups')}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToCreateProgram}
          style={styles.button}>
          <View style={styles.buttonContainer}>
            <Text style={styles.text}>{t('home.createProgram')}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.containerContact}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(url).catch(err =>
              console.error('An error occurred', err),
            )
          }
          style={styles.link}>
          <Image
            style={styles.linkIcon}
            source={require('../../img/icons8-telegram-48.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(urlBank).catch(err =>
              console.error('An error occurred', err),
            )
          }
          style={styles.link}>
          <Image
            style={styles.linkIcon}
            source={require('../../img/iconsCash-50.png')}
          />
        </TouchableOpacity>
      </View>
    </BackgroundGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.25,
    shadowRadius: 18.46,
    elevation: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'rgba(25, 31, 52, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  buttonStyle: {
    marginTop: 5,
    width: 60,
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  buttonTextStyle: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  dropdownStyle: {
    textTransform: 'uppercase',
    borderRadius: 5,
  },
  rowTextStyle: {
    textTransform: 'uppercase',
  },
  selectedRowTextStyle: {
    textDecorationLine: 'underline',
  },
  link: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkIcon: {
    width: 40,
    height: 40,
  },
  linkText: {
    fontSize: 18,
  },
  contactText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  containerContact: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: '#000',
    borderTopWidth: 0.5,
    paddingVertical: 5,
  },
});

export default HomeScreen;
