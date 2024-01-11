import React, {useEffect, useState, TouchableOpacity} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

import NewsDetail from '../screens/NewsDetail';

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessKey = '811ad73f27a2a241f4b6ab74a2a2168f';
        const apiUrl = `http://api.mediastack.com/v1/news?access_key=${accessKey}&countries=id`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.data) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateToDetail = item => {
    navigation.navigate('NewsDetail', item);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.url}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigateToDetail(item)}>
            <View style={styles.card}>
              {item.image && <Text>{item.image}</Text>}
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSource}>{item.source}</Text>
                <Text style={styles.cardPublished}>{item.published_at}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardSource: {
    color: '#666',
    fontSize: 12,
  },
  cardPublished: {
    color: '#888',
    fontSize: 12,
  },
});

export default Home;
