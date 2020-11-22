import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, Icon, Block } from 'galio-framework';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import QRCode from 'react-native-qrcode-svg';

import { Images } from '../constants';

import api from '../services/api';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
const QRCodeDependentesModal = ({ visible, onChange, id }) => {
  const [loading, setLoading] = useState(false);

  return (
    <DismissKeyboard>
      <Modal isVisible={visible}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 20 }}>QR Code</Text>
          </View>

          <View style={styles.content}>
            <QRCode value={`${id}`} size={250} style={{ marginTop: 20 }} />
          </View>

          <View style={styles.footer}>
            <Button
              style={{ width: '100%', backgroundColor: '#d63031', borderRadius: 0, height: 40 }}
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
                <Text style={{ fontSize: 20, color: '#fff' }}> Fechar </Text>
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
  content: {
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 'auto',
  },
});

export default QRCodeDependentesModal;
