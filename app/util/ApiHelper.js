import { Platform, ToastAndroid } from "react-native";

const HOST_URL = "http://dev_cp.zzyzsw.com/api/"
//const HOST_URL = "http://cp.zzyzsw.com/api/"; //正式服

/**
 * 封装POST请求
 */
requestData = (url, prams, callBack) => {
    return fetch(HOST_URL + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(prams)
    }).then(res => res.json())
        .then(baseData => {
            if (baseData.code == 200) {
                if (baseData.data == undefined || baseData.data == null) {
                    callBack(baseData)
                } else {
                    callBack(baseData.data)
                }
            } else {
                callBack(null)
                ToastAndroid.show(baseData.msg, ToastAndroid.SHORT);
                
            }
        }, (error => {
            callBack(null)
            ToastAndroid.show('request error', ToastAndroid.SHORT);
        }))
        .catch(error =>{
           
        })

}


export default requestData