import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { white, purple, red, orange, green } from "../utils/colors";

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;
  };

  state = {
    qIndex: 0,
    correct: 0,
    showAnswer: false,
  };

  render() {
    const { metrics, entryId } = this.props;
    const { qIndex, correct, showAnswer } = this.state;
    if (!metrics.questions.length)
      return (
        <View style={styles.pollwi}>
          <Text>
            Sorry, no cards in this deck. You need to have cards in order to
            start the quiz.
          </Text>
        </View>
      );
    if (this.state.qIndex < metrics.questions.length) {
      return (
        <View style={styles.pollwi}>
          <Text>
            {qIndex + 1} of {metrics.questions.length} cards
          </Text>
          {!showAnswer ? (
            <View>
              <Text style={styles.titleText}>
                {metrics.questions[qIndex].question}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showAnswer: true,
                  });
                }}
              >
                <Text style={styles.submitBtnText2}>Show Answer</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={styles.titleText}>
                {metrics.questions[qIndex].answer}
              </Text>
              <TouchableOpacity
                style={[
                  Platform.OS === "ios"
                    ? styles.iosSubmitBtn
                    : styles.AndroidSubmitBtn,
                  { backgroundColor: green },
                ]}
                onPress={() => {
                  this.setState({
                    qIndex: qIndex + 1,
                    correct: correct + 1,
                    showAnswer: false,
                  });
                }}
              >
                <Text style={styles.submitBtnText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  Platform.OS === "ios"
                    ? styles.iosSubmitBtn
                    : styles.AndroidSubmitBtn,
                  { backgroundColor: red },
                ]}
                onPress={() => {
                  this.setState({
                    qIndex: qIndex + 1,
                    showAnswer: false,
                  });
                }}
              >
                <Text style={styles.submitBtnText}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.pollwi}>
          <Text style={styles.titleText}>
            You have {correct} out of {metrics.questions.length} correct.
          </Text>
          <TouchableOpacity
            style={[
              Platform.OS === "ios"
                ? styles.iosSubmitBtn
                : styles.AndroidSubmitBtn,
              { backgroundColor: orange },
            ]}
            onPress={() => {
              this.setState({
                qIndex: 0,
                correct: 0,
                showAnswer: false,
              });
            }}
          >
            <Text style={styles.submitBtnText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              Platform.OS === "ios"
                ? styles.iosSubmitBtn
                : styles.AndroidSubmitBtn,
              { backgroundColor: purple },
            ]}
            onPress={() =>
              this.props.navigation.navigate("EntryDetail", {
                entryId: entryId,
                title: entryId,
              })
            }
          >
            <Text style={styles.submitBtnText}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  submitBtnText: {
    color: white,
    fontSize: 18,
    textAlign: "center",
  },
  submitBtnText2: {
    color: red,
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },
  pollwi: {
    margin: 4,
    alignItems: "center",
    backgroundColor: "#70c5ea",
    borderRadius: 10,
    padding: 50,
    width: "100%",
    maxWidth: 590,
  },
  titleText: {
    fontSize: 20,
  },
});

function mapStateToProps(state, { route }) {
  const { entryId } = route.params;

  return {
    entryId,
    metrics: state[entryId],
  };
}

export default connect(mapStateToProps)(Quiz);
