import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { theme } from 'galio-framework';
import { DataTable } from 'react-native-paper';
import { connect } from 'react-redux';

import api from '../services/api';

const { width } = Dimensions.get('screen');

function Historico({ responsavel }) {
  const [compras, setCompras] = useState([]);
  async function receberDados() {
    console.log(responsavel);
    let response = await api.get(`/responsaveis/${responsavel.id}/compras/listar`);
    setCompras(response.data);
  }

  useEffect(() => {
    receberDados();
  }, []);

  return (
    <View flex center style={styles.home}>
      <ScrollView>
        <DataTable refre>
          <DataTable.Header>
            <DataTable.Title>Aluno</DataTable.Title>
            <DataTable.Title>Valor</DataTable.Title>
            <DataTable.Title>Data</DataTable.Title>
          </DataTable.Header>
          {compras.map((compra) => {
            let data = new Date(compra.Data);
            data = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
            return (
              <DataTable.Row key={compra.Data}>
                <DataTable.Cell>{compra.nome}</DataTable.Cell>
                <DataTable.Cell>{parseFloat(compra.valor_total).toFixed(2)}</DataTable.Cell>
                <DataTable.Cell>{data}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
    flex: 1,
  },
  articles: {
    width: '100%',
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
});

const mapStateToProps = (state) => ({
  responsavel: state.responsavel,
});

export default connect(mapStateToProps)(Historico);
