import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {ref, onValue, push, set, remove} from 'firebase/database';
import {database} from '../config/firebase';
import COLORS from '../constant/colors';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import FullButton from '../assets/components/FullButton';
import MyTextInput from '../assets/components/MyTextInput';
import ButtonConfirm from '../assets/components/ButtonConfirm';

const DataPenulis = ({navigation}) => {
  const [authors, setAuthors] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalAuthorName, setModalAuthorName] = useState('');
  const [modalAuthorEmail, setModalAuthorEmail] = useState('');
  const [modalAuthorPhone, setModalAuthorPhone] = useState('');
  const [modalAuthorId, setModalAuthorId] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const authorsRef = ref(database, 'authors');
    onValue(authorsRef, snapshot => {
      if (snapshot.exists()) {
        const authorsData = snapshot.val();
        const authorsWithId = Object.keys(authorsData).map(authorId => ({
          id: authorId,
          ...authorsData[authorId],
        }));
        setAuthors(authorsWithId);
      }
    });

    return () => {
      // Unsubscribe dari listener saat komponen di-unmount (opsional)
    };
  }, []);

  const toggleModal = (authorId, authorName, authorEmail, authorPhone) => {
    setModalAuthorId(authorId);
    setModalAuthorName(authorName);
    setModalAuthorEmail(authorEmail);
    setModalAuthorPhone(authorPhone);
    setIsModalVisible(!isModalVisible);
    setIsEditing(!!authorId);
  };

  const handleAddEditAuthor = () => {
    if (!modalAuthorName || !modalAuthorEmail || !modalAuthorPhone) {
      alert('Harap isi semua field yang diperlukan.');
      return;
    }

    if (isEditing) {
      // Edit penulis
      const authorRef = ref(database, `authors/${modalAuthorId}`);
      set(authorRef, {
        name: modalAuthorName,
        email: modalAuthorEmail,
        phone: modalAuthorPhone,
      })
        .then(() => {
          console.log('Penulis berhasil diubah');
          setIsModalVisible(false);
        })
        .catch(error => {
          console.error('Error mengubah penulis:', error.message);
        });
    } else {
      // Tambah penulis baru
      const authorsRef = ref(database, 'authors');
      push(authorsRef, {
        name: modalAuthorName,
        email: modalAuthorEmail,
        phone: modalAuthorPhone,
      })
        .then(() => {
          console.log('Penulis berhasil ditambahkan');
          setIsModalVisible(false);
        })
        .catch(error => {
          console.error('Error menambahkan penulis:', error.message);
        });
    }
  };

  const handleDeleteAuthor = (authorId, authorName) => {
    // Konfirmasi sebelum menghapus dengan Alert
    Alert.alert(
      'Konfirmasi',
      `Apakah Anda yakin ingin menghapus penulis ${authorName}?`,
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          onPress: () => {
            const authorRef = ref(database, `authors/${authorId}`);
            remove(authorRef)
              .then(() => {
                console.log('Penulis berhasil dihapus dengan ID:', authorId);
              })
              .catch(error => {
                console.error(
                  'Error menghapus penulis dengan ID:',
                  authorId,
                  error.message,
                );
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Daftar Penulis:</Text>
      <FlatList
        data={Object.values(authors)}
        keyExtractor={item => item.id}
        extraData={authors}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              // Navigasi ke halaman DetailPenulis dengan mengirimkan data penulis
              navigation.navigate('DetailPenulis', {
                authorId: item.id,
                authorName: item.name,
                authorEmail: item.email,
                authorPhone: item.phone,
              });
            }}>
            <View>
              <Text style={styles.cardText}>{item.name}</Text>
              {/* <Text style={styles.cardText}>{item.email}</Text> */}
              {/* <Text style={styles.cardText}>{item.phone}</Text> */}
            </View>
            <View style={styles.cardButtons}>
              <TouchableOpacity
                style={styles.buttonContainerEdit}
                onPress={() =>
                  toggleModal(item.id, item.name, item.email, item.phone)
                }>
                <Image
                  source={require('../assets/images/icons/edit.png')} // Ganti dengan path menuju gambar Edit
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainerHapus}
                onPress={() => handleDeleteAuthor(item.id)}>
                <Image
                  source={require('../assets/images/icons/bin.png')} // Ganti dengan path menuju gambar Hapus
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>Data tidak ditemukan</Text>
          </View>
        )}
      />

      {/* Modal untuk Tambah/Edit Penulis */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(!isModalVisible)}>
        {/* Background Semi-Transparan */}
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: 'white',
              }}>
              Nama
            </Text>
            <MyTextInput
              style={styles.input}
              placeholder="Nama Penulis"
              placeholderTextColor="#A9A9A9"
              value={modalAuthorName}
              onChangeText={text => setModalAuthorName(text)}
            />

            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: 'white',
              }}>
              Email
            </Text>
            <MyTextInput
              style={styles.input}
              placeholder="Email Penulis"
              placeholderTextColor="#A9A9A9"
              value={modalAuthorEmail}
              onChangeText={text => setModalAuthorEmail(text)}
            />

            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: 'white',
              }}>
              No Telepon
            </Text>
            <MyTextInput
              style={styles.input}
              placeholder="Nomor Telepon Penulis"
              placeholderTextColor="#A9A9A9"
              value={modalAuthorPhone}
              onChangeText={text => setModalAuthorPhone(text)}
            />
            <View style={{gap: 10}}>
              <ButtonConfirm
                buttonText={isEditing ? 'Simpan' : 'Tambah'}
                onPress={handleAddEditAuthor}
              />

              <FullButton
                buttonText="Batal"
                onPress={() => setIsModalVisible(!isModalVisible)}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Button Tambah Penulis */}
      <FullButton
        buttonText={'Tambah Penulis'}
        onPress={() => toggleModal('', '', '', '')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.dark,
    flex: 1,
  },
  textTitle: {
    color: 'white',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.mid_dark,
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
    color: 'white',
  },
  cardButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Warna hitam semi-transparan
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.mid_dark,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50, // Atur sesuai kebutuhan
  },
  emptyListText: {
    fontSize: 16,
    color: 'gray',
  },
  buttonImage: {
    margin: 5, // Sesuaikan dengan margin yang diinginkan
    tintColor: 'white',
  },
  buttonContainerHapus: {
    backgroundColor: 'red',
    borderRadius: 10,
  },
  buttonContainerEdit: {
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});

export default DataPenulis;
