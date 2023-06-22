import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../styles/index";

const VoucherCard = (props) => {
  const {
    title,
    rating,
    numRedeemed,
    forQuantity,
    priceAfter,
    priceBefore,
    id,
  } = props.voucher;

  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<Icon key={i} name="star" size={20} color="gold" />);
  }

  return (
    <View style={nStyles.card} key={id}>
      <Image
        source={{ uri: "https://loremflickr.com/400/200/restaurant" }}
        style={nStyles.image}
      />

      <View style={nStyles.cardInner}>
        <Text style={styles.heading3}>{title}</Text>
        <View style={[nStyles.row, { gap: 50 }]}>
          <View style={{ flexDirection: "row" }}>{stars}</View>
          <Text style={styles.bodyText}>{numRedeemed} Redeemed </Text>
        </View>
        <View style={[nStyles.row, { gap: 50 }]}>
          <Text style={styles.bodyText}> 0.5 miles </Text>
          <Text style={styles.bodyText}>For {forQuantity} people</Text>
        </View>
        <Text style={[styles.bodyText, { color: "#888888", marginBottom: 16 }]}>
          800 Lancaster Ave, Villanova, PA 19085
        </Text>
        <View style={nStyles.row}>
          <Text
            style={[
              styles.heading3,
              {
                marginBottom: 12,
                textDecorationLine: "line-through",
                textDecorationStyle: "solid",
              },
            ]}
          >
            ${priceBefore}
          </Text>
          <Text
            style={[styles.heading3, { color: "#34A853", marginBottom: 12 }]}
          >
            ${priceAfter}
          </Text>
        </View>
        <View style={nStyles.featuredDishContainer}>
          {["Dish 1", "Dish 2", "Dish 3"].map((dish, index) => (
            <TouchableOpacity style={nStyles.featuredDish}>
              <Text style={{ textAlign: "center", color: "#333" }}>{dish}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.heading4}>
            Popular Review:{" "}
            <Text style={[styles.italicText, { color: "gray" }]}>
              &apos;Good food with nice service.&apos; - Abcxyz
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const nStyles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#fefefe",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardInner: {
    padding: 10,
  },
  voucherName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rating: {
    fontSize: 20,
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 20,
    fontWeight: "bold",
  },
  newPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  featuredDishContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#dddddd",
    paddingTop: 12,
  },
  featuredDishTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  featuredDish: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderColor: "#ccc",
  },
});

export default VoucherCard;
