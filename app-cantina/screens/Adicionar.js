import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { Block, theme, Input, Button, Icon } from 'galio-framework';
import { DataTable } from 'react-native-paper';
import { connect } from 'react-redux';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import { TextInput } from 'react-native-paper';
import { Images, nowTheme } from '../constants';
import Toast from 'react-native-simple-toast';
import { atualizarSaldo } from '../store/actions';

import api from '../services/api';

const { width } = Dimensions.get('screen');

function Adicionar({ responsavel, atualizarSaldo }) {
  const [quantidade, setQuantidade] = useState(0);
  const [loading, setLoading] = useState(false);
  async function realizarPagamento() {
    setLoading(true);
    try {
      Stripe.setOptionsAsync({
        publishableKey:
          'pk_test_51HU0OtEUXc7vnxFuflLgtMj28CskrKf91I4xDTsSxlLN4meLrCCbj6TJK6PrlL4oiPSsPKEUafL75pnLJyb4qhS0009TateuiH', // Your key
      });
      const response = await Stripe.paymentRequestWithCardFormAsync();
      console.log(response);

      let saldo = await api.post(`/pagamentos/pagar`, {
        id: responsavel.id,
        valor: quantidade,
        token: response.tokenId,
      });
      atualizarSaldo(saldo.data);
      Toast.show('Pagamento realizado com sucesso!');
    } catch (error) {
      Toast.show('Falha no pagamento!');
    }

    setLoading(false);
  }

  return (
    <Block flex center style={styles.home}>
      <Block style={{ flexDirection: 'row', marginTop: 40 }}>
        <Text style={{ alignSelf: 'center', fontSize: 20, marginRight: 5 }}>R$</Text>

        <Input
          placeholder="Valor"
          color="black"
          width={20}
          onChangeText={(text) => setQuantidade(text)}
          keyboardType={'numeric'}
        />
      </Block>
      <Block center>
        <Button style={{ height: 40, marginTop: 10 }} round onPress={realizarPagamento}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              size={20}
              color="white"
              name="payment"
              family="MaterialIcons"
              style={styles.inputIcons}
            />
            <Text style={{ fontSize: 20, color: '#fff' }}> Pagar </Text>
          </View>
        </Button>
      </Block>
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
  payButton: {},
});

const mapDispatchToProps = (dispatch) => {
  return {
    atualizarSaldo: (saldo) => dispatch(atualizarSaldo(saldo)),
  };
};

const mapStateToProps = (state) => ({
  responsavel: state.responsavel,
});

export default connect(mapStateToProps, mapDispatchToProps)(Adicionar);
