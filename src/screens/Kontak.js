import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import React from 'react';
import COLORS from '../constant/colors';

const Kontak = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.About}>
          <Text style={styles.textAbout}>
            Pembaca yang terhormat, saya mengharapkan partisipasi anda dalamn
            memberi masukkan, saran, serta kritik yang membangun agar saya bisa
            lebih baik dalam menyampaikan informasi serta fitur-fitur yang
            berguna bagi pembaca di hari-hari mendatang. Silakan menghubungi
            saya:
          </Text>
        </View>

        <View>
          <Text style={styles.textName}>Muhamad Dicky Ardiansah</Text>
          <Text style={styles.addressTeks}>Ciamis, Jawa Barat, Indonesia</Text>
          <View style={{marginTop: 20}}>
            <Text style={styles.addressEmail}>Email:</Text>
            <Text style={styles.addressEmail}>muhamaddicky860@gmail.com</Text>
            <Text style={styles.addressEmail}>
              muhamad.dicky@mhs.itenas.ac.id
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Kontak;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.dark,
    flex: 1,
  },
  container: {
    padding: 20,
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  textAbout: {
    textAlign: 'justify',
    color: 'white',
    lineHeight: 24,
  },
  contact: {
    marginVertical: 30,
  },
  addressTeks: {
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  addressEmail: {
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 5,
  },
});
