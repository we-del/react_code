/**
 @name : GetDataInGithub
 @date : 2022/4/10
 @description:
 */

import React, {Component} from "react";
import axios from "axios";

export default class GetDataInGithub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responded: false
        }
    };

    /**
     * @property getResponseData 是一个属性指向的是一个函数
     * @description 此函数的结果回返回到虚拟dom中
     * */
    getResponseData = () => {
        let {error} = this.state;
        if (!error) {
            let {name, html_url} = this.state;
            return (
                <div>
                    前访问的最多的库是{name}
                    <a href={html_url}>点击进入</a>
                </div>
            );
        }
        return "数据请求失败";
    }

    componentDidMount() {
        // this.sendRequestByAxios();
        this.sendRequestByFetch();
    }

    /**
     * @property deepClone 是一个属性指向的是一个函数
     * @description 此函数用于深拷贝一个复杂数据类型
     * */
    deepClone = (obj) => {
        return JSON.parse(JSON.stringify(obj));
    }

    // 使用axios发出请求
    sendRequestByAxios = () => {
        axios({
            method: "get",
            // https://api.github.com/search/repositories?q=r&sort=stars
            url: "https://api.github.com/search/repositories",
            // 携带params参数，即查询参数，会以  ../repositories?q=r&sort=stars 方式携带
            params: {
                q: "v",
                sort: "stars"
            }
        }).then(value => {
                this.changeStateByAxios(value);
            },
            reason => {
                this.setState({error: true, responded: true});
            }
        );
    }

    // 使用fetch发出请求
    sendRequestByFetch = () => {
        let q = "v";
        let s = "stars";
        let url = `https://api.github.com/search/repositories?q=${q}&sort=${s}`;
        fetch(url) // 向url地址发送fetch请求(异步请求)，并返回一个 fulfill状态的promise实例

            // 得到该请求的结果，如果接收请求的地址不存在，则立刻抛出一个rejected状态的promise实例(其存储着错误信息)
            .then(response => {
                console.log(response);
                // 如果接收请求的地址存在则解析其结果并抛出一个 fulfill状态的promise实例(js底层会进行包装.且存储着响应结果)
                return response.json();
            })
            // 拿到该请求的结果。如果没有返回数据(未匹配到路由)则立刻抛出一个 rejected状态的promise实例(存储着错误信息)
            // 如果有返回数据，则继续执行该函数
            .then(data => {
                console.log(data);
                this.changeStateByFetch(data);

            })
            .catch((reason) => {
                console.log(reason);
                let {responded} = this.state;
                responded = true;
                this.setState({error: true, responded})
            });
    }

    // 获取数据改变状态(fetch)
    changeStateByFetch = (res) => {
        let {name, html_url} = res.items[0];
        let {responded} = this.state;
        responded = true;
        console.log("update state");
        this.setState({name, html_url, responded});
    }

    // 获得数据改变状态（axios）
    changeStateByAxios = (res) => {
        console.log(res);
        let {status, data} = res;
        // 成功则更新成功的状态，页面重新渲染
        //  this.state = this.deepClone(this.state);
        if (status === 200) {
            let {responded} = this.state;
            responded = true;
            let {name, html_url} = data.items[0];
            this.setState({name, html_url, responded});
            console.log(" this.setState()方法调用成功");
        }

    }

    render() {
        let {responded} = this.state;
        return (
            <div>
                <h1>{responded ? this.getResponseData() : "loading~~~"}</h1>
            </div>
        );

    }
}
