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

export default class OfflinCourseList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            courseData: []
        }
    }

    componentDidMount() {
        this.getCommentData()
    }

    render() {
        return (<View>
            <FlatList
                style={styles.list}
                data={this.state.courseData}
                renderItem={this.renderCourse}
                numColumns={2}
                refreshing={true}
                //ItemSeparatorComponent={this.sepa}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={<View style={styles.recommend}>
                    <Text style={styles.recommendText}>精选线下课</Text>
                    <View style={styles.more}>
                        <Text style={styles.more}>更多</Text>
                        <Image style={{ width: 8, height: 12 }} source={require("../images/arrow_right_small.png")}></Image>
                    </View>
                </View>}>
            </FlatList>
        </View>)
    }

    sepa() {
        return (<View style={{ width: 10, height: 80, backgroundColor: 'red' }}></View>)
    }

    renderCourse({ item }) {
        return (<View style={[styles.flexLayout, styles.itemLayout]}>
            <Image style={styles.coursePic} source={{ uri: item.img }}></Image>
            <Text style={styles.courseTitle} numberOfLines={2} >{item.title}</Text>
            <View style={styles.classItemBottom}>
                <Text style={styles.textSmall}>{item.type}</Text>
                <Text style={styles.textSmall}>{"报名人数:" + item.nums}</Text>
            </View>
        </View>)
    }

    getCommentData = () => {
        let url = 'brand/top_class'
        let parms = {
            token: global.userToken,
            i_cate_id: global.industryCateid
        }
        return requestData(url, parms, (data) => {
            this.setState({
                courseData: data.lists
            })
        })
    }
}

const styles = StyleSheet.create({
    list: {
        paddingLeft: 16,
        paddingRight: 6
    },
    item: {
        flexDirection: "row",
        marginBottom: 16
    },
    flexLayout: {
        flex: 1
    },
    coursePic: {
        height: 88
    },
    itemLayout: {
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    courseTitle: {
        marginTop: 10,
        marginBottom: 10,
        minHeight: 35
    },
    textSmall: {
        fontSize: 10,
        marginTop: 4,
        color: "#666666"
    },
    classItemBottom: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    recommend: {
        alignItems: "center",
        flexDirection: "row",
        height: 50
    },
    recommendText: {
        fontSize: 23,
        fontWeight: "bold"
    },
    more: {
        color: "#666666",
        textAlign: "right",
        alignItems: "center",
        flex: 1,
        flexDirection: "row"
    }

})