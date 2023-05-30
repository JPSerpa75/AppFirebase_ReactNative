import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  CheckBox,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import firebase from "react-native-firebase";

const Lista = ({ navigation }: any) => {
  const [tarefa, setTarefa] = useState("");
  const [tarefas, setTarefas] = useState<any[]>([]);

  useEffect(() => {
    const TarefasRef = collection(FIRESTORE_DB, "Tarefas");
    const subscriber = onSnapshot(TarefasRef, {
      next: (snapshot) => {
        const tarefas: any[] = [];
        snapshot.docs.forEach((doc) => {
          tarefas.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTarefas(tarefas);
      },
    });
    return () => subscriber();
  }, []);

  const addTarefa = async () => {
    const doc = addDoc(collection(FIRESTORE_DB, "Tarefas"), {
      title: tarefa,
      done: false,
    });
    setTarefa("");
  };

  const excluirElemento = async (id: any) => {
    try {
      const colecao = collection(FIRESTORE_DB, "Tarefas");
      const elemento = doc(colecao, id);
      await deleteDoc(elemento);
      alert("Elemento excluido com sucesso!");
    } catch (error) {
      alert("Falha ao excluir! " + error);
    }
  };

  const alterarElemento = async (id: any) => {
    navigation.navigate("Alterar", { id });
  };

  return (
    <View>
      <Text>Carrosel</Text>
      <Button
        title="Carrosel"
        onPress={() => navigation.navigate("Carrosel")}
      />

      <Text>Lista</Text>
      <Button
        title="Detalhes"
        onPress={() => navigation.navigate("Detalhes")}
      />
      <TextInput
        style={{ marginTop: 30, backgroundColor: "#ddd", padding: 10 }}
        value={tarefa}
        onChangeText={(n: string) => setTarefa(n)}
      ></TextInput>
      <Button
        title="Adicionar tarefa"
        onPress={() => addTarefa()}
        disabled={tarefa === ""}
      />

      <View>
        {tarefas.map((tarefa) => (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text key={tarefa.id}>
              {tarefa.title} - {tarefa.done}
            </Text>
            <CheckBox value={tarefa.done} />
            <TouchableOpacity onPress={() => alterarElemento(tarefa.id)}>
              <Text>Alterar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => excluirElemento(tarefa.id)}>
              <Text>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Lista;
