import React, { Component } from "react";
import { Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import logoSpa from "../../image/logo-spa-12.jpg";
import waveUp from "../../image/wave.svg";
import waveDow from "../../image/wave-dow.svg";

export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="login-wave-dow">
                    <img src={waveDow} alt="" />
                </div>

                <div className="login-form">
                    {/* <div className="login-logo">
                        <img src={logoSpa} alt="" />
                    </div> */}
                    <div className="login-title">LOGIN</div>
                    <div className="login-input">
                        <UserOutlined />
                        <Input placeholder="Tên Đăng Nhập" />
                    </div>
                    <div className="login-input">
                        <LockOutlined />
                        <Input placeholder="Mật Khẩu" />
                    </div>
                    <div className="login-button-submit">Đăng Nhập</div>
                </div>
                <div className="login-wave-up">
                    <img src={waveUp} alt="" />
                </div>
            </div>
        );
    }
}
