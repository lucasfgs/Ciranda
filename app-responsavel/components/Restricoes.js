import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import api from '../services/api';

const Restricoes = ({ setRestricoes, restricoes }) => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function receberProdutos() {
      let response = await api.get('/cantinas/produtos/listar');
      let obj = [
        {
          children: response.data,
        },
      ];
      setProdutos(obj);
    }
    receberProdutos();
  }, []);

  function onSelectedItemsChange(selectedItems) {
    setRestricoes(selectedItems);
  }
  return (
    <View>
      <ScrollView style={styles.container}>
        <SectionedMultiSelect
          items={produtos}
          uniqueKey="id"
          loading={false}
          subKey="children"
          scroll
          displayKey="nome"
          selectText="Escolha as restrições"
          showDropDowns={false}
          readOnlyHeadings={true}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={restricoes}
          confirmText="Confirmar"
          searchPlaceholderText="Buscar produtos..."
          selectedText="selecionados"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Restricoes;
