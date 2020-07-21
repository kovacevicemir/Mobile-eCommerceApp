import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as CartActions from "../../store/actions/cart";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

  const dispatch = useDispatch();

  const onViewDetail = (productId, productTitle) => {
    props.navigation.navigate("ProductDetailScreen", {
      productId: productId,
      productTitle: productTitle,
    });
  };

  const onAddToCart = (productId, productTitle, productPrice) => {
    console.log("button clicked", productId, productTitle, productPrice);
    dispatch(
      CartActions.addToCart({
        id: productId,
        productTitle: productTitle,
        productPrice: productPrice,
      })
    );
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
