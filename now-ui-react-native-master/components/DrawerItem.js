import React from 'react';
import { StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from './Icon';
import nowTheme from '../constants/Theme';

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case 'Dependentes':
        return (
          <Icon
            name="group"
            family="MaterialIcons"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.7 }}
          />
        );
      case 'Histórico':
        return (
          <Icon
            name="history"
            family="MaterialIcons"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.7 }}
          />
        );
      case 'Adicionar Fundos':
        return (
          <Icon
            name="attach-money"
            family="MaterialIcons"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.7 }}
          />
        );

      case 'Meu Cadastro':
        return (
          <Icon
            name="badge2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.7 }}
          />
        );

      case 'Sair':
        return (
          <Icon
            name="share"
            family="NowExtra"
            size={18}
            style={{ borderColor: 'rgba(0,0,0,0.5)', opacity: 0.7 }}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { focused, title, navigation } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null,
    ];

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={async () => {
          {
            if (title == 'Meu Cadastro')
              navigation.navigate(title == 'Sair' ? 'Meu cadastro' : title);
            else {
              await AsyncStorage.removeItem('@responsavel');
              navigation.navigate(title == 'Sair' ? 'Login' : title);
            }
          }
        }}
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              style={{
                fontFamily: 'montserrat-regular',
                textTransform: 'uppercase',
                fontWeight: '300',
              }}
              size={12}
              bold={focused ? true : false}
              color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: 'white',
  },
  activeStyle: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 30,
    color: 'white',
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
});

export default DrawerItem;
