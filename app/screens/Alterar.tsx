import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Button, Text, TextInput, CheckBox } from "react-native";
import firebase, { database, firestore } from "react-native-firebase";
import { FIRESTORE_DB } from "../../firebaseConfig";

const Alterar = ({ route }: any) => {
  const id = route.params?.id;
  const [tarefas, setTarefas] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [done, setDone] = useState();

  /*const docRef = firebase.firestore().doc("Tarefas/"+id);
  const teste = docRef.get().then((doc) => {
    if (doc.exists) {
        const data = doc.data();
        console.log("Dados do documento:", data);
      } else {
        console.log("O documento não existe.");
      }
  });*/

  useEffect(() => {
    const TarefasRef = collection(FIRESTORE_DB, "Tarefas");
    const subscriber = onSnapshot(TarefasRef, {
      next: (snapshot) => {
        const tarefas: any[] = [];
        snapshot.docs.forEach((doc) => {
          if (doc.id === id) {
            tarefas.push({
              id: doc.id,
              ...doc.data(),
            });
          }
        });
        setTitle(tarefas[0].title);
        setDone(tarefas[0].done);
        setTarefas(tarefas);
      },
    });
    return () => subscriber();
  }, []);

  const atualizarDados = async () => {
    try {
      await firestore().collection("Tarefas").doc(id).update({
        title: title,
        done: done,
      });
    } catch (error) {
      alert("Erro!" + error);
    }
  };

  return (
    <View>
      {tarefas.map((tarefa) => (
        <View>
          <TextInput value={title} onChangeText={(t) => setTitle} />
          <CheckBox value={done} onValueChange={setDone} />
          <Button title="Alterar" onPress={atualizarDados} />
        </View>
      ))}
    </View>
  );
};

export default Alterar;
