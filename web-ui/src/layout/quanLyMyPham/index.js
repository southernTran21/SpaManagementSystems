import React, { Component, Fragment } from "react";

export default class QuanLyMyPham extends Component {
    render() {
        return (
            <Fragment>
                <div className="ql-my-pham">
                    <div className="ql-my-pham__left">
                        <div className="ql-my-pham__left--head">
                            <p className="ql-my-pham__title">Loại Mỹ Phẩm</p>
                            <div
                                className="ql-nhan-vien__them-moi"
                                onClick={() => {
                                    this.showModal();
                                }}
                            >
                                <span>Thêm Mới</span>
                            </div>
                        </div>
                        <div className="ql-my-pham__data-loai">
                            <div className="ql-my-pham__table-head">
                                <div className="ql-my-pham__data-loai__column1">
                                    #
                                </div>
                                <div className="ql-my-pham__data-loai__column2">
                                    Tên Loại
                                </div>
                                <div className="ql-my-pham__data-loai__column3">
                                    Trạng Thái
                                </div>
                                <div className="ql-my-pham__data-loai__column4">
                                    Chức Năng
                                </div>
                            </div>
                            <div className="ql-my-pham__table-body">
                                <div className="ql-my-pham__data-loai__item">
                                    <div className="ql-my-pham__data-loai__column1">
                                        1
                                    </div>
                                    <div className="ql-my-pham__data-loai__column2">
                                        Tên Loại
                                    </div>
                                    <div className="ql-my-pham__data-loai__column3">
                                        Trạng Thái
                                    </div>
                                    <div className="ql-my-pham__data-loai__column4">
                                        Chức Năng
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ql-my-pham__right">
                        <div className="ql-my-pham__left--head">
                            <p className="ql-my-pham__title">Mỹ Phẩm</p>
                            <div
                                className="ql-nhan-vien__them-moi"
                                onClick={() => {
                                    this.showModal();
                                }}
                            >
                                <span>Thêm Mới</span>
                            </div>
                        </div>
                        <div className="ql-my-pham__data-loai">
                            <div className="ql-my-pham__table-head">
                                <div className="ql-my-pham__data-mp__column1">
                                    #
                                </div>
                                <div className="ql-my-pham__data-mp__column2">
                                    Tên Mỹ Phẩm
                                </div>
                                <div className="ql-my-pham__data-mp__column3">
                                    Tên Loại
                                </div>
                                <div className="ql-my-pham__data-mp__column4">
                                    Mô Tả
                                </div>
                                <div className="ql-my-pham__data-mp__column5">
                                    Giá
                                </div>
                                <div className="ql-my-pham__data-mp__column6">
                                    Trạng Thái
                                </div>
                                <div className="ql-my-pham__data-mp__column7">
                                    Chức Năng
                                </div>
                            </div>
                            <div className="ql-my-pham__table-body">
                                <div className="ql-my-pham__data-loai__item">
                                    <div className="ql-my-pham__data-mp__column1">
                                        #
                                    </div>
                                    <div className="ql-my-pham__data-mp__column2">
                                        Tên Mỹ Phẩm
                                    </div>
                                    <div className="ql-my-pham__data-mp__column3">
                                        Tên Loại
                                    </div>
                                    <div className="ql-my-pham__data-mp__column4">
                                        Mô Tả
                                    </div>
                                    <div className="ql-my-pham__data-mp__column5">
                                        Giá
                                    </div>
                                    <div className="ql-my-pham__data-mp__column6">
                                        Trạng Thái
                                    </div>
                                    <div className="ql-my-pham__data-mp__column7">
                                        Chức Năng
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
