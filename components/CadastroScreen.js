import React, { useState } from "react";
import { View, TextInput, Button, Text, ImageBackground } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { autenticacao } from "../database/firebase";

const cadastroBackground = { uri: 'https://static.vecteezy.com/ti/vetor-gratis/t2/55230747-gato-pata-peixe-osso-padronizar-peixe-cachorro-salmao-repetir-cachecol-isolado-desenho-animado-ilustracao-telha-fundo-repetir-papel-de-parede-vetor.jpg' };

function CadastroScreen ({ navigation }){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const registrarUsuario = () => {
        createUserWithEmailAndPassword(autenticacao, email, senha)
        .then(() => {
            sendEmailVerification(autenticacao.currentUser);
            console.log("Usuario criado com sucesso!!")
        })
        .catch(erro => {
            console.error("Erro", erro.message);
        })
    }

    return (
        <ImageBackground source={cadastroBackground} style={{ flex: 1 }} imageStyle={{ resizeMode: 'cover', opacity: 0.5 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: 'rgba(247,242,236,0.85)' }}>
                <View style={{ width: '100%', maxWidth: 360, backgroundColor: '#ffffff', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 16, elevation: 6 }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#2f2b28', marginBottom: 16 }}>Cadastro</Text>
                    <Text style={{ fontSize: 14, color: '#7a736d', marginBottom: 18 }}>Crie sua conta para adotar ou encontrar seu novo pet.</Text>
                    <TextInput
                        placeholder="Email"
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
                    <View style={{ borderRadius: 14, overflow: 'hidden' }}>
                        <Button title="Cadastrar Usuario" onPress={registrarUsuario} color="#4f8d7a" />
                    </View>
                </View>
            </View>
        </ImageBackground>
    )

}

export default CadastroScreen;