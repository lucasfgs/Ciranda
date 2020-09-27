import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Item from './Item';

function ItemsContainer({ carrinho }) {
  return <View style={styles.containterStyle}>{carrinho.produtos.length > 0 && <Item />}</View>;
}

const styles = {
  containterStyle: {
    flex: 4,
    backgroundColor: '#DCDCDC',
  },
};

const mapStateToProps = (state) => ({
  carrinho: state.carrinho,
});

export default connect(mapStateToProps, null)(ItemsContainer);
