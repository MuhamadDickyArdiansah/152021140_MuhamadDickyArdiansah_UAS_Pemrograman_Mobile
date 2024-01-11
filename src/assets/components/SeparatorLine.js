import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SeparatorLine = () => {
  return (
    <View style={styles.separatorLine}>
      <View style={styles.line}></View>
      <Text style={styles.text}>Or Continue With</Text>
      <View style={styles.line}></View>
    </View>
  );
};

export default SeparatorLine;

const styles = StyleSheet.create({
  separatorLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20, // Atur sesuai kebutuhan
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'white', // Warna garis
  },
  text: {
    marginHorizontal: 10, // Ruang antara garis dan teks
    color: 'white',
  },
});
