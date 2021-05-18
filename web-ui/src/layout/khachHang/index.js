import React, { Component } from "react";
import { Input, Radio } from "antd";

export default class KhachHang extends Component {
    render() {
        return (
            <div className="khach-hang">
                <div className="khach-hang__head">
                    <div className="khach-hang__check-info">
                        <p className="khach-hang__check-info__title">
                            Mã Khách Hàng
                        </p>
                        <Input placeholder="Nhập mã khách hàng hoặc số điện thoại..." />
                        <div className="khach-hang__check-info__check-box">
                            <Radio.Group value={1}>
                                <Radio value={1}>Mã KH</Radio>
                                <Radio value={2}>SDT</Radio>
                            </Radio.Group>
                        </div>
                        <div className="khach-hang__check-info__button">
                            <span>Xác Nhận</span>
                        </div>
                    </div>
                    <div className="khach-hang__infomation">
                        <p className="khach-hang__check-info__title">
                            Thông Tin Khách Hàng
                        </p>
                        <div className="khach-hang__show-info">
                            <span>Họ Tên: </span>
                            <span>Trần Phương Nam</span>
                        </div>
                        <div className="khach-hang__show-info">
                            <span>Số Điện Thoại: </span>
                            <span>0777627941</span>
                        </div>
                        <div className="khach-hang__show-info">
                            <span>Địa Chỉ: </span>
                            <span>568 Lê Văn Việt</span>
                        </div>
                        <div className="khach-hang__show-info">
                            <span>Giới Tính: </span>
                            <span>Nam</span>
                        </div>
                    </div>
                </div>
                <div className="khach-hang__lich-hen">
                    <p className="khach-hang__lich-hen__title">Lịch Hẹn</p>
                    <div className="khach-hang__data-lich-hen">
                        <div className="ql-my-pham__table-head">
                            <div className="khach-hang__data-lich-hen__column1">
                                #
                            </div>
                            <div className="khach-hang__data-lich-hen__column2">
                                Ngày Tạo
                            </div>
                            <div className="khach-hang__data-lich-hen__column3">
                                Người Tạo
                            </div>
                            <div className="khach-hang__data-lich-hen__column4">
                                Loại
                            </div>
                            <div className="khach-hang__data-lich-hen__column5">
                                Nội Dung
                            </div>
                            <div className="khach-hang__data-lich-hen__column6">
                                Chức Năng
                            </div>
                        </div>
                    </div>
                    <div className="khach-hang__lich-hen__button">Đặt Lịch</div>
                </div>
                <div className="khach-hang__lich-hen">
                    <p className="khach-hang__lich-hen__title">Lịch Sử Điều Trị</p>
                    <div className="khach-hang__data-lich-hen">
                        <div className="ql-my-pham__table-head">
                            <div className="khach-hang__data-lich-hen__column1">
                                #
                            </div>
                            <div className="khach-hang__data-lich-hen__column2">
                                Ngày Tạo
                            </div>
                            <div className="khach-hang__data-lich-hen__column3">
                                Người Tạo
                            </div>
                            <div className="khach-hang__data-lich-hen__column4">
                                Loại
                            </div>
                            <div className="khach-hang__data-lich-hen__column5">
                                Nội Dung
                            </div>
                            <div className="khach-hang__data-lich-hen__column6">
                                Chức Năng
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
