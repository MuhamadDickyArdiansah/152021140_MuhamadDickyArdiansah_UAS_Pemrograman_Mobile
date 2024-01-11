import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import FullButton from '../assets/components/FullButton';
import COLORS from '../constant/colors';

const Splash = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>
          d<Text style={styles.logoText2}>News.Id</Text>
        </Text>
      </View>
      <FullButton
        buttonText="Get Started"
        onPress={() => {
          navigation.navigate('Auth');
        }}
        style={styles.button}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: COLORS.dark,
  },
  logo: {
    width: 300,
    height: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
  },
  logoText: {
    fontSize: 50,
    color: 'red',
    fontWeight: 'bold',
  },
  logoText2: {
    color: 'white',
  },
});
