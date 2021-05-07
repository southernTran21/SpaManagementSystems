import { Input } from "antd";
import React, { Component } from "react";
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
                <div className="ql-kho__body">
                    <div className="ql-my-pham__table-head">
                        <div className="ql-kho__column1">#</div>
                        <div className="ql-kho__column2">Mã Mỹ Phẩm</div>
                        <div className="ql-kho__column3">Tên Mỹ Phẩm</div>
                        <div className="ql-kho__column4">Tên Loại</div>
                        <div className="ql-kho__column5">SL Nhập</div>
                        <div className="ql-kho__column6">SL Xuất</div>
                        <div className="ql-kho__column7">SL Tồn</div>
                    </div>
                    <div className="ql-my-pham__table-body">
                        <div className="ql-my-pham__data-loai__item">
                            <div className="ql-kho__column1">#</div>
                            <div className="ql-kho__column2">Mã Mỹ Phẩm</div>
                            <div className="ql-kho__column3">Tên Mỹ Phẩm</div>
                            <div className="ql-kho__column4">Tên Loại</div>
                            <div className="ql-kho__column5">SL Nhập</div>
                            <div className="ql-kho__column6">SL Xuất</div>
                            <div className="ql-kho__column7">SL Tồn</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
