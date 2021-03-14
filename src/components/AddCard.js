import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { addCard } from "../actions";
import { purple, white } from "../utils/colors";
import { addCardToDeck } from "../utils/api";

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;
  };
  state = {
    question: "",
    answer: "",
  };

  handleChange = (text) => {
    this.setState(() => ({
      question: text,
    }));
  };

  handleChange2 = (text) => {
    this.setState(() => ({
      answer: text,
    }));
  };

  submit = () => {
    const { question, answer } = this.state;
    const { dispatch, entryId, navigation } = this.props;
    const card = { question: question, answer: answer };
    dispatch(addCard(entryId, card));
    addCardToDeck(entryId, card);
    navigation.navigate("EntryDetail", { entryId: entryId, title: entryId });
    this.setState(() => ({ question: "", answer: "" }));
  };

  render() {
    const { question, answer } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Create a New Card</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter question here"
          value={question}
          onChangeText={this.handleChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter answer here"
          value={answer}
          onChangeText={this.handleChange2}
        />
        <TouchableOpacity
          style={
            Platform.OS === "ios"
              ? styles.iosSubmitBtn
              : styles.AndroidSubmitBtn
          }
          onPress={this.submit}
          disabled={question === "" || answer === ""}
        >
          <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: purple,
    borderWidth: 1,
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
  },
});

function mapStateToProps(state, { route }) {
  const { entryId } = route.params;

  return {
    entryId,
    metrics: state[entryId],
  };
}

export default connect(mapStateToProps)(AddCard);
