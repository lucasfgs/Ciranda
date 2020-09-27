import React from 'react';
import { ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, Linking } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { useSafeArea } from 'react-native-safe-area-context';
import Images from '../constants/Images';
import { DrawerItem as DrawerCustomItem, Icon } from '../components';
import { connect } from 'react-redux';

const { width } = Dimensions.get('screen');

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  responsavel,
  ...rest
}) {
  const insets = useSafeArea();

  const screens = ['Dependentes', 'Histórico', 'Adicionar Fundos', 'Meu Cadastro'];
  return (
    <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <Block style={styles.header}>
        <Text style={styles.logoText} color="#fff">
          Ciranda
        </Text>

        <Block row style={styles.moneyContainer}>
          <Text style={styles.moneyText} color="#ffffff">
            Saldo: <Text color="#ffffff">{parseFloat(responsavel.saldo).toFixed(2)} R$</Text>
          </Text>
        </Block>

        <Block right style={styles.headerIcon}>
          <Icon name="align-left-22x" family="NowExtra" size={20} color={'white'} />
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
            <Block
              style={{
                borderColor: 'white',
                width: '97%',
                borderWidth: StyleSheet.hairlineWidth,
                marginHorizontal: 10,
              }}
            />
          </Block>
          {/* <DrawerCustomItem title="Meu Cadastro" navigation={navigation} /> */}
          <DrawerCustomItem title="Sair" navigation={navigation} />
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center',
  },
  headerIcon: {
    marginTop: -20,
  },
  logo: {
    height: 40,
    width: 40,
  },
  logoText: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    letterSpacing: 5,
    textTransform: 'uppercase',
  },
  moneyText: {
    textAlign: 'center',
    fontSize: 19,
    textTransform: 'uppercase',
    marginTop: 15,
  },
});

const mapStateToProps = (state) => ({
  responsavel: state.responsavel,
});

export default connect(mapStateToProps)(CustomDrawerContent);
