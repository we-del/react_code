/**
 * @description: 此js文件用于汇总所有需要用到的组件
 * */
import React, {Component} from "react";
//import GetDataInGithub from "./component/getDataInGithub/GetDataInGithub";
import SearchDataInGithub from "./component/SearchDataInGithub/SearchDataInGithub";
import PubSubTest from "./component/SearchDataInGithub/PubSubTest";
export default class App extends Component {
    render() {
        return (
            <div className="App">
                {/*<Comment/>*/}
                {/*<GetDataInGithub/>*/}
                <PubSubTest/>
                <SearchDataInGithub/>
            </div>

        );
    }
}
