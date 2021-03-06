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
                        "Th??ng Tin Kh??ch H??ng Kh??ng T???n T???i! Vui L??ng Ki???m Tra L???i"
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
                gioiTinh = "N???";
            }
            return (
                <Fragment>
                    <div className="khach-hang__show-info">
                        <span>H??? T??n: </span>
                        <span>{khachHang[0].Ten}</span>
                    </div>
                    <div className="khach-hang__show-info">
                        <span>S??? ??i???n Tho???i: </span>
                        <span>{khachHang[0].DienThoai}</span>
                    </div>
                    <div className="khach-hang__show-info">
                        <span>?????a Ch???: </span>
                        <span>{khachHang[0].DiaChi}</span>
                    </div>
                    <div className="khach-hang__show-info">
                        <span>Gi???i T??nh: </span>
                        <span>{gioiTinh}</span>
                    </div>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <div className="khach-hang__show-info">
                        <span>H??? T??n: </span>
                        <span></span>
                    </div>
                    <div className="khach-hang__show-info">
                        <span>S??? ??i???n Tho???i: </span>
                        <span></span>
                    </div>
                    <div className="khach-hang__show-info">
                        <span>?????a Ch???: </span>
                        <span></span>
                    </div>
                    <div className="khach-hang__show-info">
                        <span>Gi???i T??nh: </span>
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
            message.error("Vui L??ng Nh???p Th??ng Tin Kh??ch H??ng!");
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
                return <span>??ang ??i???u Tr???</span>;
                break;
            case 2:
                return <span>??i???u Tr??? Xong</span>;
                break;
            case 3:
                return <span>??i???u Tr??? Xong</span>;
                break;
            case 4:
                return <span>Ho??n T???t</span>;
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
                            M?? Kh??ch H??ng
                        </p>
                        <Input
                            placeholder="Nh???p m?? kh??ch h??ng ho???c s??? ??i???n tho???i..."
                            onChange={this.handleChangeInputInfoCus}
                        />
                        <div className="khach-hang__check-info__check-box">
                            <Radio.Group
                                value={this.state.typeInfo}
                                onChange={this.handleChangeType}
                            >
                                <Radio value={1}>M?? KH</Radio>
                                <Radio value={2}>SDT</Radio>
                            </Radio.Group>
                        </div>
                        <div
                            className="khach-hang__check-info__button"
                            onClick={() => {
                                this.handleClickConfirmIdCus();
                            }}
                        >
                            <span>X??c Nh???n</span>
                        </div>
                    </div>
                    <div className="khach-hang__infomation">
                        <p className="khach-hang__check-info__title">
                            Th??ng Tin Kh??ch H??ng
                        </p>
                        {this.handleShowData()}
                    </div>
                </div>
                <div className="khach-hang__lich-hen">
                    <p className="khach-hang__lich-hen__title">L???ch H???n</p>
                    <div className="khach-hang__data-lich-hen">
                        <div className="ql-my-pham__table-head">
                            <div className="khach-hang__data-lich-hen__column1">
                                #
                            </div>
                            <div className="khach-hang__data-lich-hen__column2">
                                M?? L???ch H???n
                            </div>
                            <div className="khach-hang__data-lich-hen__column3">
                                Ng?????i Ph??? Tr??ch
                            </div>
                            <div className="khach-hang__data-lich-hen__column4">
                                D???ch V???
                            </div>
                            <div className="khach-hang__data-lich-hen__column5">
                                Ng??y ??i???u Tr???
                            </div>
                            <div className="khach-hang__data-lich-hen__column6">
                                Khung Gi???
                            </div>
                            <div className="khach-hang__data-lich-hen__column7">
                                N???i Dung
                            </div>
                            <div className="khach-hang__data-lich-hen__column6">
                                Ch???c N??ng
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
                        ?????t L???ch
                    </div>
                </div>
                <div className="khach-hang__lich-hen">
                    <p className="khach-hang__lich-hen__title">
                        L???ch S??? ??i???u Tr???
                    </p>
                    <div className="khach-hang__data-lich-hen">
                        <div className="ql-my-pham__table-head">
                            <div className="khach-hang__data-lich-hen__column1">
                                #
                            </div>
                            <div className="khach-hang__data-lich-hen__column2">
                                M?? L???ch H???n
                            </div>
                            <div className="khach-hang__data-lich-hen__column3">
                                Ng?????i Ph??? Tr??ch
                            </div>
                            <div className="khach-hang__data-lich-hen__column4">
                                D???ch V???
                            </div>
                            <div className="khach-hang__data-lich-hen__column5">
                                Ng??y ??i???u Tr???
                            </div>
                            <div className="khach-hang__data-lich-hen__column6">
                                Khung Gi???
                            </div>
                            <div className="khach-hang__data-lich-hen__column7">
                                N???i Dung
                            </div>
                            <div className="khach-hang__data-lich-hen__column6">
                                Tr???ng Th??i
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
