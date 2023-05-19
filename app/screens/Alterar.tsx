import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Button, Text, TextInput, CheckBox } from "react-native";
import firebase, { database, firestore } from "react-native-firebase";
import { FIRESTORE_DB } from "../../firebaseConfig";

const Alterar = ({ navigation, route }: any) => {
  const { id } = route.params;
  const [tarefa, setTarefa] = useState<any>({});

  const fetchTarefa = async () => {
    const colecao = doc(FIRESTORE_DB, "Tarefas", id);
    const colecaoSnapshot = await getDoc(colecao);
    if (colecaoSnapshot.exists()) {
      setTarefa({
        id: colecaoSnapshot.id,
        ...colecaoSnapshot.data(),
      });
    }
  };

  useEffect(() => {
    fetchTarefa();
  }, []);

  const handleAtualizaTexto = (key: string, t: string) => {
    setTarefa({
      ...tarefa,
      [key]: t,
    });
  };

  const handleAtualizaDone = (key: string, t: boolean) => {
    setTarefa({
      ...tarefa,
      [key]: t,
    });
  };

  const handleUpdateTarefa = async () => {
    const colecao = doc(FIRESTORE_DB, "Tarefas", id);
    await updateDoc(colecao, tarefa);
    navigation.navigate("Lista");
  };

  return (
    <View>
      <View>
        <TextInput
          value={tarefa.title}
          onChangeText={(t) => handleAtualizaTexto("title", t)}
        />
        <CheckBox
          value={tarefa.done}
          onValueChange={() => handleAtualizaDone('done', !tarefa.done)}
        />
        <Button title="Alterar" onPress={handleUpdateTarefa} />
      </View>
    </View>
  );
};

export default Alterar;
