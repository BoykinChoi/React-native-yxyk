import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    Button,
    ScrollView,
    TouchableOpacity
} from "react-native"
import requestData from '../util/ApiHelper'
import commUtil from '../util/commUtil'

export default class EvaluationDesc extends Component {
    static navigationOptions = {
        title: "测试说明"
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.page}>
                    <View style={styles.eItemBg}>
                        <Image style={styles.eIcon} source={{ uri: this.state.evaluation.list_img }}></Image>
                        <View style={styles.eItem}>
                            <Text style={styles.title}>{this.state.evaluation.title}</Text>
                            <Text style={styles.desc}>{this.state.evaluation.des}</Text>
                        </View>
                    </View>
                    <View style={styles.alignItemCenter}>
                        <Text style={styles.info}>已测 : {this.state.evaluation.test_num}人  |  题目 : {this.state.evaluation.ex_num}道  |  时间 : {this.state.evaluation.ex_time_string}分钟</Text>
                    </View>
                    <Button title="开始测试" onPress={
                        () => {
                            this.props.navigation.navigate("Evaluation", {
                                id: this.state.evaluation.id,
                                title: this.state.evaluation.title
                            })
                        }
                    }></Button>
                    <View>
                        <Text style={styles.title2}>测试须知</Text>
                        <Text style={styles.desc}>{this.state.evaluation.content}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }


    getDetail = () => {
        let url = 'mf_quest/detail'
        let id = this.props.navigation.getParam('id', "NO_ID")
        let parms = {
            token: global.userToken,
            id: id
        }
        return requestData(url, parms, (data) => {
            data.content = commUtil.stripHtml(data.content)
            this.setState({
                evaluation: data,
            })
        })

    }

}

const styles = StyleSheet.create(
    {
        page: {
            padding: 16,
        },
        flexLayout: {
            flex: 1,
        },
        alignItemCenter: {
            alignItems: "center"
        },
        eItemBg: {
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#F7F8F8",
            shadowRadius: 3,
            borderRadius: 6
        },
        eItem: {
            marginLeft: 16,
            flex: 1,
        },
        eIcon: {
            width: 160,
            height: 160
        },

        title: {
            fontSize: 18,
            marginBottom: 10
        },

        title2: {
            fontSize: 18,
            marginTop: 20,
            marginBottom: 16
        },
        info: {
            margin: 10,
            padding: 20
        },
        desc: {
            color: "#666666"
        },
    }
)
