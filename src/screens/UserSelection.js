import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {auth, firestore} from '../config/firebase';

const UserSelection = ({navigation}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = firestore.collection('users');

    const unsubscribe = usersRef.onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        uid: doc.id,
      }));
      setUsers(data);
    });

    return () => unsubscribe();
  }, []);

  const handleUserSelection = selectedUser => {
    // Navigasi ke layar obrolan dengan pengguna yang dipilih
    navigation.navigate('Chat', {selectedUser});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pilih Pengguna</Text>
      <FlatList
        data={users}
        keyExtractor={user => user.uid}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => handleUserSelection(item)}>
            <Text>{item.displayName || item.email}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
});

export default UserSelection;
