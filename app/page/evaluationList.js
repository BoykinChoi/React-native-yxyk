import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    ToastAndroid,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import requestData from '../util/ApiHelper'

export default class EvaluationList extends Component {
    static navigationOptions = {
        title: "精选测评"
    }
    constructor(props) {
        super(props)
        this.state = {
            selectedId: -1,
            categorys: [],
            evaluations: [],
            loading: false
        }
    }

    componentDidMount() {
        this.getCategorys()
    }

    render() {
        return (
            <View style={[styles.flexLayout, styles.page]}>
                <View>
                    <FlatList
                        data={this.state.categorys}
                        renderItem={this.renderCateItem}
                        horizontal={true}
                        extraData={this.state}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id.toString()}>
                    </FlatList>
                </View>

                <View style={styles.flexLayout}>
                    {
                        this.state.loading ? (<ActivityIndicator size="small"></ActivityIndicator>) : (<FlatList
                            data={this.state.evaluations}
                            extraData={this.state}
                            renderItem={this.renderEvaluationItem}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id.toString()}>
                        </FlatList>)
                    }
                </View>
            </View>
        )
    }

    renderCateItem = ({ item }) => {
        return (<View>
            <TouchableOpacity onPress={() => {
                this.setState({
                    selectedId: item.id,
                })
                this.getEvaluationList(item.id)
            }}>
                <Text style={[styles.cateItem, this.state.selectedId == item.id ? styles.cateItemSelected : styles.cateItemNormal]}>{item.cate_name}</Text>
            </TouchableOpacity>
        </View>)
    }

    renderEvaluationItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("EvaluationDesc", {
                    id: item.id
                })
            }}>
                <View style={styles.eItemBg}>
                    <Image style={styles.eIcon} source={{ uri: item.list_img }}></Image>
                    <View style={styles.eItem}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.desc}>{item.des}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    getCategorys() {
        let url = 'mf_quest/cate',
            data = {
            }
        return requestData(url, data, (resData) => {
            let defaultId = resData[0].id
            this.setState({
                categorys: resData,
                selectedId: defaultId

            })
            this.getEvaluationList(defaultId)
        })
    }


    getEvaluationList(cid) {
        this.setState({
            loading: true,
        })
        let url = 'mf_quest/lists',
            data = {
                token: global.userToken,
                cate_id: cid,
                page: 1,
                size: 30

            }
        return requestData(url, data, (resData) => {
            this.setState({
                loading: false,
                evaluations: resData.lists
            })

        })
    }

}

const styles = StyleSheet.create(
    {
        page: {
            paddingLeft: 10,
            paddingRight: 10,
            color: "#F5F6F6"
        },

        flexLayout: {
            flex: 1,
            justifyContent: "center"
        },

        cateItem: {
            fontSize: 14,
            marginLeft: 10,
            marginRight: 16,
            marginBottom: 10,
            padding: 10,
            textAlign: "center",
            textAlignVertical: "center"

        },
        cateItemNormal: {
            color: "#666666",
            borderBottomWidth: 0
        },
        cateItemSelected: {
            fontWeight: "bold",
            fontSize: 18,
            color: "#FD5F00",
            borderTopWidth: 4,
            borderTopColor: "#FD5F00"
        },
        eItemBg: {
            flex: 1,
            flexDirection: "row",
            margin: 10,
            padding: 10,
            alignItems: "flex-start",
            backgroundColor: "#F7F8F8",
            borderWidth: 1,
            borderColor: "#F7F8F8",
            shadowColor: "#000000",
            shadowRadius: 3,
            borderRadius: 6
        },
        eItem: {
            marginLeft: 16,
            flex: 1,
            alignItems:"flex-start"
        },
        title: {
            fontSize: 17,
            marginBottom: 10
        },
        desc: {
            color: "#666666"
        },
        eIcon: {
            width: 125,
            height: 166,
        }

    }
)
