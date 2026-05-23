import React, { useState, useEffect } from "react";
import { View, TextInput, Button, ScrollView, Text, ImageBackground } from "react-native";
import { collection, doc, addDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../database/firebase";

const animalBackground = { uri: 'https://static.vecteezy.com/ti/vetor-gratis/t2/55230747-gato-pata-peixe-osso-padronizar-peixe-cachorro-salmao-repetir-cachecol-isolado-desenho-animado-ilustracao-telha-fundo-repetir-papel-de-parede-vetor.jpg' };



function AnimalScreen(){
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [raca, setRaca] = useState('');
    const [idade, setIdade] = useState('');
    const [contatos, setContatos] = useState('');
    const [endereco, setEndereco] = useState('');
    const [animais, setAnimais] = useState([]);
    const [editarId, setEditarId] = useState(null);

    useEffect(() => {
        listarAnimais()
    }, [])

    const salvarAnimal = async () => {
        if (editarId){
            await updateDoc(doc(db, 'animais', editarId), {nome, descricao, raca, idade, contatos, endereco});
            setEditarId(null);
        } else {
            await addDoc(collection(db, "animais"),{nome, descricao, raca, idade, contatos, endereco})
        }
        setNome('');
        setDescricao('');
        setRaca('');
        setIdade('');
        setContatos('');
        setEndereco('');
        listarAnimais();
    }

    const listarAnimais = async () => {
        const dadosAnimais = await getDocs(collection(db, 'animais'));
        const lista_de_animais = dadosAnimais.docs.map(doc => ({ id: doc.id, ...doc.data()}));
        setAnimais(lista_de_animais);
    }

    const editarAnimal = (animal) => {
        setNome(animal.nome);
        setDescricao(animal.descricao);
        setRaca(animal.raca);
        setIdade(animal.idade);
        setContatos(animal.contatos);
        setEndereco(animal.endereco);
        setEditarId(animal.id);
    }

    const deletarAnimal = async (id) => {
        await deleteDoc(doc(db, 'animais', id));
        listarAnimais();
    }

    return (
        <ImageBackground source={animalBackground} style={{ flex: 1, minHeight: 0, width: '100%', height: '100%' }} imageStyle={{ resizeMode: 'cover', opacity: 0.5 }}>
            <View style={{ flex: 1, minHeight: 0, width: '100%', height: '100%', backgroundColor: 'rgba(247,242,236,0.85)' }}>
                <ScrollView
                    style={{ flex: 1, minHeight: 0 }}
                    contentContainerStyle={{ flexGrow: 1, minHeight: '100%', paddingBottom: 100 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={true}
                >
                    <View style={{ margin: 20, backgroundColor: '#ffffff', borderRadius: 18, padding: 18, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 4 }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: '#2d2a28', marginBottom: 14 }}>Cadastrar pet</Text>

                        <TextInput
                            placeholder="Nome do pet"
                            value={nome}
                            onChangeText={setNome}
                            style={{ backgroundColor: '#f4efe8', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 12 }}
                        />
                        <TextInput
                            placeholder="Descrição"
                            value={descricao}
                            onChangeText={setDescricao}
                            style={{ backgroundColor: '#f4efe8', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 12 }}
                        />
                        <TextInput
                            placeholder="Raça/cor"
                            value={raca}
                            onChangeText={setRaca}
                            style={{ backgroundColor: '#f4efe8', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 12 }}
                        />
                        <TextInput
                            placeholder="Faixa etária"
                            value={idade}
                            onChangeText={setIdade}
                            style={{ backgroundColor: '#f4efe8', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 12 }}
                        />
                        <TextInput
                            placeholder="Contatos"
                            value={contatos}
                            onChangeText={setContatos}
                            style={{ backgroundColor: '#f4efe8', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 12 }}
                        />
                        <TextInput
                            placeholder="Endereço"
                            value={endereco}
                            onChangeText={setEndereco}
                            style={{ backgroundColor: '#f4efe8', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 18 }}
                        />

                        <View style={{ borderRadius: 14, overflow: 'hidden' }}>
                            <Button
                                title={editarId ? "Atualizar" : "Publicar"}
                                onPress={salvarAnimal}
                                color="#4f8d7a"
                            />
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 8 }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: '#2d2a28' }}>Animais para adoção:</Text>
                    </View>
                    {animais.length === 0 ? (
                        <Text style={{ marginHorizontal: 20, marginTop: 24, color: '#7a736d', textAlign: 'center' }}>
                            Nenhum pet cadastrado ainda.
                        </Text>
                    ) : (
                        animais.map((item) => (
                            <View key={item.id} style={{ marginHorizontal: 20, marginVertical: 10, padding: 18, backgroundColor: '#ffffff', borderRadius: 18, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 }}>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: '#2d2a28', marginBottom: 6 }}>{item.nome}</Text>
                                <Text style={{ color: '#5d5752', marginBottom: 8 }}>{item.descricao}</Text>
                                <Text style={{ color: '#7a736d', marginBottom: 2 }}>Raça/cor: {item.raca}</Text>
                                <Text style={{ color: '#7a736d', marginBottom: 2 }}>Faixa etária: {item.idade}</Text>
                                <Text style={{ color: '#7a736d', marginBottom: 8 }}>Contatos: {item.contatos}</Text>
                                <Text style={{ color: '#7a736d', marginBottom: 12 }}>Endereço: {item.endereco}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flex: 1, marginRight: 8, borderRadius: 14, overflow: 'hidden' }}>
                                        <Button title="Editar" onPress={() => editarAnimal(item)} color="#4f8d7a" />
                                    </View>
                                    <View style={{ flex: 1, borderRadius: 14, overflow: 'hidden' }}>
                                        <Button title="Deletar" onPress={() => deletarAnimal(item.id)} color="#d55d5d" />
                                    </View>
                                </View>
                            </View>
                        ))
                    )}
                </ScrollView>
            </View>
        </ImageBackground>
    );
 }

export default AnimalScreen;
