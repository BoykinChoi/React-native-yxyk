import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} from "react-native"

export default class PromptDialog extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.page}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.content}>{this.props.content}</Text>
                        <View style={styles.operate}>
                            <TouchableOpacity onPress={() => {
                                this.props.onCancel()
                            }}>
                                <Text style={[styles.operateText, styles.marginRight]}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.props.onPositivePress()
                            }}>
                                <Text style={[styles.operateText, styles.marginLeft]}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
        backgroundColor: "rgba(0,0,0,0.5)" //使用此方式来设置背景透明
    },
    container: {
        padding: 16,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#ffffff",
        borderRadius: 6
    },
    operate: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    title: {
        fontSize: 18
    },
    content: {
        marginTop: 16,
        marginBottom: 16,
    },
    operateText: {
        fontSize: 16,
        color: "#496AF7",
        textAlign: "center"
    },
    marginLeft: {
        marginLeft: 30
    },
    marginRight: {
        marginRight: 30
    },
})

