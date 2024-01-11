import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import COLORS from '../../constant/colors';

const HalfButton = ({imageSource, buttonText, onPress}) => {
  // Tentukan sumber gambar berdasarkan prop imageSource
  let source;
  if (imageSource === 'google') {
    source = require('../images/google.png');
  } else if (imageSource === 'facebook') {
    source = require('../images/facebook.png');
  }

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Image source={source} />
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default HalfButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '48%', // Ukuran setengah
    padding: 10, // Ruang di sekitar tombol
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.mid_dark,
    backgroundColor: COLORS.dark,
    elevation: 13,
  },
  text: {
    color: 'white',
  },
});
