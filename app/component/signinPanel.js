import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    ImageBackground,
    TouchableOpacity,
    Animated
} from "react-native"

export default class SignInPanel extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }



    render() {
        return (<View style={styles.content}>
            <TouchableOpacity style={styles.leftBg} onPress={() => {
                //通过props与父组件通知
                this.props.onSignInPlneClick()
            }}>
                <ImageBackground style={styles.signinBg} source={require('../images/daily_bg.png')}>
                    <Text style={styles.text1}>每 日 打 卡</Text>
                    <Text style={styles.text2}>15</Text>
                    <Text style={styles.text3}>连续7天奖到你笑</Text>
                </ImageBackground>
            </TouchableOpacity>

            <View style={styles.rightBg}>
                <TouchableOpacity onPress={() => {
                    //通过props与父组件通知
                    this.props.onTestPlneClick()
                }}>
                    <ImageBackground style={styles.testBg} source={require('../images/red_colorlump.png')}>
                        <Text style={styles.text1}>口 才 测 试</Text>
                        <Text style={styles.text3}>测到笑,准到叫</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <ImageBackground style={styles.testBg} source={require('../images/purple_colorlump.png')}>
                    <Text style={styles.text1}>实 战 练 习</Text>
                    <Text style={styles.text3}>一练99级，是兄弟就来练我</Text>
                </ImageBackground>
            </View>
        </View>)
    }

}

const styles = StyleSheet.create({
    content: {
        paddingTop: 16,
        paddingBottom: 16,
        flexDirection: "row"
    },
    leftBg: {
        flex: 3,
    },
    signinBg: {
        justifyContent: "center",
        alignItems: "center",
        height: 150
    },
    rightBg: {
        flex: 4,
        justifyContent: "space-between",
    },

    testBg: {
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 70
    },

    text1: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "bold"

    },
    text2: {
        color: "#ffffff",
        fontSize: 55,
        fontWeight: "bold"

    },
    text3: {
        color: "#ffffff",
        fontSize: 12,

    }

})