import React, { useReducer, useEffect } from "react";
import { StyleSheet, Text, View, TextInput} from "react-native";

//actions
const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR"

//reducer
const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
        //action. (payload,text,isValid)
        return {
            ...state,
            value: action.payload,
            isValid: action.isValid
        }

    case INPUT_BLUR:
        return{
            ...state,
            touched: true
        }

    default:
      return state;
  }
};

const Input = (props) => {

  //state
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  useEffect(() =>{
      if(inputState.touched){
        props.onInputChange(props.id, inputState.value, inputState.isValid)
      }
  },[inputState])

  //handler
  const textChangeHandler = (text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, payload: text, isValid });
  };

  //when user leave input field
  const lostFocusHandler = () => {
      dispatch({type:INPUT_BLUR})
  }

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        value={inputState.value}
        style={styles.input}
        onChangeText={(text) => textChangeHandler(text)}
        onBlur={lostFocusHandler}
      />

      {/* error text */}
      {!inputState.isValid && inputState.touched && <Text>{props.errorText}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  description: {},
});
