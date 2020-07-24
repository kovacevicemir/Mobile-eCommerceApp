import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

//style={styles.something}
import CartItem from "./CartItem";
import Colors from "../../constants/Colors";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  const orders = props.item;
  const orderItems = props.item.items;

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${orders.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{orders.readableDate}</Text>
      </View>
      <Button
        colors={Colors.primary}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => setShowDetails(!showDetails)}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {orderItems.map((cartItem) => {
            const item = { item: cartItem };
            return <CartItem item={item} key={cartItem.productId} deletable={false} />;
          })}
        </View>
      )}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888",
  },
  detailItems:{
      width:'100%'
  }
});
