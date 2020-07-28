import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Platform,
  Button,
  Text,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as CartActions from "../../store/actions/cart";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../../constants/Colors";
import * as ProductActions from "../../store/actions/products";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
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

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      await dispatch(ProductActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    
    setIsLoading(false);
  },[dispatch, setIsLoading, setError]);

  //use for set navigation listener
  useEffect(()=>{
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts)
    console.log('trying to loadProducts (1)...')
    return () =>{
      willFocusSub.remove()
    };
  },[loadProducts])

  useEffect(() => {
    console.log('trying to loadProducts (2)...')
    loadProducts();
  }, [loadProducts]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if(error){
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Button title='Try again' onPress={() => loadProducts()} />
      </View>
    );
  }

  if(!isLoading && products.length === 0){
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          onSelect={onViewDetail}
          onAddToCart={onAddToCart}
          product={itemData.item}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => onViewDetail(itemData.item.id, itemData.item.title)}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() =>
              onAddToCart(
                itemData.item.id,
                itemData.item.title,
                itemData.item.price
              )
            }
          />
        </ProductItem>
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
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "25%",
  },
});
