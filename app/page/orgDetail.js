import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    FlatList,
    ToastAndroid,
    TouchableOpacity,
} from "react-native";

import requestData from '../util/ApiHelper'
import commUtil from '../util/commUtil'

export default class OrgDetail extends Component {
    static navigationOptions = {
        //title: "我的"
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
            orgInfo: {},
            bgIndex: 0,
            teachers: [],
            classes: [],
            addresses: [],
            bgImg: ""
        }
    }

    componentDidMount() {
        this.getOrgData()
        setInterval(() => {
            let index = 0;
            if (this.state.bgIndex < this.state.orgInfo.brand_banner.length - 1) {
                index = this.state.bgIndex + 1
            }
            this.setState({
                bgIndex: index,
                bgImg: this.state.orgInfo.brand_banner[index].media_img
            })

        }, 3000);

    }

    render() {
        return (
            <ScrollView style={styles.page}>
                <View style={styles.header}>
                    <Image style={styles.banner} source={{ uri: this.state.bgImg }}></Image>
                    <View style={[styles.infoBg, styles.info]}>
                        <Image style={styles.logo} source={{ uri: this.state.orgInfo.brand_logo }}></Image>
                        <Text style={styles.orgname}>{this.state.orgInfo.brand_name}</Text>
                        <Text style={styles.orgtitle}>{this.state.orgInfo.brand_title}</Text>
                    </View>
                </View>

                <View style={styles.desc}>
                    <Text style={styles.title}>简介</Text>
                    <Text style={styles.descContent}>{this.state.orgInfo.brand_des}</Text>
                    <Text style={styles.title}>师资</Text>
                    <FlatList data={this.state.teachers}
                        renderItem={this.renderTeacherItem}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                    ></FlatList>
                    <Text style={styles.title}>班课</Text>
                    <FlatList data={this.state.classes}
                        renderItem={this.renderClassItem}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                    ></FlatList>
                    <Text style={styles.title}>校区</Text>
                    <FlatList data={this.state.addresses}
                        renderItem={this.renderAddressItem}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                    ></FlatList>
                </View>
            </ScrollView>
        )
    }

    renderTeacherItem({ item }) {
        return (<View style={styles.teacherItem}>
            <Image style={styles.teacherHeader} source={{ uri: item.img }}></Image>
            <View style={styles.teacherIntro}>
                <Text style={[styles.smallTitle, styles.titleWhite]} >{item.title}</Text>
                <Text style={[styles.samll, styles.titleWhite]}>{item.type_name}</Text>
                <Text style={[styles.samll, styles.titleWhite]}>{item.tag}</Text>
            </View>
        </View>)
    }

    renderClassItem({ item }) {
        return (<View style={styles.classItem}>
            <Image style={styles.classHeader} source={{ uri: item.img }}></Image>
            <Text style={styles.smallTitle} >{item.title}</Text>
            <Text style={styles.samll}>{item.type}</Text>
            <Text style={styles.samll}>{"报名人数:" + item.nums}</Text>
        </View>)
    }

    renderAddressItem({ item }) {
        return (<View>
            <Text style={styles.smallTitle} >{item.title}</Text>
            <Text style={styles.samll}>{item.address}</Text>
            <Text style={styles.samll}>{"联系电话:" + item.tel}</Text>
            <View style={styles.middleLine}></View>
        </View>)
    }

    getOrgData = () => {
        let orgId = this.props.navigation.getParam("orgId", "no_id")
        let url = 'brand/detail'
        let parms = {
            token: global.userToken,
            id: orgId,
            i_cate_id: global.industryCateid
        }
        return requestData(url, parms, (resData) => {
            resData.brand_des = commUtil.stripHtml(resData.brand_des)
            this.setState({
                orgInfo: resData,
                bgImg: resData.brand_banner[0].media_img,
                teachers: resData.teacher_list.lists,
                classes: resData.classes_list.lists,
                addresses: resData.campus_list.lists
            })

        })
    }
}

const styles = StyleSheet.create({
    page: {
        color: "#f2f4f5",
        flex: 1
    },
    header: {
        paddingBottom: 60
    },
    infoBg: {
        position: "absolute",
        top: 180,
        left: 20,
        right: 20,
        borderWidth: 1,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        borderRadius: 10,
    },
    flexLayout: {
        flex: 1
    },

    descContent: {
        paddingRight: 20
    },
    title: {
        fontSize: 20,
        paddingTop: 16,
        fontWeight: "bold",
        paddingBottom: 16
    },

    desc: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 30
    },
    info: {
        padding: 20,
        alignItems: "center"
    },
    banner: {
        height: 260
    },
    logo: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderRadius: 1024,
        borderColor: "#000000"
    },
    orgname: {
        fontSize: 16,
        fontWeight: "bold",
        margin: 10
    },
    orgtitle: {
        fontSize: 12,
        color: "#666666"
    },
    teacherItem: {
        marginRight: 10,
        width: 150,
        height: 190,
    },
    teacherHeader: {
        width: 150,
        height: 150,
    },
    teacherIntro: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 6,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    classItem: {
        marginRight: 10,
        width: 170,
        height: 210,
    },
    classHeader: {
        width: 170,
        height: 120,
    },
    smallTitle: {
        fontSize: 14,
        marginBottom: 6
    },
    samll: {
        fontSize: 12,
        color: "#666666"
    },
    titleWhite: {
        color: "#FFFFFF"
    },
    middle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: 50,
        backgroundColor: "#f2f4f5"
    },
    balance: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 10
    },
    middleLine: {
        height: 0.5,
        backgroundColor: "#a6a6a6",
        marginTop: 6,
        marginBottom: 6
    },
    items: {
        flex: 2,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    itemText: {
        fontSize: 16,
    }

})