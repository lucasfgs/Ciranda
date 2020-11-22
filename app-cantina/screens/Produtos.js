import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { Icon, Input } from '../components';
import { Button } from 'galio-framework';
import { connect } from 'react-redux';

import CadastrarProdutos from '../components/CadastrarProdutoModal';
import EditarProdutos from '../components/EditarProdutosModal';
import ExcluirDependentes from '../components/ExcluirDependentesModal';

import api from '../services/api';

const Item = ({ id, title, setExcluirModal, setEditarModal, setProdutoSelecionado }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          onPress={() => {
            setProdutoSelecionado(id);
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
            setProdutoSelecionado(id);
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
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  async function receberProdutos() {
    let response = await api.get(`/cantinas/produtos/listar`);
    setProdutos(response.data);
  }
  useEffect(() => {
    receberProdutos();
  }, [cadastrarModal, excluirModal, editarModal]);

  const renderItem = ({ item }, setExcluirModal, setEditarModal, setProdutoSelecionado) => {
    return (
      <Item
        title={item.nome}
        id={item.id}
        setExcluirModal={setExcluirModal}
        setEditarModal={setEditarModal}
        setProdutoSelecionado={setProdutoSelecionado}
      />
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CadastrarProdutos visible={cadastrarModal} onChange={setCadastrarModal} />
        <EditarProdutos visible={editarModal} onChange={setEditarModal} id={produtoSelecionado} />
        <ExcluirDependentes
          visible={excluirModal}
          onChange={setExcluirModal}
          id={produtoSelecionado}
        />

        <FlatList
          data={produtos}
          renderItem={(item) =>
            renderItem(item, setExcluirModal, setEditarModal, setProdutoSelecionado)
          }
          keyExtractor={(item) => item.id.toString()}
        />
        <Button
          style={{ width: '100%', borderRadius: 0, height: 50 }}
          color="primary"
          onPress={() => setCadastrarModal(true)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
