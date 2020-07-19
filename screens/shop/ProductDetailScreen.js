import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const product = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  return (
    <View>
      <Text>{product.title}</Text>
    </View>
  );
};


// Navigation Options
ProductDetailScreen.navigationOptions = navData =>{
    const productTitle = navData.navigation.getParam('productTitle')
    
    return{
        headerTitle:productTitle
    }
}


export default ProductDetailScreen;

const styles = StyleSheet.create({});
