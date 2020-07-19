import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

  const onViewDetail = props =>{
      console.log('button clicked')
  }

  const onAddToCart = props =>{
      console.log('button clicked')
  }

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
