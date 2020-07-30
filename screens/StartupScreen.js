import React, {useEffect} from 'react'
import { StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native'
import {useDispatch} from 'react-redux'
import * as AuthActions from '../store/actions/auth'



const StartupScreen = (props) => {
    const dispatch = useDispatch()

    useEffect(()=>{

        const tryLogin = async () =>{
            const userData = await AsyncStorage.getItem('userData');
            
            if(!userData){
                props.navigation.navigate('Auth')
                return
            }

            const transfoermedData = await JSON.parse(userData);
            const {token, userId, expiryDate} = transfoermedData
            const expirationDate = new Date(expiryDate);

            if(expirationDate <= new Date() || !token || !userId){
                props.navigation.navigate('Auth')
                return
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime();

            props.navigation.navigate('Shop');

            dispatch(AuthActions.authenticate(token, userId, expirationTime))
        }

        tryLogin();
    },[dispatch])

    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size='large' />
        </View>
    )
}

export default StartupScreen

const styles = StyleSheet.create({})
