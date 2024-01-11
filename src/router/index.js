import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Home from '../screens/Home';
import NewsDetail from '../screens/NewsDetail';
import Register from '../screens/Register';

import Profile from '../screens/Profile';
import About from '../screens/About';
import Kontak from '../screens/Kontak';
import Disclaimer from '../screens/Disclaimer';

import DataPenulis from '../screens/DataPenulis';
import DetailPenulis from '../screens/DetailPenulis';

import COLORS from '../constant/colors';
import Chat from '../screens/Chat';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Top = createMaterialTopTabNavigator();
const AuthStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="Register"
      component={Register}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

const TabNavigator = ({route}) => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: COLORS.dark,
      },
    }}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              color: focused ? 'white' : '#717171',
              fontWeight: 'bold',
            }}>
            Home
          </Text>
        ),
        tabBarIcon: ({focused}) => (
          <Image
            source={require('../assets/images/icons/homi.png')}
            style={{tintColor: focused ? 'white' : '#717171', width: 32}}
          />
        ),
      }}
    />

    <Tab.Screen
      name="Data Penulis"
      component={DataPenulis}
      options={{
        tabBarHideOnKeyboard: true,
        headerShown: true,
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              color: focused ? 'white' : '#717171',
              fontWeight: 'bold',
            }}>
            Data
          </Text>
        ),
        tabBarIcon: ({focused}) => (
          <Image
            source={require('../assets/images/icons/google-docs.png')}
            style={{tintColor: focused ? 'white' : '#717171', width: 32}}
          />
        ),
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: COLORS.mid_dark,
        },
        headerTintColor: '#FFFFFF',
      }}
    />

    <Tab.Screen
      name="Chat"
      component={Chat}
      options={{
        tabBarHideOnKeyboard: true,
        headerShown: true,
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              color: focused ? 'white' : '#717171',
              fontWeight: 'bold',
            }}>
            Chat
          </Text>
        ),
        tabBarIcon: ({focused}) => (
          <Image
            source={require('../assets/images/icons/chat.png')}
            style={{tintColor: focused ? 'white' : '#717171', width: 32}}
          />
        ),
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: COLORS.mid_dark,
        },
        headerTintColor: '#FFFFFF',
      }}
    />

    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        headerShown: true,
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              color: focused ? 'white' : '#717171',
              fontWeight: 'bold',
            }}>
            Profile
          </Text>
        ),
        tabBarIcon: ({focused}) => (
          <Image
            source={require('../assets/images/icons/profile.png')}
            style={{tintColor: focused ? 'white' : '#717171', width: 32}}
          />
        ),
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: COLORS.mid_dark,
        },
        headerTintColor: '#FFFFFF',
      }}
    />
  </Tab.Navigator>
);

const index = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{
          headerStyle: {
            backgroundColor: COLORS.mid_dark,
          },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerStyle: {
            backgroundColor: COLORS.mid_dark,
          },
          headerTintColor: '#FFFFFF',
        }}
      />

      <Stack.Screen
        name="Kontak"
        component={Kontak}
        options={{
          headerStyle: {
            backgroundColor: COLORS.mid_dark,
          },
          headerTintColor: '#FFFFFF',
        }}
      />

      <Stack.Screen
        name="Disclaimer"
        component={Disclaimer}
        options={{
          headerStyle: {
            backgroundColor: COLORS.mid_dark,
          },
          headerTintColor: '#FFFFFF',
        }}
      />

      <Stack.Screen
        name="DetailPenulis"
        component={DetailPenulis}
        options={{
          headerStyle: {
            backgroundColor: COLORS.mid_dark,
          },
          headerTintColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
};

export default index;

const styles = StyleSheet.create({});
