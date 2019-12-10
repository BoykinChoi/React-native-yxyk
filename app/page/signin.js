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
import requestData from '../util/ApiHelper'
import SignInList from "../component/signInList";
import { FlatList } from "react-native-gesture-handler";
import commUtil from '../util/commUtil'
//录音组件
import { AudioRecorder, AudioUtils } from 'react-native-audio'
import Sound from 'react-native-sound'

var _scrollView
var _urlSound

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
            selectedDay: "",

            hasPermission: undefined, //授权状态
            audioPath: AudioUtils.DocumentDirectoryPath + '/audio_test.aac', // 文件路径
            recording: false, //是否录音
            pause: false, //录音是否暂停
            playing: false,//音频播放中
            stop: false, //录音是否停止

        }
    }

    componentDidMount() {
        this.getThisWeek()
        this.requestAuthorization();
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
                                    <Text style={styles.desc}>{this.state.taskInfo.content.replace(/<[\/\!]*[^<>]*>/ig, "")}</Text>

                                    <View style={styles.exampleLayout}>
                                        <Image style={styles.trumpet} source={require('../images/teacher.png')}></Image>
                                        <Text style={styles.example}>老师范读</Text>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                            this.soundUrlPlay(this.state.taskInfo.teacher_show_media)
                                        }}>
                                            <Image style={styles.trumpet} source={require("../images/trumpet.png")}></Image>
                                        </TouchableOpacity>
                                    </View>
                                </View>


                                {/* <Text style={[styles.signInBtn, styles.roundBorder, this.state.taskInfo.is_clock_in ? styles.orangeBg : styles.blueBg]}>{this.state.taskInfo.is_clock_in ? "已打卡" : "打卡"}</Text> */}
                                <Text style={[styles.signInBtn, styles.roundBorder, this.state.taskInfo.is_clock_in ? styles.orangeBg : styles.blueBg]}>{this.state.taskInfo.is_clock_in ? "今日榜单" : "今日榜单"}</Text>
                                <SignInList
                                    date={this.state.selectedDay}
                                    onCommentSoundClick={soundUrl => this.soundUrlPlay(soundUrl)}>
                                </SignInList>
                            </View>)
                        }
                    </ScrollView>

                </View>
                <View style={styles.cutline}></View>
                {/* //录音中显示动图  //非录音中显示控制栏 */}
                <View style={styles.bottom}>
                    {
                        this.state.recording ?
                            <View style={styles.contorlLayout}>
                                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                    this.recordStop()
                                    this.setState({
                                        recording: false
                                    })
                                }}>
                                    <View style={styles.contorlItem}>
                                        <Image style={styles.controlImg} source={require('../images/recording.gif')}></Image>
                                        <Text>录音中：{this.state.currentTime}s</Text>
                                    </View>
                                </TouchableOpacity>
                            </View> :
                            <View style={styles.contorlLayout}>
                                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                    this.recordPlay()
                                }}>
                                    <View style={styles.contorlItem}>
                                        <Image style={styles.controlImg} source={require('../images/audio_play.png')}></Image>
                                        <Text style={styles.textSmall}>录音回放</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                    this.recordStart()
                                    this.setState({
                                        recording: true
                                    })
                                }}>
                                    <View style={styles.contorlItem}>
                                        <Image style={styles.controlImg} source={require('../images/audio_record.png')}></Image>
                                        <Text style={styles.textSmall}>录音</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                    //this.signIn()
                                }}>
                                    <View style={styles.contorlItem}>
                                        <Image style={styles.controlImg} source={require('../images/audio_submit.png')}></Image>
                                        <Text style={styles.textSmall}>打卡</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                    }

                </View>
            </View >

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

    //本周日期
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


    //今天任务
    getTodayTaskInfo(date) {
        let url = 'clock_in/info',
            data = {
                token: global.userToken,
                date: date
            }
        return requestData(url, data, (resData) => {
            resData.content = commUtil.stripHtml(resData.content)
            this.setState({
                taskInfo: resData
            })

        })
    }

    signIn = () => {
        const path = 'file://' + AudioUtils.DocumentDirectoryPath + 'audio_test.aac';
        const formData = new FormData();
        formData.append(
            'token', global.userToken,
            'date', this.state.selectedDay,
            'file', {
            uri: path,
            name: 'test.aac',
            type: 'audio/aac',
        })
        fetch("http://dev_cp.zzyzsw.com/api/clock_in/save_audio", {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then(response => {
            ToastAndroid.show("打卡成功 ", ToastAndroid.SHORT);
            console.error(response)
        }).catch(err => {
            console.error(err)
        })
    }

    // scrollsToTop = () => {
    //     this.scrollview.scrollTo({ x: 0, y: 0, animated: true });
    //     this.scrollview.scrollWithoutAnimationTo(0,0);
    // }

    requestAuthorization = () => {
        // 请求授权
        AudioRecorder.requestAuthorization()
            .then(isAuthor => {
                console.log('是否授权: ' + isAuthor)
                if (!isAuthor) {
                    return alert('请前往设置开启录音权限')
                }
                this.setState({ hasPermission: isAuthor })
                this.prepareRecordingPath(this.state.audioPath);
                // 录音进展
                AudioRecorder.onProgress = (data) => {
                    this.setState({ currentTime: Math.floor(data.currentTime) });
                };
                // 完成录音
                AudioRecorder.onFinished = (data) => {
                    //data 返回需要上传到后台的录音数据
                    ToastAndroid.show("完成录音", ToastAndroid.SHORT);
                    console.log(this.state.currentTime)
                    console.log(data)
                };
            })
    }

    /**
   * AudioRecorder.prepareRecordingAtPath(path,option)
   * 录制路径
   * path 路径
   * option 参数
   */
    prepareRecordingPath = (path) => {
        const option = {
            SampleRate: 44100.0, //采样率
            Channels: 2, //通道
            AudioQuality: 'High', //音质
            AudioEncoding: 'aac', //音频编码
            OutputFormat: 'mpeg_4', //输出格式
            MeteringEnabled: false, //是否计量
            MeasurementMode: false, //测量模式
            AudioEncodingBitRate: 32000, //音频编码比特率
            IncludeBase64: true, //是否是base64格式
            AudioSource: 0, //音频源
        }
        AudioRecorder.prepareRecordingAtPath(path, option)
    }

    // 开始录音
    recordStart = async () => {
        if (!this.state.hasPermission) {
            return alert('没有授权')
        }
        if (this.state.recording) {
            return alert('正在录音中...')
        }
        if (this.state.stop) {
            this.prepareRecordingPath(this.state.audioPath)
        }
        this.setState({ recording: true, pause: false })

        try {
            await AudioRecorder.startRecording()
        } catch (err) {
            console.log(err)
        }
    }
    // 暂停录音
    recordPause = async () => {
        if (!this.state.recording) {
            return alert('当前未录音')
        }
        try {
            await AudioRecorder.pauseRecording()
            this.setState({ pause: true, recording: false })
        } catch (err) {
            console.log(err)
        }
    }

    // 恢复录音
    recordResume = async () => {
        if (!this.state.pause) {
            return alert('录音未暂停')
        }
        try {
            await AudioRecorder.resumeRecording();
            this.setState({ pause: false, recording: true })
        } catch (err) {
            console.log(err)
        }
    }

    // 停止录音
    recordStop = async () => {
        this.setState({ stop: true, recording: false, paused: false });
        try {
            await AudioRecorder.stopRecording();
        } catch (error) {
            console.error(error);
        }
    }

    // 播放录音
    recordPlay = async () => {
        let whoosh = new Sound(this.state.audioPath, '', (err) => {
            if (err) {
                return console.log(err)
            }
            whoosh.play(success => {
                if (success) {
                    console.log('success - 播放成功')
                } else {
                    console.log('fail - 播放失败')
                }
            })
        })
    }

    soundUrlPlay = async (url) => {
        let sound = new Sound(url, '', (err) => {
            if (err) {
                this.setState({
                    playing: false
                })
                return console.log(err)
            }
            sound.play(success => {
                this.setState({
                    playing: true
                })
                if (success) {
                    console.log('success - 播放成功')
                } else {
                    console.log('fail - 播放失败')
                }
            })
        })
    }
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
            width: 40,
            height: 40
        },
        cutline: {
            height: 1,
            backgroundColor: "#CFCFCF"
        },
        exampleLayout: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            backgroundColor: "#CFCFCF"
        },
        example: {
            marginLeft: 6,
            marginRight: 6
        },

        trumpet: {
            width: 26,
            height: 26,
        }
    }
)
