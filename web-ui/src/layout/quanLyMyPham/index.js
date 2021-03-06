import React, { Component, Fragment } from "react";
import axios from "axios";
import { URL_API } from "../../constant";
import { Select } from "antd";

const { Option } = Select;

export default class QuanLyMyPham extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaiMyPham: [
                {
                    id: "",
                    TenLoai: "",
                    status: "",
                },
            ],
            myPham: [
                {
                    id: "",
                    Ten: "",
                    MoTa: "",
                    Gia: "",
                    TenLoai: "",
                    status: "",
                },
            ],
        };
    }
    componentDidMount() {
        axios
            .get(URL_API + "/loaimypham")
            .then((response) => {
                this.setState({ loaiMyPham: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(URL_API + "/mypham")
            .then((response) => {
                this.setState({ myPham: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChangeSelectionCat = (value) => {
        if (value == 0) {
            axios
                .get(URL_API + "/mypham")
                .then((response) => {
                    this.setState({ myPham: response.data });
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios
                .get(URL_API + "/mypham/" + value)
                .then((response) => {
                    this.setState({ myPham: response.data });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    hiddenContentDescription = (description) => {
        // console.log(description);
        if (description.length > 100 && description.length != undefined) {
            const str = description.slice(0, 100);

            return (
                <div>
                    <div className="contentDescription">
                        <span>{str}... </span>
                    </div>
                </div>
            );
        } else {
            return <span>{description}</span>;
        }
    };

    render() {
        const { myPham, loaiMyPham } = this.state;
        return (
            <Fragment>
                <div className="ql-my-pham">
                    <div className="ql-my-pham__left">
                        <div className="ql-my-pham__left--head">
                            <p className="ql-my-pham__title">Lo???i M??? Ph???m</p>
                            <div
                                className="ql-nhan-vien__them-moi"
                                onClick={() => {
                                    this.showModal();
                                }}
                            >
                                <span>Th??m M???i</span>
                            </div>
                        </div>
                        <div className="ql-my-pham__data-loai">
                            <div className="ql-my-pham__table-head">
                                <div className="ql-my-pham__data-loai__column1">
                                    #
                                </div>
                                <div className="ql-my-pham__data-loai__column2">
                                    T??n Lo???i
                                </div>
                                <div className="ql-my-pham__data-loai__column3">
                                    Tr???ng Th??i
                                </div>
                                <div className="ql-my-pham__data-loai__column4">
                                    Ch???c N??ng
                                </div>
                            </div>
                            <div className="ql-my-pham__table-body">
                                {loaiMyPham.map((result, index) => {
                                    return (
                                        <div
                                            className="ql-my-pham__data-loai__item"
                                            key={index}
                                        >
                                            <div className="ql-my-pham__data-loai__column1">
                                                {index + 1}
                                            </div>
                                            <div className="ql-my-pham__data-loai__column2">
                                                {result.TenLoai}
                                            </div>
                                            <div className="ql-my-pham__data-loai__column3">
                                                {result.status == true ? 1 : 0}
                                            </div>
                                            <div className="ql-my-pham__data-loai__column4">
                                                Ch???c N??ng
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="ql-my-pham__right">
                        <div className="ql-my-pham__left--head">
                            <p className="ql-my-pham__title">M??? Ph???m</p>
                            <div className="" style={{ display: "flex" }}>
                                <Select
                                    defaultValue="Ch???n lo???i m??? ph???m"
                                    style={{ width: "30rem" }}
                                    onChange={this.handleChangeSelectionCat}
                                >
                                    <Option value={0}>T???t c???</Option>
                                    {loaiMyPham.map((result, index) => {
                                        return (
                                            <Option
                                                value={result.id}
                                                key={index}
                                            >
                                                {result.TenLoai}
                                            </Option>
                                        );
                                    })}
                                </Select>
                                <div
                                    className="ql-nhan-vien__them-moi"
                                    onClick={() => {
                                        this.showModal();
                                    }}
                                >
                                    <span>Th??m M???i</span>
                                </div>
                            </div>
                        </div>
                        <div className="ql-my-pham__data-loai">
                            <div className="ql-my-pham__table-head">
                                <div className="ql-my-pham__data-mp__column1">
                                    #
                                </div>
                                <div className="ql-my-pham__data-mp__column2">
                                    T??n M??? Ph???m
                                </div>
                                <div className="ql-my-pham__data-mp__column3">
                                    T??n Lo???i
                                </div>
                                <div className="ql-my-pham__data-mp__column4">
                                    M?? T???
                                </div>
                                <div className="ql-my-pham__data-mp__column5">
                                    Gi??
                                </div>
                                <div className="ql-my-pham__data-mp__column6">
                                    Tr???ng Th??i
                                </div>
                                <div className="ql-my-pham__data-mp__column7">
                                    Ch???c N??ng
                                </div>
                            </div>
                            <div className="ql-my-pham__table-body">
                                {myPham.map((result, index) => {
                                    return (
                                        <div
                                            className="ql-my-pham__data-loai__item"
                                            key={index}
                                        >
                                            <div className="ql-my-pham__data-mp__column1">
                                                {index + 1}
                                            </div>
                                            <div className="ql-my-pham__data-mp__column2">
                                                {result.Ten}
                                            </div>
                                            <div className="ql-my-pham__data-mp__column3">
                                                {result.TenLoai}
                                            </div>
                                            <div className="ql-my-pham__data-mp__column4">
                                                {this.hiddenContentDescription(
                                                    result.MoTa
                                                )}
                                            </div>
                                            <div className="ql-my-pham__data-mp__column5">
                                                {Number(
                                                    result.Gia
                                                ).toLocaleString("el-GR")} VN??
                                            </div>
                                            <div className="ql-my-pham__data-mp__column6">
                                                {result.status == true ? 1 : 0}
                                            </div>
                                            <div className="ql-my-pham__data-mp__column7">
                                                Ch???c N??ng
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
