import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import AsyncStorage from '@react-native-community/async-storage';

import { Card, Button } from '../components';
import articles from '../constants/articles';
import Dependentes from '../components/Dependentes';

const { width } = Dimensions.get('screen');

function Home() {
  return (
    <Block flex center style={styles.home}>
      <Dependentes style={styles.articles} />
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

export default Home;
