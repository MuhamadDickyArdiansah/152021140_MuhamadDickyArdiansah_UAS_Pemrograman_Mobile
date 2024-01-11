import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import COLORS from '../../constant/colors';

const ButtonProf = ({img1, buttonText, img2, onPress}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={{flexDirection: 'row'}}>
        <Image source={img1} style={styles.img} />
        <Text style={styles.buttonText}>{buttonText}</Text>
      </View>

      <Image style={styles.img2} source={img2} />
    </TouchableOpacity>
  );
};

export default ButtonProf;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', // Ukuran setengah
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.dark,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
  img: {
    marginRight: 20,
    tintColor: 'white',
  },
  img2: {
    tintColor: 'white',
  },
});
