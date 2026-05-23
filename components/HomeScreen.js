import React from "react";
import { View, Text, Button } from "react-native";
import { autenticacao } from "../database/firebase";
import { signOut } from "firebase/auth";

import AnimalScreen from "./AnimalScreen";

function HomeScreen({ navigation }){
    const logout = () => {
        signOut(autenticacao)
        .then(() => navigation.navigate("Login"))
    }

    return(
        <View style={{ flex: 1, height: '100%', backgroundColor: '#f7f2ec' }}>
            <View style={{ padding: 20, backgroundColor: '#ffffff', borderBottomLeftRadius: 24, borderBottomRightRadius: 24, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, elevation: 4 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 24, fontWeight: '700', color: '#2f2b28' }}>Adote seu pet</Text>
                        <Text style={{ fontSize: 14, color: '#7a736d', marginTop: 6 }}>Encontre um amigo para levar para casa</Text>
                    </View>
                    <View style={{ borderRadius: 999, overflow: 'hidden' }}>
                        <Button title="Sair" onPress={logout} color="#ff7a73" />
                    </View>
                </View>
            </View>

            <View style={{ flex: 1, minHeight: 0, maxHeight: '100%' }}>
                <AnimalScreen />
            </View>
        </View>
    )
}

export default HomeScreen;
