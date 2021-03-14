import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  Alert,
} from "react-native";
import { saveDeckTitle } from "../utils/api";
import { connect } from "react-redux";
import { addEntry } from "../actions";
import { purple, white } from "../utils/colors";

class AddEntry extends Component {
  state = {
    deckTitle: "",
  };
  handleChange = (text) => {
    this.setState(() => ({
      deckTitle: text,
    }));
  };

  submit = () => {
    const { deckTitle } = this.state;
    const { dispatch, navigation } = this.props;
    const found = Object.keys(this.props.decks).find(
      (element) => element === deckTitle
    );
    if (found === deckTitle) {
      // console for web browser
      console.log("👋 This deck alredy exists. Please try another title.");
      // Alert for mobile
      Alert.alert("This deck alredy exists.");
      return;
    }
    dispatch(addEntry(deckTitle));
    saveDeckTitle(deckTitle);
    navigation.navigate("EntryDetail", {
      entryId: deckTitle,
      title: deckTitle,
    });
    this.setState(() => ({ deckTitle: "" }));
  };

  render() {
    const { deckTitle } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Create a New Deck</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title here"
          value={deckTitle}
          onChangeText={this.handleChange}
        />
        <TouchableOpacity
          style={
            Platform.OS === "ios"
              ? styles.iosSubmitBtn
              : styles.AndroidSubmitBtn
          }
          onPress={this.submit}
          disabled={deckTitle === ""}
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

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(AddEntry);
