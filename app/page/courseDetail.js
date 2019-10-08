import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    Modal,
    StatusBar,
    ToastAndroid,
    TouchableOpacity,
} from "react-native"
import Video from 'react-native-video'
import requestData from '../util/ApiHelper'
import CatalogueList from '../component/catalogueList'
import PromptDialog from '../widget/promptDialog'

export default class CourserDetail extends Component {
    static navigationOptions = {
        headerStyle: {
            borderBottomWidth: 0,
            elevation: 0,
            height: 0
            //paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
        },
    }
    constructor(props) {
        super(props)
        this.state = {
            course: {},
            isLike: false,
            playUrl: "",
            dialogShow: false,
            isAudioPlaying: false
        }
    }

    //组件渲染后调用
    componentDidMount() {
        this.getCourseDetail();
    }

    render() {
        return (
            <View style={styles.bg}>
                <View style={styles.videoLayout}>
                    {
                        this.state.playUrl != "" ? (
                            <View>
                                <Video style={[styles.videoLayout, styles.videoPlayer]} source={{ uri: this.state.playUrl }}   // Can be a URL or a local file.
                                    ref={(ref) => {
                                        this.player = ref  //方法对引用Video元素的ref引用进行操作
                                    }}                                      // Store reference
                                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                    onError={this.onVedioError} // Callback when video cannot be loaded
                                    controls={true}   //显示自带的控制层（有点丑），默认为flase
                                // style={styles.fullScreen}//组件样式
                                // rate={this.state.rate}//播放速率
                                // paused={this.state.paused}//暂停
                                // volume={this.state.volume}//调节音量
                                // muted={this.state.muted}//控制音频是否静音
                                // resizeMode={this.state.resizeMode}//缩放模式
                                // onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
                                // onProgress={this.onProgress}//视频播放过程中每个间隔进度单位调用的回调函数
                                // onEnd={this.onEnd}//视频播放结束时的回调函数
                                // onAudioBecomingNoisy={this.onAudioBecomingNoisy}//音频变得嘈杂时的回调 - 应暂停视频
                                // onAudioFocusChanged={this.onAudioFocusChanged}//音频焦点丢失时的回调 - 如果焦点丢失则暂停
                                // repeat={false}//确定在到达结尾时是否重复播放视频。
                                />
                                {this.state.isAudioPlaying ? <Text style={styles.audioPlaying}>音频播放中...</Text> : null}
                            </View >) : (<Image style={styles.videoLayout} source={{ uri: this.state.course.img }}></Image>)
                    }
                </View>
                <View style={styles.intro}>
                    <View>
                        <View style={styles.title}>
                            <Text style={styles.introTitle}>{this.state.course.title}</Text>
                            {this.state.course.is_possess ? (<Text style={styles.own}>已购</Text>) : (null)}
                        </View>
                        <View style={styles.operation}>
                            <View >

                                <Text style={styles.textSmall}>{'分类：' + this.state.course.request_code}</Text>
                                <Text style={styles.textSmall}>{'学习人数：' + this.state.course.learn_num}</Text>
                            </View>
                            <View style={styles.operation}>
                                <TouchableOpacity onPress={() => this.like()}>
                                    <Image style={styles.likeIcon} source={this.state.isLike ? require('../images/good.png') : require('../images/good-filling.png')}></Image>
                                </TouchableOpacity>
                                <Image style={styles.likeIcon} source={require('../images/favorites-filling.png')}></Image>

                                <Image style={styles.likeIcon} source={require('../images/money.png')}></Image>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate("CommentList", {
                                        //传送参数 课程id
                                        courseId: this.state.course.id,
                                    });
                                }}>
                                    <Image style={styles.likeIcon} source={require('../images/comment.png')}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.catalogueList}>
                        <CatalogueList
                            onItemClick={(isAudio, item) => this.onCatalogueItemClick(isAudio, item)}
                            courseId={this.props.navigation.getParam('courseId', "NO_ID")}
                            own={this.state.course.is_possess}
                        //isAudio={this.state.course.type ==1} //type 1为音频
                        >
                        </CatalogueList>
                    </View>
                </View >
                <Modal
                    visible={this.state.dialogShow}
                    animationType="none"
                    transparent={true}
                    onRequestClose={() => {
                        alert("Modal has been closed.");
                    }}
                >
                    <PromptDialog
                        title="提示"
                        content="您还未拥有该课程，是否前往购买？"
                        onCancel={() => {
                            this.setState({
                                dialogShow: false
                            })
                        }}
                        onPositivePress={() => this.onPositivePress()}
                    ></PromptDialog>
                </Modal>
            </View >
        )
    }

    onBuffer = () => {

    }

    onVedioError = () => {

    }

    onPositivePress = () => {
        this.setState({
            dialogShow: false
        })
        ToastAndroid.show('gan', ToastAndroid.SHORT);
    }

    /**
     * 处理子组件CatalogueList的事件
     */
    onCatalogueItemClick = (isAudio, item) => {
        if (item.is_free == 2 || this.state.course.is_possess) //节点isfree为2j时可免费观看，或该课程已经购买。可直接观看
        {
            this.setState({
                playUrl: item.video_url,
                isAudioPlaying: isAudio
            })
        } else {
            this.setState({
                dialogShow: true
            })
            //ToastAndroid.show('请先购买完整课程', ToastAndroid.SHORT);
        }

    }

    getCourseDetail = () => {
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

    like = () => {
        let url = 'course/course_love'
        let courseId = this.props.navigation.getParam('courseId', "NO_ID")
        let parms = {
            token: global.userToken,
            course_id: courseId
        }
        return requestData(url, parms, (data) => {
            this.setState({
                isLike: true,
            })
            //ToastAndroid.show('点赞成功', ToastAndroid.SHORT);
        })
    }

}

const styles = StyleSheet.create(
    {
        bg: {
            flex: 1,
            flexDirection: "column",
            marginBottom: 86
        },
        videoLayout: {
            height: 200,
            backgroundColor: "#000000"
        },
        videoPlayer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        audioPlaying: {
            color: "#ffffff",
            textAlign: "center",
            textAlignVertical: "center",
            height: 200,
        },
        line: {
            height: 1,
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: "#CFCFCF"

        },
        intro: {
            flex: 1,
            //top: 230,
            padding: 16,
        },

        textSmall: {
            color: "#666666",
            fontSize: 12
        },
        likeIcon: {
            width: 23,
            height: 23,
            marginLeft: 22
        },
        operation: {
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row"

        },
        title: {
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 10
        },
        introTitle: {
            flex: 1,
            fontSize: 17,
        },
        own: {
            borderWidth: 1,
            textAlign: "center",
            textAlignVertical: "center",
            fontSize: 11,
            height: 16,
            borderColor: "#FD5F00",
            borderRadius: 2,
            marginLeft: 16,
            paddingLeft: 4,
            paddingRight: 4,
            color: "#FD5F00"
        }
    }
)
