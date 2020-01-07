import React, { Fragment, Component } from "react";
import { View, Text } from "react-native";
import ui from "../style_sheets";

export default class Main extends Component {
  render = () => (
    <Fragment>
      <View style={ui.container}>
        <Text>Main.jsx</Text>
      </View>
    </Fragment>
  );
}
