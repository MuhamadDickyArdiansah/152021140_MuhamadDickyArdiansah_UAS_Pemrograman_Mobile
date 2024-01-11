import {StyleSheet, Text, View, ScrollView, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonProf from '../assets/components/ButtonProf';
import {signOut} from 'firebase/auth';
import {auth} from '../config/firebase';
import COLORS from '../constant/colors';

const Profile = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');

  // Gunakan useEffect untuk mendapatkan email pengguna setelah komponen dipasang
  useEffect(() => {
    // Dapatkan pengguna saat ini dari objek auth Firebase
    const currentUser = auth.currentUser;

    if (currentUser) {
      // Jika pengguna ada, ambil email dan simpan ke state
      const email = currentUser.email;
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            signOut(auth)
              .then(() => {
                // Logout berhasil
                Alert.alert('Berhasil Logout');
                console.log('User signed out successfully');
                // Navigasi ke halaman login
                navigation.navigate('Login');
                // Anda juga dapat menampilkan popup "Berhasil keluar" di sini jika diperlukan
              })
              .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert('Error', errorMessage);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            style={styles.gambar}
            source={require('../assets/images/profile.jpg')}
            resizeMode="contain"
          />
          <Text style={styles.header_teks}>Muhamad Dicky Ardiansah</Text>

          {userEmail ? (
            <Text style={styles.header_teks}>{userEmail}</Text>
          ) : null}
        </View>
        <View style={styles.setting}>
          <Text style={styles.judul}>Informations</Text>
          <ButtonProf
            img1={require('../assets/images/icons/help.png')}
            buttonText="Tentang Developer"
            img2={require('../assets/images/skip-track.png')}
            onPress={() => navigation.navigate('About')}
          />
          <ButtonProf
            img1={require('../assets/images/icons/internet.png')}
            buttonText="Kontak Saya"
            img2={require('../assets/images/skip-track.png')}
            onPress={() => navigation.navigate('Kontak')}
          />
          <ButtonProf
            img1={require('../assets/images/icons/secure.png')}
            buttonText="Disclaimer"
            img2={require('../assets/images/skip-track.png')}
            onPress={() => navigation.navigate('Disclaimer')}
          />
        </View>
        <View style={styles.logout}>
          <ButtonProf
            img1={require('../assets/images/icons/logout.png')}
            buttonText="Logout"
            img2={require('../assets/images/skip-track.png')}
            onPress={handleLogout}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.dark,
  },
  content: {
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: COLORS.mid_dark,
    elevation: 3,
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  header_teks: {
    color: 'white',
  },
  gambar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  setting: {
    justifyContent: 'space-between',
    color: 'white',
    marginTop: 20,
  },
  judul: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white',
  },
  logout: {
    marginTop: 20,
  },
});
