import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    ToastAndroid,
    TouchableOpacity,
} from "react-native";

import requestData from '../util/ApiHelper'

export default class UserInfo extends Component {
    static navigationOptions = {
        title: "我的"
    }
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {},
            bgImgs: [
                "http://b-ssl.duitang.com/uploads/item/201703/30/20170330153834_K3uHf.jpeg",
                "http://pic36.nipic.com/20131126/6842469_134415653150_2.jpg",
                "http://b-ssl.duitang.com/uploads/blog/201311/22/20131122145546_2uWHQ.jpeg",
                "http://t1.mmonly.cc/uploads/tu/201611/97/hzw13_19202.jpg",
                "http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg",
                "http://hbimg.b0.upaiyun.com/e6a85e3d65b384d379e4249bc94413a3bf2d5d5747ec6-KgTbJC_fw658",
                "http://t1.mmonly.cc/uploads/tu/201611/97/hzw13_19202.jpg",
                "http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg",
                "http://hbimg.b0.upaiyun.com/e6a85e3d65b384d379e4249bc94413a3bf2d5d5747ec6-KgTbJC_fw658",
                "http://t1.mmonly.cc/uploads/tu/201611/97/hzw13_19202.jpg",
                "http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg",
                "http://hbimg.b0.upaiyun.com/e6a85e3d65b384d379e4249bc94413a3bf2d5d5747ec6-KgTbJC_fw658"
            ],
            bgIndex: Math.floor(Math.random() * 10) + 1 //1-10随机数

        }
    }

    componentDidMount() {
        this.getUserData()

    }

    render() {
        return (<View style={styles.page}>
            <Image style={styles.bgheaderImg} source={{ uri: this.state.bgImgs[this.state.bgIndex] }}></Image>
            <View style={styles.infoBg}>
                <View style={styles.info}>
                    <Image style={styles.userHeader} source={{ uri: this.state.userInfo.head_pic }}></Image>
                    <Text style={styles.nickName}>{this.state.userInfo.nick_name}</Text>
                    <Text style={styles.student_no}>{"学号：" + this.state.userInfo.student_no}</Text></View>
                <View style={styles.middle}>
                    <View style={styles.balance}>
                        <Image
                            style={styles.icon}
                            source={require("../images/wallet.png")}></Image>
                        <Text>{this.state.userInfo.balance}</Text>
                    </View>
                    <View style={styles.middleLine}></View>
                    <View style={styles.balance}>
                        <Image
                            style={styles.icon}
                            source={require("../images/qrcode.png")}></Image>
                        <Text>二维码</Text>
                    </View>

                </View>
                <View style={styles.items}>
                    <Text style={styles.itemText}>我的课程</Text>
                    <Text style={styles.itemText}>我的订单</Text>
                    <Text style={styles.itemText}>在线客服</Text>
                    <Text style={styles.itemText}>设置</Text>
                </View>
            </View>
        </View >)
    }

    getUserData = () => {
        let url = 'member/info'
        let parms = {
            token: global.userToken
        }
        //ToastAndroid.show('fuck_done' + index, ToastAndroid.SHORT);
        return requestData(url, parms, (userData) => {
            this.setState({
                userInfo: userData,
            })

        })
    }
}

const styles = StyleSheet.create({
    page: {
        color: "#f2f4f5",
    },
    header: {

    },
    infoBg: {
        position: "absolute",
        top: 150,
        left: 20,
        right: 20,
        height: 450,
        borderWidth: 1,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        borderRadius: 10,
    },
    info: {
        padding: 20,
        flex: 1,
        alignItems: "center"

    },
    bgheaderImg: {
        height: 260
    },
    userHeader: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderRadius: 1024,
        borderColor: "#000000"
    },
    nickName: {
        fontSize: 16,
        fontWeight: "bold",
        margin: 10
    },
    student_no: {
        fontSize: 12,
        color: "#666666"
    },
    middle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: 50,
        backgroundColor: "#f2f4f5"
    },
    balance: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 10
    },
    middleLine: {
        width: 1,
        height: 30,
        backgroundColor: "#a6a6a6"
    },
    items: {
        flex: 2,
        alignItems: "center",
        justifyContent: "space-evenly"
    }, itemText: {
        fontSize: 16,
    }

})