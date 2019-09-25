import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    Button,
    ScrollView,
    SectionList,
    ToastAndroid,
    TouchableOpacity,
} from "react-native";
import SignInList from "../component/signInList";
import requestData from '../util/ApiHelper'
import { FlatList } from "react-native-gesture-handler";
var _scrollView

export default class SignIn extends Component {
    static navigationOptions = {
        title: "每日打卡"
    }
    constructor(props) {
        super(props)
        this.state = {
            curWeek: [],
            taskInfo: null,
            rankList: [],
            selectedDay: ""
        }
    }

    componentDidMount() {
        this.getThisWeek()
    }

    render() {

        return (
            <View style={styles.flexLayout}>
                <View style={styles.flexLayout}>
                    <View style={styles.weekLayout}>
                        <FlatList
                            data={this.state.curWeek}
                            renderItem={this.renderWeekDays}
                            numColumns={7}
                            keyExtractor={item => item.day.toString()}
                            extraData={this.state}
                        >
                        </FlatList>
                    </View>
                    <View style={styles.cutline}></View>
                    <ScrollView ref={(scrollView) => { _scrollView = scrollView }} showsVerticalScrollIndicator={false} style={styles.flexLayout}>
                        {
                            this.state.taskInfo == null || this.state.taskInfo == undefined ? null : (<View>
                                <View style={styles.content}>
                                    <Text style={styles.title}>{this.state.taskInfo.title}</Text>
                                    <Text style={styles.tips}>{this.state.taskInfo.tips}</Text>
                                    <Text style={styles.desc}>{this.state.taskInfo.content}</Text>
                                </View>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                }}>
                                    <Text style={[styles.signInBtn, styles.roundBorder, this.state.taskInfo.is_clock_in ? styles.orangeBg : styles.blueBg]}>{this.state.taskInfo.is_clock_in ? "已打卡" : "打卡"}</Text>
                                </TouchableOpacity>
                                <SignInList date={this.state.selectedDay}></SignInList>
                            </View>)
                        }

                    </ScrollView>

                </View>
                <View style={styles.cutline}></View>
                <View style={styles.bottom}>
                    <View style={styles.contorlLayout}>
                        <View style={styles.contorlItem}>
                            <Image style={styles.controlImg} source={require('../images/teacher.png')}></Image>
                            <Text style={styles.textSmall}>老师范读</Text>
                        </View>
                        <View style={styles.contorlItem}>
                            <Image style={styles.controlImg} source={require('../images/audio_record.png')}></Image>
                            <Text style={styles.textSmall}>录音</Text>
                        </View>
                        <View style={styles.contorlItem}>
                            <Image style={styles.controlImg} source={require('../images/audio_play.png')}></Image>
                            <Text style={styles.textSmall}>播放录音</Text>
                        </View>
                    </View>
                </View>
            </View>

        )
    }



    renderWeekDays = ({ item }) => {
        return (<View style={styles.weekitem}>
            <Text>{item.week_text}</Text>
            <TouchableOpacity onPress={() => {
                this.setState({
                    selectedDay: item.date,
                })
                this.getTodayTaskInfo(item.date)
                //滚动到顶部
                _scrollView.scrollTo({ x: 0, y: 0, animated: true })
            }}>
                <Text style={[styles.day, item.date == this.state.selectedDay ? styles.daySelected : (item.is_today ? styles.today : (item.is_clock_in ? styles.signIned : styles.dayNormal))]}>{item.day}</Text>
            </TouchableOpacity>
        </View>)
    }

    getThisWeek() {
        let url = 'clock_in/this_week_day',
            data = {
                token: global.userToken
            }
        return requestData(url, data, (resData) => {
            let today = "";
            for (let d of resData) {
                if (d.is_today) {
                    today = d.date
                }
            }
            this.setState({
                curWeek: resData,
                selectedDay: today,

            })
            this.getTodayTaskInfo(today)
        })
    }


    getTodayTaskInfo(date) {
        let url = 'clock_in/info',
            data = {
                token: global.userToken,
                date: date
            }
        return requestData(url, data, (resData) => {
            this.setState({
                taskInfo: resData
            })


        })
    }

    // scrollsToTop = () => {
    //     this.scrollview.scrollTo({ x: 0, y: 0, animated: true });
    //     this.scrollview.scrollWithoutAnimationTo(0,0);
    // }
}

const styles = StyleSheet.create(
    {
        flexLayout: {
            flex: 1,
        },
        content: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
        },
        weekLayout: {
            justifyContent: "center",
            height: 76
        },
        weekitem: {
            //space-evenly平均分配
            justifyContent: "space-evenly",
            alignItems: "center",
            flex: 1,
            height: 76,
        },
        dayNormal: {
            padding: 5,

        },
        today: {
            padding: 6,
            color: "#E60012",
            textAlign: "center",
            textAlignVertical: "center"
        },
        signIned: {
            borderWidth: 1,
            borderRadius: 1024,
            borderColor: "#6F89F8"
        },
        day: {
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 6,
            paddingRight: 6,
            borderWidth: 1,
            borderColor: "#ffffff",
            textAlign: "center",
            textAlignVertical: "center",
        },
        daySelected: {
            color: "#ffffff",
            borderWidth: 1,
            borderRadius: 1024,
            backgroundColor: "#6F89F8",
            borderColor: "#6F89F8"
        },
        content: {
            backgroundColor: "#F5F6F6",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            margin: 16
        },
        title: {
            fontSize: 20,
            color: "#333333"
        },
        tips: {
            fontSize: 12,
            color: "#666666",
            margin: 10
        },
        textSmall: {
            fontSize: 11,
            color: "#666666",
            marginTop: 4
        },
        desc: {
            fontSize: 14,
            color: "#333333"
        },
        roundBorder: {
            borderWidth: 1,
            borderRadius: 1024,
        },

        signInBtn: {
            fontSize: 17,
            color: "#ffffff",
            padding: 10,
            margin: 20,
            textAlign: 'center',

        },
        submitBtn: {
            fontSize: 17,
            color: "#ffffff",
            marginTop: 20,
            textAlign: 'center',
            textAlignVertical: 'center',

        }
        , orangeBg: {
            backgroundColor: "#FD5F00",
            borderColor: "#FD5F00"
        },
        blueBg: {
            backgroundColor: "#6F89F8",
            borderColor: "#6F89F8"
        },
        bottom: {
            backgroundColor: "#ffffff",
        },
        contorlLayout: {
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: 82,
        },
        contorlItem: {
            justifyContent: "center",
            alignItems: "center",

        },
        controlImg: {
            width: 46,
            height: 46
        },
        cutline: {
            height: 1,
            backgroundColor: "#CFCFCF"
        }
    }
)
