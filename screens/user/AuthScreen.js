import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
import {
  StyleSheet,
  Text,
  Alert,
  View,
  ScrollView,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const FORM_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.payload,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }

  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState()

  useEffect(()=>{
    if(error){
        Alert.alert('An Error Occured!', error, [{text:'OK'}])
    }
  },[error])

  //
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });
  //

  const dispatch = useDispatch();

  const authHandler = async () => {
    setError(null);
    setIsLoading(true);
    if (isSignup) {
      await dispatch(
        authActions.signup(
          formState.inputValues.email,
          formState.inputValues.password
        )
      );
      setIsLoading(false);
      props.navigation.navigate('Shop');
    } else {
      try {
        await dispatch(
            authActions.login(
              formState.inputValues.email,
              formState.inputValues.password
            )
          );
        props.navigation.navigate('Shop');  
        
      } catch (err) {
          setError(err.message);
          setIsLoading(false);
      }
    }
  };

  //simple validation
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        payload: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#e8e6e1", "#635f56"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            {/* email */}
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            {/* password */}
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            {/* Buttons */}
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator color={Colors.primary} size="small" />
              ) : (
                <Button
                  title={isSignup ? "Sign up" : "Login"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={isSignup ? "Switch to LogIn" : "Switch to Sign Up"}
                color={Colors.primary}
                onPress={() => {
                  setIsSignup(!isSignup);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Please authenticate",
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
  },
});
