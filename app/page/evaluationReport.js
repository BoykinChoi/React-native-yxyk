import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native"
import requestData from '../util/ApiHelper'
import commUtil from '../util/commUtil'
import { commStyles, colors } from '../style/commStyle' //commStyle导出用 export 方法 ，所以前面要加{ }

export default class EvaluationReport extends Component {
    static navigationOptions = {
        title: "测试报告"
    }
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    //组件渲染后调用
    componentDidMount() {
    }

    render() {
        return (
            <View>
                <ImageBackground style={styles.headerImg} resizeMode="stretch" source={require('../images/report_bg.png')}>
                    <View style={styles.topLayout}>
                        <Text style={styles.title}>{this.props.navigation.getParam('title', "no_title")}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.page}>
                    <Text style={[commStyles.fontTitle, styles.marginBottom]}>{"测试结果：" + this.props.navigation.getParam('level', "no_result")}</Text>
                    <Text style={commStyles.fontDesc}>{this.props.navigation.getParam('content', "no_content")}</Text>
                </View>
            </View>
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
        topLayout: {
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 20,
            height: 200,
            paddingRight: 20
        },
        marginBottom: {
            marginBottom: 10
        },
        title: {
            color: colors.MAIN_COLOR,
            fontSize: 23
        },
        headerImg: {
            height: 200
        },
        desc: {
            color: "#666666"
        },
    }
)
