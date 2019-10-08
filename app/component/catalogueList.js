import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    SectionList,
    ToastAndroid,
    TouchableOpacity,
} from "react-native";
import requestData from '../util/ApiHelper'
import { bold, italic } from "ansi-colors";

export default class CatalogueList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isAudio: false,
            playingNodeId: -1 //当前播放中的node
        }
    }

    componentDidMount() {
        this.getCatelogueData()
    }

    render() {

        return (<View style={styles.page}>
            <SectionList
                renderSectionHeader={this.renderGroup}
                renderItem={this.renderItem}
                sections={this.state.data}
                extraData={this.state} //这里是关键，如果不设置为true点击就不会马上改变状态，默认为false
                showsVerticalScrollIndicator={false}
            ></SectionList>
        </View>)
    }

    /**
     * 分组头部
     **/
    renderGroup = ({ section }) => {
        return (<View>
            <Text style={styles.gorupHeader}>{section.title}</Text>
        </View>)
    }
    /**
     * 子item  nodes
     */
    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                let isAudio = this.state.isAudio
                if (item.is_free == 1 && !this.props.own) {
                    //通过props 与父组件通信
                    this.props.onItemClick(isAudio, item)

                } else {//节点isfree为2j时可免费观看，或该课程已经购买。可直接观看
                    //通过props 与父组件通信
                    this.props.onItemClick(isAudio, item)
                    this.setState({
                        playingNodeId: item.id
                    })
                }

            }}>
                <View style={styles.childContent}>
                    <View style={styles.childTitle}>
                        <Image style={styles.playIcon} source={item.id === this.state.playingNodeId ? require('../images/icon_playing.png') : require('../images/icon_player.png')}></Image>
                        {
                            (item.is_free === 2 && !this.props.own) ? (<Text style={styles.tryPlay}>{this.state.isAudio ? "试听" : "试看"}</Text>) : (null)
                        }
                        <Text style={item.id === this.state.playingNodeId ? styles.playingTitle : null}>{item.title}</Text>
                    </View>
                    <Text style={styles.videoTime}>{"时长:" + item.video_time}</Text>
                </View>

            </TouchableOpacity>)
    }


    getCatelogueData = () => {

        let url = 'course/course_list'
        let courseId = this.props.courseId
        let parms = {
            token: global.userToken,
            id: courseId,
            size: 30
        }
        return requestData(url, parms, (data) => {
            /**
             * SectionList ，子集合名称必须为data ,否则无效
             */
            let tempArr = data.lists.map((item, index) => {
                let tempData = {};
                tempData.title = item.title;
                tempData.data = item.nodes;
                return tempData
            });
            let isAudio = data.media_type == 2
            //ToastAndroid.show('isAudio:' + isAudio, ToastAndroid.SHORT);
            this.setState({
                isAudio: isAudio,
                data: tempArr,
                //playingNodeId: tempArr[0].data[0].id
            })
        })

    }
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 6,
    },
    gorupHeader: {
        marginBottom: 20,
        //fontStyle: "italic",
        fontWeight: "bold",
        fontSize: 16,
        color: "#000000"
    },
    childContent: {
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20
    },
    childItem: {
        flexDirection: "row",
        alignContent: "center",
        flexWrap: "wrap"
    },
    childTitle: {
        flexDirection: "row",
        alignItems: "center",
    },
    playingTitle: {
        color: "#FD5F00"
    },
    videoTime: {
        marginLeft: 28,
        fontSize: 12,
        color: "#666666"
    },
    playIcon: {
        marginRight: 10,
        width: 17,
        height: 17
    },
    tryPlay: {
        borderWidth: 1,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 10,
        borderColor: "#FD5F00",
        borderRadius: 2,
        marginRight: 6,
        paddingLeft: 4,
        paddingRight: 4,
        color: "#FD5F00"
    }
})
