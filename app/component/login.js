import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Button,
  Text,
  ActivityIndicator,
} from "react-native";
//import Home from './courselist' //此处应为同级路径

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "18302015102",
      password: "888888",
      showLoading: false,
      baseData: null
    };
    //如果使用ES6编码 且 自定义方法里面需要使用到this .这时需要绑定this,否则报错(或使用箭头函数)
    //this.onLogin = this.onLogin.bind(this); //自定义 函数绑定this
  }

  render() {
    var spinner = this.state.showLoading ? (
      <ActivityIndicator size="small" />
    ) : (
      <View />
    );
    return (
      <View style={styles.page}>
        <View style={styles.bg}>
          <Image
            style={{ width: 165, height: 63, marginBottom: 23 }}
            source={require("../images/icon_logo_blue_big.png")}
          />
          <View style={styles.inputbg}>
            <Image
              style={{ width: 12, height: 17 }}
              source={require("../images/icon_phone.png")}
            />
            <TextInput
              style={styles.inputtxt}
              id="input_name"
              value={this.state.name}
              placeholder="input your phone"
              onChangeText={text => this.setState({ name: text })}
            />
          </View>
          <View style={styles.inputbg}>
            <Image
              style={{ width: 14, height: 17 }}
              source={require("../images/icon_password.png")}
            />
            {/* //密码输入 secureTextEntry={true} works  password={true} does not work */}
            <TextInput
              style={styles.inputtxt}
              id="input_pwd"
              secureTextEntry={true}
              value={this.state.password}
              placeholder="input your password"
              onChangeText={text => this.setState({ password: text })}
            />
          </View>
          {spinner}
          <Button
            style={styles.btnconfirm}
            title="we are diffrence"
            value="login"
            onPress={this.onFucking}
          />
          {/* <Text>{this.state.baseData == null ? "every body get their setuation" : this.state.baseData.data.token}</Text>*/}
        </View>
      </View>
    );
  }

  // onChange(text) {
  S;
  //     if (text.id = 'input_name') {
  //         this.setStatus({
  //             name: text
  //         }
  //         )
  //     } else if (text.id = 'input_pwd') {
  //         this.setStatus({
  //             password: text
  //         })
  //     }

  // }
  /* onLogin()
    {

    }*/

  onFucking = e => {
    this.setState({ showLoading: true });

    let url = "http://dev_cp.zzyzsw.com/api/login/index" ;
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "user_name=" + this.state.name + "&password=" + this.state.password,
    })
      .then(res => res.json())
      .then(resData => {
        this.setState({
          baseData: resData,
          showLoading: false
        });
        this.handlerSuccess(resData);
      });
    //alert(this.state.user)
  };

  handlerSuccess = res => {
    this.props.navigation.navigate("Home");
  };
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bg: {
    width: 333,
    height: 310,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ffffff",
  },
  inputbg: {
    flexDirection: "row",
    alignItems: "center",
    width: 310,
    height: 44,
    padding: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#F5F6F6",
    backgroundColor: "#F5F6F6"
  },

  inputtxt: {
    width: 300,
    height: 44,
    paddingLeft: 6
  },

  btnconfirm: {
    marginTop: 26,
    width: 300,
    height: 44
  },
  loading: {
    marginTop: 16,
    marginBottom: 16
  }
});
