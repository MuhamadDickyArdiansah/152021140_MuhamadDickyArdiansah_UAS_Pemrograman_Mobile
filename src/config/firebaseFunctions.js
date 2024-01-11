import {database} from './firebase';
import {ref, push, set, update, remove} from 'firebase/database';

// Fungsi untuk menambahkan penulis
export const addAuthor = async authorData => {
  try {
    const authorsRef = ref(database, 'authors');
    await push(authorsRef, authorData);
    console.log('Data penulis berhasil ditambahkan');
  } catch (error) {
    console.error('Gagal menambahkan data penulis:', error);
  }
};

// Fungsi untuk mengambil semua data penulis
export const getAuthors = async () => {
  try {
    const snapshot = await ref(database, 'authors').get();
    const authorsData = snapshot.val();
    return authorsData || {};
  } catch (error) {
    console.error('Gagal mengambil data penulis:', error);
    return {};
  }
};

// Fungsi untuk memperbarui data penulis
export const updateAuthor = async (authorId, updatedData) => {
  try {
    const authorRef = ref(database, `authors/${authorId}`);
    await update(authorRef, updatedData);
    console.log('Data penulis berhasil diperbarui');
  } catch (error) {
    console.error('Gagal memperbarui data penulis:', error);
  }
};

// Fungsi untuk menghapus data penulis
export const deleteAuthor = async authorId => {
  try {
    const authorRef = ref(database, `authors/${authorId}`);
    await remove(authorRef);
    console.log('Data penulis berhasil dihapus');
  } catch (error) {
    console.error('Gagal menghapus data penulis:', error);
  }
};
