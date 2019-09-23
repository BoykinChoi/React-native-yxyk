import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    ToastAndroid,
    TouchableOpacity,
} from "react-native";
import requestData from '../util/ApiHelper'

export default class CommentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commentDatas: []
        }
    }

    componentDidMount() {
        this.getCommentData()
    }

    render() {
        return (<View>
            <FlatList
                style={styles.list}
                data={this.state.commentDatas}
                renderItem={this.renderCommment}
                keyExtractor={item => item.id.toString()}>
            </FlatList>
        </View>)
    }

    renderCommment({ item }) {
        return (<View style={styles.item}>
            <Image style={styles.headPic} source={{ uri: item.head_pic }}></Image>
            <View style={styles.commentContent}>
                <View style={styles.titleLayout}>
                    <Text>{item.uname}</Text>
                    <Text>{"赞" + item.love_num}</Text>
                </View>
                <Text style={styles.content}>{item.content}</Text>
                {
                    item.mg_list.length > 0 ? (<Text style={styles.reply}>{item.mg_list[0].content}</Text>) : null
                }

                <Text>{item.create_time}</Text>
            </View>
        </View>)
    }

    getCommentData = () => {
        let url = 'course/course_comment'
        let courseId = this.props.navigation.getParam('courseId', "NO_ID")
        let parms = {
            token: global.userToken,
            id: courseId,
            size: 30
        }
        return requestData(url, parms, (data) => {
            this.setState({
                commentDatas: data.lists
            })
            //ToastAndroid.show('data.lists' + data.lists.length, ToastAndroid.SHORT);
        })
    }
}

const styles = StyleSheet.create({
    list: {
        padding: 16
    },
    item: {
        flexDirection: "row",
        marginBottom: 16
    },
    headPic: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderRadius: 1024,
        borderColor: "#000000"
    },
    commentContent: {
        marginLeft: 16,
        flex: 1
    },
    content: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16
    },
    reply: {
        padding: 6,
        fontSize: 16,
        marginBottom:10,
        backgroundColor: "#F7F8F8"


    },
    titleLayout: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})