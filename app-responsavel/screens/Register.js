import React, { useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme, Input } from 'galio-framework';
import Toast from 'react-native-simple-toast';
import { validate } from 'validate.js';
import { cpf as cpfLib } from 'cpf-cnpj-validator';

import { Button, Icon } from '../components';
import { Images, nowTheme } from '../constants';

import api from '../services/api';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

const INITAL_STATE = {
  nome: '',
  cpf: '',
  telefone: '',
  email: '',
  senha: '',
};

function Register({ navigation }) {
  const [responsavel, setResponsavel] = useState(INITAL_STATE);
  const [loading, setLoading] = useState(false);

  async function criarConta() {
    setLoading(true);
    const { nome, cpf, telefone, senha, email } = responsavel;

    const cpfValido = cpfLib.isValid(cpf);

    const erro = validate(
      { senha, email, nome, telefone },
      {
        nome: { length: { minimum: 3 } },
        telefone: {
          length: { is: 9 },
        },
        senha: { length: { minimum: 6 } },
        email: { email: true },
      }
    );

    if (cpfValido && !erro) {
      try {
        let response = await api.post('/responsaveis/criar', {
          nome,
          cpf,
          telefone,
          senha,
          email,
        });
        setLoading(false);
        Toast.show('Cadastro realizado com sucesso!');
        navigation.navigate('Login');
      } catch (error) {
        Toast.show('Falha ao realizar cadastro!');
      }
    } else {
      Toast.show('Informe dados validos!');
    }
    setLoading(false);

    setResponsavel(INITAL_STATE);
  }

  return (
    <DismissKeyboard>
      <Block flex middle>
        <Block style={styles.imageBackgroundContainer}>
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex space="evenly">
                <Block flex={1} middle space="between">
                  <Block center middle flex={1}>
                    <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 10 }}>
                      Cadastro de responsável
                    </Text>
                    <Block flex>
                      <Block>
                        <Block width={width * 0.8}>
                          <Input
                            placeholder="Nome"
                            style={styles.inputs}
                            value={responsavel.nome}
                            onChangeText={(text) => setResponsavel({ ...responsavel, nome: text })}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="user"
                                family="AntDesign"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8}>
                          <Input
                            placeholder="CPF"
                            keyboardType={'numeric'}
                            style={styles.inputs}
                            value={responsavel.cpf}
                            onChangeText={(text) => setResponsavel({ ...responsavel, cpf: text })}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="idcard"
                                family="AntDesign"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8}>
                          <Input
                            placeholder="Telefone"
                            keyboardType={'numeric'}
                            style={styles.inputs}
                            value={responsavel.telefone}
                            onChangeText={(text) =>
                              setResponsavel({ ...responsavel, telefone: text })
                            }
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="smartphone"
                                family="Feather"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8}>
                          <Input
                            placeholder="Email"
                            style={styles.inputs}
                            keyboardType={'email-address'}
                            autoCapitalize="none"
                            value={responsavel.email}
                            onChangeText={(text) => setResponsavel({ ...responsavel, email: text })}
                            iconContent={
                              <Icon
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
                            style={styles.inputs}
                            password={true}
                            autoCapitalize="none"
                            value={responsavel.senha}
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
                        {/* <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Confirmar senha"
                              style={styles.inputs}
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
                          </Block> */}
                      </Block>
                      <Block center>
                        <Button
                          color="primary"
                          round
                          loading={loading}
                          onPress={criarConta}
                          style={styles.createButton}
                          // onPress={() => navigation.navigate('App')}
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
                      <Block center>
                        <Button
                          color="neutral"
                          round
                          style={styles.backButton}
                          onPress={() => navigation.navigate('Login')}
                        >
                          <Text
                            style={{
                              fontFamily: 'montserrat-bold',
                              color: '#ADB5BD',
                              textAlign: 'center',
                            }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}
                          >
                            Voltar
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
    height: height < 812 ? height * 0.75 : height * 0.65,
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
    marginTop: 10,
    marginBottom: 10,
  },
  backButton: {
    width: width * 0.5,
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
  backIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 5,
    textTransform: 'uppercase',
  },
});

export default Register;
