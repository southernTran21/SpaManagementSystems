import React, { Component } from "react";
import { Input, DatePicker, Radio, message } from "antd";
import axios from "axios";
import { URL_API } from "../../constant";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

export default class DangKyThanhVien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            khachHang: [
                {
                    id: "",
                    Ten: "",
                    NgaySinh: "",
                    DienThoai: "",
                    GioiTinh: "",
                    DiaChi: "",
                    NgayTao: "",
                },
            ],
            __Ten: "",
            __NgaySinh: "",
            __DienThoai: "",
            __GioiTinh: "",
            __DiaChi: "",
        };
    }

    onChangeTen = (e) => {
        this.setState({
            __Ten: e.target.value,
        });
    };
    onChangeNgaySinh = (date, dateString) => {
        this.setState({
            __NgaySinh: dateString,
        });
    };
    onChangeDienThoai = (e) => {
        this.setState({
            __DienThoai: e.target.value,
        });
    };
    onChangeGioiTinh = (e) => {
        this.setState({
            __GioiTinh: e.target.value,
        });
    };
    onChangeDiaChi = (e) => {
        this.setState({
            __DiaChi: e.target.value,
        });
    };

    handleSubmitValue = () => {
        const {
            __DiaChi,
            __DienThoai,
            __GioiTinh,
            __NgaySinh,
            __Ten,
        } = this.state;
        var today = new Date();
        const id =
            "KH" +
            today.getFullYear() +
            "" +
            (today.getMonth() + 1) +
            "" +
            today.getDate() +
            "" +
            today.getHours() +
            "" +
            today.getMinutes() +
            "" +
            today.getSeconds();

        console.log(today.getMonth() + 1 + "/" + today.getFullYear())
        const __NgayTao = today.getMonth() + 1 + "/" + today.getFullYear();
        axios({
            method: "post",
            url: URL_API + "/khachhang",
            data: {
                id: id,
                Ten: __Ten,
                NgaySinh: __NgaySinh,
                DienThoai: __DienThoai,
                GioiTinh: __GioiTinh,
                DiaChi: __DiaChi,
                NgayTao: __NgayTao,
            },
        }).then((response) => {
            message.success("dang ky thanh cong");
            localStorage.setItem("cusId", id);
            localStorage.setItem("cusName", __Ten);
            localStorage.setItem("ngayTao", __NgayTao);
        });
    };

    render() {
        return (
            <div className="dk-thanh-vien">
                <span className="dk-thanh-vien__title">????NG K?? TH??NH VI??N</span>
                <div className="dk-thanh-vien__input">
                    <p className="dk-thanh-vien__input__title">
                        T??n Kh??ch H??ng:
                    </p>
                    <Input
                        placeholder="Nh???p T??n Kh??ch H??ng"
                        onChange={this.onChangeTen}
                    />
                </div>
                <div className="dk-thanh-vien__input">
                    <p className="dk-thanh-vien__input__title">Ng??y Sinh:</p>
                    <DatePicker
                        format={dateFormatList}
                        placeholder="Ch???n ng??y"
                        onChange={this.onChangeNgaySinh}
                    />
                </div>
                <div className="dk-thanh-vien__input">
                    <p className="dk-thanh-vien__input__title">
                        S??? ??i???n Tho???i:
                    </p>
                    <Input
                        placeholder="Nh???p S??? ??i???n Tho???i"
                        onChange={this.onChangeDienThoai}
                    />
                </div>
                <div className="dk-thanh-vien__input">
                    <p className="dk-thanh-vien__input__title">Gi???i T??nh:</p>
                    <Radio.Group onChange={this.onChangeGioiTinh}>
                        <Radio value={0}>Nam</Radio>
                        <Radio value={1}>N???</Radio>
                    </Radio.Group>
                </div>
                <div className="dk-thanh-vien__input">
                    <p className="dk-thanh-vien__input__title">?????a Ch???:</p>
                    <Input
                        placeholder="Nh???p ?????a Ch???"
                        onChange={this.onChangeDiaChi}
                    />
                </div>
                <div
                    className="dk-thanh-vien__button-submit"
                    onClick={() => {
                        this.handleSubmitValue();
                    }}
                >
                    X??c Nh???n
                </div>
            </div>
        );
    }
}
