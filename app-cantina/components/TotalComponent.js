import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

const TotalComponent = ({ carrinho }) => {
  const { containerStyle, goodsStyle, totalStyle } = styles;
  return (
    <View style={containerStyle}>
      <View style={goodsStyle}>
        <Icon name="ios-cart" size={20} style={{ marginRight: 8 }} />
        <Text>{carrinho.quantidadeTotal} Itens</Text>
      </View>

      <View style={totalStyle}>
        <Text>Preço: </Text>
        <Text>R$ {parseFloat(carrinho.valorTotal).toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  goodsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

const mapStateToProps = (state) => ({
  carrinho: state.carrinho,
});

export default connect(mapStateToProps, null)(TotalComponent);
