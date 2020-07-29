import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import CartScreen from "../screens/shop/CartScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen"
import Colors from "../constants/Colors";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverviewScreen: ProductsOverviewScreen,
    ProductDetailScreen: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-car" : "ios-cart"}
          size={23}
          color={drawerConfig.activeTintColor}
        />
      ),
    }
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.activeTintColor}
        />
      ),
    },
  }
);

//
const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={drawerConfig.activeTintColor}
        />
      ),
    },
  }
);
//

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

const AuthNavigator = createStackNavigator({
  Auth:AuthScreen
},{
  defaultNavigationOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
  Starup:StartupScreen,
  Auth:AuthNavigator,
  Shop:ShopNavigator,

});

export default createAppContainer(MainNavigator);
