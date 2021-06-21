import React, { Component } from "react";

import { Radio, Input, message } from "antd";
import { URL_API } from "../../constant";
import axios from "axios";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

export default class ThanhToanMyPham extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myPham: [],
            orderList: [],
            total: 0,
            totalPrice: 0,
            kho: [],
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
            .get(URL_API + "/kho/laysoluong")
            .then((response) => {
                this.setState({ kho: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleClickAddMP = (id, name, price) => {
        let orderList = this.state.orderList;
        let { total, totalPrice } = this.state;
        const isCheckIDExits = orderList.some(
            (result) => result.ID.toString() == id.toString()
        );
        if (isCheckIDExits == false) {
            const orderItem = {
                ID: id,
                name: name,
                quantity: 1,
                Gia: price,
            };
            orderList.push(orderItem);
            total += 1;
            totalPrice += price;
        } else {
            const index = orderList.findIndex(
                (result) => result.ID.toString() == id.toString()
            );
            orderList[index].quantity += 1;
            total += 1;
            totalPrice += price;
        }
        this.setState({
            orderList: orderList,
            total: total,
            totalPrice: totalPrice,
        });
    };

    handleDeleted = (index) => {
        const { orderList } = this.state;
        let { totalPrice } = this.state;
        totalPrice -= orderList[index].Gia * orderList[index].quantity;
        let remove = orderList.splice(index, 1);
        this.setState({
            orderList,
            totalPrice: totalPrice,
        });
    };

    handleSubmitHoaDon = () => {
        const { orderList, total, totalPrice, kho } = this.state;

        if (orderList.length > 0) {
            var dem = 0;

            orderList.forEach((item) => {
                const index = kho.findIndex(
                    (result) => result.idMyPham.toString() == item.ID.toString()
                );
                if (kho[index].SoLuong < item.quantity) {
                    dem += 1;
                }else{
                    dem *= 0;
                }
            });

            if (dem == 0) {
                var today = new Date();
                const __idHoaDon =
                    "HDMP" +
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
                const __idPhieuNhap =
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
                const __ngayLap =
                    today.getDate() +
                    "/" +
                    (today.getMonth() + 1) +
                    "/" +
                    today.getFullYear();
                axios({
                    method: "post",
                    url: URL_API + "/hoadonmypham",
                    data: {
                        id: __idHoaDon,
                        idAccount: localStorage.getItem("idAccount"),
                        NgayLap: __ngayLap,
                        SoLuong: total,
                        TongTien: totalPrice,
                    },
                }).then((response) => {
                    orderList.map((result, index) => {
                        axios
                            .post(URL_API + "/chitiethoadonmypham/add", {
                                idHoaDon: `${__idHoaDon}`,
                                idMyPham: `${result.ID}`,
                                SoLuong: `${result.quantity}`,
                            })
                            .then((res) => {
                                axios
                                    .get(URL_API + "/kho/" + result.ID)
                                    .then((response) => {
                                        axios({
                                            method: "put",
                                            url: URL_API + "/kho",
                                            data: {
                                                idMyPham: result.ID,
                                                SoLuong:
                                                    parseInt(
                                                        response.data[0].SoLuong
                                                    ) -
                                                    parseInt(result.quantity),
                                            },
                                        }).then((response) => {});
                                    });
                            })
                            .catch((error) => {
                                console.log(error.response);
                            });
                    });
                });
                message.success("Thanh Toán Thành Công");
                this.setState({
                    orderList: [],
                    total: 0,
                    totalPrice: 0,
                });
            }else{
                message.error("Số lượng hàng trong kho không đủ")
            }
        } else {
            message.error("Cần thêm mỹ phẩm để thanh toán");
        }
    };

    render() {
        const { myPham, orderList, totalPrice } = this.state;
        return (
            <div className="thanh-toan-mp">
                <div className="thanh-toan__left">
                    <div className="thanh-toan__selection">
                        <div className="thanh-toan__khach-hang">
                            <p className="thanh-toan__khach-hang__title">
                                Thanh Toán Mỹ Phẩm
                            </p>
                            <div className="thanh-toan__khach-hang__box-input">
                                <Input
                                    placeholder="Tìm Kiếm mỹ phẩm........."
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
                            <div className="thanh-toan-mp__data">
                                {myPham.map((result, index) => {
                                    return (
                                        <div
                                            className="thanh-toan-mp__item"
                                            key={index}
                                        >
                                            <span>{result.Ten}</span>
                                            <PlusOutlined
                                                onClick={() => {
                                                    this.handleClickAddMP(
                                                        result.id,
                                                        result.Ten,
                                                        result.Gia
                                                    );
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="thanh-toan__right">
                    <div className="thanh-toan__data">
                        <div className="thanh-toan__data__head">
                            <div className="thanh-toan-mp__column1">#</div>
                            <div className="thanh-toan-mp__column2">
                                Tên Mỹ Phẩm
                            </div>
                            <div className="thanh-toan-mp__column3">
                                Đơn Giá
                            </div>
                            <div className="thanh-toan-mp__column4">
                                Số Lượng
                            </div>
                            <div className="thanh-toan-mp__column5">
                                Thành Tiền
                            </div>
                            <div className="thanh-toan-mp__column6">
                                Chức Năng
                            </div>
                        </div>
                        <div className="thanh-toan__data__body">
                            {orderList.map((result, index) => {
                                return (
                                    <div
                                        className="thanh-toan__data__item"
                                        key={index}
                                    >
                                        <div className="thanh-toan-mp__column1">
                                            {index + 1}
                                        </div>
                                        <div className="thanh-toan-mp__column2">
                                            {result.name}
                                        </div>
                                        <div className="thanh-toan-mp__column3">
                                            {Number(result.Gia).toLocaleString(
                                                "el-GR"
                                            )}{" "}
                                            VNĐ
                                        </div>
                                        <div className="thanh-toan-mp__column4">
                                            {result.quantity}
                                        </div>
                                        <div className="thanh-toan-mp__column5">
                                            {Number(
                                                result.Gia * result.quantity
                                            ).toLocaleString("el-GR")}{" "}
                                            VNĐ
                                        </div>
                                        <div className="thanh-toan-mp__column6">
                                            <DeleteOutlined
                                                onClick={() => {
                                                    this.handleDeleted(index);
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="thanh-toan__chi-tiet">
                        <div className="thanh-toan__chi-tiet__total">
                            <span>Tổng Tiền:</span>
                            <span>
                                {Number(totalPrice).toLocaleString("el-GR")} VNĐ
                            </span>
                        </div>
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
