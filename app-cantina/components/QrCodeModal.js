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
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { BarCodeScanner } from 'expo-barcode-scanner';

import Input from './Input';
import Restricoes from './Restricoes';

import api from '../services/api';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
const QrCodeModal = ({ visible, onChange, scanned, handleBarCodeScanned }) => {
  return (
    <DismissKeyboard>
      <Modal isVisible={visible}>
        <View style={styles.container}>
          <View style={styles.camera}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            style={{ width: '100%', borderRadius: 0, height: 40 }}
            onPress={() => onChange(false)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: '#fff' }}> Cancelar </Text>
            </View>
          </Button>
        </View>
      </Modal>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  camera: {
    width: '100%',
    height: '88%',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 'auto',
  },
});

export default QrCodeModal;
