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


export default class IndustryList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (<View>
            <SectionList
                sections={this.state.data}
                renderSectionHeader={this.renderSection}
                renderItem={this.renderItem}
                showsVerticalScrollIndicator={false}
            >
            </SectionList>
        </View>)
    }

    renderSection = ({ section }) => {
        return (<View>
            <Text style={styles.section}>{section.name}</Text>
        </View>)

    }

    renderItem = ({ item }) => {
        return (<View>
            <TouchableOpacity onPress={() => this.onItemPress(item)}>
                <Text style={styles.item}>{item.name}</Text>
            </TouchableOpacity>
        </View>)
    }

    onItemPress = (item) => {
        const { goBack } = this.props.navigation;
        global.industryCateid = item.id
        //上级页面刷新回调
        this.props.navigation.state.params.refreshing();
        goBack()
    }

    /**
     * 获取行业分类数据
     */
    getData = () => {

        let url = 'industry_cate/lists'
        return requestData(url, null, (data => {
            let tempArr = data.map((item, index) => {
                let tempObj = {}
                tempObj.id = item.id
                tempObj.pid = item.pid
                tempObj.name = item.name
                tempObj.data = item.son
                return tempObj
            })

            this.setState({
                data: tempArr
            })

        }))


    }
}

const styles = StyleSheet.create({

    section: {
        margin: 10,
        fontSize: 16,
        fontWeight: "bold"
    },
    item: {
        margin: 16,
        padding: 16,
        borderBottomStartRadius: 4,
        borderBottomEndRadius: 4,
        backgroundColor: "#F7F8F8",
        borderWidth: 1,
        borderColor: "#F7F8F8",
        borderWidth: 1
    }

})