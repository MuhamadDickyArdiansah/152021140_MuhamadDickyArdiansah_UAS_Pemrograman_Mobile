import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const FullButton = ({buttonText, onPress}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default FullButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%', // Ukuran setengah
    padding: 10, // Ruang di sekitar tombol
    borderRadius: 10,
    backgroundColor: '#FF3A44',
    color: 'white',
    elevation: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});
