import React from 'react';
import { Block } from 'galio-framework';
import { Easing, Animated, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// screens
import Dependentes from '../screens/Dependentes';
import Pro from '../screens/Pro';
import MeuCadastro from '../screens/MeuCadastro';
import Register from '../screens/Register';
import Historico from '../screens/Historico';
import Articles from '../screens/Articles';
import Login from '../screens/Login';
import Adicionar from '../screens/Adicionar';
import SettingsScreen from '../screens/Settings';
// drawer
import CustomDrawerContent from './Menu';
// header for screens
import { Header, Icon } from '../components';
import { nowTheme, tabs } from '../constants';

const { width } = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ComponentsStack(props) {
  return (
    <Stack.Navigator initialRouteName="Historico" mode="card" headerMode="screen">
      <Stack.Screen
        name="Histórico"
        component={Historico}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Histórico" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator initialRouteName="Articles" mode="card" headerMode="screen">
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function AccountStack(props) {
  return (
    <Stack.Navigator initialRouteName="Account" mode="card" headerMode="screen">
      <Stack.Screen
        name="Account"
        component={Register}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="Create Account" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Meu cadastro"
        component={MeuCadastro}
        options={{
          header: ({ navigation, scene }) => (
            <Header black title="Meu cadastro" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF', color: '#000' },
          title: true,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Dependentes"
        component={Dependentes}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Dependentes" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
    </Stack.Navigator>
  );
}
function AdicionarStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Adicionar fundos"
        component={Adicionar}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Adicionar fundos" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName="Dependentes"
    >
      <Drawer.Screen name="Dependentes" component={HomeStack} />
      <Drawer.Screen name="Histórico" component={ComponentsStack} />
      <Drawer.Screen name="Adicionar Fundos" component={AdicionarStack} />
      <Drawer.Screen name="Meu Cadastro" component={ProfileStack} />
      {/* <Drawer.Screen name="Meu Cadastro" component={AccountStack} /> */}
    </Drawer.Navigator>
  );
}

export default function LoginStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Login"
        component={Login}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
