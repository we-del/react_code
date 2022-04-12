/**
 @name : SearchDataInGithub
 @date : 2022/4/11
 @description:
 */

import React, {Component} from "react";
import "./css/searchData.css";

export default class SearchDataInGithub extends Component {
    constructor(props) {
        super(props);
        // 设置可能用到的状态
        this.state = {
            responded: false,
            data: [],  // 复杂数据类型 在使用时需要进行深拷贝
            err: false,
            userInputted: false
        };
    }

    /**
     @description: 此函数当 状态为responded true时调用，返回state中 data的数据(以虚拟dom形式)
     @return: 根据请求来的数据返回虚拟dom
     */
    getData = () => {
        let {err} = this.state;
        // 过滤请求失败条件
        if (err) {
            return <h3>当前网络不稳定，请稍后再试</h3>;
        }

        let {data} = this.state;
        return (
            <div className="library-list">
                {
                    data.map(({html_url, id, name, avatar_url}) => {
                        return (
                            <div className="lib" key={id}>
                                <a href={html_url}>
                                    <img src={avatar_url} alt={name}/>
                                    <div className="user-name">{name}</div>
                                </a>
                            </div>
                        );
                    })
                }

            </div>
        );

    }

    /**
     @param obj 需要深拷贝的对象
     @description: 对传入的对象进行深拷贝
     @return: 返回一个 指定目标的深拷贝对象
     */
    deepClone = (obj) => {
        return JSON.parse(JSON.stringify(obj));
    }

    /**
     @param data 为fetch请求成功的数据
     @description: 用于更新 state中的data属性来进行 生命周期函数的更新操作
     */
    updateData = ({items}) => {
        let {data} = this.state;
        let {responded} = this.state;
        data = this.deepClone(data);
        let getDataLen = 20;
        for (let i = 0; i < getDataLen; i++) {
            let {html_url, id, name, owner} = items[i];
            let {avatar_url} = owner;
            data.push({html_url, id, name, avatar_url});
        }
        responded = true;
        this.setState({data, responded});
    }

    /**
     @description: 向github发出请求
     */
    sendRequestToGithub = () => {
        // 使用fetch发出请求
        let q = this.userSearch.value.trim();
        let mode = "stars";
        let url = `https://api.github.com/search/repositories?q=${q}&sort=${mode}`;
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.updateData(data);
                this.userSearch.value = "";
            })
            .catch(() => {
                let {responded, err} = this.state;
                responded = true;
                err = true;
                this.setState({responded, err});
            });

    }

    /**
     @description: 当发起请求时切换状态，并发出请求
     */
    startSearch = () => {
        if (this.userSearch.value.trim() === "") {
            alert("输入不能为空");
            return;
        }
        this.initState();
        this.sendRequestToGithub();
    }

    /**
     @description: 每次发起请求时重置状态里的数据
     */
    initState = () => {
        let {userInputted, responded, data} = this.state;
        userInputted = true;
        responded = false
        data = this.deepClone(data);
        data = [];
        this.setState({userInputted, responded, data});
    }

    /**
     @param e 当前环境变量
     @description:  用于判断是否按下指定按钮触发事件
     */
    pressSearch = (e) => {
        if (e.key === "Enter") {
            this.startSearch();
        }
    }

    render() {
        let {responded} = this.state;
        let {userInputted} = this.state;
        return (
            <div>
                <div className="title-region">
                    <h1 className="title">
                        Search Github Users
                    </h1>
                    <div className="search-region">
                        <input type="text" id="user-find"
                               ref={node => this.userSearch = node}
                               onKeyDown={this.pressSearch}
                        />
                        <button className="commit" onClick={this.startSearch}>search</button>
                    </div>
                </div>
                <div className="display-result-in-github">
                    {userInputted ? (responded ? this.getData() : <h3>数据加载中</h3>) : <h3>请输入数据</h3>}

                </div>
            </div>
        );
    }
}