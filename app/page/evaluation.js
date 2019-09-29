import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Button,
    FlatList,
    Text,
    ToastAndroid,
    TouchableOpacity
} from "react-native"
import requestData from '../util/ApiHelper'
import commUtil from '../util/commUtil'
import { commStyles, colors } from '../style/commStyle' //commStyle导出用 export 方法 ，所以前面要加{ }

export default class Evaluation extends Component {
    /**
     * 在static navigationOptions 获取上级页面的传递参数（如：标题）
     * 所有属性
     *     // title：标题，如果设置了这个导航栏和标签栏的title就会变成一样的，所以不推荐使用这个方法。
    // header：可以设置一些导航的属性，当然如果想隐藏顶部导航条只要将这个属性设置为null就可以了。
    // headerTitle：设置导航栏标题，推荐用这个方法。
    // headerBackTitle：设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。可以自定义，也可以设置为null
    // headerTruncatedBackTitle：设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"。（上个页面的标题过长，导致显示不下，所以改成了短一些的。）
    // headerRight：设置导航条右侧。可以是按钮或者其他。
    // headerLeft：设置导航条左侧。可以是按钮或者其他。
    // headerStyle：设置导航条的样式。背景色，宽高等。如果想去掉安卓导航条底部阴影可以添加elevation: 0，iOS下用shadowOpacity: 0。
    // headerTitleStyle：设置导航条文字样式。安卓上如果要设置文字居中，只要添加alignSelf:'center'就可以了
    // headerBackTitleStyle：设置导航条返回文字样式。
    // headerTintColor：设置导航栏文字颜色。总感觉和上面重叠了。
    // headerPressColorAndroid：安卓独有的设置颜色纹理，需要安卓版本大于5.0
    // gesturesEnabled：是否支持滑动返回手势，iOS默认支持，安卓默认关闭
     */
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title
    })
    constructor(props) {
        super(props)
        this.state = {
            testId: "0",
            questionList: [],
            currentIndex: 0,
            currentQuestion: {},
            selectedOptionSn: "",
            isShowSubmit: false
        }
    }

    //组件渲染后调用
    componentDidMount() {
        this.getQuestions()
    }

    render() {
        return (
            <View style={styles.page}>
                <View style={styles.titleLayout}>
                    <Text>{this.state.currentQuestion.type_text}</Text>
                    <Text>{this.state.currentIndex + 1 + "/" + this.state.questionList.length}</Text>
                </View>
                <View style={commStyles.cutLine}></View>
                <Text style={styles.questionTitle}>{this.state.currentQuestion.title}</Text>
                <View>
                    <FlatList
                        data={this.state.currentQuestion.sub}
                        renderItem={this.renderAnswerItem}
                        extraData={this.state}
                        keyExtractor={item => item.sn}
                    ></FlatList>
                </View>
                {
                    this.state.isShowSubmit ? (
                        <View style={styles.submitLayout}>
                            <Button title="提交测试" onPress={
                                () => {
                                    this.submit()
                                }
                            }></Button>
                        </View>) : null
                }

            </View>
        )
    }

    renderAnswerItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                this.setState({
                    selectedOptionSn: item.sn
                })
                this.answerTheQuestion(item.point)
            }}>
                <View style={styles.answerLayout}>
                    <Text style={[styles.option, item.sn === this.state.selectedOptionSn ? styles.optionSelected : styles.optionNormal]}>{item.sn}</Text>
                    <Text style={styles.answer}>{commUtil.stripHtml(item.title)}</Text>
                </View>
            </TouchableOpacity >)
    }

    answerTheQuestion = (point) => {

        //记录答题后该题目得到多少分
        this.state.questionList[this.state.currentIndex].get_point = point
        //是否为最后一题，选择了答案
        let isAnswerFinish = this.state.currentIndex == this.state.questionList.length - 1

        //选择最后一道问题时，只需要记录所选答案和分数，不再需要设置下一题界面
        if (isAnswerFinish) {
            //显示提交按钮
            this.setState({
                isShowSubmit: true
            })
        } else {
            //设置为下一题
            let newIndex = this.state.currentIndex + 1
            let newQue = this.state.questionList[newIndex]
            //延时执行
            setTimeout(() => {
                this.setState({
                    currentIndex: newIndex,
                    currentQuestion: newQue,
                    selectedOptionSn: "",
                })
            }, 500)
        }

    }

    getQuestions = () => {
        let url = 'mf_quest/ex'
        let id = this.props.navigation.getParam('id', "NO_ID")
        let parms = {
            token: global.userToken,
            id: id
        }
        return requestData(url, parms, (data) => {
            for (let q of data.ex) {
                q.title = commUtil.stripHtml(q.title)
            }
            this.setState({
                testId: data.test_id,
                questionList: data.ex,
                currentQuestion: data.ex[0]
            })
        })

    }

    submit = () => {
        let url = 'mf_quest/save'
        let totalPoint = 0
        for (let q of this.state.questionList) {
            totalPoint += parseInt(q.get_point)
        }
        let parms = {
            token: global.userToken,
            test_id: this.state.testId,
            point: totalPoint
        }
        return requestData(url, parms, (resData) => {
            //ToastAndroid.show('poitn:' + totalPoint + ' level:' + resData.level, ToastAndroid.SHORT)
            //此处导航使用 replace 将使用指定的路由覆盖当前的页面
            this.props.navigation.replace("EvaluationReport", {
                title: resData.title,
                level: resData.level,
                content: commUtil.stripHtml(resData.content) 
            })
        })

    }

}

const styles = StyleSheet.create(
    {
        page: {
            padding: 20,
        },
        flexLayout: {
            flex: 1,
        },
        titleLayout: {
            flexDirection: "row",
            justifyContent: "space-between"
        },
        answerLayout: {
            flexDirection: "row",
            alignItems:"center",
            marginBottom: 16
        },
        questionTitle: {
            fontSize: 17,
            marginBottom: 20
        },
        answer: {
            fontSize: 15,
            marginLeft: 10,
            color: colors.TEXT_BLACK,
            padding: 4
        },
        option: {
            fontSize: 15,
            height:26,
            width:26,
            borderWidth: 1,
            textAlign: "center",
            textAlignVertical: "center",
            borderRadius: 1024,
        },
        optionNormal: {
            borderColor: "#6F89F8",
            color: "#6F89F8"
        }
        ,
        optionSelected: {
            backgroundColor: "#6F89F8",
            borderColor: "#6F89F8",
            color: "#ffffff"
        },
        submitLayout: {
            marginTop: 40
        }

    }
)
