import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import COLORS from '../constant/colors';

const NewsDetail = ({route}) => {
  const {newsData} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: newsData.urlToImage}} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{newsData.title}</Text>
        <Text style={styles.newsAuthor}>{` ${newsData.author || 'N/A'}`}</Text>
        <Text style={styles.newsPublished}>{`${
          newsData.publishedAt || 'N/A'
        }`}</Text>
        <Text style={styles.newsContentText}>{newsData.content}</Text>
      </View>
    </ScrollView>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  newsImage: {
    height: 200,
    resizeMode: 'cover',
  },
  newsContent: {
    padding: 20,
  },
  newsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  newsAuthor: {
    fontSize: 16,
    marginBottom: 5,
    color: 'red',
  },
  newsPublished: {
    fontSize: 16,
    marginBottom: 20,
    color: 'white',
  },
  newsContentText: {
    fontSize: 18,
    lineHeight: 27,
    color: 'white',
    textAlign: 'justify',
  },
});
