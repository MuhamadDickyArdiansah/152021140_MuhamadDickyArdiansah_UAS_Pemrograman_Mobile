import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import COLORS from '../constant/colors';

const Disclaimer = () => {
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.disclaimerContent}>
          <Text style={styles.textAbout}>
            Seluruh informasi di halaman ini hanya bersifat informatif dan tidak
            dimaksudkan sebagai saran hukum, medis, keuangan, atau profesional
            lainnya. Penggunaan informasi ini sepenuhnya risiko pengguna.
          </Text>

          <Text style={styles.headingSecondary}>
            1. Ketidakjaminan Informasi
          </Text>
          <Text style={styles.listItem}>
            Kami tidak memberikan jaminan atas kelengkapan, keakuratan,
            keandalan, atau ketersediaan informasi yang terdapat di situs ini.
            Setiap tindakan yang diambil berdasarkan informasi di situs ini
            adalah tanggung jawab pengguna sepenuhnya.
          </Text>

          <Text style={styles.headingSecondary}>2. Tautan Ke Pihak Ketiga</Text>
          <Text style={styles.listItem}>
            Situs ini mungkin berisi tautan ke situs web pihak ketiga. Kami
            tidak mengendalikan atau bertanggung jawab atas konten, kebijakan
            privasi, atau praktik pihak ketiga tersebut.
          </Text>

          <Text style={styles.headingSecondary}>
            3. Ketidakbertanggungjawaban Hukum
          </Text>
          <Text style={styles.listItem}>
            Kami tidak bertanggung jawab atas kerugian atau kerusakan yang
            timbul dari penggunaan situs ini. Pengguna setuju untuk tidak
            menyalahkan kami atas segala klaim atau tuntutan yang timbul dari
            penggunaan situs ini.
          </Text>

          <Text style={styles.headingSecondary}>
            4. Perubahan dan Pembaharuan
          </Text>
          <Text style={styles.listItem}>
            Informasi di halaman ini dapat berubah tanpa pemberitahuan
            sebelumnya. Kami berhak untuk memperbarui, mengubah, atau menghapus
            informasi tanpa pemberitahuan.
          </Text>

          <Text style={styles.headingSecondary}>5. Konsultasi Profesional</Text>
          <Text style={styles.listItem}>
            Kami merekomendasikan untuk selalu berkonsultasi dengan profesional
            yang sesuai sebelum mengambil tindakan berdasarkan informasi yang
            ditemukan di situs ini.
          </Text>

          <Text style={styles.headingSecondary}>6. Hak Cipta</Text>
          <Text style={styles.listItem}>
            Hak cipta untuk konten di situs ini adalah milik kami kecuali
            dinyatakan sebaliknya. Pengguna tidak diperbolehkan menggunakan,
            mendistribusikan, atau mereproduksi konten tanpa izin tertulis dari
            pemilik hak cipta.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Disclaimer;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.dark,
    flex: 1,
  },
  container: {
    padding: 20,
  },
  headingSecondary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  listItem: {
    textAlign: 'justify',
    color: 'white',
    lineHeight: 20,
    marginBottom: 10,
  },
  textAbout: {
    textAlign: 'justify',
    color: 'white',
    lineHeight: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  disclaimerContent: {
    marginVertical: 30,
  },
});
