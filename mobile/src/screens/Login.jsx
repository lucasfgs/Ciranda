import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import spinning from "../../assets/spinning.gif";
import wave from "../../assets/wave.png";

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={wave} style={styles.background} />
        <Image source={spinning} style={styles.animation} />
        <Text style={styles.title}>Ciranda</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Acesse a sua conta</Text>
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          placeholderTextColor="#292f36"
        ></TextInput>
        <TextInput
          placeholder="Senha"
          style={styles.input}
          placeholderTextColor="#292f36"
        ></TextInput>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.createAccount}>
          <Text style={styles.createAccountText}>Ainda não tem uma conta?</Text>
          <TouchableOpacity style={styles.createAccountButton}>
            <Text style={styles.createAccountButtonText}>Crie agora</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf2f4",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  topContainer: {
    // backgroundColor: "#383961",
    alignSelf: "stretch",
    alignItems: "center",
    paddingTop: 40,
  },
  background: {
    width: "100%",
    height: 280,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -2,
  },
  title: {
    color: "#C2617E",
    fontSize: 30,
    marginTop: -30,
    marginBottom: 25,
    letterSpacing: 4,
  },
  animation: {
    width: 300,
    height: 100,
    zIndex: -1,
  },
  formTitle: {
    color: "#292f36",
    fontSize: 25,
    marginVertical: 40,
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#383961",
    width: 250,
    height: 45,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#C2617E",
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
  },
  createAccount: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  createAccountText: {
    textAlign: "center",
    marginVertical: 15,
    color: "#292f36",
    fontSize: 16,
  },
  createAccountButton: {
    marginLeft: 5,
  },
  createAccountButtonText: {
    fontSize: 16,
    color: "#C2617E",
    fontWeight: "bold",
  },
});
