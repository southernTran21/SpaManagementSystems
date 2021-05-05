// eslint-disable-next-line
import {
    DollarCircleOutlined,
    KeyOutlined,
    MenuOutlined,

    UserOutlined
} from "@ant-design/icons";
//import antd
import { Drawer, Dropdown, Menu, message, Space } from "antd";
import React, { Component, Fragment } from "react";
import LogoSpa from "../../image/svg-logo.png";

function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
}

const { SubMenu } = Menu;

const menu = (
    <Menu onClick={handleMenuClick} className="navbar__dropdown-accoun__item">
        <Menu.Item key="1" icon={<UserOutlined />}>
            Thông Tin Người Dùng
        </Menu.Item>
        <Menu.Item key="2" icon={<DollarCircleOutlined />}>
            Lương Của Tôi
        </Menu.Item>
        <Menu.Item key="3" icon={<KeyOutlined />}>
            Đổi Mật Khẩu
        </Menu.Item>
    </Menu>
);

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false, placement: "left" };
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onChange = (e) => {
        this.setState({
            placement: e.target.value,
        });
    };

    render() {
        const { placement, visible } = this.state;
        return (
            <Fragment>
                <div className="navbar">
                    <div
                        className="navbar__icon-menu"
                        onClick={this.showDrawer}
                    >
                        <MenuOutlined />
                    </div>
                    <div className="navbar__logo">
                        <img src={LogoSpa} alt=""/>
                    </div>
                    <div className="navbar__dropdown-account">
                        <Space wrap>
                            <Dropdown.Button
                                overlay={menu}
                                trigger={["click"]}
                                placement="bottomCenter"
                                icon={<UserOutlined />}
                            ></Dropdown.Button>
                        </Space>
                    </div>
                </div>
                <Drawer
                    placement={placement}
                    onClose={this.onClose}
                    visible={visible}
                    key={placement}
                    className="navbar__drawer"
                >
                    <Menu
                        style={{ width: "100%" }}
                        defaultSelectedKeys={["1"]}
                        mode="inline"
                    >
                        <Menu.Item key="1">Quản Lý Nhân Viên</Menu.Item>
                        <Menu.Item key="8">Quản Lý Khách Hàng</Menu.Item>
                        <SubMenu key="sub2" title="Quản Lý Mỹ Phẩm">
                            <Menu.Item key="2">Danh Mục Mỹ Phẩm</Menu.Item>
                            <Menu.Item key="4">Kho Mỹ Phẩm</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title="Quản Lý Dịch Vụ">
                            <Menu.Item key="5">Danh Mục Dịch Vụ</Menu.Item>
                            <Menu.Item key="6">Khuyến Mãi</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="7">Thống Kê</Menu.Item>
                    </Menu>
                </Drawer>
            </Fragment>
        );
    }
}
