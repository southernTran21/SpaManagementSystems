import React, { Component } from "react";
import Barcode from "react-barcode";
import LogoSpa from "../../image/LogoFull.svg";
import BgCard from "../../image/BgCard.jpg";

export default class DangKyThanhCong extends Component {
    handleShowDate = (date) => {
        console.log(date);
        const dateSplit = date.split("/");
        console.log(dateSplit);
        if (dateSplit[0].length == 1) {
            return "0" + dateSplit[0] + " / " + dateSplit[1];
        }
        return dateSplit[0] + " / " + dateSplit[1];
    };

    render() {
        const cusId = localStorage.getItem("cusId");
        const cusName = localStorage.getItem("cusName");
        const ngayTao = localStorage.getItem("ngayTao");
        return (
            <div className="dk-success">
                <div className="dk-success__card">
                    <div
                        className="dk-success__before"
                        style={{ backgroundImage: `url(${BgCard})` }}
                    >
                        <div className="dk-success__">
                            <div className="dk-success__logo">
                                <img src={LogoSpa} alt="" />
                            </div>
                        </div>
                    </div>
                    <div
                        className="dk-success__after"
                        style={{ backgroundImage: `url(${BgCard})` }}
                    >
                        <div className="dk-success__barcode">
                                <Barcode value={cusId}/>
                            </div>
                        <div className="dk-success__info">
                            
                            <span className="dk-success__name">{cusName}</span>
                            <div className="dk-success__date">
                                {this.handleShowDate(ngayTao)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dk-success__feature">
                    <span className="dk-success__text">Đã Đăng Ký Thành Công</span>
                    <div className="dk-success__button--wrapper">
                        <div className="dk-success__button dk-success__button--home">Trở Về <br/> Trang Chủ</div>
                        <div className="dk-success__button dk-success__button--next">Đặt Lịch</div>
                    </div>
                </div>
            </div>
        );
    }
}
