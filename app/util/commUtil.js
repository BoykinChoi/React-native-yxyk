
/**
 * html字符串过滤html标签
 * @param {*} htmlStr 
 */
stripHtml = (htmlStr) => {
    return htmlStr.replace(/<[\/\!]*[^<>]*>/ig, "")

}

export default { stripHtml }