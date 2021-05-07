import React, { Component } from 'react'
import LogoSpa from "../../image/svg-logo.png";

export default class Error extends Component {
    render() {
        return (
            <div className="error">
                <div className="error__logo">
                    <img src={LogoSpa} alt=""/>
                </div>
                <span>Vui Lòng Đăng Nhập Để Sử Dụng Các Tính Năng Của Hệ Thống</span>
                <a href="../" className="error__button-back">Đăng Nhập</a>
            </div>
        )
    }
}
