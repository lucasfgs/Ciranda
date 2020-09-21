import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { Icon, Input } from '../components';
import { Button } from 'galio-framework';
import AsyncStorage from '@react-native-community/async-storage';

import CadastrarDependentes from './CadastrarDependentesModal';

import api from '../services/api';

const Item = ({ id, title }) => {
  async function deletarItem() {
    try {
      let resp = await api.delete(`/alunos/deletar/${id}`);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonContainer}>
        <Button style={styles.button}>
          <Icon
            size={16}
            color="#1c1c1c"
            name="qrcode"
            family="AntDesign"
            style={styles.inputIcons}
          />
        </Button>

        <Button style={styles.button}>
          <Icon
            size={16}
            color="#0abde3"
            name="edit"
            family="AntDesign"
            style={styles.inputIcons}
          />
        </Button>

        <Button style={styles.button} onPress={deletarItem}>
          <Icon
            size={16}
            color="#ee5253"
            name="delete"
            family="AntDesign"
            style={styles.inputIcons}
          />
        </Button>
      </View>
    </View>
  );
};

const Dependentes = () => {
  const [cadastrarModal, setCadastrarModal] = useState(false);
  const [alunos, setAlunos] = useState([]);
  async function receberAlunos() {
    const jsonValue = await AsyncStorage.getItem('@responsavel');
    let responsavel = JSON.parse(jsonValue);

    let response = await api.get(`/responsavel/${responsavel.id}/alunos/listar`);
    setAlunos(response.data[0]);
  }
  useEffect(() => {
    receberAlunos();
    console.log(cadastrarModal);
  }, [cadastrarModal]);

  const renderItem = ({ item }) => {
    return <Item title={item.nome} />;
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CadastrarDependentes visible={cadastrarModal} onChange={setCadastrarModal} />

        <FlatList
          data={alunos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <Button
          style={{ width: '100%', borderRadius: 0, height: 50 }}
          color="primary"
          onPress={() => setCadastrarModal(true)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              size={20}
              color="#ddd"
              name="adduser"
              family="AntDesign"
              style={styles.inputIcons}
            />
            <Text style={{ fontSize: 20, color: '#ddd' }}> Adicionar </Text>
          </View>
        </Button>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
    marginHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: '#f7f5f5',
    borderRadius: 5,
    // borderBottomWidth: 0.2,
  },
  title: {
    fontSize: 18,
    alignSelf: 'center',
    width: '100%',
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 5,
    justifyContent: 'flex-end',
  },
  button: {
    marginHorizontal: 2,
    width: '20%',
    backgroundColor: '#fff',
  },
});

export default Dependentes;
