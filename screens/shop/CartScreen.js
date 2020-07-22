import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";

const CartScreen = (props) => {
  //style={styles.something}

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const transformedCartItems = [];

  const cartItems = useSelector((state) => {
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          disabled={transformedCartItems.length === 0}
          color={Colors.accent}
          title="Order Now"
        />
      </View>
      <View>
        <Text>CART ITEMS</Text>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});
