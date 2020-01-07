import React from "react";
// import css from "./style_sheets";
import Main from "./src/screens/Main";

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

const store = createStore(reducer);

export default class App extends React.Component {
  render() {
    const AppNavigator = createStackNavigator(
      { Main },
      { initialRouteName: "Main" }
    );
    const AppContainer = createAppContainer(AppNavigator);
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
console.disableYellowBox = true;
