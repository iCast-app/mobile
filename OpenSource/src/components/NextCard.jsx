import React, { Fragment, Component } from "react";
import { Text, Image, Animated, Dimensions } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default class NextCard extends Component {
  render() {
    return (
      <Animated.View
        key={this.props.item.id}
        style={[
          {
            opacity: this.props.nextCardOpacity,
            transform: [{ scale: this.props.nextCardScale }],
            height: SCREEN_HEIGHT - 120,
            width: SCREEN_WIDTH,
            padding: 10,
            position: "absolute"
          }
        ]}
      >
        <Animated.View
          style={{
            opacity: 0,
            transform: [{ rotate: "-30deg" }],
            position: "absolute",
            top: 50,
            left: 40,
            zIndex: 1000
          }}
        >
          <Text
            style={{
              borderWidth: 1,
              borderColor: "green",
              color: "green",
              fontSize: 32,
              fontWeight: "800",
              padding: 10
            }}
          >
            LIKE
          </Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity: 0,
            transform: [{ rotate: "30deg" }],
            position: "absolute",
            top: 50,
            right: 40,
            zIndex: 1000
          }}
        >
          <Text
            style={{
              borderWidth: 1,
              borderColor: "red",
              color: "red",
              fontSize: 32,
              fontWeight: "800",
              padding: 10
            }}
          >
            NOPE
          </Text>
        </Animated.View>

        <Image
          style={{
            flex: 1,
            height: null,
            width: null,
            resizeMode: "cover",
            borderRadius: 20
          }}
          source={this.props.item.uri}
        />
      </Animated.View>
    );
  }
}
