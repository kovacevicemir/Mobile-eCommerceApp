import React from "react";
import { StyleSheet, Text, View, FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as CartActions from "../../store/actions/cart";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

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

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All products",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {navData.navigation.navigate('Cart')}}
        />
      </HeaderButtons>
    ),
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {navData.navigation.toggleDrawer()}}
        />
      </HeaderButtons>
    )
  };
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
