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

export default class SignInList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            taskDate: props.date,
            signInDatas: []
        }
    }

    componentDidMount() {
        let date = this.state.taskDate
        this.getSignInData(date)
    }

    /** 父组件修改子组件props刷新子组件（旧版本的方法）
     * 
     * 在componentWillReceiveProps这个回调函数中，我们可以获取到就是props，通过this.props来获取，
     * 然后新的props则是通过函数的参数传入，在这里我们可以比较两个props从而对本组件的state作出安全的变更然后重新渲染我们的组件或者是触发子组件内的某些方法。
     * @param {*} nextProps 
     */
    componentWillReceiveProps(nextProps) { //componentWillReceiveProps方法中第一个参数代表即将传入的新的Props
        //ToastAndroid.show('date' + nextProps.date, ToastAndroid.SHORT);
        //在这里我们仍可以通过this.props来获取旧的外部状态
        //通过新旧状态的对比，来决定是否进行其他方法
        if (this.props.date != nextProps.date) {
            this.getSignInData(nextProps.date)
        }

    }

    /** 
     * 父组件修改子组件props刷新子组件（新版本的方法）结合 componentDidUpdate()
     * 
     * @param {*} nextProps 
     * @param {*} prevState 
     */
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     //ToastAndroid.show('date' + nextProps.date, ToastAndroid.SHORT);
    //     if (prevState.taskDate !== nextProps.date) {
    //         return ({
    //             //这里相当于设置setState
    //             taskDate: nextProps.date
    //             // <- this is setState equivalent
    //         })
    //     }
    //     return null
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.taskDate !== prevProps.date) {
    //         this.getSignInData()
    //     }

    // }


    render() {
        return (<View>
            <FlatList
                style={styles.list}
                data={this.state.signInDatas}
                renderItem={this.renderItem}
                keyExtractor={item => item.id.toString()}>
            </FlatList>
        </View>)
    }

    renderItem({ item }) {
        return (<View style={styles.item}>
            <Image style={styles.headPic} source={{ uri: item.user_img }}></Image>
            <View style={styles.content}>
                <View style={styles.titleLayout}>
                    <Text>{item.user_name}</Text>
                    <Text>{"赞" + item.love}</Text>
                </View>
                <Text style={styles.content}>{item.media_len + "s"}</Text>
                {
                    item.teacher_reply === "" ? null : (<Text style={styles.reply}>{item.teacher_reply}</Text>)
                }
            </View>
        </View>)
    }


    getSignInData = (date) => {

        let url = 'clock_in/info_list'
        //let date = this.state.taskDate
        let parms = {
            token: global.userToken,
            date: date,
            page: 1,
            size: 30
        }
        return requestData(url, parms, (data) => {
            //ToastAndroid.show("fuckdone", ToastAndroid.SHORT);
            this.setState({
                signInDatas: data.lists
            })
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
    content: {
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
        marginBottom: 10,
        backgroundColor: "#F7F8F8"


    },
    titleLayout: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})