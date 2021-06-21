import React, { Component, Fragment } from "react";
import LogoSpa from "../../image/LogoTitle.svg";
import { Link, Route } from "react-router-dom";
import DangKyThanhVien from "../../layout/dangKyThanhVien";
import DangKyThanhCong from "../../layout/dangKyThanhCong";
import KhachHang from "../../layout/khachHang";
import DatLich from "../../layout/datLich";
import ThanhToan from "../../layout/thanhToan";
import ThanhToanMyPham from "../../layout/thanhToanMyPham";

export default class StaffRouter extends Component {
    handleInputURL = (accountType, match) => {
        switch (accountType) {
            case "1003": // quyền nhan vien
                return (
                    <Fragment>
                        <Route
                            path={`${match}/dang-ky`}
                            exact
                            component={DangKyThanhVien}
                        />
                        <Route
                            path={`${match}/dang-ky/thanh-cong`}
                            exact
                            component={DangKyThanhCong}
                        />
                        <Route
                            path={`${match}/khach-hang`}
                            exact
                            component={KhachHang}
                        />
                        <Route
                            path={`${match}/dat-lich`}
                            exact
                            component={DatLich}
                        />
                        <Route
                            path={`${match}/thanh-toan`}
                            exact
                            component={ThanhToan}
                        />
                        <Route
                            path={`${match}/thanh-toan-mp`}
                            exact
                            component={ThanhToanMyPham}
                        />

                        {/* route trang home cho phần Staff */}
                        <Route
                            path={`${match}`}
                            exact
                            component={() => (
                                <div className="staff">
                                    <div className="staff__feature">
                                        <div className="">
                                            <Link
                                                to="/staff/dang-ky"
                                                className="staff__feature__item staff__feature__item--red"
                                            >
                                                <span>
                                                    Đăng Ký
                                                    <br /> Thành Viên
                                                </span>
                                            </Link>
                                            <Link
                                                to="/staff/thanh-toan"
                                                className="staff__feature__item staff__feature__item--blue"
                                            >
                                                <span>
                                                    Thanh Toán <br /> Dịch Vụ
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="">
                                            <Link
                                                to="/staff/khach-hang"
                                                className="staff__feature__item staff__feature__item--green"
                                            >
                                                <span>
                                                    Quản Lý <br /> Khách Hàng
                                                </span>
                                            </Link>
                                            <Link
                                                to="/staff/thanh-toan-mp"
                                                className="staff__feature__item staff__feature__item--violet"
                                            >
                                                <span>
                                                    Thanh Toán <br /> Mỹ Phẩm
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="">
                                            <Link
                                                to="../"
                                                className="staff__feature__item staff__feature__item--yellow"
                                                onClick={() => {
                                                    localStorage.removeItem(
                                                        "displayName"
                                                    );
                                                    localStorage.removeItem(
                                                        "accountType"
                                                    );
                                                    localStorage.removeItem(
                                                        "idAccount"
                                                    );
                                                }}
                                            >
                                                <span>Đăng Xuất</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    </Fragment>
                );
                break;
            default:
                break;
        }
    };

    render() {
        const match = this.props.match.path;
        const accountType = localStorage.getItem("accountType");
        return (
            <Fragment>
                <div className="staff__header">
                    <Link className="staff__logo" to="/staff">
                        <img src={LogoSpa} alt="" />
                    </Link>
                </div>
                <div
                    style={{
                        width: "100%",
                    }}
                >
                    {this.handleInputURL(accountType, match)}
                </div>
            </Fragment>
        );
    }
}
