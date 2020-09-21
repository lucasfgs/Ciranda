import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

const { width } = Dimensions.get('screen');

function Historico() {
  async function receberDados() {
    console.log('teste');
    const jsonValue = await AsyncStorage.getItem('@responsavel');
    let responsavel = JSON.parse(jsonValue);
    console.log(responsavel);
    // let response = await api.get(`/responsaveis/${responsavel.id}/compras/listar`);
    // console.log(response.data);
  }

  useEffect(() => {
    receberDados();
  }, []);

  return (
    <Block flex center style={styles.home}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Aluno</DataTable.Title>
          <DataTable.Title numeric>Valor</DataTable.Title>
          <DataTable.Title numeric>Data</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Frozen yogurt</DataTable.Cell>
          <DataTable.Cell numeric>159</DataTable.Cell>
          <DataTable.Cell numeric>6.0</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: '100%',
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
});

export default Historico;
