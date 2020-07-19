import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers } from "redux";
import { useSelector, Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import ShopNavigator from './navigation/ShopNavigator'

import { enableScreens } from 'react-native-screens';
enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function App() {
  return (
    <Provider store={store}>
      {/* <Text>Hello</Text> */}
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
