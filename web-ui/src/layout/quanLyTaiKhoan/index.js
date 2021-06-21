import { DeleteOutlined } from "@ant-design/icons";
import { Input, Popconfirm, Select } from "antd";
import axios from "axios";
import React, { Component, Fragment } from "react";
import { URL_API } from "../../constant";
const { Search } = Input;
const { Option } = Select;

const onSearch = (value) => console.log(value);
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

export default class QuanLyTaiKhoan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: [],
        };
    }
    componentDidMount() {
        axios
            .get(URL_API + "/account")
            .then((response) => {
                this.setState({ account: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleShowQuyen = (id) => {};

    render() {
        const { account } = this.state;
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
                    </div>
                    <div className="ql-nhan-vien__data">
                        <div className="ql-nhan-vien__table-head">
                            <div className="ql-nhan-vien__column1">#</div>
                            <div className="ql-nhan-vien__column2">
                                Tên đăng nhập
                            </div>
                            <div className="ql-nhan-vien__column3">
                                Mật khẩu
                            </div>
                            <div className="ql-nhan-vien__column4">
                                Tên hiển thị
                            </div>
                            <div className="ql-nhan-vien__column5">Quyền</div>
                            <div className="ql-nhan-vien__column6">
                                Tình Trạng
                            </div>
                            <div className="ql-nhan-vien__column7">
                                Tùy Chỉnh
                            </div>
                        </div>
                        <div className="ql-nhan-vien__table-body">
                            {account.map((result, index) => {
                                return (
                                    <div
                                        className="ql-nhan-vien__table-item"
                                        key={index}
                                    >
                                        <div className="ql-nhan-vien__column1">
                                            {index + 1}
                                        </div>
                                        <div className="ql-nhan-vien__column2">
                                            {result.username}
                                        </div>
                                        <div className="ql-nhan-vien__column3">
                                            {result.password}
                                        </div>
                                        <div className="ql-nhan-vien__column4">
                                            {result.accountName}
                                        </div>
                                        <div className="ql-nhan-vien__column5">
                                            {result.Quyen}
                                        </div>
                                        <div className="ql-nhan-vien__column6">
                                            {result.status == true
                                                ? "Đang hoạt động"
                                                : "Ngừng hoạt động"}
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
            </Fragment>
        );
    }
}
