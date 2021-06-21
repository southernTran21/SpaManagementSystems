import React, { Component } from "react";

import { Radio, Input, message } from "antd";
import { URL_API } from "../../constant";
import axios from "axios";

export default class ThanhToan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueSelection: 1,
            inputCus: "",
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
            lichHen: [],
            total: 0,
        };
    }

    onChangeOption = (e) => {
        this.setState({
            valueSelection: e.target.value,
        });
    };

    onChangeInputCus = (e) => {
        this.setState({
            inputCus: e.target.value,
        });
    };
    componentDidMount() {
        if (localStorage.getItem("idCusThanhToan") != null) {
            axios
                .get(
                    URL_API +
                        "/khachhang/" +
                        localStorage.getItem("idCusThanhToan")
                )
                .then((response) => {
                    this.setState({ khachHang: response.data });
                })
                .catch((error) => {
                    console.log(error);
                });
            axios
                .get(
                    URL_API +
                        "/lichhen/getdieutrixong/" +
                        localStorage.getItem("idCusThanhToan")
                )
                .then((response) => {
                    this.setState({ lichHen: response.data });
                });
        }
    }

    handleGetInfoCus = () => {
        const { inputCus } = this.state;
        if (inputCus == "") {
            message.error("Thông Tin Còn Trống");
        } else {
            axios
                .get(URL_API + "/khachhang/" + inputCus)
                .then((response) => {
                    if (response.data.length > 0) {
                        localStorage.setItem(
                            "idCusThanhToan",
                            response.data[0].id
                        );
                        this.setState({ khachHang: response.data });
                    } else {
                        this.setState({ khachHang: [] });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            axios
                .get(URL_API + "/lichhen/getdieutrixong/" + inputCus)
                .then((response) => {
                    this.setState({ lichHen: response.data });
                });
        }
    };

    handleShowInfoCus = () => {
        const { khachHang } = this.state;
        if (khachHang.length > 0 && khachHang[0].id !== "") {
            return (
                <div className="thanh-toan__thong-tin">
                    <div className="thanh-toan__thong-tin__item">
                        <span>Mã Khách Hàng:</span>
                        <span>{khachHang[0].id}</span>
                    </div>
                    <div className="thanh-toan__thong-tin__item">
                        <span>Họ Tên:</span>
                        <span>{khachHang[0].Ten}</span>
                    </div>
                    <div className="thanh-toan__thong-tin__item">
                        <span>Giới Tính:</span>
                        <span>{khachHang[0].GioiTinh == 0 ? "Nam" : "Nữ"}</span>
                    </div>
                    <div className="thanh-toan__thong-tin__item">
                        <span>Số Điện Thoại:</span>
                        <span>{khachHang[0].DienThoai}</span>
                    </div>
                    <div className="thanh-toan__thong-tin__item">
                        <span>Địa Chỉ:</span>
                        <span>{khachHang[0].DiaChi}</span>
                    </div>
                </div>
            );
        } else if (khachHang.length == 0) {
            return (
                <div className="thanh-toan__thong-tin thanh-toan__thong-tin--error">
                    Không tồn tại thông tin khách hàng
                </div>
            );
        }
    };

    handleShowPriceTotal = () => {
        const { lichHen } = this.state;
        let total = 0;
        if (lichHen.length > 0) {
            for (var i = 0; i < lichHen.length; i++) {
                total += lichHen[i].Gia;
            }
            return (
                <div className="thanh-toan__chi-tiet__total">
                    <span>Tổng Tiền:</span>
                    <span>{Number(total).toLocaleString("el-GR")} VNĐ</span>
                </div>
            );
        } else {
            return (
                <div className="thanh-toan__chi-tiet__total">
                    <span>Tổng Tiền:</span>
                    <span>0 VNĐ</span>
                </div>
            );
        }
    };

    handleSubmitHoaDon = () => {
        const { lichHen } = this.state;
        if (lichHen.length > 0) {
            var today = new Date();
            const __idHoaDon =
                "HD" +
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
            const __ngayLap =
                today.getDate() +
                "/" +
                (today.getMonth() + 1) +
                "/" +
                today.getFullYear();
            let total = 0;
            for (var i = 0; i < lichHen.length; i++) {
                total += lichHen[i].Gia;
            }

            axios({
                method: "post",
                url: URL_API + "/hoadondichvu",
                data: {
                    id: __idHoaDon,
                    idAccount: localStorage.getItem("idAccount"),
                    idKhachHang: localStorage.getItem("idCusThanhToan"),
                    NgayLap: __ngayLap,
                    SoLuong: lichHen.length,
                    TongTien: total,
                },
            }).then((response) => {
                lichHen.map((result, index) => {
                    axios
                        .post(URL_API + "/chitiethoadondichvu/add", {
                            idHoaDon: `${__idHoaDon}`,
                            idDichVu: `${result.idDichVu}`,
                            SoLuong: "1",
                        })
                        .then((res) => {
                            axios({
                                method: "put",
                                url: URL_API + "/lichhen/updatetrangthai",
                                data: {
                                    id: result.id,
                                    Status: "4",
                                },
                            }).then((response) => {});
                        })
                        .catch((error) => {
                            console.log(error.response);
                        });
                });
            });
            message.success("Thanh Toán Thành Công");
            localStorage.removeItem("idCusThanhToan");
            window.location.reload();
        }
    };

    render() {
        const { valueSelection, lichHen } = this.state;
        return (
            <div className="thanh-toan">
                <div className="thanh-toan__left">
                    <div className="thanh-toan__selection">
                        <div className="thanh-toan__khach-hang">
                            <p className="thanh-toan__khach-hang__title">
                                Thông Tin Khách Hàng
                            </p>
                            <div className="thanh-toan__khach-hang__box-input">
                                <Input
                                    placeholder="Nhập Thông Tin Khách Hàng"
                                    onChange={this.onChangeInputCus}
                                />
                                <div
                                    className="thanh-toan__khach-hang__button"
                                    onClick={() => {
                                        this.handleGetInfoCus();
                                    }}
                                >
                                    Xác Nhận
                                </div>
                            </div>
                            {this.handleShowInfoCus()}
                        </div>
                    </div>
                </div>
                <div className="thanh-toan__right">
                    <div className="thanh-toan__data">
                        <div className="thanh-toan__data__head">
                            <div className="thanh-toan__data__column1">#</div>
                            <div className="thanh-toan__data__column2">
                                Tên Dịch Vụ
                            </div>
                            <div className="thanh-toan__data__column3">
                                Ngày Điều Trị
                            </div>
                            <div className="thanh-toan__data__column4">
                                Nhân Viên Phụ Trách
                            </div>
                            <div className="thanh-toan__data__column5">
                                Thành Tiền
                            </div>
                        </div>
                        <div className="thanh-toan__data__body">
                            {lichHen.map((result, index) => {
                                return (
                                    <div
                                        className="thanh-toan__data__item"
                                        key={index}
                                    >
                                        <div className="thanh-toan__data__column1">
                                            {index + 1}
                                        </div>
                                        <div className="thanh-toan__data__column2">
                                            {result.TenDichVu}
                                        </div>
                                        <div className="thanh-toan__data__column3">
                                            {result.NgayDieuTri}
                                        </div>
                                        <div className="thanh-toan__data__column4">
                                            {result.Ten}
                                        </div>
                                        <div className="thanh-toan__data__column5">
                                            {Number(result.Gia).toLocaleString(
                                                "el-GR"
                                            )}{" "}
                                            VNĐ
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="thanh-toan__chi-tiet">
                        {this.handleShowPriceTotal()}
                    </div>
                    <div
                        className="thanh-toan__button"
                        onClick={() => {
                            this.handleSubmitHoaDon();
                        }}
                    >
                        <span>Xác Nhận</span>
                    </div>
                </div>
            </div>
        );
    }
}
