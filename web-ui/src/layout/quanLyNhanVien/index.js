import {
    Input,
    Modal,
    Button,
    DatePicker,
    Select,
    message,
    Popconfirm,
} from "antd";
import {
    DeleteOutlined,
    LockOutlined,
    UnlockOutlined,
} from "@ant-design/icons";
import axios from "axios";
import React, { Component, Fragment } from "react";
import { URL_API } from "../../constant";
const { Search } = Input;
const { Option } = Select;

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

export default class QuanLyNhanVien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nhanVien: [
                {
                    id: "",
                    Ten: "",
                    TenChucVu: "",
                    DienThoai: "",
                    NgayBatDau: "",
                    TinhTrang: "",
                },
            ],
            visible: false,
            confirmLoading: false,
            chucVu: [
                {
                    id: "",
                    TenChucVu: "",
                    HeSoLuong: "",
                },
            ],
            __HoTen: "",
            __SDT: "",
            __NgayBatDau: "",
            __ChucVu: "",
            __TenDangNhap: "",
            __MatKhau: "",
            __NhapLai: "",
        };
    }

    componentDidMount() {
        axios
            .get(URL_API + "/nhanvien")
            .then((response) => {
                this.setState({ nhanVien: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(URL_API + "/chucvu")
            .then((response) => {
                this.setState({ chucVu: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    showModal = () => {
        this.setState({ visible: true });
    };

    handleOk = () => {
        const {
            __ChucVu,
            __HoTen,
            __MatKhau,
            __NgayBatDau,
            __NhapLai,
            __SDT,
            __TenDangNhap,
        } = this.state;
        var today = new Date();
        const __idAccount =
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

        if (
            __ChucVu != "" ||
            __HoTen != "" ||
            __MatKhau != "" ||
            __NgayBatDau != "" ||
            __NhapLai != "" ||
            __SDT != "" ||
            __TenDangNhap != ""
        ) {
            if (__MatKhau == __NhapLai) {
                axios({
                    method: "post",
                    url: URL_API + "/account",
                    data: {
                        id: __idAccount,
                        username: __TenDangNhap,
                        password: __MatKhau,
                        accountName: "",
                        idQuyen: 1003,
                    },
                }).then((response) => {
                    axios({
                        method: "post",
                        url: URL_API + "/nhanvien",
                        data: {
                            idAccount: __idAccount,
                            Ten: __HoTen,
                            idChucVu: __ChucVu,
                            DienThoai: __SDT,
                            NgayBatDau: __NgayBatDau,
                            TinhTrang: 1,
                        },
                    }).then((response) => {
                        message.success("Th??m th??nh c??ng");
                        this.setState({ confirmLoading: true });
                        setTimeout(() => {
                            this.setState({
                                visible: false,
                                confirmLoading: false,
                            });
                            window.location.reload();
                        }, 2000);
                    });
                });
            } else {
                message.error("M???t Kh???u Kh??ng Tr??ng Kh???p");
            }
        } else {
            message.error("B???n C???n Nh???p ????? Th??ng Tin");
        }
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleChange = (value) => {
        this.setState({
            __ChucVu: value,
        });
    };
    onChangeHoTen = (e) => {
        this.setState({
            __HoTen: e.target.value,
        });
    };
    onChangeSDT = (e) => {
        this.setState({
            __SDT: e.target.value,
        });
    };
    onChangeNgayBatDau = (date, dateString) => {
        this.setState({
            __NgayBatDau: dateString,
        });
    };
    onChangeTenDangNhap = (e) => {
        this.setState({
            __TenDangNhap: e.target.value,
        });
    };
    onChangeMatKhau = (e) => {
        this.setState({
            __MatKhau: e.target.value,
        });
    };
    onChangeNhapLai = (e) => {
        this.setState({
            __NhapLai: e.target.value,
        });
    };

    onSearch = (value) => {};

    handleChangeStatus = (status, id) => {
        console.log(id)
        if (status != null || status != "") {
            if (status == 0) {
                axios({
                    method: "post",
                    url: URL_API + "/nhanvien/change-status",
                    data: {
                        id: id,
                        TinhTrang: 1,
                    },
                }).then((response) => {
                    message.success("S???a th??nh c??ng");
                    window.location.reload();
                });
            } else {
                axios({
                    method: "post",
                    url: URL_API + "/nhanvien/change-status",
                    data: {
                        id: id,
                        TinhTrang: 0,
                    },
                }).then((response) => {
                    message.success("S???a th??nh c??ng");
                    window.location.reload();
                });
            }
        }
    };

    render() {
        const { nhanVien, confirmLoading, visible, chucVu } = this.state;
        return (
            <Fragment>
                {/* UI HI???N TH??? DANH S??CH NH??N VI??N */}
                <div className="ql-nhan-vien">
                    <div className="ql-nhan-vien__header">
                        <div className="ql-nhan-vien__search">
                            <Search
                                placeholder="Nh???p t??? kh??a ????? t??m ki???m....."
                                allowClear
                                enterButton="T??m Ki???m"
                                size="middle"
                                onSearch={this.onSearch()}
                            />
                        </div>
                        <div
                            className="ql-nhan-vien__them-moi"
                            onClick={() => {
                                this.showModal();
                            }}
                        >
                            <span>Th??m M???i</span>
                        </div>
                    </div>
                    <div className="ql-nhan-vien__data">
                        <div className="ql-nhan-vien__table-head">
                            <div className="ql-nhan-vien__column1">#</div>
                            <div className="ql-nhan-vien__column2">H??? T??n</div>
                            <div className="ql-nhan-vien__column3">Ch???c V???</div>
                            <div className="ql-nhan-vien__column4">
                                ??i???n Tho???i
                            </div>
                            <div className="ql-nhan-vien__column5">
                                Ng??y B???t ?????u
                            </div>
                            <div className="ql-nhan-vien__column6">
                                T??nh Tr???ng
                            </div>
                            <div className="ql-nhan-vien__column7">
                                T??y Ch???nh
                            </div>
                        </div>
                        <div className="ql-nhan-vien__table-body">
                            {nhanVien.map((result, index) => {
                                return (
                                    <div
                                        className="ql-nhan-vien__table-item"
                                        key={index}
                                    >
                                        <div className="ql-nhan-vien__column1">
                                            {index + 1}
                                        </div>
                                        <div className="ql-nhan-vien__column2">
                                            {result.Ten}
                                        </div>
                                        <div className="ql-nhan-vien__column3">
                                            {result.TenChucVu}
                                        </div>
                                        <div className="ql-nhan-vien__column4">
                                            {result.DienThoai}
                                        </div>
                                        <div className="ql-nhan-vien__column5">
                                            {result.NgayBatDau}
                                        </div>
                                        <div className="ql-nhan-vien__column6">
                                            {result.TinhTrang == 1
                                                ? "??ang L??m"
                                                : "???? Ngh???"}
                                        </div>
                                        <div className="ql-nhan-vien__column7">
                                            {result.TinhTrang == 1 ? (
                                                <Popconfirm
                                                    placement="top"
                                                    title="B???n c?? ch???c mu???n kh??a"
                                                    onConfirm={() => {
                                                        this.handleChangeStatus(
                                                            result.TinhTrang,
                                                            result.id
                                                        );
                                                    }}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <div className="ql-nhan-vien__icon">
                                                        <LockOutlined />
                                                    </div>
                                                </Popconfirm>
                                            ) : (
                                                <Popconfirm
                                                    placement="top"
                                                    title="B???n c?? ch???c mu???n m??? kh??a"
                                                    onConfirm={() => {
                                                        this.handleChangeStatus(
                                                            result.TinhTrang,
                                                            result.id
                                                        );
                                                    }}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <div className="ql-nhan-vien__icon">
                                                        <UnlockOutlined />
                                                    </div>
                                                </Popconfirm>
                                            )}
                                            <Popconfirm
                                                placement="top"
                                                title="B???n c?? ch???c mu???n x??a"
                                                onConfirm={() => {
                                                    this.deleteCategory(
                                                        result.id
                                                    );
                                                }}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <div className="ql-nhan-vien__icon">
                                                    <DeleteOutlined />
                                                </div>
                                            </Popconfirm>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/* UI TH??M NH??N VI??N M???I */}
                <Modal
                    title="Th??m m???i nh??n vi??n"
                    visible={visible}
                    onOk={() => {
                        this.handleOk();
                    }}
                    confirmLoading={confirmLoading}
                    onCancel={() => {
                        this.handleCancel();
                    }}
                    className="ql-nhan-vien__add-form"
                >
                    <div className="ql-nhan-vien__form-input">
                        <span className="ql-nhan-vien__form-input__title">
                            H??? T??n Nh??n Vi??n
                        </span>
                        <Input
                            placeholder="Nh???p h??? & t??n nh??n vi??n"
                            onChange={this.onChangeHoTen}
                        />
                    </div>
                    <div className="ql-nhan-vien__form-input">
                        <span className="ql-nhan-vien__form-input__title">
                            S??? ??i???n Tho???i
                        </span>
                        <Input
                            placeholder="Nh???p s??? ??i???n tho???i nh??n vi??n"
                            onChange={this.onChangeSDT}
                        />
                    </div>
                    <div className="ql-nhan-vien__form-input">
                        <p className="ql-nhan-vien__form-input__title">
                            Ng??y B???t ?????u L??m
                        </p>
                        <DatePicker
                            format={dateFormatList}
                            placeholder="Ch???n ng??y"
                            style={{ width: "100%" }}
                            onChange={this.onChangeNgayBatDau}
                        />
                    </div>
                    <div className="ql-nhan-vien__form-input">
                        <p className="ql-nhan-vien__form-input__title">
                            Ch???c V???
                        </p>
                        <Select
                            placeholder="Ch???n ch???c v???"
                            style={{ width: "100%" }}
                            onChange={this.handleChange}
                        >
                            {chucVu.map((result, index) => {
                                return (
                                    <Option value={result.id} key={index}>
                                        {result.TenChucVu}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                    <div className="ql-nhan-vien__form-input">
                        <span className="ql-nhan-vien__form-input__title">
                            T??n ????ng Nh???p
                        </span>
                        <Input
                            placeholder="Nh???p t??n ????ng nh???p"
                            onChange={this.onChangeTenDangNhap}
                        />
                    </div>
                    <div className="ql-nhan-vien__form-input">
                        <span className="ql-nhan-vien__form-input__title">
                            M???t Kh???u
                        </span>
                        <Input
                            placeholder="Nh???p m???t kh???u"
                            onChange={this.onChangeMatKhau}
                        />
                    </div>
                    <div className="ql-nhan-vien__form-input">
                        <span className="ql-nhan-vien__form-input__title">
                            Nh???p L???i M???t Kh???u
                        </span>
                        <Input
                            placeholder="Nh???p l???i m???t kh???u"
                            onChange={this.onChangeNhapLai}
                        />
                    </div>
                </Modal>
            </Fragment>
        );
    }
}
