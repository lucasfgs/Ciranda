import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme, Input } from 'galio-framework';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

import { Button, Icon } from '../components';
import { Images, nowTheme } from '../constants';
import api from '../services/api';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

function Login({ navigation }) {
  const [responsavel, setResponsavel] = useState({
    email: '',
    senha: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function verificaLogin() {
      const jsonValue = await AsyncStorage.getItem('@responsavel');
      if (jsonValue) {
        navigation.navigate('App');
      }
    }
    verificaLogin();
  }, []);

  async function realizarLogin() {
    setLoading(true);
    const { senha, email } = responsavel;
    try {
      let response = await api.post('/responsavel/logar', {
        email,
        senha,
        tipo: 'R',
      });
      const jsonValue = JSON.stringify(response.data);
      await AsyncStorage.setItem('@responsavel', jsonValue);
      setLoading(false);
      navigation.navigate('App');
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show('Falha ao acessar!');
    }
  }

  return (
    <DismissKeyboard>
      <Block flex middle>
        <Block
          // source={Images.RegisterBackground}
          style={styles.imageBackgroundContainer}
          // imageStyle={styles.imageBackground}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex space="evenly">
                <Block flex={1} middle space="between">
                  <Image source={Images.Logo} style={styles.logo} />
                  <Block center flex={1}>
                    <Block flex>
                      <Block>
                        <Block width={width * 0.8}>
                          <Input
                            placeholder="Email"
                            autoCapitalize="none"
                            style={styles.inputs}
                            onChangeText={(text) => setResponsavel({ ...responsavel, email: text })}
                            iconContent={
                              <Icon
                                loading={loading}
                                size={16}
                                color="#ADB5BD"
                                name="email-852x"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Input
                            placeholder="Senha"
                            password={true}
                            autoCapitalize="none"
                            style={styles.inputs}
                            onChangeText={(text) => setResponsavel({ ...responsavel, senha: text })}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="lock1"
                                family="AntDesign"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                      </Block>
                      <Block center>
                        <Button
                          color="primary"
                          round
                          loading={loading}
                          style={styles.createButton}
                          onPress={realizarLogin}
                        >
                          <Text
                            style={{ fontFamily: 'montserrat-bold' }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}
                          >
                            Acessar
                          </Text>
                        </Button>
                        <Text
                          style={{ fontFamily: 'montserrat-bold' }}
                          size={12}
                          color={nowTheme.COLORS.BLACK}
                        >
                          Ainda não possui uma conta?
                        </Text>
                        <Button
                          color="warning"
                          round
                          style={styles.registerButton}
                          onPress={() => navigation.navigate('Register')}
                        >
                          <Text
                            style={{ fontFamily: 'montserrat-bold' }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}
                          >
                            Criar conta
                          </Text>
                        </Button>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
    backgroundColor: '#ff9f43',
  },
  imageBackground: {
    width: width,
    height: height,
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  createButton: {
    width: width * 0.8,
    marginTop: 15,
    marginBottom: 25,
  },
  registerButton: {
    width: width * 0.6,
    marginTop: 15,
    marginBottom: 40,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoText: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    letterSpacing: 5,
    textTransform: 'uppercase',
  },
});

export default Login;
