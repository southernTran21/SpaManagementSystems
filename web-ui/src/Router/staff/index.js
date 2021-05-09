import React, { Component, Fragment } from "react";
import LogoSpa from "../../image/svg-logo.png";
import { Link, Route } from "react-router-dom";
import DangKyThanhVien from "../../layout/dangKyThanhVien";
import DangKyThanhCong from "../../layout/dangKyThanhCong";

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
                                                to="/staff/dat-lich"
                                                className="staff__feature__item staff__feature__item--blue"
                                            >
                                                <span>Đặt Lịch</span>
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