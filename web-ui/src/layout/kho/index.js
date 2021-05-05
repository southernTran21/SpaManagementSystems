import React, { Component } from "react";
import {
    Input,
    Modal,
    Button,
    DatePicker,
    Select,
    message,
    Popconfirm,
} from "antd";
const { Search } = Input;

const onSearch = (value) => console.log(value);

export default class QuanLyKho extends Component {
    render() {
        return (
            <div className="ql-kho">
                <div className="ql-kho__head">
                    <span className="ql-kho__sl">Tổng số lượng nhập: 0</span>
                    <span className="ql-kho__sl">Tổng số lượng xuất: 0</span>
                    <span className="ql-kho__sl">Tổng số lượng tồn: 0</span>
                    <span className="ql-kho__button-export">Xuất Excel</span>
                    <div className="ql-nhan-vien__search">
                        <Search
                            placeholder="Nhập từ khóa để tìm kiếm....."
                            allowClear
                            enterButton="Tìm Kiếm"
                            size="middle"
                            onSearch={onSearch}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
