import React, {useState, useRef} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import uuid from 'react-native-uuid';

const Dropdown2 = ({onSelect, data, exerciseGroup, t}) => {
  const [exercise, setExercise] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState({});
  const [repetitions, setRepetitions] = useState('12');
  const [approach, setApproach] = useState('4');

  const updateExerciseData = () => {
    const exe = {
      ...selectedExercise,
      approach,
      repetitions,
      numberId: uuid.v4(),
    };
    setSelectedExercise({});
    dropdownRef.current.reset();
    citiesDropdownRef.current.reset();
    return {...exe};
  };

  const citiesDropdownRef = useRef();
  const dropdownRef = useRef();

  return (
    <SafeAreaView style={styles.saveAreaViewContainer}>
      <View style={styles.viewContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.dropdownsRow}>
            <SelectDropdown
              ref={dropdownRef}
              data={exerciseGroup}
              onSelect={(selectedItem, index) => {
                citiesDropdownRef.current.reset();
                setExercise([]);
                setExercise(
                  data.filter(exe => exe.group === selectedItem.group),
                );
              }}
              defaultButtonText={t('createProgram.group')}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.group;
              }}
              rowTextForSelection={(item, index) => {
                return item.group;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
              rowStyle={styles.dropdown1RowStyle}
            />
            <View style={styles.divider} />
            <SelectDropdown
              ref={citiesDropdownRef}
              data={exercise}
              onSelect={(selectedItem, index) => {
                setSelectedExercise(selectedItem);
              }}
              defaultButtonText={t('createProgram.exercise')}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(item, index) => {
                return item.title;
              }}
              buttonStyle={styles.dropdown2BtnStyle}
              buttonTextStyle={styles.dropdown2BtnTxtStyle}
              rowTextStyle={styles.dropdown2RowTxtStyle}
            />
            <TextInput
              style={styles.inputText}
              textAlign="center"
              maxLength={1}
              placeholder="4"
              keyboardType="numeric"
              value={approach}
              onChangeText={text => setApproach(text)}
            />
            <TextInput
              style={styles.inputText}
              textAlign="center"
              maxLength={2}
              placeholder="12"
              keyboardType="numeric"
              value={repetitions}
              onChangeText={text => setRepetitions(text)}
            />
            <Button
              disabled={Object.keys(selectedExercise).length === 0}
              onPress={() => onSelect(updateExerciseData())}
              title={t('createProgram.add')}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputText: {
    color: '#000',
    textAlign: 'center',
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  saveAreaViewContainer: {flex: 1, minHeight: 50},
  viewContainer: {flex: 1},
  scrollViewContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownsRow: {flexDirection: 'row', width: '100%', paddingHorizontal: '1%'},

  dropdown1BtnStyle: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'left',
    paddingHorizontal: 0,
    marginHorizontal: 0,
    textTransform: 'capitalize',
  },
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  divider: {width: 2},
  dropdown2BtnStyle: {
    flex: 3,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown2BtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 16,
  },
  dropdown2RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 16,
  },
});

export default Dropdown2;
