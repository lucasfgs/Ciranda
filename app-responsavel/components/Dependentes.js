import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { Icon, Input } from '../components';
import { Button } from 'galio-framework';
import { connect } from 'react-redux';

import CadastrarDependentes from './CadastrarDependentesModal';
import EditarDependentes from './EditarDependentesModal';
import ExcluirDependentes from './ExcluirDependentesModal';
import QRCodeDependentes from './QRCodeDependentesModal';

import api from '../services/api';

const Item = ({
  id,
  title,
  setQrCodeModal,
  setExcluirModal,
  setEditarModal,
  setAlunoSelecionado,
}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          onPress={() => {
            setAlunoSelecionado(id);
            setQrCodeModal(true);
          }}
        >
          <Icon
            size={16}
            color="#1c1c1c"
            name="qrcode"
            family="AntDesign"
            style={styles.inputIcons}
          />
        </Button>

        <Button
          style={styles.button}
          onPress={() => {
            setAlunoSelecionado(id);
            setEditarModal(true);
          }}
        >
          <Icon
            size={16}
            color="#0abde3"
            name="edit"
            family="AntDesign"
            style={styles.inputIcons}
          />
        </Button>

        <Button
          style={styles.button}
          onPress={() => {
            setAlunoSelecionado(id);
            setExcluirModal(true);
          }}
        >
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

const Dependentes = ({ responsavel }) => {
  const [cadastrarModal, setCadastrarModal] = useState(false);
  const [editarModal, setEditarModal] = useState(false);
  const [excluirModal, setExcluirModal] = useState(false);
  const [qrCodeModal, setQrCodeModal] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  async function receberAlunos() {
    let response = await api.get(`/responsavel/${responsavel.id}/alunos/listar`);
    setAlunos(response.data);
  }
  useEffect(() => {
    receberAlunos();
  }, [cadastrarModal, excluirModal, editarModal]);

  const renderItem = (
    { item },
    setQrCodeModal,
    setExcluirModal,
    setEditarModal,
    setAlunoSelecionado
  ) => {
    return (
      <Item
        title={item.nome}
        id={item.id}
        setQrCodeModal={setQrCodeModal}
        setExcluirModal={setExcluirModal}
        setEditarModal={setEditarModal}
        setAlunoSelecionado={setAlunoSelecionado}
      />
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CadastrarDependentes visible={cadastrarModal} onChange={setCadastrarModal} />
        <EditarDependentes visible={editarModal} onChange={setEditarModal} id={alunoSelecionado} />
        <ExcluirDependentes
          visible={excluirModal}
          onChange={setExcluirModal}
          id={alunoSelecionado}
        />
        <QRCodeDependentes visible={qrCodeModal} onChange={setQrCodeModal} id={alunoSelecionado} />

        <FlatList
          data={alunos}
          renderItem={(item) =>
            renderItem(item, setQrCodeModal, setExcluirModal, setEditarModal, setAlunoSelecionado)
          }
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

const mapStateToProps = (state) => ({
  responsavel: state.responsavel,
});

export default connect(mapStateToProps)(Dependentes);
