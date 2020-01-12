import React, { Component } from "react";
import Main from "./src/components/Main";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const LOCAL_CLOUD = createStore(reducer);

const localStack = createStackNavigator(
  { Main: { screen: Main, navigationOptions: { header: null } } },
  { initialRouteName: "Main" }
);
const _navigator = createAppContainer(localStack);

export default class App extends Component {
  render = () => (
    <Provider store={LOCAL_CLOUD}>
      <_navigator />
    </Provider>
  );
}
console.disableYellowBox = true;
