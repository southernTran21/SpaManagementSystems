import { Input, Radio, message } from "antd";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { URL_API } from "../../constant";
import axios from "axios";
import history from "../../history";

export default class KhachHang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueInputInfoCus: "",
            typeInfo: 1,
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
            lichSu: [],
        };
    }

    componentDidMount() {
        axios
            .get(URL_API + "/lichhen/" + localStorage.getItem("idCusDatLich"))
            .then((response) => {
                this.setState({ lichHen: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(URL_API + "/khachhang/" + localStorage.getItem("idCusDatLich"))
            .then((response) => {
                this.setState({ khachHang: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(
                URL_API +
                    "/lichhen/getLichSuDieuTri/" +
                    localStorage.getItem("idCusDatLich")
            )
            .then((response) => {
                this.setState({ lichSu: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleClickConfirmIdCus = () => {
        const { valueInputInfoCus, typeInfo } = this.state;
        axios
            .get(URL_API + "/khachhang/" + valueInputInfoCus)
            .then((response) => {
                if (response.data.length > 0) {
                    localStorage.setItem("idCusDatLich", response.data[0].id);
                    this.setState({ khachHang: response.data });
                    window.location.reload();
                } else {
                    message.error(
                        "Thông Tin Khách Hàng Không Tồn Tại! Vui Lòng Kiểm Tra Lại"
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleChangeInputInfoCus = (e) => {
        this.setState({
            valueInputInfoCus: e.target.value,
        });
    };

    handleChangeType = (e) => {
        this.setState({
            typeInfo: e.target.value,
        });
    };

    handleShowData = () => {
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
                    <div className="khach-hang__show-info">
                        <span>Họ Tên: </span>
                        <span>{khachHang[0].Ten}</span>
                    </div>
                    <div className="khach-hang__show-info">
                        <span>Số Điện Thoại: </span>
                        <span>{khachHang[0].DienThoai}</span>
                    </div>
                    <div className="khach-hang__show-info">
                        <span>Địa Chỉ: </span>
                        <span>{khachHang[0].DiaChi}</span>
                    </div>
                    <div className="khach-hang__show-info">
                        <span>Giới Tính: </span>
                        <span>{gioiTinh}</span>
                    </div>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <div className="khach-hang__show-info">
                        <span>Họ Tên: </span>
                        <span></span>
                    </div>
                    <div className="khach-hang__show-info">
                        <span>Số Điện Thoại: </span>
                        <span></span>
                    </div>
                    <div className="khach-hang__show-info">
                        <span>Địa Chỉ: </span>
                        <span></span>
                    </div>
                    <div className="khach-hang__show-info">
                        <span>Giới Tính: </span>
                        <span></span>
                    </div>
                </Fragment>
            );
        }
    };

    handleNextPage = () => {
        const idCusDatLich = localStorage.getItem("idCusDatLich");
        if (
            idCusDatLich != undefined &&
            idCusDatLich != "" &&
            idCusDatLich.length > 0
        ) {
            history.push("/staff/dat-lich");
            window.location.reload();
        } else {
            message.error("Vui Lòng Nhập Thông Tin Khách Hàng!");
        }
    };

    handleCheckIn = (id) => {
        console.log(id);
        if (id.length > 0) {
            axios({
                method: "put",
                url: URL_API + "/lichhen/updatetrangthai",
                data: {
                    id: id,
                    Status: 1,
                },
            }).then((response) => {
                window.location.reload();
            });
        }
    };

    handleShowStatus = (status) => {
        console.log(status);
        switch (status) {
            case 1:
                return <span>Đang Điều Trị</span>;
                break;
            case 2:
                return <span>Điều Trị Xong</span>;
                break;
            case 3:
                return <span>Điều Trị Xong</span>;
                break;
            case 4:
                return <span>Hoàn Tất</span>;
                break;
            default:
                break;
        }
    };

    render() {
        const { khachHang, lichHen, lichSu } = this.state;
        return (
            <div className="khach-hang">
                <div className="khach-hang__head">
                    <div className="khach-hang__check-info">
                        <p className="khach-hang__check-info__title">
                            Mã Khách Hàng
                        </p>
                        <Input
                            placeholder="Nhập mã khách hàng hoặc số điện thoại..."
                            onChange={this.handleChangeInputInfoCus}
                        />
                        <div className="khach-hang__check-info__check-box">
                            <Radio.Group
                                value={this.state.typeInfo}
                                onChange={this.handleChangeType}
                            >
                                <Radio value={1}>Mã KH</Radio>
                                <Radio value={2}>SDT</Radio>
                            </Radio.Group>
                        </div>
                        <div
                            className="khach-hang__check-info__button"
                            onClick={() => {
                                this.handleClickConfirmIdCus();
                            }}
                        >
                            <span>Xác Nhận</span>
                        </div>
                    </div>
                    <div className="khach-hang__infomation">
                        <p className="khach-hang__check-info__title">
                            Thông Tin Khách Hàng
                        </p>
                        {this.handleShowData()}
                    </div>
                </div>
                <div className="khach-hang__lich-hen">
                    <p className="khach-hang__lich-hen__title">Lịch Hẹn</p>
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
                            <div className="khach-hang__data-lich-hen__column6">
                                Chức Năng
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
                                        <div className="khach-hang__data-lich-hen__column6">
                                            <div
                                                className="khach-hang__button-checkin"
                                                onClick={() => {
                                                    this.handleCheckIn(
                                                        result.id
                                                    );
                                                }}
                                            >
                                                Check - in
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div
                        className="khach-hang__lich-hen__button"
                        onClick={() => {
                            this.handleNextPage();
                        }}
                    >
                        Đặt Lịch
                    </div>
                </div>
                <div className="khach-hang__lich-hen">
                    <p className="khach-hang__lich-hen__title">
                        Lịch Sử Điều Trị
                    </p>
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
                            <div className="khach-hang__data-lich-hen__column6">
                                Trạng Thái
                            </div>
                        </div>
                        <div className="ql-my-pham__table-body">
                            {lichSu.map((result, index) => {
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
                                        <div className="khach-hang__data-lich-hen__column6">
                                            {this.handleShowStatus(
                                                result.Status
                                            )}
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
