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

const onSearch = (value) => console.log(value);

export default class QuanLyKho extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            myPham: [],
            __SL: "",
            __idMP: "",
            kho: [],
            nhap: [{ TongSoLuongNhap: 0 }],
        };
    }

    componentDidMount() {
        axios
            .get(URL_API + "/mypham")
            .then((response) => {
                this.setState({ myPham: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(URL_API + "/kho")
            .then((response) => {
                this.setState({ kho: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(URL_API + "/kho/tongsoluongnhap")
            .then((response) => {
                this.setState({ nhap: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    showModal = () => {
        this.setState({ visible: true });
    };

    handleOk = () => {
        const { __SL, __idMP } = this.state;
        var today = new Date();
        const __idNhapKho =
            "K" +
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
        const __idPN =
            "PN" +
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
        const __ngayNhap =
            today.getDate() +
            "/" +
            (today.getMonth() + 1) +
            "/" +
            today.getFullYear();

        axios({
            method: "post",
            url: URL_API + "/phieunhap",
            data: {
                id: __idNhapKho,
                idMyPham: __idMP,
                SoLuong: __SL,
                NgayNhap: __ngayNhap,
            },
        }).then((response) => {});

        axios
            .get(URL_API + "/kho/" + __idMP)
            .then((response) => {
                if (response.data.length == 0) {
                    axios({
                        method: "post",
                        url: URL_API + "/kho",
                        data: {
                            id: __idNhapKho,
                            idMyPham: __idMP,
                            SoLuong: __SL,
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
                } else {
                    axios({
                        method: "put",
                        url: URL_API + "/kho",
                        data: {
                            idMyPham: __idMP,
                            SoLuong:
                                parseInt(response.data[0].SoLuong) +
                                parseInt(__SL),
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
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleChange = (value) => {
        this.setState({
            __idMP: value,
        });
    };

    onChangeSl = (e) => {
        this.setState({
            __SL: e.target.value,
        });
    };

    render() {
        const { confirmLoading, visible, myPham, kho, nhap } = this.state;
        return (
            <Fragment>
                <div className="ql-kho">
                    <div className="ql-kho__head">
                        <div
                            className="ql-kho__button-add"
                            onClick={() => {
                                this.showModal();
                            }}
                        >
                            Nh???p Kho
                        </div>
                        <span className="ql-kho__sl">
                            T???ng s??? l?????ng nh???p: {nhap[0].TongSoLuongNhap}
                        </span>
                        <span className="ql-kho__sl">
                            T???ng s??? l?????ng xu???t: 0
                        </span>
                        <span className="ql-kho__sl">T???ng s??? l?????ng t???n: 0</span>
                        <span className="ql-kho__button-export">
                            Xu???t Excel
                        </span>
                        <div className="ql-nhan-vien__search">
                            <Search
                                placeholder="Nh???p t??? kh??a ????? t??m ki???m....."
                                allowClear
                                enterButton="T??m Ki???m"
                                size="middle"
                                onSearch={onSearch}
                            />
                        </div>
                    </div>
                    <div className="ql-kho__body">
                        <div className="ql-my-pham__table-head">
                            <div className="ql-kho__column1">#</div>
                            <div className="ql-kho__column3">T??n M??? Ph???m</div>
                            <div className="ql-kho__column4">T??n Lo???i</div>
                            <div className="ql-kho__column5 flex-center">
                                SL Nh???p
                            </div>
                            <div className="ql-kho__column6 flex-center">
                                SL Xu???t
                            </div>
                            <div className="ql-kho__column7 flex-center">
                                SL T???n
                            </div>
                        </div>
                        <div className="ql-my-pham__table-body">
                            {kho.map((result, index) => {
                                return (
                                    <div
                                        className="ql-my-pham__data-loai__item"
                                        key={index}
                                    >
                                        <div className="ql-kho__column1">
                                            {index + 1}
                                        </div>
                                        <div className="ql-kho__column3">
                                            {result.Ten}
                                        </div>
                                        <div className="ql-kho__column4">
                                            {result.TenLoai}
                                        </div>
                                        <div className="ql-kho__column5 flex-center">
                                            {result.SLN}
                                        </div>
                                        <div className="ql-kho__column6 flex-center">
                                            {parseInt(result.SoLuong) - parseInt(result.SLN)}
                                        </div>
                                        <div className="ql-kho__column7 flex-center">
                                            {result.SoLuong}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <Modal
                    title="Th??m h??a ????n nh???p kho"
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
                            M??? Ph???m
                        </span>
                        <Select
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Ch???n M??? Ph???m"
                            optionFilterProp="children"
                            onSearch={onSearch}
                            onChange={this.handleChange}
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {myPham.map((result, index) => {
                                return (
                                    <Option value={result.id} key={index}>
                                        {result.Ten}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                    <div className="ql-nhan-vien__form-input">
                        <span className="ql-nhan-vien__form-input__title">
                            S??? L?????ng Nh???p
                        </span>
                        <Input
                            placeholder="Nh???p s??? l?????ng"
                            onChange={this.onChangeSl}
                        />
                    </div>
                </Modal>
            </Fragment>
        );
    }
}
