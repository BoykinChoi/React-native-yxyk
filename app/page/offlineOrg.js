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

export default class OfflineOrg extends Component {
    static navigationOptions = {
        title: '品牌机构'
    }
    constructor(props) {
        super(props)
        this.state = {
            recommendData: [],
            orgData: []
        }
    }

    componentDidMount() {
        this.getRecommendData()
    }

    render() {
        return (<View>
            <FlatList
                style={styles.list}
                data={this.state.recommendData}
                renderItem={this.renderOrgItem}
                keyExtractor={item => item.id.toString()}>
            </FlatList>
        </View>)
    }

    renderOrgItem = ({ item }) => {
        return (<View style={styles.item}>
            <View style={styles.rowDirection}>
                <Image style={styles.headPic} source={{ uri: item.brand_logo }}></Image>
                <View style={styles.flexLayout}>
                    <Text style={styles.title}>{item.brand_name}</Text>
                    <Text style={styles.textSmall}>{item.brand_title}</Text>
                </View>
                <View style={styles.flexEnd}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate("OrgDetail", {
                            orgId: item.id
                        });

                    }}>
                        <Text style={styles.showBrand}>查看品牌</Text>
                    </TouchableOpacity>
                    <Text style={styles.textSmall}>{item.dist}</Text>
                </View>
            </View>
            <View style={[styles.rowDirection, styles.middle]}>
                <View style={[styles.flexLayout, styles.marginRight5]}>
                    <Image style={styles.coursePic} source={{ uri: item.classes_list.lists[0].img }}></Image>
                    <Text style={styles.courseTitle} numberOfLines={2}>{item.classes_list.lists[0].title}</Text>
                </View>
                <View style={[styles.flexLayout, styles.marginLeft5]}>
                    <Image style={styles.coursePic} source={{ uri: item.classes_list.lists[1].img }}></Image>
                    <Text style={styles.courseTitle} numberOfLines={2} >{item.classes_list.lists[1].title}</Text>
                </View>
            </View>
            <View style={styles.rowDirection}>
                <Text style={styles.showAll}>查看全部班课</Text>
                <Image style={styles.arrowRight} source={require('../images/arrow_right_orange.png')}></Image>
            </View>
            <View style={styles.cutline}></View>
        </View>)
    }

    getRecommendData = () => {
        let url = 'brand/recommend'
        let parms = {
            token: global.userToken,
            i_cate_id: global.industryCateid,
            lon: 0,
            lat: 0,
            city: "广州"
        }
        return requestData(url, parms, (resData) => {
            this.setState({
                recommendData: resData
            })
            this.getOrgData()
        })

    }

    getOrgData = () => {
        let url = 'brand/find'
        let parms = {
            token: global.userToken,
            i_cate_id: global.industryCateid,
            lon: 0,
            lat: 0,
            city: "广州"
        }
        return requestData(url, parms, (resData) => {
            this.setState({
                orgData: resData
            })
            //ToastAndroid.show('data.lists' + data.lists.length, ToastAndroid.SHORT);
        })
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 20
    },
    flexLayout: {
        flex: 1
    },
    headPic: {
        width: 45,
        height: 45,
        borderWidth: 1,
        borderRadius: 1024,
        borderColor: "#ffffff",
        marginRight: 10
    },
    rowDirection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    middle: {
        justifyContent: "space-evenly",
        marginTop: 16,
        marginBottom: 16
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    courseTitle: {
        marginTop: 10,
        minHeight: 35
    },
    textSmall: {
        fontSize: 12,
        marginTop: 4
    },
    coursePic: {
        height: 88
    },
    marginLeft5: {
        marginLeft: 5
    },
    marginRight5: {
        marginRight: 5
    },
    showBrand: {
        textAlign: "center",
        textAlignVertical: "center",
        paddingLeft: 6,
        paddingRight: 6,
        color: "#ffffff",
        backgroundColor: "#FD5F00",
        borderColor: "#FD5F00",
        borderWidth: 1,
        borderRadius: 4
    },
    cutline: {
        height: 0.5,
        backgroundColor: "#949494",
        marginTop: 16,
    },
    showAll: {
        color: "#FD5F00",
    },
    flexEnd: {
        alignItems: "flex-end"
    },
    arrowRight: {
        width: 8,
        height: 12,
        marginLeft: 4
    }

})