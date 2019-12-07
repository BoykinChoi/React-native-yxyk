import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    StatusBar,
    ActivityIndicator,
    ToastAndroid,
    TouchableOpacity,
    Button
} from "react-native";

import Banner from '../component/banner'
import SignInPanel from '../component/signinPanel'

import requestData from '../util/ApiHelper'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseData: [],
            industryCateid: global.industryCateid,
            loading: true
        }
        //如果使用ES6编码 且 自定义方法里面需要使用到this .这时需要绑定this,否则报错(或使用箭头函数)
        this.getData = this.getData.bind(this); //自定义 函数绑定this
    }

    /**
     * 单页面设置navigationOptions中,进行Static中调用方法, like this：
     */
    static navigationOptions = ({ navigation }) => ({
        title: "云学优课",
        headerLeft: (
            <TouchableOpacity onPress={() => {
                navigation.state.params.cateSelectPress()
            }}>
                <Image
                    style={{ width: 23, height: 18, marginLeft: 15 }}
                    source={require("../images/search.png")}></Image>
            </TouchableOpacity>
        )
        ,
        headerRight: (
            <TouchableOpacity onPress={() => {
                //需这样
                navigation.state.params.userInfoPress()
            }}>
                <Image
                    style={{ width: 18, height: 20, marginRight: 15 }}
                    source={require("../images/tab_me.png")}></Image>
            </TouchableOpacity>
        ),
        //去除Navigation Bar黑线和阴影
        headerStyle: {
            borderBottomWidth: 0,
            elevation: 0,
            //paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
        },
    });


    //组件渲染后调用
    componentDidMount() {
        this.getData()
        this.login()
        //在static中使用this方法
        this.props.navigation.setParams({ cateSelectPress: this.cateSelectPress })
        this.props.navigation.setParams({ userInfoPress: this.onUserPress })
    }

    render() {
        var spinder = this.state.loading ? (
            <ActivityIndicator size="large" />
        ) : (
                <View>
                    <StatusBar barStyle={"dark-content"}
                        networkActivityIndicatorVisible={true}
                        showHideTransition={'fade'}
                        backgroundColor={"#ffffff"}
                        animated={true}
                    />
                    {
                        this.state.courseData.length > 0 ? (<FlatList
                            style={styles.listContent}
                            data={this.state.courseData}
                            renderItem={this.renderCourse}
                            onRefresh={() => { this.getData() }}
                            refreshing={this.state.loading}
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={<HomeHeader
                                //  onMenuClick={(id) => this.onMenuPress(id)}
                                navigation={this.props.navigation}
                            />}
                            keyExtractor={item => item.id.toString()}
                        ></FlatList>) : (<Text>暂无数据</Text>)
                    }

                </View>
            )
        //ToastAndroid.show('fuck_done', ToastAndroid.SHORT);
        return (
            <View style={styles.page}>
                {spinder}
                {/*  <Text>{this.state.courseData[0].title}</Text>
                <Text>{this.state.courseData[0].price}</Text>*/}
            </View>
        )
    }

    cateSelectPress = () => {
        //ToastAndroid.show('cateSelectPress', ToastAndroid.SHORT);
        //    storage.load({
        //         key: 'userInfo'
        //     }).then((resData) => ToastAndroid.show(resData.token, ToastAndroid.SHORT))

        this.props.navigation.navigate("IndustryList", {
            //打开页面返回后回调
            refreshing: () => {
                this.setState({
                    loading: true
                })
                this.getData()
            }
        });
    }

    onUserPress = () => {
        //ToastAndroid.show('gan', ToastAndroid.SHORT);
        if (global.userToken != "") {
            this.props.navigation.navigate("UserInfo");
        } else {
            this.props.navigation.navigate("Login");
        }
    }

    renderCourse = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("CourseDetail", {
                    //传送参数 id
                    courseId: item.id,
                });
            }}>
                <View>
                    <Image source={{ uri: item.img }} style={styles.thumbnail} />
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.itemBottom}>
                        <Text style={{ fontSize: 12 }}>{"学习人数:" + item.learn_num}</Text>
                        <Text style={{ color: "#FD5F00" }}>{"￥" + item.price}</Text>
                    </View>
                    <View style={styles.itemLine} />
                </View>
            </TouchableOpacity>
        )
    }


    getData() {
        let url = "course/top";
        let parms = {
            i_cate_id: global.industryCateid
        }
        return requestData(url, parms, (data) => {
            this.setState({
                courseData: data,
                loading: false
            })

        })
        // return fetch(url, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded",
        //     },
        //     body: "i_cate_id=38",
        // })
        //     .then(res => res.json())
        //     .then(resData => {
        //         this.setState({
        //             courseData: resData.data,
        //             loading: false
        //         });
        //         //this.console(resData)
        //     }, (error => {
        //         ToastAndroid.show('error', ToastAndroid.SHORT);
        //         this.setState({
        //             loading: false
        //         });
        //     })
        //     )

    }

    login = () => {
        let url = "login/index";
        let parms = {
            user_name: "18302015102",
            password: "888888"
        }
        return requestData(url, parms, (data) => {
            // this.setState({
            //     token: data.token,
            // })

            //token设置为全局变量
            global.userToken = data.token

            // 使用key来保存数据（key-only）。这些数据一般是全局独有的，需要谨慎单独处理的数据
            // 批量数据请使用key和id来保存(key-id)，具体请往后看
            // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
            storage.save({
                key: 'userInfo', // 注意:请不要在key中使用_下划线符号!
                data: {
                    mobile: data.mobile,
                    token: data.token,
                },

                // 如果不指定过期时间，则会使用defaultExpires参数
                // 如果设为null，则永不过期
                //expires: 1000 * 3600,
            });


        })
    }


}

class HomeHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menus: [],
            mymenus: [
                { id: "1", icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567403329035&di=ad1381102aa7c9506047f5ed61f53046&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F18%2F01%2F01%2F31a54037d5dac15c189e5914ca3e7858.jpg%2521%2Ffwfh%2F804x807%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue', title: "精品课程" },
                { id: "2", icon: '../images/data_center.png', title: "资料中心" },
                { id: "3", icon: '../images/exam.png', title: "考点练习" },
                { id: "4", icon: '../images/find.png', title: "随时发现" },
            ]
        }
        //this.onItemPress = this.onItemPress.bind(this); //自定义 函数绑定this
    }

    componentDidMount() {
        this.getMenuData()
    }

    //签到块点击，通过props和子组件通信
    onSignInPlnePress = () => {
        this.props.navigation.navigate("SignIn")
    }

    //测评块点击，通过props和子组件通信
    onTestPlnePress = () => {
        this.props.navigation.navigate("EvaluationList")
    }

    render() {
        return (
            <View>
                <Banner />
                <FlatList style={styles.menuLayout}
                    data={this.state.menus}
                    renderItem={this.renderMenu}
                    numColumns={4}
                    keyExtractor={item => item.id.toString()}
                />
                {/* HomeHeader 子组件里 onSignInPlneClick 通过 HomeHeader的props 调用HomeHeader的父组件Home 里的onSignInPlneClick */}
                <SignInPanel
                    onSignInPlneClick={this.onSignInPlnePress}
                    onTestPlneClick={this.onTestPlnePress}></SignInPanel>
                <View style={styles.recommend}>
                    <Text style={styles.recommendText}>精选课程推荐</Text>
                    <View style={styles.more}>
                        <Text style={styles.more}>更多</Text>
                        <Image style={{ width: 8, height: 12 }} source={require("../images/arrow_right_small.png")}></Image>
                    </View>
                </View>
            </View>
        )
    }

    renderMenu = ({ item }) => {
        return (
            <View style={styles.menuItem}>
                <TouchableOpacity onPress={() => {
                    if (item.id == 23) {
                        this.props.navigation.navigate("OfflineOrg")
                    }
                }}>
                    <View style={styles.menuItem}>
                        <Image style={styles.menuImg} source={{ uri: item.icon }}></Image>
                        {/* <Image style={styles.menuImg} source={require(item.icon)}></Image> */}
                        <Text style={styles.menuText}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            </View >

        )
    }

    getMenuData = () => {
        let url = "http://dev_cp.zzyzsw.com/api/app_menu/top_center_list";
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "i_cate_id=38",
        })
            .then(res => res.json())
            .then(resData => {
                resData.data[3].title = "品牌机构"
                this.setState({
                    menus: resData.data,
                });
            })
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    listContent: {
        paddingLeft: 15,
        paddingRight: 15
    },
    itemLine: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#CFCFCF",
        height: 1
    },
    item: {
        width: 200,
        padding: 4
    },
    title: {
        fontSize: 17
    },
    thumbnail: {
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#e2e2e2",
        borderRadius: 6,
        height: 160
    },
    itemBottom: {
        marginTop: 6,
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row"
    }
    , menuLayout: {
        paddingTop: 10,
        height: 110,
    }
    , menuItem: {
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: 100,
    }
    , menuText: {
        fontSize: 13,
        color: "#333333"
    }
    , menuImg: {
        marginBottom: 10,
        width: 50,
        height: 50
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
});

