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

import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // User registered successfully
        const user = userCredential.user;
        console.log('User registered:', user);
        // You can optionally update the user profile here if needed

        // Add navigation logic or other actions here upon successful registration
        navigation.navigate('Login');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Error', errorMessage);
      });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: COLORS.white,
            }}>
            Hi Welcome ! 👋
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.white,
            }}>
            Let's Get You Login 👋
          </Text>
        </View>

        <View style={styles.textInputContainer}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
              color: 'white',
            }}>
            Name
          </Text>
          <MyTextInput placeholder="Name" placeholderTextColor="#A9A9A9" />

          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
              color: 'white',
            }}>
            Email address
          </Text>
          <MyTextInput
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            value={email}
            onChangeText={setEmail}
          />

          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
              color: 'white',
            }}>
            Password
          </Text>
          <MyTextInput
            placeholder="Password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.ButtonConfirmContainer}>
            <FullButton buttonText="Register" onPress={handleRegister} />
          </View>
        </View>

        <SeparatorLine />
        <View style={styles.halfButtonContainer}>
          <HalfButton imageSource="google" buttonText="Google" />
          <HalfButton imageSource="facebook" buttonText="Facebook" />
        </View>

        <View style={styles.textBottomContainer}>
          <Text style={styles.textLink}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textLink}>Login Now</Text>
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
  ButtonConfirmContainer: {
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

export default Register;
