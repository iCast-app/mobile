import React, { Fragment } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  PanResponder
} from "react-native";
import TopCard from "./TopCard";
import NextCard from "./NextCard";
import axios from "axios";
import { url } from "../api";

const up = `../../assets`;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default class Main extends React.Component {
  state = {
    currentIndex: 0,
    theData: [
      {
        uri: {
          uri: ``
        }
      },
      {
        uri: {
          uri: ``
        }
      }
    ]
  };

  position = new Animated.ValueXY();

  rotate = this.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp"
  });

  rotateAndTranslate = {
    transform: [
      {
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
    ]
  };

  likeOpacity = this.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: "clamp"
  });
  dislikeOpacity = this.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: "clamp"
  });

  nextCardOpacity = this.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: "clamp"
  });
  nextCardScale = this.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp"
  });

  componentWillMount = async () => {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start();
        }
      }
    });
  };
  componentDidMount = async () => {
    const random1 = Math.floor(Math.random() * 200);
    const random2 = Math.floor(Math.random() * 200);
    const random3 = Math.floor(Math.random() * 200);
    const download = await axios.get(
      `${url}/${SCREEN_WIDTH}x${SCREEN_HEIGHT}/?${random1}`
    );
    const download2 = await axios.get(
      `${url}/${SCREEN_WIDTH}x${SCREEN_HEIGHT}/?${random2}`
    );
    const download3 = await axios.get(
      `${url}/${SCREEN_WIDTH}x${SCREEN_HEIGHT}/?${random3}`
    );
    const download4 = await axios.get(
      `${url}/${SCREEN_WIDTH}x${SCREEN_HEIGHT}/?${random1}`
    );
    this.setState(
      {
        theData: [
          {
            uri: {
              uri: download.request.responseURL
            }
          },
          {
            uri: {
              uri: download2.request.responseURL
            }
          },
          {
            uri: {
              uri: download3.request.responseURL
            }
          },
          {
            uri: {
              uri: download4.request.responseURL
            }
          }
        ]
      },
      () => console.log(this.state)
    );
  };

  loadCards = () =>
    this.state.theData
      .map((item, i) =>
        i == this.state.currentIndex ? (
          <TopCard
            panProps={this.PanResponder.panHandlers}
            item={item}
            i={i}
            dislikeOpacity={this.dislikeOpacity}
            likeOpacity={this.likeOpacity}
            rotateAndTranslate={this.rotateAndTranslate}
          />
        ) : i > this.state.currentIndex ? (
          <NextCard
            item={item}
            i={i}
            nextCardOpacity={this.nextCardOpacity}
            nextCardScale={this.nextCardScale}
          />
        ) : null
      )
      .reverse();

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }}></View>
        <View style={{ flex: 1 }}>{this.loadCards()}</View>
        <View style={{ height: 60 }}></View>
      </View>
    );
  }
}
