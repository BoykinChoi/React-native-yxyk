import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    Button,
    ToastAndroid,
    TouchableOpacity,
} from "react-native"
import requestData from '../util/ApiHelper'

export default class CourserDetail extends Component {
    static navigationOptions = {
        title: "课程详情"
    }
    constructor(props) {
        super(props)
        this.state = {
            evaluation: {},
        }
    }

    //组件渲染后调用
    componentDidMount() {
        this.getDetail();
    }

    render() {
        return (
            <View>
                <View style={styles.eItemBg}>
                    <Image style={styles.eIcon} source={{ uri: evaluation.list_img }}></Image>
                    <View style={styles.eItem}>
                        <Text style={styles.title}>{evaluation.title}</Text>
                        <Text style={styles.desc}>{evaluation.des}</Text>
                    </View>
                </View>
                <Text>已测 : 7892人 | 题目 : 30道 | 时间 : 24分钟</Text>
                <Button>开始测试</Button>
            </View>
        )
    }


    getDetail = () => {
        let url = 'course/detail'
        let courseId = this.props.navigation.getParam('courseId', "NO_ID")
        let parms = {
            token: global.userToken,
            id: courseId
        }
        return requestData(url, parms, (data) => {
            this.setState({
                course: data,
                isLike: data.is_love,
            })
        })

    }

}

const styles = StyleSheet.create(
    {
        flexLayout: {
            flex: 1,
        },
        eItemBg: {
            flex: 1,
            flexDirection: "row",
            margin: 10,
            padding: 10,
            alignItems: "center",
            backgroundColor: "#F7F8F8",
            borderWidth: 1,
            borderColor: "#F7F8F8",
            shadowColor: "#000000",
            shadowRadius: 3,
            borderRadius: 6
        },
        eItem: {
            marginLeft: 16,
            flex: 1,
        },
        title: {
            fontSize: 17,
            marginBottom: 10
        },
        desc: {
            color: "#666666"
        },
    }
)
