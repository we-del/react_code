import React, {Component} from "react";
// 使用uuid来当作唯一的key值，在添加数据的时候赋予其一个独一无二的key
import {v4 as uuidv4} from "uuid";
import "./css/comment.css";

export default class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commentList: [{
                user: "张三",
                uuid: uuidv4(),
                msg: "react和java简直不要太像~~",

            }]
        };
    }

    componentDidMount() {
        console.log(this);
        console.log(uuidv4());
    }

    // 点击提交时 向状态里添加数据导致 该组件时实例更新状态，从而更新页面
    commitUserInput = () => {
        let userValue = this.user.value.trim();
        let userContent = this.userContent.value.trim();
        if (userValue !== "" && userContent !== "") {
            let {commentList} = this.state;
            commentList = this.deepClone(commentList);
            commentList.unshift({
                user: userValue,
                uuid: uuidv4(),
                msg: userContent
            });
            this.setState({commentList});
            this.user.value = "";
            this.userContent.value = "";

            return;
        }
        alert("输入不能为空");
    }

    // 深拷贝
    deepClone = (obj) => {
        return JSON.parse(JSON.stringify(obj));
    }
    // 从state中删除对应状态的数据
    removeUserContent = (uuid) => {
        let {commentList} = this.state;
        commentList = this.deepClone(commentList);
        commentList.forEach((obj, index) => {
            if (obj.uuid === uuid) {
                commentList.splice(index, 1);
            }
        });
        this.setState({commentList});
    }

    render() {
        return (
            <div className="comment-part">
                <h1 className="comment-title">请发表对你的看法</h1>
                <div className="comment-flex-box">
                    <div className="input-region">
                        <div className="comment-user-input">
                            <div><b>用户名</b></div>
                            <input
                                className="comment-user-content"
                                placeholder={"用户名"}
                                ref={input => this.user = input}
                            />
                        </div>
                        <div className="comment-content-input">
                            <div><b>评论内容</b></div>
                            <textarea
                                className="comment-content"
                                placeholder="请输入内容"
                                ref={textarea => this.userContent = textarea}
                            />

                        </div>
                        <button id="commit" onClick={this.commitUserInput}>提交</button>
                    </div>
                    <div className="comment-region">
                        <p className="comment-region-title">评论回复：</p>
                        <ul className={"comment-list"}>
                            {
                                this.state.commentList.map(({user, msg, uuid}) => {
                                    return (
                                        <li key={uuid}>
                                            <button
                                                className="remove-this"
                                                onClick={(e) => this.removeUserContent(uuid, e)}
                                            >
                                                删除
                                            </button>
                                            <p className="user">
                                                {user}评论：
                                            </p>
                                            <p className="user-content">
                                                {msg}
                                            </p>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}