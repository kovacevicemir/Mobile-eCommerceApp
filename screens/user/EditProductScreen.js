import React, { useEffect, useState, useCallback, useReducer } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import Colors from '../../constants/Colors'
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import * as ProductActions from "../../store/actions/products";
import Input from "../../components/UI/Input";

const FORM_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  //action. (payload,input,isValid)
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

//style={styles.something}

const EditProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === prodId)
  );

  //
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });
  //

  useEffect(()=>{
    if(error){
      Alert.alert('An error occured!', error, [{text:'Ok'}])
    }
  },[error])

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "ok" },
      ]);
      return;
    }

    const { title, description, imageUrl, price } = formState.inputValues;

    try {
      if (editedProduct) {
        //editing
        setIsLoading(true);
        setError(null);
        await dispatch(
          ProductActions.updateProduct(prodId, title, description, imageUrl)
        );
      } else {
        //creating
        await dispatch(
          ProductActions.createProduct(title, description, imageUrl, +price)
        );
      }
      
      props.navigation.goBack();

    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

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

  if(isLoading){
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary}/>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          {/* TITLE */}
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={editedProduct ? true : false}
            required
          />
          {/* IMAGE */}
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a image URL"
            keyboardType="default"
            autoCorrect
            returnKeyType="next"
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={editedProduct ? true : false}
            onInputChange={inputChangeHandler}
            required
          />
          {/* PRICE */}
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Price must be greater than 0"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          {/* DESCRIPTION */}
          <Input
            id="description"
            label="Description"
            errorText="Please enter valid description"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            returnKeyType="next"
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={editedProduct ? true : false}
            onInputChange={inputChangeHandler}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:'25%'
  }
});
