import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

import COLORS from '../constant/colors';
import MyTextInput from '../assets/components/MyTextInput';
import FullButton from '../assets/components/FullButton';
import SeparatorLine from '../assets/components/SeparatorLine';
import HalfButton from '../assets/components/HalfButton';

import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // User signed in successfully
        const user = userCredential.user;
        console.log('User signed in:', user);
        // Add navigation logic or other actions here upon successful login
        navigation.navigate('Home');
      })
      .catch(error => {
        const errorMessage = error.message;
        Alert.alert('Error', errorMessage);
      });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hi Welcome ! 👋</Text>
          <Text style={styles.subHeaderText}>Let's Get You Login 👋</Text>
        </View>

        <View style={styles.textInputContainer}>
          <Text style={styles.label}>Email address</Text>
          <MyTextInput
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <MyTextInput
            placeholder="Password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.buttonContainer}>
            <FullButton buttonText="Login" onPress={handleLogin} />
          </View>
        </View>

        <SeparatorLine />

        <View style={styles.halfButtonContainer}>
          <HalfButton
            imageSource="google"
            buttonText="Google"
            onPress={() => {}}
          />
          <HalfButton
            imageSource="facebook"
            buttonText="Facebook"
            onPress={() => {}}
          />
        </View>

        <View style={styles.textBottomContainer}>
          <Text style={styles.textLink}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.textLink}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  container: {
    flex: 1,
    marginHorizontal: 22,
  },
  header: {
    marginVertical: 22,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.white,
  },
  subHeaderText: {
    fontSize: 16,
    color: COLORS.white,
  },
  textInputContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
    color: 'white',
  },
  buttonContainer: {
    marginTop: 30,
  },
  halfButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  textBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  textLink: {
    color: 'white',
  },
});

export default Login;
