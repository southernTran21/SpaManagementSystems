// eslint-disable-next-line
//import antd
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message, Space } from "antd";
import React, { Component, Fragment } from "react";
import { Link, Route } from "react-router-dom";
import LogoSpa from "../../image/LogoTitle.svg";
import Error from "../../layout/error";
import QuanLyKho from "../../layout/kho";
import Navbar from "../../layout/navbar";
import QuanLyMyPham from "../../layout/quanLyMyPham";
import QuanLyNhanVien from "../../layout/quanLyNhanVien";
import QuanLyTaiKhoan from "../../layout/quanLyTaiKhoan";
import history from "../../history";
import QuanLyKhachHang from "../../layout/quanLyKhachHang";
import QuanLyDichVu from "../../layout/quanLyDichVu";

const { SubMenu } = Menu;

function handleMenuClick(e) {
    if (e.key == 1) {
        localStorage.removeItem("displayName");
        localStorage.removeItem("accountType");
        localStorage.removeItem("idAccount");
        history.push("/");
        window.location.reload();
    }
}

const menu = (
    <Menu onClick={handleMenuClick} className="navbar__dropdown-accoun__item">
        <Menu.Item key="1" icon={<UserOutlined />}>
            Đăng Xuất
        </Menu.Item>
    </Menu>
);

export default class AdminRouter extends Component {
    onChange = (e) => {
        this.setState({
            placement: e.target.value,
        });
    };

    handleInputURL = (accountType, match) => {
        switch (accountType) {
            case "1": // quyền admin
                return (
                    <Fragment>
                        <Route
                            path={`${match}/quan-ly-nhan-vien`}
                            exact
                            component={QuanLyNhanVien}
                        />
                        <Route
                            path={`${match}/quan-ly-tai-khoan`}
                            exact
                            component={QuanLyTaiKhoan}
                        />
                        <Route
                            path={`${match}/quan-ly-my-pham`}
                            exact
                            component={QuanLyMyPham}
                        />
                        <Route
                            path={`${match}/quan-ly-kho-my-pham`}
                            exact
                            component={QuanLyKho}
                        />
                        <Route
                            path={`${match}/quan-ly-khach-hang`}
                            exact
                            component={QuanLyKhachHang}
                        />
                        <Route
                            path={`${match}/quan-ly-dich-vu`}
                            exact
                            component={QuanLyDichVu}
                        />
                    </Fragment>
                );
                break;
            case ("", null):
                return <Error />;
                break;
        }
    };

    render() {
        const match = this.props.match.path;
        const accountType = localStorage.getItem("accountType");
        return (
            <Fragment>
                <Navbar />
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        height: "100vh",
                    }}
                >
                    <div
                        style={{ width: "17%", background: "rgb(0 0 0 / 82%)" }}
                        className="navbar__drawer navbar__drawer--desktop"
                    >
                        <div className="navbar__logo-spa">
                            <img src={LogoSpa} alt="" />
                        </div>

                        <Menu
                            style={{ width: "100%" }}
                            defaultSelectedKeys={["1"]}
                            mode="inline"
                        >
                            <Menu.Item key="1">
                                <Link to="/admin/quan-ly-nhan-vien">
                                    Quản Lý Nhân Viên
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="9">
                                <Link to="/admin/quan-ly-tai-khoan">
                                    Quản Lý Tài Khoản
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="8">
                                <Link to="/admin/quan-ly-khach-hang">
                                    Quản Lý Khách Hàng
                                </Link>
                            </Menu.Item>
                            <SubMenu key="sub2" title="Quản Lý Mỹ Phẩm">
                                <Menu.Item key="2">
                                    <Link to="/admin/quan-ly-my-pham">
                                        Danh Mục Mỹ Phẩm
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Link to="/admin/quan-ly-kho-my-pham">
                                        Kho Mỹ Phẩm
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title="Quản Lý Dịch Vụ">
                                <Menu.Item key="5">
                                    <Link to="/admin/quan-ly-dich-vu">
                                        Danh Mục Dịch Vụ
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="6">Khuyến Mãi</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="7">Thống Kê</Menu.Item>
                        </Menu>
                    </div>
                    <div
                        style={{
                            width: "83%",
                            backgroundColor: "#fff",
                        }}
                        className="admin__right"
                    >
                        <div className="navbar__infomation-account">
                            <Space wrap>
                                <Dropdown.Button
                                    overlay={menu}
                                    trigger={["click"]}
                                    placement="bottomCenter"
                                    icon={<UserOutlined />}
                                >
                                    Xin Chào{" "}
                                    {localStorage.getItem("displayName")}
                                </Dropdown.Button>
                            </Space>
                        </div>
                        {this.handleInputURL(accountType, match)}
                    </div>
                </div>
            </Fragment>
        );
    }
}
