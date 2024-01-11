import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

const MyTextInput = props => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        {...props}
        secureTextEntry={!passwordVisible && props.secureTextEntry}
        style={styles.input}
      />
      {props.secureTextEntry && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconContainer}>
          <Image
            style={{tintColor: 'white'}}
            source={
              passwordVisible
                ? require('../images/icons/show.png')
                : require('../images/icons/hide.png')
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    color: 'white',
  },
  iconContainer: {
    padding: 10,
  },
});
