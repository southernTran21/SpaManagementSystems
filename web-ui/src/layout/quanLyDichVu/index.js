import {
    Input,
    Modal,
    Button,
    DatePicker,
    Select,
    message,
    Popconfirm,
} from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { Component, Fragment } from "react";
import { URL_API } from "../../constant";
const { Search } = Input;
const { Option } = Select;

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

export default class QuanLyDichVu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service: [],
        };
    }
    componentDidMount() {
        axios
            .get(URL_API + "/dichvu/all")
            .then((response) => {
                this.setState({ service: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    onSearch = (value) => {};
    render() {
        const { service } = this.state;
        return (
            <Fragment>
                <div className="dich-vu">
                    <div className="ql-nhan-vien__header">
                        <div className="ql-nhan-vien__search">
                            <Search
                                placeholder="Nhập từ khóa để tìm kiếm....."
                                allowClear
                                enterButton="Tìm Kiếm"
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
                            <span>Thêm Mới</span>
                        </div>
                    </div>
                    <div className="dich-vu__data">
                        <div className="ql-nhan-vien__table-head">
                            <div className="dich-vu__column1">#</div>
                            <div className="dich-vu__column2">Tên Dịch Vụ</div>
                            <div className="dich-vu__column3">Mô Tả</div>
                            <div className="dich-vu__column4">Giá</div>
                            <div className="dich-vu__column5">Trạng Thái</div>
                            <div className="dich-vu__column6">Chức Năng</div>
                        </div>
                        <div className="ql-nhan-vien__table-body">
                            {service.map((result, index) => {
                                return (
                                    <div
                                        className="ql-nhan-vien__table-item"
                                        key={index}
                                    >
                                        <div className="dich-vu__column1">
                                            {index + 1}
                                        </div>
                                        <div className="dich-vu__column2">
                                            {result.TenDichVu}
                                        </div>
                                        <div className="dich-vu__column3">
                                            {result.MoTa}
                                        </div>
                                        <div className="dich-vu__column4">
                                            {result.Gia}
                                        </div>
                                        <div className="dich-vu__column5">
                                            {result.status == true ? (
                                                <EyeOutlined />
                                            ) : (
                                                <EyeInvisibleOutlined />
                                            )}
                                        </div>
                                        <div className="dich-vu__column5">
                                            Trạng Thái
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
