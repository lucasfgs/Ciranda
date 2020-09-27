import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Block, theme, Text, Icon } from 'galio-framework';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Toast from 'react-native-simple-toast';
import { carregarProdutos, alterarTotal, resetar } from '../store/actions';
import { connect } from 'react-redux';

import ItemsContainer from '../components/ItemsContainer';
import BasketContainer from '../components/BasketComponent';
import Footer from '../components/Footer';

import { Card, Button } from '../components';
import QrCodeModal from '../components/QrCodeModal';
import api from '../services/api';

const { width } = Dimensions.get('screen');

const INITIAL_STATE = [{ nome: '', saldo: '' }];

function Comprar({ carregarProdutos, resetar, carrinho }) {
  const [qrCodeModal, setQrCodeModal] = useState(false);
  const [aluno, setAluno] = useState(INITIAL_STATE);
  const [produtos, setProdutos] = useState([]);
  const [produtosResponse, setProdutosResponse] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setAluno(INITIAL_STATE);
    resetar();
    setScanned(true);
    setQrCodeModal(false);
    let response = await api.get(`/alunos/${data}/responsaveis/listar`);
    setAluno(response.data);

    response = await api.get(`/alunos/${data}/cantinas/produtos/listar/`);
    setProdutosResponse(response.data);

    let produtos = response.data.map((produto) => {
      return { ...produto, quantidade: 0 };
    });

    carregarProdutos(produtos);
    Toast.show('QRCode lido com sucesso!');
  };

  if (hasPermission === null) {
    return <Text>Requerindo permissao para camera!</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso a camera!</Text>;
  }

  function onSelectedItemsChange(selectedItems) {
    setProdutosSelecionados(selectedItems);
  }

  async function realizarVenda() {
    try {
      setLoading(true);

      await api.post('/alunos/compras/criar', {
        id_aluno: aluno[0].id,
        valor_total: carrinho.valorTotal,
      });
      Toast.show('Venda realizada com sucesso!');
    } catch (error) {
      Toast.show('Erro ao realizar venda!');
    }
    setLoading(false);
    setAluno(INITIAL_STATE);
    resetar();
  }

  return (
    <View style={{ flex: 1 }}>
      <QrCodeModal
        visible={qrCodeModal}
        onChange={setQrCodeModal}
        scanned={scanned}
        handleBarCodeScanned={handleBarCodeScanned}
      />
      <View style={styles.headerStyle}>
        <View style={styles.header}>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textTitle}>Aluno:</Text>
              <Text style={styles.textContent}>{aluno[0].nome}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textTitle}>Saldo:</Text>
              <Text style={styles.textContent}>
                {aluno[0].saldo && 'R$' + parseFloat(aluno[0].saldo).toFixed(2)}
              </Text>
            </View>
          </View>

          <Button
            style={styles.buttonQrCode}
            onPress={() => {
              setScanned(false);
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
        </View>
      </View>
      <ItemsContainer />
      <Footer handleSubmit={realizarVenda} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  header: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerStyle: {
    flex: 0.6,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
  },
  buttonQrCode: {
    backgroundColor: '#ddd',
    width: 50,
  },
  textTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },
  textContent: {
    fontSize: 15,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
  footer: {
    width: '100%',
  },
  buttonVenda: {
    width: '100%',
    borderRadius: 0,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    resetar: () => dispatch(resetar()),
    carregarProdutos: (produtos) => dispatch(carregarProdutos(produtos)),
    alterarTotal: (valorTotal, quantidadeTotal) =>
      dispatch(alterarTotal(valorTotal, quantidadeTotal)),
  };
};

const mapStateToProps = (state) => ({
  carrinho: state.carrinho,
});

export default connect(mapStateToProps, mapDispatchToProps)(Comprar);
