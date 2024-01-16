import React from 'react';
import {useTranslation} from 'react-i18next';
const {Modal, View, Text, Pressable, StyleSheet} = require('react-native');

const ModalWindow = ({deleteProgram, modalVisible, setModalVisible}) => {
  // eslint-disable-next-line no-unused-vars
  const {t, i18n} = useTranslation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{t('modal.text')}</Text>
          <View style={styles.modalButtonContainer}>
            <View style={styles.modalButton}>
              <Pressable
                style={[styles.button, styles.buttonDelete]}
                onPress={() => deleteProgram()}>
                <Text style={styles.textStyle}>{t('modal.btnDelete')}</Text>
              </Pressable>
            </View>
            <View style={styles.modalButton}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>{t('modal.btnCancel')}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalWindow;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    height: 'auto',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonDelete: {
    backgroundColor: 'red',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 24,
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtonContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    width: 100,
  },
});
