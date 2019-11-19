import {
    createAppContainer,
    createStackNavigator,
    StackActions,
    NavigationActions,
} from "react-navigation";

import Login from "../component/login";
import CommentList from "../component/commentList";
import IndustryList from "../component/industryList";
import Home from "../page/home";
import CourseDetail from "../page/courseDetail";
import OfflineOrg from "../page/offlineOrg";
import SignIn from "../page/signin";
import Evaluation from "../page/evaluation";
import EvaluationList from "../page/evaluationList";
import EvaluationDesc from "../page/evaluationDesc";
import EvaluationReport from "../page/evaluationReport";
import OrgDetail from "../page/orgDetail";
import UserInfo from "../page/userInfo";

//createNavigator 需在 createAppContainer 前
const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: Home
        },
        Login: {
            screen: Login
        },
        CourseDetail: {
            screen: CourseDetail
        },
        UserInfo: {
            screen: UserInfo
        },
        CommentList: {
            screen: CommentList
        },
        IndustryList: {
            screen: IndustryList
        },
        SignIn: {
            screen: SignIn
        },
        EvaluationList: {
            screen: EvaluationList
        },
        Evaluation: {
            screen: Evaluation
        },
        OfflineOrg: {
            screen: OfflineOrg
        },
        EvaluationDesc: {
            screen: EvaluationDesc
        },
        EvaluationReport: {
            screen: EvaluationReport
        }, OrgDetail: {
            screen: OrgDetail,
            //headerMode: "none"
        }
    },
    //  {
    //   initialRouteName: 'Home'
    // }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer