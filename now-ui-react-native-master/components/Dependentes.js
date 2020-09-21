import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { Icon, Input } from '../components';
import { Button } from 'galio-framework';
import AsyncStorage from '@react-native-community/async-storage';

import CadastrarDependentes from './CadastrarDependentesModal';

import api from '../services/api';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.buttonContainer}>
      <Button style={{ width: '20%', backgroundColor: '#b2bec3' }}>
        <Icon size={16} color="#FFFF" name="qrcode" family="AntDesign" style={styles.inputIcons} />
      </Button>

      <Button style={{ width: '20%', backgroundColor: '#0abde3' }}>
        <Icon size={16} color="#ddd" name="edit" family="AntDesign" style={styles.inputIcons} />
      </Button>

      <Button style={{ width: '20%', backgroundColor: '#ee5253' }}>
        <Icon size={16} color="#ddd" name="delete" family="AntDesign" style={styles.inputIcons} />
      </Button>
    </View>
  </View>
);

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

        <FlatList data={alunos} renderItem={renderItem} keyExtractor={(item) => item.id} />
        <Button
          style={{ width: '100%', backgroundColor: '#009432', borderRadius: 0, height: 50 }}
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

    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 26,
    alignSelf: 'center',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    justifyContent: 'flex-end',
  },
});

export default Dependentes;
