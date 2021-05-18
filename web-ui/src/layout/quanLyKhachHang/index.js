import React, { Component } from "react";
import { Input, Popconfirm, Select } from "antd";

const { Search } = Input;

const onSearch = (value) => console.log(value);

export default class QuanLyKhachHang extends Component {
    render() {
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
                        <div className="ql-khach-hang__column5">
                            Số Lần Điều Trị
                        </div>
                        <div className="ql-khach-hang__column6">
                            Số Lần Đặt Lịch
                        </div>
                        <div className="ql-khach-hang__column7">Chức Năng</div>
                    </div>
                    <div className="ql-nhan-vien__table-body">
                        <div className="ql-nhan-vien__table-item">
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
                            <div className="ql-khach-hang__column5">
                                Số Lần Điều Trị
                            </div>
                            <div className="ql-khach-hang__column6">
                                Số Lần Đặt Lịch
                            </div>
                            <div className="ql-khach-hang__column7">
                                Chức Năng
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
