import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const Purpose = () => {
  const [selected, setSelected] = useState([false, false, false]);

  type RootStackParamList = {
    Interest: undefined;
  };
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = (index) => {
    const newSelected = [false, false, false]; // Reset all selections
    newSelected[index] = true; // Set selected state on pressed button
    setSelected(newSelected);
  };

  const onNext = async () => {
    if (selected.includes(true)) {
      navigation.navigate("Interest");
    } else {
      alert("Please select an option before proceeding");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>I am looking for ...</Text>
      <View style={styles.spaceSmall} />
      {["share a voucher", "make friends", "dating"].map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, selected[index] ? styles.selected : null]}
          onPress={() => handlePress(index)}
        >
          <Text style={styles.text}>{option}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.space} />
      <TouchableOpacity
        onPress={onNext}
        style={[styles.button, styles.nextButton]}
      >
        <Text style={styles.text}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 30, // Increased the font size
    marginBottom: 20,
    left: 10,
    right: 10,
  },
  option4: {
    width: (Dimensions.get("window").width * 5) / 6, // Increased the width
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1, // add border
    borderColor: "black", // set border color
  },
  button: {
    width: (Dimensions.get("window").width * 5) / 6, // Increased the width
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: "white",
  },
  selected: {
    backgroundColor: "orange",
  },
  nextButton: {
    backgroundColor: "orange",
  },
  text: {
    fontSize: 20,
    color: "black",
  },
  arrow: {
    fontSize: 20,
    color: "black",
    position: "absolute",
    right: 10,
  },
  input: {
    fontSize: 20,
    color: "black",
  },
  space: {
    height: 120, // This creates space for 2 option buttons
  },
  spaceSmall: {
    height: 20, // This creates a small gap between the heading and the options
  },
});

export default Purpose;