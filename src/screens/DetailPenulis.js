// Import dependencies
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import COLORS from '../constant/colors';

// Create DetailPenulis component
const DetailPenulis = ({route}) => {
  // Dapatkan data penulis dari parameter route
  const {authorId, authorName, authorEmail, authorPhone} = route.params;

  return (
    <View style={styles.container}>
      {/* <Text>ID Penulis: {authorId}</Text> */}
      <Text style={styles.text}>Nama Penulis: {authorName}</Text>
      <Text style={styles.text}>Email Penulis: {authorEmail}</Text>
      <Text style={styles.text}>Nomor Telepon Penulis: {authorPhone}</Text>
      {/* Tambahkan elemen UI sesuai kebutuhan */}
    </View>
  );
};

export default DetailPenulis;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dark,
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
