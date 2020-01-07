import React, { Component } from "react";
// import css from "./style_sheets";
import Main from "./src/screens/Main.jsx";

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
  { Main: Main },
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
