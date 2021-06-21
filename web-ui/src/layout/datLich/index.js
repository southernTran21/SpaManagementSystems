import { DatePicker, Input, Select, message } from "antd";
import React, { Component, Fragment } from "react";
import { URL_API } from "../../constant";
import axios from "axios";

const { Option } = Select;

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

export default class DatLich extends Component {
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
            dichVu: [
                {
                    id: "",
                    TenDichVu: "",
                    MoTa: "",
                    Gia: "",
                    status: "",
                },
            ],
            nhanVien: [
                {
                    id: "",
                    idAccount: "",
                    Ten: "",
                    idChucVu: "",
                    DienThoai: "",
                    NgayBatDau: "",
                    TinhTrang: "",
                },
            ],
            __service: "",
            __nhanVien: "",
            __ngayDieuTri: "",
            __khungGio: "",
            __noiDung: "",
            lichHen: [
                {
                    KhungGio: "",
                    NgayDieuTri: "",
                    NoiDung: "",
                    Status: "",
                    Ten: "",
                    TenDichVu: "",
                    id: "",
                },
            ],
        };
    }

    componentDidMount() {
        const idCusDatLich = localStorage.getItem("idCusDatLich");
        axios
            .get(URL_API + "/khachhang/" + idCusDatLich)
            .then((response) => {
                this.setState({ khachHang: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(URL_API + "/dichvu")
            .then((response) => {
                this.setState({ dichVu: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(URL_API + "/nhanvien/getnhanvienchamsoc")
            .then((response) => {
                this.setState({ nhanVien: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(URL_API + "/lichhen/"+localStorage.getItem("idCusDatLich"))
            .then((response) => {
                this.setState({ lichHen: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleShowInfoCus = () => {
        const { khachHang } = this.state;
        var gioiTinh = "";
        if (khachHang.length > 0) {
            if (khachHang[0].GioiTinh === 0) {
                gioiTinh = "Nam";
            } else if (khachHang[0].GioiTinh === 1) {
                gioiTinh = "Nữ";
            }
            return (
                <Fragment>
                    <div className="dat-lich__info__item">
                        <span>Họ Tên: </span>
                        <span>{khachHang[0].Ten}</span>
                    </div>
                    <div className="dat-lich__info__item">
                        <span>Số Điện Thoại: </span>
                        <span>{khachHang[0].DienThoai}</span>
                    </div>
                    <div className="dat-lich__info__item">
                        <span>Địa Chỉ: </span>
                        <span>{khachHang[0].DiaChi}</span>
                    </div>
                    <div className="dat-lich__info__item">
                        <span>Giới Tính: </span>
                        <span>{gioiTinh}</span>
                    </div>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <div className="dat-lich__info__item">
                        <span>Họ Tên: </span>
                        <span></span>
                    </div>
                    <div className="dat-lich__info__item">
                        <span>Số Điện Thoại: </span>
                        <span></span>
                    </div>
                    <div className="dat-lich__info__item">
                        <span>Địa Chỉ: </span>
                        <span></span>
                    </div>
                    <div className="dat-lich__info__item">
                        <span>Giới Tính: </span>
                        <span></span>
                    </div>
                </Fragment>
            );
        }
    };

    onChangeService = (value) => {
        console.log("dich vu: ", value);
        this.setState({
            __service: value,
        });
    };

    onChangeNhanVien = (value) => {
        console.log("nhan vien: ", value);
        this.setState({
            __nhanVien: value,
        });
    };

    onChangeNgayDieuTri = (date, dateString) => {
        this.setState({
            __ngayDieuTri: dateString,
        });
    };

    onChangeKhungGio = (value) => {
        this.setState({
            __khungGio: value,
        });
    };

    onChangeNoiDung = (e) => {
        console.log(e.target.value);
        this.setState({
            __noiDung: e.target.value,
        });
    };

    handleSubmit = () => {
        const {
            dichVu,
            nhanVien,
            __service,
            __nhanVien,
            __ngayDieuTri,
            __khungGio,
            __noiDung,
            lichHen,
        } = this.state;

        if (
            __service == "" ||
            __nhanVien == "" ||
            __ngayDieuTri == "" ||
            __khungGio == "" ||
            __noiDung == ""
        ) {
            message.warning("Vui Lòng Nhập Đủ Các Thông Tin");
        } else {
            var today = new Date();
            const __idLichHen =
                "LH" +
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
            axios({
                method: "post",
                url: URL_API + "/lichhen",
                data: {
                    id: __idLichHen,
                    idNhanVien: nhanVien[__nhanVien - 1].id,
                    idKhachHang: localStorage.getItem("idCusDatLich"),
                    NgayDieuTri: __ngayDieuTri,
                    KhungGio: __khungGio,
                    NoiDung: __noiDung,
                    idDichVu: dichVu[__service - 1].id,
                },
            }).then((response) => {
                message.success("Thêm Lịch Hẹn Thành Công");
                window.location.reload();
            });
        }
    };

    render() {
        const { dichVu, nhanVien, lichHen } = this.state;
        return (
            <div className="dat-lich">
                <div className="dat-lich__head">
                    <div className="dat-lich__info">
                        <p className="dat-lich__info__title">
                            Thông Tin Khách Hàng
                        </p>
                        {this.handleShowInfoCus()}
                    </div>
                    <div className="dat-lich__book">
                        <p className="dat-lich__info__title">Đặt Lịch Hẹn</p>
                        <div className="dat-lich__book__selection">
                            <div className="dat-lich__book__selection__item">
                                <span>Dịch Vụ</span>
                                <Select
                                    showSearch
                                    style={{ width: "90%" }}
                                    className="dat-lich__book__selection__item__select"
                                    placeholder="Chọn Dịch Vụ"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={this.onChangeService}
                                >
                                    {dichVu.map((result, index) => {
                                        return (
                                            <Option
                                                value={index + 1}
                                                key={index}
                                            >
                                                {result.TenDichVu}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </div>
                            <div className="dat-lich__book__selection__item">
                                <span>Nhân Viên Phụ Trách</span>
                                <Select
                                    showSearch
                                    style={{ width: "90%" }}
                                    className="dat-lich__book__selection__item__select"
                                    placeholder="Chọn Nhân Viên Chăm Sóc"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={this.onChangeNhanVien}
                                >
                                    {nhanVien.map((result, index) => {
                                        return (
                                            <Option
                                                value={index + 1}
                                                key={index}
                                            >
                                                {result.Ten}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </div>
                            <div className="dat-lich__book__selection__item">
                                <span>Ngày Điều Trị</span>
                                <DatePicker
                                    format={dateFormatList}
                                    style={{ width: "90%" }}
                                    placeholder="Chọn ngày"
                                    className="dat-lich__book__selection__item__select"
                                    onChange={this.onChangeNgayDieuTri}
                                />
                            </div>
                            <div className="dat-lich__book__selection__item">
                                <span>Chọn Khung Giờ</span>
                                <Select
                                    style={{ width: "100%" }}
                                    className="dat-lich__book__selection__item__select"
                                    placeholder="Chọn Khung Giờ"
                                    onChange={this.onChangeKhungGio}
                                >
                                    <Option value="7 - 9 AM">7 - 9 AM</Option>
                                    <Option value="9 - 11 AM">9 - 11 AM</Option>
                                    <Option value="1 - 3 PM">1 - 3 PM</Option>
                                    <Option value="3 - 5 PM">3 - 5 PM</Option>
                                    <Option value="5 - 7 PM">5 - 7 PM</Option>
                                </Select>
                            </div>
                        </div>
                        <div className="dat-lich__book__end">
                            <div className="dat-lich__book__conment">
                                <span>Nội Dung</span>
                                <Input
                                    placeholder="Nhập Nội Dung"
                                    onChange={this.onChangeNoiDung}
                                />
                            </div>
                            <div
                                className="dat-lich__book__button"
                                onClick={() => {
                                    this.handleSubmit();
                                }}
                            >
                                Xác Nhận
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dat-lich__manage">
                    <p className="dat-lich__manage__title">Quản Lý Lịch Hẹn</p>
                    <div className="khach-hang__data-lich-hen">
                        <div className="ql-my-pham__table-head">
                            <div className="khach-hang__data-lich-hen__column1">
                                #
                            </div>
                            <div className="khach-hang__data-lich-hen__column2">
                                Mã Lịch Hẹn
                            </div>
                            <div className="khach-hang__data-lich-hen__column3">
                                Người Phụ Trách
                            </div>
                            <div className="khach-hang__data-lich-hen__column4">
                                Dịch Vụ
                            </div>
                            <div className="khach-hang__data-lich-hen__column5">
                                Ngày Điều Trị
                            </div>
                            <div className="khach-hang__data-lich-hen__column6">
                                Khung Giờ
                            </div>
                            <div className="khach-hang__data-lich-hen__column7">
                                Nội Dung
                            </div>
                        </div>
                        <div className="ql-my-pham__table-body">
                            {lichHen.map((result, index) => {
                                return (
                                    <div
                                        className="ql-my-pham__data-loai__item"
                                        key={index}
                                    >
                                        <div className="khach-hang__data-lich-hen__column1">
                                            {index + 1}
                                        </div>
                                        <div className="khach-hang__data-lich-hen__column2">
                                            {result.id}
                                        </div>
                                        <div className="khach-hang__data-lich-hen__column3">
                                            {result.Ten}
                                        </div>
                                        <div className="khach-hang__data-lich-hen__column4">
                                            {result.TenDichVu}
                                        </div>
                                        <div className="khach-hang__data-lich-hen__column5">
                                            {result.NgayDieuTri}
                                        </div>
                                        <div className="khach-hang__data-lich-hen__column6">
                                            {result.KhungGio}
                                        </div>
                                        <div className="khach-hang__data-lich-hen__column7">
                                            {result.NoiDung}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
