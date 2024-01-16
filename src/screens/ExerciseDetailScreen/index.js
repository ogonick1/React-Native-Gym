import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import BackgroundGradient from '../../assets/backgroundGradient';
import Video from 'react-native-video';
import videos from './../../video/index';
import {useTranslation} from 'react-i18next';

const ExerciseDetailScreen = ({route}) => {
  const {exercise} = route.params;
  // eslint-disable-next-line no-unused-vars
  const {t, i18n} = useTranslation();
  return (
    <BackgroundGradient>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{exercise.title}</Text>
        {exercise.video in videos ? (
          <Video
            source={videos[exercise.video]}
            resizeMode="contain"
            onBuffer={this.onBuffer}
            onError={this.videoError}
            repeat={true}
            style={styles.video}
          />
        ) : null}
        {exercise.description && (
          <Text style={styles.textDescription}>{exercise.description}</Text>
        )}
        <Text style={styles.textTechnicTitle}>
          {t('exerciseDetail.technic')}
          {':'}
        </Text>
        <Text style={styles.textTechnic}>{exercise.technic}</Text>
        {exercise.note && (
          <View style={styles.containerNote}>
            <Text style={styles.textNote}>{exercise.note}</Text>
          </View>
        )}
        {exercise.warning && (
          <View style={styles.containerWarn}>
            <Text style={styles.textWarn}>{exercise.warning}</Text>
          </View>
        )}
      </ScrollView>
    </BackgroundGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  video: {
    width: '100%',
    height: 600,
  },
  textDescription: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    color: '#000',
  },
  textTechnic: {
    marginBottom: 15,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  textTechnicTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
  },
  textNote: {
    paddingHorizontal: 5,
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
  },
  containerNote: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'green',
    backgroundColor: 'beige',
    marginBottom: 10,
  },
  textWarn: {
    paddingHorizontal: 5,
    marginTop: 10,
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
  },
  containerWarn: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: 'beige',
    marginBottom: 15,
  },
});

export default ExerciseDetailScreen;
