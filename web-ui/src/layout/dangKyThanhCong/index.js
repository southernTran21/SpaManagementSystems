import React, { Component } from "react";
import LogoSpa from "../../image/svg-logo.png";
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
                    <div className="dk-success__before" style={{backgroundImage: `url(${BgCard})`}}>
                        <div className="dk-success__">
                            <div className="dk-success__logo">
                                <img src={LogoSpa} alt="" />
                            </div>
                            <div className="dk-success__info">
                                <span className="dk-success__name">
                                    {cusName}
                                </span>
                                <div className="dk-success__date">
                                    {this.handleShowDate(ngayTao)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dk-success__after" style={{backgroundImage: `url(${BgCard})`}}></div>
                </div>
            </div>
        );
    }
}
