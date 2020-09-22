import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Block, theme, Text, Icon } from 'galio-framework';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Toast from 'react-native-simple-toast';

import { Card, Button } from '../components';
import QrCodeModal from '../components/QrCodeModal';
import api from '../services/api';

const { width } = Dimensions.get('screen');

function Comprar() {
  const [qrCodeModal, setQrCodeModal] = useState(false);
  const [aluno, setAluno] = useState([{ nome: '', saldo: '' }]);
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

  useEffect(() => {
    console.log(valorTotal);
  }, [valorTotal]);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setQrCodeModal(false);
    let response = await api.get(`/alunos/${data}/responsaveis/listar`);
    setAluno(response.data);

    response = await api.get(`/alunos/${data}/cantinas/produtos/listar/`);
    setProdutosResponse(response.data);

    let obj = [
      {
        children: response.data,
      },
    ];
    setProdutos(obj);

    Toast.show('QRCode lido com sucesso!');
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function onSelectedItemsChange(selectedItems) {
    setProdutosSelecionados(selectedItems);
  }

  async function realizarVenda() {
    try {
      setLoading(true);
      let saldoResponsavel = parseFloat(aluno[0].saldo) - valorTotal;
      console.log(saldoResponsavel);
      console.log(aluno[0].id_responsavel);
      await api.put('/responsaveis/atualizar', {
        id: aluno[0].id_responsavel,
        saldo: saldoResponsavel,
      });

      await api.post('/alunos/compras/criar', {
        id_aluno: aluno[0].id,
        valor_total: valorTotal,
      });
      Toast.show('Venda realizada com sucesso!');
    } catch (error) {
      console.log(error);
      Toast.show('Erro ao realizar venda!');
    }
    setLoading(true);
  }

  function handleConfirm() {
    setValorTotal(0);
    let count = 0;
    produtosResponse.map((produto) => {
      produtosSelecionados.map((produtoSelectionado) => {
        if (produto.id == produtoSelectionado) {
          // setValorTotal(valorTotal + parseFloat(produto.valor));
          setValorTotal((valorAntigo) => valorAntigo + parseFloat(produto.valor));
          count++;
        }
      });
    });
  }

  return (
    <Block flex center style={styles.container}>
      <QrCodeModal
        visible={qrCodeModal}
        onChange={setQrCodeModal}
        scanned={scanned}
        handleBarCodeScanned={handleBarCodeScanned}
      />
      <View style={styles.header}>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textTitle}>Aluno:</Text>
            <Text style={styles.textContent}>{aluno[0].nome}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textTitle}>Saldo:</Text>
            <Text style={styles.textContent}>R$ {aluno[0].saldo}</Text>
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
      <View style={styles.content}>
        <SectionedMultiSelect
          items={produtos}
          uniqueKey="id"
          loading={false}
          subKey="children"
          scroll
          displayKey="nome"
          selectText="Escolha os produtos"
          showDropDowns={false}
          readOnlyHeadings={true}
          onSelectedItemsChange={onSelectedItemsChange}
          onConfirm={handleConfirm}
          onSelectedItemObjectsChange={handleConfirm}
          selectedItems={produtosSelecionados}
          confirmText="Confirmar"
          searchPlaceholderText="Buscar produtos..."
          selectedText="selecionados"
        />
      </View>

      <View style={styles.footer}>
        <Text style={{ color: '#000', marginBottom: 20 }}>Valor Total: R${valorTotal}</Text>
        <Button style={styles.buttonVenda} onPress={realizarVenda}>
          <Text style={{ color: '#fff' }}>Realizar Venda</Text>
        </Button>
      </View>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  header: {
    height: 100,
    paddingRight: 60,
    paddingLeft: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default Comprar;
