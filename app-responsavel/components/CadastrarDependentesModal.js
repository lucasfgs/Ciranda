import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button, Icon, Block } from 'galio-framework';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import Input from './Input';
import Restricoes from './Restricoes';

import api from '../services/api';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
const CadastrarDependentesModal = ({ visible, onChange, responsavel }) => {
  const [nome, setNome] = useState('');
  const [restricoes, setRestricoes] = useState([]);
  const [loading, setLoading] = useState(false);

  async function salvarAluno() {
    try {
      setLoading(true);
      let response = await api.post('/alunos/criar', {
        nome,
        id_responsavel: responsavel.id,
      });

      const { id: id_aluno } = response.data;
      let obj = {};

      obj.data = restricoes.map((restricao) => {
        return { id_aluno, id_produto: restricao };
      });

      response = await api.post('/alunos/retricoes/criar', obj);
      setLoading(false);
      setRestricoes([]);
      Toast.show('Cadastrado com sucesso!');
      onChange(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show('Falha ao cadastrar!');
    }
  }

  return (
    <DismissKeyboard>
      <Modal isVisible={visible}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 20 }}>
              Cadastrar aluno
            </Text>
          </View>

          <Block style={{ width: '90%', marginTop: 20 }}>
            <Input
              placeholder="Nome"
              style={styles.inputs}
              onChangeText={(text) => setNome(text)}
              iconContent={
                <Icon
                  size={16}
                  color="#ADB5BD"
                  name="user"
                  family="AntDesign"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Block style={{ width: '90%', marginTop: 20 }}>
            {/* <Text>Restrições</Text> */}
            <Restricoes setRestricoes={setRestricoes} restricoes={restricoes} />
          </Block>

          <View style={styles.footer}>
            <Button
              style={{ width: '50%', backgroundColor: '#fff', borderRadius: 0, height: 40 }}
              onPress={() => onChange(false)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <Icon
                  size={20}
                  color="#d63031"
                  name="adduser"
                  family="AntDesign"
                  style={styles.inputIcons}
                /> */}
                <Text style={{ fontSize: 20, color: '#d63031' }}> Cancelar </Text>
              </View>
            </Button>
            <Button
              style={{
                width: '50%',
                // backgroundColor: '#009432',
                borderRadius: 0,
                height: 40,
              }}
              onPress={salvarAluno}
              loading={loading}
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
          </View>
        </View>
      </Modal>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    paddingHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 'auto',
  },
});

const mapStateToProps = (state) => ({
  responsavel: state.responsavel,
});

export default connect(mapStateToProps)(CadastrarDependentesModal);
