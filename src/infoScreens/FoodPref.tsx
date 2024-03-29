import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import styles, { colors } from "../styles/index";
import { BackButton } from "../components/CustomButtons";

const FoodPref = ({ navigation, route }) => {
  const selectedGender = route?.params?.gender;
  const selectedPronounce = route?.params?.pronounce;
  const selectedPurpose = route?.params?.purpose;
  const selectedInterests = route?.params?.interest;

  const foodPref = [
    "Vegan",
    "Mediterranean",
    "Italian",
    "Chinese",
    "Japanese",
    "Mexican",
    "American",
    "Greek",
    "Spanish",
    "Korean",
    "Vietnamese",
    "Dessert",
  ];

  const [selected, setSelected] = useState(Array(12).fill(false));
  const [selectedFoodPrefs, setSelectedFoodPrefs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handlePress = (index, foodPrefValue) => {
    let newSelected = [...selected];
    let count = newSelected.reduce((n, x) => n + (x === true), 0);

    if (count < 3 || newSelected[index] === true) {
      newSelected[index] = !newSelected[index];
    }

    setSelected(newSelected);
    if (selectedFoodPrefs.includes(foodPrefValue)) {
      setSelectedFoodPrefs(
        selectedFoodPrefs.filter((element) => element !== foodPrefValue)
      );
    } else {
      setSelectedFoodPrefs([...selectedFoodPrefs, foodPrefValue]);
    }
  };

  const onNext = async () => {
    navigation.navigate("AgeBioLocation", {
      gender: selectedGender,
      pronounce: selectedPronounce,
      purpose: selectedPurpose,
      interest: selectedInterests,
      foodPref: selectedFoodPrefs,
    });
  };

  return (
    <View style={nStyles.container}>
      <BackButton onPress={() => navigation.navigate("Interest")} />
      <View style={nStyles.container}>
        <Text style={[styles.heading2, { marginBottom: 20, top: 50 }]}>
          Food Preferences
        </Text>
        <Text
          style={[
            styles.bodyText2,
            { top: 35, flexWrap: "wrap", marginLeft: 15, marginRight: 15 },
          ]}
        >
          Select up to 3 of your favorite cuisines and let us know what you like
        </Text>
        <View style={nStyles.spaceSmall} />
        {Array.from(
          { length: Math.ceil(foodPref.length / 2) },
          (_, i) => i * 2
        ).map((rowStartIndex) => (
          <View style={nStyles.row} key={rowStartIndex}>
            {foodPref
              .slice(rowStartIndex, rowStartIndex + 2)
              .map((foodPref, idx) => {
                const foodPrefIndex = rowStartIndex + idx;
                return (
                  <TouchableOpacity
                    key={foodPrefIndex}
                    style={[
                      nStyles.button,
                      selected[foodPrefIndex] ? nStyles.selected : null,
                      nStyles.interest,
                    ]}
                    onPress={() => handlePress(foodPrefIndex, foodPref)}
                    disabled={
                      selected.filter(Boolean).length === 3 &&
                      !selected[foodPrefIndex]
                    }
                  >
                    <Text
                      style={[
                        styles.optionText,
                        {
                          textAlign: "center",
                          paddingLeft: 10,
                          paddingRight: 10,
                        },
                        selected[foodPrefIndex] ? { color: "white" } : null,
                      ]}
                    >
                      {foodPref}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        ))}
        <View style={nStyles.space} />
        <TouchableOpacity onPress={onNext} style={styles.continueButton}>
          {loading ? (
            <Text style={styles.chosenText}>Loading ...</Text>
          ) : (
            <Text style={styles.chosenText}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const nStyles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: "center",
  },
  row: {
    top: 30,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
    marginBottom: 10,
  },
  button: {
    width: Dimensions.get("window").width / 4.5,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 5,
  },
  selected: {
    backgroundColor: colors.primary,
  },
  interest: {
    flex: 1,
    margin: 5,
    borderColor: "gray",
    borderWidth: 0.25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  space: {
    height: 35,
  },
  spaceSmall: {
    height: 20,
  },
});

export default FoodPref;
