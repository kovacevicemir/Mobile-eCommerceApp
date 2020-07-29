import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import OrderItem from '../../components/shop/OrderItem'
import * as OrdersActions from '../../store/actions/order'

const OrdersScreen = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(()=>{
    const getAllOrders = async () =>{
      setIsLoaded(false)
      await dispatch(OrdersActions.fetchOrders())
      setIsLoaded(true)
    }
    getAllOrders();
  },[])

  if(!isLoaded){
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size='small' />
      </View>
    )
  }

  if(orders.length === 0){
    return (
      <View style={{flex:2, alignItems:'center', justifyContent:'top', marginTop:'25%'}}>
        <Text>You did not order anything yet!</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => <OrderItem item={itemData.item} />}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
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

export default OrdersScreen;

const styles = StyleSheet.create({});
