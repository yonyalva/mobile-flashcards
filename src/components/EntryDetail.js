import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { white, purple, red, green, orange } from "../utils/colors";
import { deleteEntry } from "../actions";
import { removeEntry } from "../utils/api";

class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;
  };

  deleteSubmit = () => {
    const { dispatch, entryId, navigation } = this.props;
    dispatch(deleteEntry(entryId));
    removeEntry(entryId);
    navigation.navigate("Decks");
  };

  render() {
    const { metrics, entryId } = this.props;
    if (!metrics)
      return (
        <View>
          <Text>Removing...</Text>
        </View>
      );
    return (
      <View style={styles.pollwi}>
        <Text style={styles.titleText}>{metrics.title}</Text>
        <Text>{metrics.questions.length} cards</Text>
        <TouchableOpacity
          style={[
            Platform.OS === "ios"
              ? styles.iosSubmitBtn
              : styles.AndroidSubmitBtn,
            { backgroundColor: orange },
          ]}
          onPress={() =>
            this.props.navigation.navigate("Add a new card", {
              entryId: entryId,
              title: metrics.title,
            })
          }
        >
          <Text style={styles.submitBtnText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Platform.OS === "ios"
              ? styles.iosSubmitBtn
              : styles.AndroidSubmitBtn,
            { backgroundColor: purple },
          ]}
          onPress={() =>
            this.props.navigation.navigate("Quiz", {
              entryId: entryId,
              title: metrics.title,
            })
          }
        >
          <Text style={styles.submitBtnText}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.deleteSubmit}>
          <Text style={styles.submitBtnText2}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    );
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
    height: 45,
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

export default connect(mapStateToProps)(EntryDetail);
