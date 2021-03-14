import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { receiveEntries, addEntry } from "../actions";
import { getDecks } from "../utils/api";

class History extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    getDecks().then((decks) => dispatch(receiveEntries(decks)));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {Object.keys(this.props.decks).map((metric) => {
          const { title, questions } = this.props.decks[metric];
          return (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("EntryDetail", {
                  entryId: metric,
                  title: title,
                })
              }
              key={metric}
            >
              <View style={styles.pollwi}>
                <Text style={styles.titleText}> {title} </Text>
                <Text> {questions.length} cards </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(History);
