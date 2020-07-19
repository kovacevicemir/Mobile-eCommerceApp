import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

const ProductsOverviewScreen = (props) => {
    return (
        <View>
            <Text>Product Overview Screen</Text>
            <FlatList />
        </View>
    )
}

export default ProductsOverviewScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
    }
})
