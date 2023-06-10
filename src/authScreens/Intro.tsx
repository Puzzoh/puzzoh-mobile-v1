import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import styles, { colors } from "../styles/index";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export default function Intro() {
  type RootStackParamList = {
    Home: undefined;
    SignIn: undefined;
  };
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onDonePress = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView>
      <Image
        style={styles.img}
        source={require(",./../../assets/imgs/Bg3.jpeg")}
      />
      <Text style={[styles.heading1, { marginBottom: 100 }]}>
        My pronounce is
      </Text>
      <TouchableOpacity style={styles.spanButton}>
        <Text>she/her</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.spanButton}>
        <Text style={screenStyles.box}>he/him</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.spanButton}>
        <Text>they/them</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDonePress} style={styles.spanButton}>
        <Text style={styles.chosenText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const screenStyles = StyleSheet.create({
  box: {
    fontSize: 16,
    color: 'white',
  }
}
);
