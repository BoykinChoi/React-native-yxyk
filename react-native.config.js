//为了完成 react-native-gesture-handler在 Android 上的安装,新建此文件
//React Native >= 0.60 you need to disable autolinking for react-native-gesture-handler first
module.exports = {
    dependencies: {
        'react-native-gesture-handler': {
            platforms: {
                android: null,
                ios: null,
            },
        },
    },
};