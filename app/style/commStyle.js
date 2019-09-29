import { StyleSheet } from "react-native"
const colors = {
    MAIN_COLOR: 'white',
    MAIN_BLUE: '#496AF7',
    // LINE_GRAY_COLOR: '#E8E8E8',
    GRAY_COLOR: '#DADADA',
    ORANGE_COLOR: '#FD5F00',
    TEXT_GRAY_COLOR: '#79767C',
    TEXT_GRAY_COLOR2: '#CFCFCF',
    TEXT_COLOR: '#443046',
    TEXT_BLACK: '#333333',
    BACKGROUND_COLOR: '#F7F7F7',
    LIGHT_BLUE_COLOR: '#5CACEE',//浅蓝色
    LIGHT_GRAY_COLOR: '#cccccc44'//浅灰色
}

const commStyles = StyleSheet.create(
    {
        container: {
            padding: 20,
        },
        flexLayout: {
            flex: 1,
        },
        fontTitle: {
            fontSize: 17,
            color: colors.TEXT_BLACK
        },
        fontDesc: {
            fontSize: 14,
            color: colors.TEXT_GRAY_COLOR
        },
        fontSmall: {
            fontSize: 12,
            color: colors.TEXT_GRAY_COLOR
        },
        cutLine: {
            height: 1,
            marginTop: 16,
            marginBottom: 16,
            backgroundColor: colors.TEXT_GRAY_COLOR2
        },

    })

//样式
export { commStyles, colors }

