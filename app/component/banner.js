import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    Animated
} from "react-native"
import { white } from "ansi-colors";

export default class Banner extends Component {

    constructor(props) {
        super(props)
        this.state = {
            images: [
                {
                    id: 0,
                    img: "http://photocdn.sohu.com/20120320/Img338346406.jpg"
                }
                // "http://photocdn.sohu.com/20120320/Img338346406.jpg",
                // "http://b-ssl.duitang.com/uploads/item/201703/30/20170330153834_K3uHf.jpeg",
                // "http://pic36.nipic.com/20131126/6842469_134415653150_2.jpg",
                // "http://b-ssl.duitang.com/uploads/blog/201311/22/20131122145546_2uWHQ.jpeg"
            ],
            currentIndex: 0,
            fadeInOpacity: new Animated.Value(0),

        }

    }

    //即将废弃
    // componentWillMount()
    // {

    // }

    componentDidMount() {
        // Animated.timing(                       // 随时间变化而执行动画
        //     this.state.fadeInOpacity,            // 动画中的变量值
        //     {
        //       toValue: 1,                        // 透明度最终变为1，即完全不透明
        //       duration: 10000,                   // 让动画持续一段时间
        //     }
        //   ).start();    
        this.getBannerData()

        var interval = setInterval(() => {
            let newIndex = 0
            if (this.state.currentIndex < this.state.images.length - 1) {
                newIndex = this.state.currentIndex + 1
            }
            this.setState({
                currentIndex: newIndex
            })

        }, 3000);

    }

    // componentWillUnmount()
    // {
    //     clearInterval(this.interval)
    // }

    render() {
        //ToastAndroid.show('fuck_done:' + this.state.currentIndex, ToastAndroid.SHORT);
        return (
            <View>
                 <Animated.Image style={styles.banner} source={{ uri: this.state.images[this.state.currentIndex].img }} resizeMode="cover"></Animated.Image>
                <View style={styles.indicatorBg}>
                    <Text style={styles.indicator}>{(this.state.currentIndex + 1) + "/" + this.state.images.length}</Text>
                </View>

                 {/* <ScrollView
                    horizontal={true}
                    pagingEnabled={true} //分页模式
                    showsVerticalScrollIndicator={false}>
                    {this.renderBannerItem()}
                </ScrollView>  */}

            </View>)

    }

    renderBannerItem = () => {
        return this.state.images.map((item, i) => {
            return (
                <View>
                    <Image style={styles.banner} source={{ uri: this.state.images[this.state.currentIndex].img }} resizeMode="cover"></Image>
                    <View style={styles.indicatorBg}>
                        <Text style={styles.indicator}>{(this.state.currentIndex + 1) + "/" + this.state.images.length}</Text>
                    </View>
                </View>
            )
        })

    }

    getBannerData = () => {
        let url = "http://dev_cp.zzyzsw.com/api/slide/lists";
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "cate_id=38",
        })
            .then(res => res.json())
            .then(resData => {
                this.setState({
                    images: resData.data,
                });
            })
    }

}

const styles = StyleSheet.create(
    {
        banner: {
            height: 140
        }
        , indicatorBg: {
            position: "absolute",
            bottom: 0,
            right: 0,
            //opacity: 0.5, //会影响子控件opacity.
            paddingLeft: 10,
            paddingRight: 10,
            height: 16,
            //backgroundColor: "#000000",
            backgroundColor: "rgba(178,178,178,0.5)" //使用此方式来设置背景透明

        },
        indicator: {
            fontSize: 12,
            color: "#ffffff",
        }
    }
)