import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'

const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts)

    return (
        <View>
            <Text>Product Overview Screen</Text>
            <FlatList data={products} renderItem={itemData => <Text>{itemData.item.title}</Text>} />
        </View>
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All products'
}

export default ProductsOverviewScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
    }
})
