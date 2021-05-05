// eslint-disable-next-line
import React, { Component } from "react";
import { Input, message } from "antd";
import {
    UserOutlined,
    LockOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
} from "@ant-design/icons";

import history from "../../history";

import axios from "axios";

import waveUp from "../../image/wave.svg";
import waveDow from "../../image/wave-dow.svg";
import { URL_API } from "../../constant";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: [],
            username: "",
            password: "",
        };
    }

    onChangeUserName = (e) => {
        this.setState({
            username: e.target.value,
        });
    };

    onChangePassWord = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    handleVerifiAccout = () => {
        const { username, password } = this.state;

        if (username == "" || password == "") {
            message.error("Tài Khoản và Mật Khẩu Không Được Để Trống!!!!");
        } else {
            axios({
                method: "post",
                url: URL_API + "/account/verificationAccount/",
                data: {
                    username: username,
                    password: password,
                },
            }).then((response) => {
                if (response.data.length == 0) {
                    message.error(
                        "Thông Tin Đăng Nhập Sai. Vui Lòng Kiểm Tra Lại Thông Tin Đăng Nhập"
                    );
                } else {

                    localStorage.setItem("idAccount", response.data[0].id);
                    localStorage.setItem(
                        "accountType",
                        response.data[0].idQuyen
                    );
                    localStorage.setItem(
                        "displayName",
                        response.data[0].accountName
                    );
                    if (response.data[0].idQuyen == "1") {
                        history.push("/admin/quan-ly-nhan-vien");
                    } else {
                        // history.push("/muon-csvc");
                    }

                    window.location.reload();
                }
            });
        }
    };

    handleKeyDown = (e) => {
        if (e.key == "Enter") {
            this.handleVerifiAccout();
        }
    };

    render() {
        return (
            <div className="login">
                <div className="login-wave-dow">
                    <img src={waveDow} alt="" />
                </div>

                <div className="login-form">
                    <div className="login-title">LOGIN</div>
                    <div className="login-input">
                        <UserOutlined />
                        <Input
                            placeholder="Tên Đăng Nhập"
                            onChange={this.onChangeUserName}
                        />
                    </div>
                    <div className="login-input">
                        <LockOutlined />
                        <Input.Password
                            className="login-input-password"
                            placeholder="Password"
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeTwoTone />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            }
                            onChange={this.onChangePassWord}
                            onKeyDown={this.handleKeyDown}
                        />
                    </div>
                    <div
                        className="login-button-submit"
                        onClick={() => {
                            this.handleVerifiAccout();
                        }}
                    >
                        Đăng Nhập
                    </div>
                </div>
                <div className="login-wave-up">
                    <img src={waveUp} alt="" />
                </div>
            </div>
        );
    }
}
