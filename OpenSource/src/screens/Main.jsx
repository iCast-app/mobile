import React, { Fragment, Component } from "react";
import { View, Text } from "react-native";
import Swiper from "react-native-deck-swiper";
import ui from "../style_sheets";
import { Card1, Card2, Card3, Card4 } from "./Cards";

export default class Main extends Component {
  render() {
    return (
      <View style={ui.container}>
        <Swiper
          cards={[<Card1 />, <Card2 />, <Card3 />, <Card4 />]}
          renderCard={card => {
            return (
              <View style={ui.card}>
                <Text style={ui.text}>{card}</Text>
              </View>
            );
          }}
          onSwiped={cardIndex => {
            console.log(cardIndex);
          }}
          onSwipedAll={() => {
            console.log("onSwipedAll");
          }}
          cardIndex={0}
          backgroundColor={"#4FD0E9"}
          stackSize={3}
        ></Swiper>
      </View>
    );
  }
}
