import { DeleteOutlined } from "@ant-design/icons";
import { Input, Popconfirm, Select } from "antd";
import axios from "axios";
import React, { Component, Fragment } from "react";
import { URL_API } from "../../constant";

const { Search } = Input;

const onSearch = (value) => console.log(value);

export default class QuanLyKhachHang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            khachHang: [],
        };
    }
    componentDidMount() {
        axios
            .get(URL_API + "/khachhang/getallcus")
            .then((response) => {
                this.setState({ khachHang: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { khachHang } = this.state;
        return (
            <div className="ql-khach-hang">
                <div className="ql-khach-hang__search-box">
                    <Search
                        placeholder="Nhập từ khóa để tìm kiếm....."
                        allowClear
                        enterButton="Tìm Kiếm"
                        size="middle"
                        onSearch={onSearch}
                    />
                </div>
                <div className="ql-khach-hang__table-data">
                    <div className="ql-my-pham__table-head">
                        <div className="ql-khach-hang__column1">#</div>
                        <div className="ql-khach-hang__column2">
                            Mã Khách Hàng
                        </div>
                        <div className="ql-khach-hang__column3">
                            Tên Khách Hàng
                        </div>
                        <div className="ql-khach-hang__column4">
                            Số Điện Thoại
                        </div>
                        <div className="ql-khach-hang__column5 flex-center">
                            Số Lần Điều Trị
                        </div>
                        <div className="ql-khach-hang__column6 flex-center">
                            Số Lần Đặt Lịch
                        </div>
                    </div>
                    <div className="ql-nhan-vien__table-body">
                        {khachHang.map((result, index) => {
                            return (
                                <div
                                    className="ql-nhan-vien__table-item"
                                    key={index}
                                >
                                    <div className="ql-khach-hang__column1">
                                        {index + 1}
                                    </div>
                                    <div className="ql-khach-hang__column2">
                                        {result.id}
                                    </div>
                                    <div className="ql-khach-hang__column3">
                                        {result.Ten}
                                    </div>
                                    <div className="ql-khach-hang__column4">
                                        {result.DienThoai}
                                    </div>
                                    <div className="ql-khach-hang__column5 flex-center">
                                        {result.SLDT}
                                    </div>
                                    <div className="ql-khach-hang__column6 flex-center">
                                        {result.SLDL}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
