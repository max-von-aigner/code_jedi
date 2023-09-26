import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  Keyboard,
  ScrollView,
  FlatList,
} from "react-native";
import DropShadow from "react-native-drop-shadow";
import { useState } from "react";
import axios from "axios";
import { apiKey } from "./secrets";

const apiUrl = "https://api.openai.com/v1/chat/completions";

type apiKey = string;

export default function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const postBody = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an experienced full-stack developer, who is always happy to answer questions of other developers",
      },
      {
        role: "user",
        content: question,
      },
    ],
  };
  const postOptions = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const callOpenAi = async () => {
    //Get users question
    //Make API call with Axios to OpenAI
    //Display the response
    const response = await axios.post(apiUrl, postBody, postOptions);
    const answerFromApi = response.data.choices[0].message.content;
    setAnswer(answerFromApi);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.botGreeting}>
        <Text style={styles.heading}>🤖</Text>
        <Text style={styles.heading}>
          Hey there, young Padawan! I'm here to help you with all things coding.
        </Text>
      </View>
      <DropShadow style={styles.shadowProp}>
        <View style={[styles.questionInput]}>
          <TextInput
            value={question}
            onChangeText={setQuestion}
            style={styles.questionText}
            placeholder="Type your question"
          ></TextInput>
        </View>
      </DropShadow>
      <DropShadow style={styles.shadowProp}>
        <Pressable onPress={() => callOpenAi()} style={styles.submitButton}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </DropShadow>
      // Answer Output
      <DropShadow style={styles.shadowProp}>
        <ScrollView style={[styles.answerOutput]}>
          <Text>{answer}</Text>
        </ScrollView>
      </DropShadow>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 70,
    paddingHorizontal: 20,
    gap: 10,
    keyboardDismissMode: "interactive",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  botGreeting: {
    flexDirection: "row",
    gap: 5,
    marginTop: 25,
  },
  buttonBasics: {
    color: "white",
    height: 30,
    justifyContent: "center",
    width: 400,
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  questionText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#4830D3",
    alignItems: "center",
    justifyContent: "center",
    height: 42,
    width: 120,
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 20,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },

  questionInput: {
    backgroundColor: "white",
    alignContent: "flex-start",
    height: 100,
    width: 300,
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    marginTop: 20,
    elevation: 20,
    shadowColor: "shadowColourIos",
  },
  answerOutput: {
    backgroundColor: "white",
    alignContent: "flex-start",
    height: 400,
    width: 350,
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
  },
});
