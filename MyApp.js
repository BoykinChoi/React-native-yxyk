import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

//页面路由
import AppContainer from "./app/util/route";

export default class MyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <AppContainer/>
    );
  }
}

global.industryCateid = 38 //默认行业分类id

const style = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
