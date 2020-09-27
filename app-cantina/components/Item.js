import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Button, Icon } from 'galio-framework';
import { connect } from 'react-redux';

import { alterarQuantidadeProduto, alterarTotal } from '../store/actions';

function ItemList({ carrinho, alterarQuantidadeProduto, alterarTotal }) {
  function renderItem({ item, index }) {
    function handleQuantidade(produto, tipo) {
      if (tipo == 'soma') {
        produto.quantidade++;
        alterarQuantidadeProduto(produto);
        alterarTotal(
          (carrinho.valorTotal += parseFloat(produto.valor)),
          (carrinho.quantidadeTotal += 1)
        );
      } else if (tipo == 'subtracao' && produto.quantidade > 0) {
        produto.quantidade--;
        alterarQuantidadeProduto(produto);
        alterarTotal(
          (carrinho.valorTotal -= parseFloat(produto.valor)),
          (carrinho.quantidadeTotal -= 1)
        );
      }
    }
    const {
      containerStyle,
      lastItemStyle,
      imageStyle,
      textStyle,
      counterStyle,
      priceStyle,
    } = styles;

    return (
      <View style={index + 1 === 1 ? lastItemStyle : containerStyle}>
        <View style={textStyle}>
          <Text style={{ color: '#2e2f30' }}>{item.nome}</Text>
          <View style={priceStyle}>
            <Text style={{ color: '#2e2f30', fontSize: 12 }}>R$: {item.valor}</Text>
          </View>
        </View>
        <View style={counterStyle}>
          <Button
            style={{ borderRadius: 15, backgroundColor: '#bbb', height: 30, width: 30 }}
            onPress={() => handleQuantidade(item, 'subtracao')}
          >
            <Icon
              size={16}
              color="#1c1c1c"
              name="remove"
              family="Ionicons"
              style={styles.inputIcons}
            />
          </Button>
          <Text>{item.quantidade}</Text>
          <Button
            style={{ borderRadius: 15, backgroundColor: '#bbb', height: 30, width: 30 }}
            onPress={() => handleQuantidade(item, 'soma')}
          >
            <Icon
              size={16}
              color="#1c1c1c"
              name="add"
              family="Ionicons"
              style={styles.inputIcons}
            />
          </Button>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={carrinho.produtos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  lastItemStyle: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  imageStyle: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  textStyle: {
    flex: 2,
    justifyContent: 'center',
  },
  priceStyle: {
    backgroundColor: '#ddd',
    width: 100,
    alignItems: 'center',
    marginTop: 3,
    borderRadius: 3,
  },
  counterStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
};

const mapDispatchToProps = (dispatch) => {
  return {
    alterarQuantidadeProduto: (produto) => dispatch(alterarQuantidadeProduto(produto)),
    alterarTotal: (valorTotal, quantidadeTotal) =>
      dispatch(alterarTotal(valorTotal, quantidadeTotal)),
  };
};

const mapStateToProps = (state) => ({
  carrinho: state.carrinho,
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
