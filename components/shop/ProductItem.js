import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import Colors from "../../constants/Colors";

const ProductItem = (props) => {
  const { product } = props;

  return (
    <View style={styles.product}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        <Button
          style={styles.btn_details}
          title="View Details"
          onPress={props.onViewDetail}
        />
        <Button
          style={styles.btn_cart}
          title="Go to Cart"
          onPress={props.onAddToCart}
        />
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow:'hidden'
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 25,
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  btn_details: {
    color: Colors.primary,
  },
  btn_cart: {
    color: Colors.primary,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow:'hidden'
  },
});
