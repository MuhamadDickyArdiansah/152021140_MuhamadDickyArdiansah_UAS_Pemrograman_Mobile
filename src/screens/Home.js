import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {signOut} from 'firebase/auth';
import {auth} from '../config/firebase';
import DropDownPicker from 'react-native-dropdown-picker';
import COLORS from '../constant/colors';

const Home = () => {
  const navigation = useNavigation();

  const [showOptions, setShowOptions] = useState(false);
  const [data, setData] = useState([]);
  const limitedData = data.slice(0, 5);

  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOptionPress = option => {
    if (option === 'profile') {
      navigation.navigate('Profile');
    } else if (option === 'logout') {
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
    }
  };

  const renderDropdownOptions = () => (
    <Modal
      transparent
      animationType="slide"
      visible={showOptions}
      onRequestClose={() => setShowOptions(false)}>
      <TouchableWithoutFeedback onPress={() => setShowOptions(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.dropdownOptions}>
        <TouchableOpacity onPress={() => handleOptionPress('profile')}>
          <Text style={styles.dropdownOption}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOptionPress('logout')}>
          <Text style={styles.dropdownOption}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const indicator = limitedData.map((_, index) => {
    const opacity = scrollX.interpolate({
      inputRange: [
        (index - 1) * windowWidth,
        index * windowWidth,
        (index + 1) * windowWidth,
      ],
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });

    return <Animated.View key={index} style={[styles.indicator, {opacity}]} />;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const apiKey = '44a26ec6a766458c9edc22f3293b73b7';
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (result.articles) {
          setData(result.articles);
        }
      } catch (error) {
        console.error('Error fetching news data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  });

  const renderCarousel = ({item}) => (
    <View style={styles.carouselItem}>
      <Image source={{uri: item.urlToImage}} style={styles.carouselImage} />
      <View style={styles.carouselTextContainer}>
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <Text style={styles.carouselPublished}>{`Published At: ${
          item.publishedAt || 'N/A'
        }`}</Text>
      </View>
    </View>
  );

  const handleCardPress = newsData => {
    navigation.navigate('NewsDetail', {newsData});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleCardPress(item)}>
      <View style={styles.newsContent}>
        <Image
          source={{uri: item.urlToImage}}
          style={styles.newsContentImage}
        />
        <View style={styles.newsContentText}>
          <Text style={styles.newsContentTitle}>{item.title}</Text>
          <Text style={styles.newsContentAuthor}>{item.author}</Text>
          <Text style={styles.newsContentPublished}>{`Published At: ${
            item.publishedAt || 'N/A'
          }`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.container}>
          <View style={styles.header_content}>
            <Text style={styles.logo}>dNews.id</Text>
            <TouchableOpacity onPress={() => setShowOptions(true)}>
              <Image
                style={{width: 50}}
                source={require('../assets/images/Vector.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {renderDropdownOptions()}
        </View>
      </View>
      <View style={{backgroundColor: COLORS.dark}}>
        <View style={styles.carouselContainer}>
          <FlatList
            data={limitedData}
            renderItem={renderCarousel}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
          />
          <View style={styles.indicatorContainer}>{indicator}</View>
        </View>

        <View style={styles.content}>
          {/* Render additional content here */}
          <View style={styles.container}>
            <Text style={styles.newsContentSubTitle}>Latest News</Text>

            <FlatList
              data={data}
              keyExtractor={item => item.url}
              renderItem={renderItem}
            />
          </View>
        </View>
        {/* {renderContent()} */}
      </View>
    </View>
  );
};

export default Home;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  header: {
    backgroundColor: COLORS.mid_dark,
  },
  header_content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // warna teks
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    height: 40,
    borderWidth: 1,
    color: '#FFFFFF',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  tabText: {
    fontWeight: 'bold',
    color: 'white',
  },
  activeTab: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 10,
  },
  carouselContainer: {
    width: windowWidth,
    height: windowHeight / 3,
    marginTop: 20,
  },
  slide: {
    width: windowWidth,
    height: windowHeight / 3,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#07A0B0', // Ganti dengan warna latar yang diinginkan
  },
  text: {
    color: '#FFFFFF', // Ganti dengan warna teks yang diinginkan
    fontSize: 18,
    fontWeight: 'bold',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'white', // Ganti dengan warna titik yang diinginkan
    marginHorizontal: 5,
  },
  content: {
    marginTop: 20,
    backgroundColor: COLORS.dark,
  },
  newsContent: {
    flexDirection: 'row',
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#3f3f3f',
    elevation: 3,
  },
  newsContentImage: {
    height: 80,
    width: 80,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  newsContentText: {
    flex: 1,
    marginLeft: 10,
  },
  newsContentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  newsContentSubTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  newsContentAuthor: {
    fontSize: 14,
    color: 'red',
    marginBottom: 5,
  },
  newsContentPublished: {
    fontSize: 12,
    color: '#FFFFFF',
  },

  carouselItem: {
    width: windowWidth - 40, // Sesuaikan dengan lebar layar dan padding horizontal
    marginHorizontal: 20, // Sesuaikan dengan margin horizontal
    height: windowHeight / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden', // Untuk memastikan borderRadius bekerja dengan baik
  },
  carouselImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  carouselTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  carouselPublished: {
    fontSize: 14,
    color: '#fff',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownOptions: {
    position: 'absolute',
    right: 10,
    top: 70,
    backgroundColor: COLORS.mid_dark,
    borderRadius: 5,
    elevation: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  dropdownOption: {
    fontSize: 16,
    marginVertical: 5,
    color: 'white',
  },
});
