import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

  const onViewDetail = (productId, productTitle) => {
    props.navigation.navigate("ProductDetailScreen", {
      productId: productId,
      productTitle: productTitle,
    });
  };

  const onAddToCart = (productId) => {
    console.log("button clicked", productId);
  };

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          onViewDetail={onViewDetail}
          onAddToCart={onAddToCart}
          product={itemData.item}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All products",
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
