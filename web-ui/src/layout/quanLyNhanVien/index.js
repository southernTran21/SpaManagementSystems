import { Input, Modal, Button, DatePicker, Select, message, Popconfirm } from "antd";
import {
    DeleteOutlined
} from "@ant-design/icons";
import axios from "axios";
import React, { Component, Fragment } from "react";
import { URL_API } from "../../constant";
const { Search } = Input;
const { Option } = Select;

const onSearch = (value) => console.log(value);
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

        console.log(__idAccount);
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
                    message.success("Thêm thành công");
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

    render() {
        const { nhanVien, confirmLoading, visible, chucVu } = this.state;
        return (
            <Fragment>
                {/* UI HIỂN THỊ DANH SÁCH NHÂN VIÊN */}
                <div className="ql-nhan-vien">
                    <div className="ql-nhan-vien__header">
                        <div className="ql-nhan-vien__search">
                            <Search
                                placeholder="Nhập từ khóa để tìm kiếm....."
                                allowClear
                                enterButton="Tìm Kiếm"
                                size="middle"
                                onSearch={onSearch}
                            />
                        </div>
                        <div
                            className="ql-nhan-vien__them-moi"
                            onClick={() => {
                                this.showModal();
                            }}
                        >
                            <span>Thêm Mới</span>
                        </div>
                    </div>
                    <div className="ql-nhan-vien__data">
                        <div className="ql-nhan-vien__table-head">
                            <div className="ql-nhan-vien__column1">#</div>
                            <div className="ql-nhan-vien__column2">Họ Tên</div>
                            <div className="ql-nhan-vien__column3">Chức Vụ</div>
                            <div className="ql-nhan-vien__column4">
                                Điện Thoại
                            </div>
                            <div className="ql-nhan-vien__column5">
                                Ngày Bắt Đầu
                            </div>
                            <div className="ql-nhan-vien__column6">
                                Tình Trạng
                            </div>
                            <div className="ql-nhan-vien__column7">
                                Tùy Chỉnh
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
                                                ? "Đang Làm"
                                                : "Đã Nghỉ"}
                                        </div>
                                        <div className="ql-nhan-vien__column7">
                                            <Popconfirm
                                                placement="top"
                                                title="Bạn có chắc muốn xóa"
                                                onConfirm={() => {
                                                    this.deleteCategory(
                                                        result.id
                                                    );
                                                }}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <div className="iconDelete">
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
                {/* UI THÊM NHÂN VIÊN MỚI */}
                <Modal
                    title="Thêm mới nhân viên"
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
                            Họ Tên Nhân Viên
                        </span>
                        <Input
                            placeholder="Nhập họ & tên nhân viên"
                            onChange={this.onChangeHoTen}
                        />
                    </div>
                    <div className="ql-nhan-vien__form-input">
                        <span className="ql-nhan-vien__form-input__title">
                            Số Điện Thoại
                        </span>
                        <Input
                            placeholder="Nhập số điện thoại nhân viên"
                            onChange={this.onChangeSDT}
                        />
                    </div>
                    <div className="ql-nhan-vien__form-input">
                        <p className="ql-nhan-vien__form-input__title">
                            Ngày Bắt Đầu Làm
                        </p>
                        <DatePicker
                            format={dateFormatList}
                            placeholder="Chọn ngày"
                            style={{ width: "100%" }}
                            onChange={this.onChangeNgayBatDau}
                        />
                    </div>
                    <div className="ql-nhan-vien__form-input">
                        <p className="ql-nhan-vien__form-input__title">
                            Chức Vụ
                        </p>
                        <Select
                            placeholder="Chọn chức vụ"
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
                            Tên Đăng Nhập
                        </span>
                        <Input
                            placeholder="Nhập tên đăng nhập"
                            onChange={this.onChangeTenDangNhap}
                        />
                    </div>
                    <div className="ql-nhan-vien__form-input">
                        <span className="ql-nhan-vien__form-input__title">
                            Mật Khẩu
                        </span>
                        <Input
                            placeholder="Nhập mật khẩu"
                            onChange={this.onChangeMatKhau}
                        />
                    </div>
                    <div className="ql-nhan-vien__form-input">
                        <span className="ql-nhan-vien__form-input__title">
                            Nhập Lại Mật Khẩu
                        </span>
                        <Input
                            placeholder="Nhập lại mật khẩu"
                            onChange={this.onChangeNhapLai}
                        />
                    </div>
                </Modal>
            </Fragment>
        );
    }
}
