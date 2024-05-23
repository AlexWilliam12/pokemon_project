import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SearchInput({ onChangeText }) {

  const [searchValue, setSearchValue] = useState('');

  const handleText = (value) => {
    setSearchValue(value);
    onChangeText(value);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Search..."
        value={searchValue}
        onChangeText={handleText}
      />
      <TouchableOpacity style={styles.searchButton}>
        <MaterialCommunityIcons name="magnify" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: 300,
    borderColor: '#dedede',
    borderWidth: 1,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
  },
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: '#dedede',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});