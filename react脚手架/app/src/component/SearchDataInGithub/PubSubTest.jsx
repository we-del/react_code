/**
 @name : Test
 @date : 2022/4/12
 @description:
 */

import React, {Component} from "react";
import PubSub from "pubsub-js";

export default class PubSubTest extends Component {
    subscriber = () => {
        // 对test 端口进行监听，获取每一次得到的数据
        // subscribe由底层自动调用，第一个参数为监听的端口(变量形式)，第二个参数为一个函数，用来给底层调用将信息载入到该函数身上
        // _ 是一个占位符，表示该变量基本不被使用 (原变量为msg为监听的端口)
        PubSub.subscribe("test", (_, data) => { // _ 进行占位
            console.log(data);
            data("world");
        });
    }
    componentDidMount() {
        this.subscriber();
    }

    render() {
        return <h3>Pub</h3>;
    }
}