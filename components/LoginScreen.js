import React, { useState } from "react";
import { View, TextInput, Button, Text, ImageBackground } from "react-native";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { autenticacao } from "../database/firebase";

const loginBackground = { uri: 'https://static.vecteezy.com/ti/vetor-gratis/t2/55230747-gato-pata-peixe-osso-padronizar-peixe-cachorro-salmao-repetir-cachecol-isolado-desenho-animado-ilustracao-telha-fundo-repetir-papel-de-parede-vetor.jpg' };

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const loginUsuario = () => {
        signInWithEmailAndPassword(autenticacao, email, senha)
        .then(() => {
            navigation.navigate("Home");
        }).catch(erro => {
            console.error("Erro na pagina de login " + erro.message);
        })
    }

    const recuperarSenha = () => {
        sendPasswordResetEmail(autenticacao, email)
        .then(() => {
            console.log("Email enviado")
        }).catch(erro => {
            console.error("Falha ao enviar email de recuperacao" + erro.message);
        })
    }

    return(
        <ImageBackground source={loginBackground} style={{ flex: 1 }} imageStyle={{ resizeMode: 'cover', opacity: 0.5 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: 'rgba(247,242,236,0.85)' }}>
                <View style={{ width: '100%', maxWidth: 360, backgroundColor: '#ffffff', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 16, elevation: 6 }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#2f2b28', marginBottom: 16 }}>Login</Text>
                    <TextInput
                        placeholder="E-mail"
                        onChangeText={setEmail}
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={{ backgroundColor: '#f4efe8', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 12 }}
                    />
                    <TextInput
                        placeholder="Senha"
                        secureTextEntry
                        onChangeText={setSenha}
                        value={senha}
                        style={{ backgroundColor: '#f4efe8', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 18 }}
                    />
                    <View style={{ marginBottom: 12 }}>
                        <Button title="Login" onPress={loginUsuario} color="#4f8d7a" />
                    </View>
                    <View style={{ marginBottom: 12 }}>
                        <Button title="Redefinir Senha" onPress={recuperarSenha} color="#7a736d" />
                    </View>
                    <View style={{ marginTop: 6 }}>
                        <Button title="Cadastrar-se" onPress={() => navigation.navigate("Cadastrar")} color="#49796b" />
                    </View>
                </View>
            </View>
        </ImageBackground>
    )

}

export default LoginScreen;