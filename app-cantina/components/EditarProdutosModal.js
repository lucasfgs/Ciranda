import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, Icon, Block } from 'galio-framework';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import Input from './Input';
import Restricoes from './Restricoes';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

import { Images } from '../constants';

import api from '../services/api';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
const EditarProdutosModal = ({ visible, onChange, id }) => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [restricoes, setRestricoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  const signal = axios.CancelToken.source();

  async function receberAluno() {
    console.log('Id produto:', id);
    setLoadingContent(true);
    let response = await api.get(`/cantinas/produtos/listar/${id}`);
    setNome(response.data.nome);
    setValor(response.data.valor);
    setLoadingContent(false);
  }

  useEffect(() => {
    if (visible) {
      receberAluno();
    } else {
      setRestricoes([]);
      setLoadingContent(false);

      signal.cancel();
    }
  }, [visible]);

  async function salvarAluno() {
    const jsonValue = await AsyncStorage.getItem('@responsavel');
    let responsavel = JSON.parse(jsonValue);

    try {
      setLoading(true);
      await api.put('/cantinas/produtos/atualizar', {
        id: id,
        nome,
        valor,
      });
      setLoading(false);
      Toast.show('Alterado com sucesso!');
      onChange(false);
    } catch (error) {
      setLoading(false);
      Toast.show('Falha ao alterar!');
    }
  }

  return (
    <DismissKeyboard>
      <Modal isVisible={visible}>
        <View style={styles.container}>
          <Spinner
            visible={loadingContent}
            textContent={'Carregando...'}
            textStyle={styles.spinnerTextStyle}
            overlayColor="rgba(0, 0, 0, 0.6)"
          />
          <View style={styles.header}>
            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 20 }}>Editar produto</Text>
          </View>

          <Block style={{ width: '90%', marginTop: 20 }}>
            <Input
              placeholder="Produto"
              style={styles.inputs}
              onChangeText={(text) => setNome(text)}
              value={nome}
              iconContent={
                <Icon
                  size={16}
                  color="#ADB5BD"
                  name="price-tag"
                  family="Entypo"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Block style={{ width: '90%', marginTop: 20 }}>
            <Input
              placeholder="Valor"
              style={styles.inputs}
              onChangeText={(text) => setValor(text)}
              value={valor}
              iconContent={
                <Icon
                  size={16}
                  color="#ADB5BD"
                  name="attach-money"
                  family="MaterialIcons"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>

          <View style={styles.footer}>
            <Button
              style={{ width: '50%', backgroundColor: '#fff', borderRadius: 0, height: 40 }}
              onPress={() => onChange(false)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <Icon
                  size={20}
                  color="#d63031"
                  name="adduser"
                  family="AntDesign"
                  style={styles.inputIcons}
                /> */}
                <Text style={{ fontSize: 20, color: '#d63031' }}> Cancelar </Text>
              </View>
            </Button>
            <Button
              style={{
                width: '50%',
                // backgroundColor: '#009432',
                borderRadius: 0,
                height: 40,
              }}
              onPress={salvarAluno}
              loading={loading}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: '#ddd' }}> Alterar </Text>
              </View>
            </Button>
          </View>
        </View>
      </Modal>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    paddingHorizontal: 10,
  },
  content: {
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 'auto',
  },
  spinnerTextStyle: {
    marginTop: -30,
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default EditarProdutosModal;
